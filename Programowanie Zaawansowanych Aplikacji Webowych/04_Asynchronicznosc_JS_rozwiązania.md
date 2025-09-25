# Zadania i rozwiązania — Asynchroniczność w JavaScript (Promises, async/await)

Poniżej komplet **przykładowych rozwiązań** do zadań z wykładu. Kod jest celowo „edukacyjny”: zawiera komentarze i warianty, które można omawiać na lekcji.

---

## ✅ Zadanie 1 — Podstawowy Promise

**Treść:** Napisz funkcję `zrobCos(ms)`, która po `ms` ms rozstrzyga się sukcesem (`"Gotowe"`) lub w 30% przypadków — błędem `"Losowy błąd"`. Uruchom 3 razy.

**Rozwiązanie:**
```js
function zrobCos(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 30% szansy na błąd
      if (Math.random() < 0.3) {
        reject(new Error("Losowy błąd"));
      } else {
        resolve("Gotowe");
      }
    }, ms);
  });
}

// Przykładowy test: 3 wywołania o różnych czasach
zrobCos(400)
  .then(v => console.log("1:", v))
  .catch(e => console.error("1: Błąd:", e.message));

zrobCos(700)
  .then(v => console.log("2:", v))
  .catch(e => console.error("2: Błąd:", e.message));

zrobCos(150)
  .then(v => console.log("3:", v))
  .catch(e => console.error("3: Błąd:", e.message));
```

**Komentarz metodyczny:** Warto podkreślić, że `.catch` wyłapuje błąd z dowolnego miejsca w łańcuchu — im wyżej (bliżej źródła) go wstawimy, tym krótszy będzie zakres „ochrony”.

---

## ✅ Zadanie 2 — Łańcuch Promisów

**Treść:** Dla liczby `n`: jeśli parzysta → dodaj 10 → pomnóż przez 2 → odejmij 4. Obsłuż błąd, gdy `n` jest nieparzysta.

**Rozwiązanie (wersja z `.then`):**
```js
function oblicz(n) {
  return Promise.resolve(n)
    .then(x => {
      if (x % 2 !== 0) throw new Error("Nieparzyste");
      return x + 10;
    })
    .then(x => x * 2)
    .then(x => x - 4);
}

// Testy
oblicz(8)
  .then(w => console.log("Wynik 8:", w))  // (8+10)*2-4 = 28
  .catch(e => console.error("Błąd 8:", e.message));

oblicz(7)
  .then(w => console.log("Wynik 7:", w))
  .catch(e => console.error("Błąd 7:", e.message)); // Nieparzyste
```

**Uwaga dydaktyczna:** W łańcuchu `.then` **nie zapominamy o `return`**, inaczej kolejne `.then` dostaną `undefined`.

---

## ✅ Zadanie 3 — async/await

**Treść:** Przepisz zad. 2 na `async/await` z `try…catch…finally`.

**Rozwiązanie (wersja async/await):**
```js
async function obliczAsync(n) {
  try {
    if (n % 2 !== 0) throw new Error("Nieparzyste");
    let x = n + 10;
    x = x * 2;
    x = x - 4;
    return x;
  } catch (e) {
    console.error("Błąd:", e.message);
    throw e; // propagacja błędu do wywołującego
  } finally {
    console.log("Koniec obliczeń (finally)");
  }
}

// Testy
obliczAsync(8)
  .then(w => console.log("Wynik 8:", w))
  .catch(() => {});

obliczAsync(7)
  .then(w => console.log("Wynik 7:", w))
  .catch(() => {});
```

**Komentarz:** `async` zawsze zwraca Promise. `throw` wewnątrz `async` → odrzucenie Promise. `finally` uruchamia się zawsze (sukces/błąd).

---

## ✅ Zadanie 4 — Pobieranie z API + walidacja

**Treść:** Funkcja `pobierzUzytkownika(id)` pobiera dane z `https://jsonplaceholder.typicode.com/users/{id}`, zwraca `{imie, email}`; dla `id` spoza 1..10 — błąd.

