# Rozwiązania — Promises (poziom podstawowy)

## Zadanie 1 — Mój pierwszy Promise
```js
const p = new Promise(resolve => {
  setTimeout(() => resolve("Hello Promise"), 2000);
});

p.then(wynik => console.log(wynik));
```

---

## Zadanie 2 — Obsługa błędu (losowo)
```js
const losowy = new Promise((resolve, reject) => {
  setTimeout(() => {
    Math.random() < 0.5 ? resolve("Sukces") : reject(new Error("Losowy błąd"));
  }, 500);
});

losowy
  .then(w => console.log("OK:", w))
  .catch(e => console.error("Błąd:", e.message));
```

---

## Zadanie 3 — Łańcuch działań
```js
Promise.resolve(5)
  .then(x => x + 3)   // 8
  .then(x => x * 2)   // 16
  .then(x => console.log("Wynik:", x));
```

---

## Zadanie 4 — Kolejność zdarzeń
```js
console.log("Start");

Promise.resolve().then(() => {
  console.log("Wynik z Promise");
});

console.log("Koniec");

// Oczekiwana kolejność:
// Start
// Koniec
// Wynik z Promise
```

---

## Zadanie 5 — Równoległe Promisy (proste)
```js
const A = new Promise(res => setTimeout(() => res("A"), 300));
const B = new Promise(res => setTimeout(() => res("B"), 600));
const C = new Promise(res => setTimeout(() => res("C"), 900));

Promise.all([A, B, C]).then(wyniki => console.log(wyniki)); // ["A","B","C"]
```
