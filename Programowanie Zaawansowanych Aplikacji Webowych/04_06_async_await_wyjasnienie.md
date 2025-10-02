# Async / Await w JavaScript

## Podstawy
Słowa kluczowe `async` i `await` ułatwiają pracę z Promise, pozwalając pisać kod asynchroniczny w stylu sekwencyjnym.

- `async` przed funkcją oznacza, że zawsze zwraca ona `Promise`.
- `await` można użyć TYLKO wewnątrz funkcji oznaczonej jako `async`.
  Zatrzymuje wykonanie funkcji do momentu zakończenia `Promise`.

## Przykład – sukces
```js
function pobierzDane() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Dane pobrane"), 2000);
  });
}

async function uruchom() {
  console.log("Start");
  const wynik = await pobierzDane();  // czeka na resolve
  console.log("Wynik:", wynik);
}

uruchom();
```

### Przebieg
1. Funkcja `uruchom` jest `async` → zwraca `Promise`.
2. `await pobierzDane()` wstrzymuje działanie funkcji do czasu, aż Promise zakończy się sukcesem.
3. Po 2s `resolve("Dane pobrane")` → wynik ląduje w zmiennej `wynik`.
4. Konsola:
```
Start
Wynik: Dane pobrane
```

---

## Przykład – błąd (reject)
```js
function pobierzDane() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Błąd pobierania")), 2000);
  });
}

async function uruchom() {
  try {
    const wynik = await pobierzDane();
    console.log("Wynik:", wynik);
  } catch (err) {
    console.log("Wystąpił błąd:", err.message);
  }
}

uruchom();
```

### Przebieg
- Gdy `reject(new Error("Błąd pobierania"))` zostanie wywołany, Promise przechodzi w stan **rejected**.
- `await` „rzuca” wyjątek, dlatego musi być obsłużony w `try...catch`.

---

## Podsumowanie
- `async` sprawia, że funkcja ZAWSZE zwraca Promise.
- `await` zatrzymuje działanie wewnątrz funkcji `async` do czasu rozstrzygnięcia Promise.
- Błędy obsługujemy za pomocą `try...catch`.
