# Wykład — Asynchroniczność w JavaScript: Promises i async/await

## 1. Dlaczego asynchroniczność?
- JavaScript działa w jednym wątku (**single-thread**).
- Długie operacje (np. pobieranie danych z serwera) mogłyby blokować program.
- Asynchroniczność umożliwia:
  - uruchamianie zadań w tle,
  - kontynuowanie pracy programu,
  - reakcję na wynik w przyszłości.

Przykład:
```js
console.log("Start");
setTimeout(() => console.log("Minęły 2 sekundy"), 2000);
console.log("Koniec");
// Kolejność: Start → Koniec → (po 2s) Minęły 2 sekundy
```

---

## 2. Promise (Obietnica)
- Obiekt reprezentujący wynik, który pojawi się w przyszłości.
- **Stany:**
  - pending (oczekiwanie),
  - fulfilled (zrealizowany — `resolve`),
  - rejected (odrzucony — `reject`).

Tworzenie Promise:
```js
const obietnica = new Promise((resolve, reject) => {
  const ok = true;
  if (ok) resolve("Udało się!");
  else reject("Błąd!");
});
```

Obsługa Promise:
```js
obietnica
  .then(wynik => console.log("OK:", wynik))
  .catch(err => console.log("Błąd:", err))
  .finally(() => console.log("Koniec"));
```

---

## 3. async/await
- `async` oznacza, że funkcja zawsze zwraca **Promise**.
- `await` wstrzymuje wykonanie **wewnątrz funkcji async** do czasu rozstrzygnięcia Promise.

Przykład:
```js
async function pobierzDane() {
  try {
    let res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    let dane = await res.json();
    console.log(dane);
  } catch (err) {
    console.log("Błąd:", err);
  }
}
pobierzDane();
```

---

## 4. Obsługa wyjątków
- W `.then().catch()` — błędy łapiemy `.catch`.
- W `async/await` — błędy łapiemy `try…catch`.
- `finally` uruchamia się zawsze.

---

## 5. async/await — dogłębniej
- `async` owija wynik w Promise → `return 5` w async = `Promise.resolve(5)`.
- `await` zatrzymuje tylko bieżącą funkcję `async`, nie cały program.
- **Sekwencja:**
  ```js
  await A();
  await B(); // B wykona się dopiero po A
  ```
- **Równoległość:**
  ```js
  const a = A();
  const b = B();
  const [wynikA, wynikB] = await Promise.all([a, b]);
  ```
- **Pułapki:**
  - `await` w `forEach` → nie działa, trzeba użyć `for...of` lub `Promise.all`.

---

## 6. Podsumowanie
- Promise to obietnica wyniku w przyszłości.
- async/await ułatwia pisanie kodu asynchronicznego w stylu synchronicznym.
- Obsługa błędów: `.catch` (dla Promise) lub `try…catch` (dla async/await).
- Do wielu zadań równocześnie używaj `Promise.all`, a do kontroli czasu — `Promise.race`.