**Rozwiązanie:**
```js
async function pobierzUzytkownika(id) {
  // Walidacja danych wejściowych (instrukcja warunkowa — INF.04.7.1(23))
  if (typeof id !== "number" || id < 1 || id > 10) {
    throw new Error("Nieprawidłowe id");
  }

  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  // Obsługa protokołu (HTTP status) — INF.04.7.1(30) „obsługa wyjątków”
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  const data = await res.json();
  return { imie: data.name, email: data.email };
}

// Test
(async () => {
  try {
    const u = await pobierzUzytkownika(3);
    console.log("Użytkownik:", u);
  } catch (e) {
    console.error("Błąd:", e.message);
  }
})();
```

**Komentarz:** W Node 18+ `fetch` jest globalny; w starszych Node konieczna będzie biblioteka `node-fetch` lub `undici`.

---

## ✅ Zadanie 5 — Równoległość + timeout

**Treść:** Uruchom trzy `zrobCos(ms)` jednocześnie i poczekaj na wszystkie wyniki (`Promise.all`). Dodaj strażnika czasu — jeśli minie 1000 ms → błąd `"Timeout"`.

**Rozwiązanie (z `Promise.race`):**
```js
// Reużywamy zrobCos(ms) z Zad. 1
const timeout = (ms) => new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms));

async function runRownolegleZTimeoutem() {
  try {
    const prace = [zrobCos(300), zrobCos(700), zrobCos(1200)]; // 3 zadania ruszają od razu
    const wszystkie = Promise.all(prace); // czeka na komplet (jeśli któryś odrzuci — całość odrzuca)
    const wynik = await Promise.race([wszystkie, timeout(1000)]);
    console.log("Wyniki:", wynik);
  } catch (e) {
    console.error("Błąd:", e.message);
  }
}

runRownolegleZTimeoutem();
```

**Wariant dydaktyczny:** omów też `Promise.allSettled` — zwraca statusy wszystkich zadań bez „wywracania” całości przy pojedynczym błędzie.

---

## ➕ Dodatki dla nauczyciela

### 1) Sekwencja vs. równoległość (pomiar czasu)
```js
function after(ms, val) {
  return new Promise(res => setTimeout(() => res(val), ms));
}

async function sekwencyjnie() {
  console.time("seq");
  const a = await after(500, "A");
  const b = await after(600, "B");
  const c = await after(700, "C");
  console.timeEnd("seq"); // ~1800ms
  console.log(a, b, c);
}

async function rownolegle() {
  console.time("par");
  const [a,b,c] = await Promise.all([after(500, "A"), after(600, "B"), after(700, "C")]);
  console.timeEnd("par"); // ~700ms
  console.log(a, b, c);
}

sekwencyjnie().then(rownolegle);
```

### 2) Typowe pułapki i poprawki
- `await` w `forEach` — **nie działa**:
  ```js
  // zle
  [1,2,3].forEach(async n => { await after(200, n) });
  // dobrze
  for (const n of [1,2,3]) { await after(200, n); }
  // albo równolegle:
  await Promise.all([1,2,3].map(n => after(200, n)));
  ```
- Zapomniany `return` w `.then` — kolejne `.then` dostaje `undefined`.
- Nieobsłużone błędy — zawsze dodaj `.catch` lub `try…catch`.

### 3) Wariant timeoutu z kontrolą sygnału (AbortController – do omówienia)
```js
async function fetchZTimeoutem(url, ms = 1000) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  } finally {
    clearTimeout(timer);
  }
}
```

---

## Kryteria oceniania (propozycja)
- Poprawność działania (pełne przypadki, również błędne ścieżki) — 50%
- Styl i czytelność (nazwy, formatowanie, komentarze) — 20%
- Wykorzystanie właściwych wzorców (równoległość vs. sekwencja, `try/catch/finally`, `Promise.race`) — 20%
- Testy/wyjaśnienia w konsoli (`console.time`, opisy kolejności) — 10%

---

### Notatki do realizacji lekcji
- Zacznij od krótkiego pokazu kolejności logów (sync → `setTimeout` → `.then`).
- Uczniowie w parach robią Zad. 1–3; wspólna dyskusja zalet `async/await`.
- W Zad. 5 porównaj czasy sekwencyjne vs. równoległe (`console.time`).
- Na koniec: szybki quiz o mikro/makrozadaniach i pułapkach `forEach`.
