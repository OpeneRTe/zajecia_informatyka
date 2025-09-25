# Rozwiązania — Async / Await (poziom podstawowy)

## Zadanie 1 — Podstawowe `await`
```js
function po(ms, val) {
  return new Promise(res => setTimeout(() => res(val), ms));
}

async function run() {
  const wynik = await po(1000, "Gotowe!");
  console.log(wynik);
}
run();
```

---

## Zadanie 2 — Obsługa błędu
```js
function blad() {
  return new Promise((_, rej) => setTimeout(() => rej(new Error("Ups")), 500));
}

async function run() {
  try {
    await blad();
  } catch (e) {
    console.log("Złapano błąd:", e.message); // "Ups"
  }
}
run();
```

---

## Zadanie 3 — Sekwencja (kolejno)
```js
function po(ms, val) {
  return new Promise(res => setTimeout(() => res(val), ms));
}

async function sekwencja() {
  const a = await po(1000, "A");
  console.log(a);
  const b = await po(2000, "B");
  console.log(b);
}
sekwencja(); // ~3s
```

---

## Zadanie 4 — Równoległość (`Promise.all`)
```js
function po(ms, val) {
  return new Promise(res => setTimeout(() => res(val), ms));
}

async function rownolegle() {
  const [a, b] = await Promise.all([po(1000, "A"), po(2000, "B")]);
  console.log(a, b); // "A" "B"
}
rownolegle(); // ~2s
```

---

## Zadanie 5 — Timeout z `Promise.race`
```js
function po(ms, val) {
  return new Promise(res => setTimeout(() => res(val), ms));
}

function timeout(ms) {
  return new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout")), ms));
}

async function pobierzZTimeoutem(promise, ms) {
  return Promise.race([promise, timeout(ms)]);
}

// Testy:
pobierzZTimeoutem(po(1500, "OK"), 1000)
  .then(console.log)
  .catch(e => console.error(e.message)); // Timeout

pobierzZTimeoutem(po(800, "OK"), 1000)
  .then(console.log) // OK
  .catch(e => console.error(e.message));
```
