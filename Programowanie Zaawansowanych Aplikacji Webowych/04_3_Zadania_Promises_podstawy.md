# Zadania — Promises (poziom podstawowy)

## Zadanie 1 — Mój pierwszy Promise
Napisz Promise, który po **2000 ms** zwróci napis `"Hello Promise"`.  
Wypisz wynik w konsoli metodą `.then()`.

---

## Zadanie 2 — Obsługa błędu (losowo)
Napisz Promise, który w **50%** przypadków:
- rozwiązuje się wartością `"Sukces"`,
- w **50%** odrzuca się błędem `"Losowy błąd"`.
Obsłuż oba przypadki w `.then()` i `.catch()`.

---

## Zadanie 3 — Łańcuch działań
Zacznij od wartości `5` i w kolejnych `.then()`:
- dodaj `3`,
- pomnóż przez `2`,
- wypisz wynik (oczekiwany: `16`).

---

## Zadanie 4 — Kolejność zdarzeń
Za pomocą `setTimeout` i Promises pokaż kolejność logów:
1) `"Start"`
2) `"Koniec"`
3) `"Wynik z Promise"`

Podpowiedź: `console.log("Start"); Promise.resolve().then(...); console.log("Koniec");`

---

## Zadanie 5 — Równoległe Promisy (proste)
Utwórz trzy Promisy, które po **300 ms**, **600 ms** i **900 ms** zwracają odpowiednio `"A"`, `"B"`, `"C"`.  
Za pomocą `Promise.all` wypisz tablicę wyników.
