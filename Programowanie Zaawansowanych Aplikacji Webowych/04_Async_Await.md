# Wykład — Async / Await w JavaScript

## 1. async
- Funkcja oznaczona `async` **zawsze zwraca Promise**.
- `return 5` → w rzeczywistości `Promise.resolve(5)`.
- `throw new Error("Błąd")` → w rzeczywistości `Promise.reject(...)`.

Przykład:
```js
async function f() {
  return 42;
}
f().then(x => console.log(x)); // 42
```

---

## 2. await
- Służy do „pauzowania” wewnątrz funkcji `async`.
- `await` czeka na rozstrzygnięcie Promise:
  - jeśli **fulfilled** → zwraca wartość,
  - jeśli **rejected** → rzuca wyjątek.

Przykład:
```js
function obietnicaSukces() {
  return new Promise(resolve => setTimeout(() => resolve("Gotowe!"), 1000));
}

async function test() {
  console.log("Start");
  const wynik = await obietnicaSukces();
  console.log("Wynik:", wynik);
  console.log("Koniec");
}
test();
```

---

## 3. Obsługa błędów
- W `async/await` używamy `try…catch`.
- `finally` działa niezależnie od sukcesu czy błędu.

Przykład:
```js
function obietnicaBlad() {
  return new Promise((_, reject) => setTimeout(() => reject(new Error("Błąd!")), 1000));
}

async function test() {
  try {
    const wynik = await obietnicaBlad();
    console.log("Wynik:", wynik);
  } catch (err) {
    console.error("Złapany błąd:", err.message);
  } finally {
    console.log("Sprzątanie...");
  }
}
test();
```

---

## 4. Sekwencja vs. równoległość
- Sekwencja (zadania jedno po drugim):
```js
async function sekwencja() {
  const a = await obietnicaSukces();
  const b = await obietnicaSukces();
  console.log(a, b);
}
// czas ~2s
```

- Równoległość (zadania od razu):
```js
async function rownolegle() {
  const a = obietnicaSukces();
  const b = obietnicaSukces();
  const [ra, rb] = await Promise.all([a, b]);
  console.log(ra, rb);
}
// czas ~1s
```

---

## 5. Typowe pułapki
- **Await w forEach** → nie działa jak oczekujesz.
```js
// Źle
[1,2,3].forEach(async n => {
  await obietnicaSukces();
  console.log("Gotowe:", n);
});

// Dobrze
for (const n of [1,2,3]) {
  await obietnicaSukces();
  console.log("Gotowe:", n);
}
```

---

## 6. Przykład praktyczny: pobieranie z API
```js
async function pobierzPost(id) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) throw new Error("Błąd HTTP " + res.status);
    const dane = await res.json();
    console.log("Tytuł:", dane.title);
  } catch (err) {
    console.error("Nie udało się pobrać:", err.message);
  }
}
pobierzPost(1);
```

---

## 7. Podsumowanie
- `async/await` upraszcza zapis asynchronicznego kodu.
- Łatwiejsza obsługa błędów (`try…catch`) niż w `.then().catch()`.
- Do wielu zadań równocześnie → `Promise.all`, do limitowania czasu → `Promise.race`.
