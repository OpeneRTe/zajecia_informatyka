# Wykład — Asynchroniczność w JavaScript

## 1. Dlaczego asynchroniczność?
- JavaScript działa w jednym wątku (**single-thread**).
- Długie operacje mogłyby zatrzymać cały program (np. pobieranie pliku, zapytanie do bazy).
- Rozwiązanie: **asynchroniczność** → zadania mogą być uruchamiane w tle, a program działa dalej.

Przykład:
```js
console.log("Start");
setTimeout(() => console.log("Po 2 sekundach"), 2000);
console.log("Koniec");
// Kolejność: Start → Koniec → (po 2s) Po 2 sekundach
```

---

## 2. Event Loop (pętla zdarzeń)
- JavaScript ma **kolejkę zadań**:
  - **makrozadania** (np. setTimeout, setInterval, I/O),
  - **mikrozadania** (np. Promises `.then()`).
- Mikrozadania są obsługiwane **wcześniej** niż makrozadania.

---

## 3. Promise — podstawy
- Obiekt reprezentujący wynik w przyszłości.
- Stany:
  - *pending* (oczekiwanie),
  - *fulfilled* (zrealizowany — resolve),
  - *rejected* (odrzucony — reject).

Tworzenie Promise:
```js
const obietnica = new Promise((resolve, reject) => {
  const sukces = true;
  if (sukces) resolve("OK");
  else reject("Błąd");
});
```

Obsługa Promise:
```js
obietnica
  .then(wynik => console.log("Sukces:", wynik))
  .catch(err => console.log("Błąd:", err))
  .finally(() => console.log("Zawsze na końcu"));
```

---

## 4. Łańcuchy Promise
- `.then()` może zwrócić nową wartość → przechodzi do kolejnego `.then()`.
- Błąd w dowolnym `.then()` → przechodzi do najbliższego `.catch()`.

Przykład:
```js
Promise.resolve(5)
  .then(x => x + 10)
  .then(x => x * 2)
  .then(x => console.log("Wynik:", x)) // 30
  .catch(err => console.error("Błąd:", err));
```

---

## 5. Wady i zalety
**Zalety:** obsługa zadań w tle, większa responsywność aplikacji.  
**Wady:** złożoność obsługi błędów, łatwo tworzyć „piekło callbacków” lub trudne do czytania łańcuchy `.then`.
