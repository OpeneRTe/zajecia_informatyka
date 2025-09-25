# Zadania — Async / Await (poziom podstawowy)

## Zadanie 1 — Podstawowe `await`
Napisz funkcję `async`, która:
- czeka **1000 ms** (wykorzystaj Promise z `setTimeout`),
- zwraca `"Gotowe!"`,
- wypisz wynik w konsoli.

---

## Zadanie 2 — Obsługa błędu
Stwórz funkcję `async`, która wywołuje Promise odrzucany błędem `"Ups"`.  
Obsłuż błąd za pomocą `try…catch` i wypisz `"Złapano błąd: Ups"`.

---

## Zadanie 3 — Sekwencja (kolejno)
Napisz dwie funkcje zwracające Promise:
- `po(ms, val)` — rozwiązuje się po `ms` z wartością `val`,
- użyj `await`, by wywołać `po(1000,"A")`, potem `po(2000,"B")` i wypisz kolejno `"A"` i `"B"`.
Całość trwa około **3 sekund**.

---

## Zadanie 4 — Równoległość (`Promise.all`)
Użyj tej samej funkcji `po(ms, val)` i uruchom równocześnie:
- `po(1000,"A")` i `po(2000,"B")`,
- wypisz wyniki po `await Promise.all([...])` (czas ~**2 s**).

---

## Zadanie 5 — Timeout z `Promise.race`
Napisz funkcję `pobierzZTimeoutem(promise, ms)`, która:
- zwraca wynik `promise`, jeśli zakończy się na czas,
- albo odrzuca się błędem `"Timeout"` po `ms` milisekundach,
- przetestuj na `po(1500,"OK")` z limitem **1000 ms** (powinien być `"Timeout"`).
