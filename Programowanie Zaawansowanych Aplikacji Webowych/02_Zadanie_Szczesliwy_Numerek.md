# Zadanie: „Szczęśliwy numerek” – API w Express

## 🎯 Cel
Stwórz endpoint API w Express, który zwraca **obiekt JSON** z losowym:
- **numerem z dziennika** w zakresie `1–32`,
- **klasą** w zakresie `1–4`,
- znacznikiem czasu wygenerowania odpowiedzi.

---

## 📋 Wymagania funkcjonalne
- Metoda: `GET`
- Ścieżka: `/api/szczesliwy`
- Odpowiedź: `application/json`
- Zakresy losowania:
  - `szczesliwyNumer`: liczba całkowita z zakresu `1–32`
  - `klasa`: liczba całkowita z zakresu `1–4`
- Struktura odpowiedzi (schemat):
  ```json
  {
    "szczesliwyNumer": <int 1-32>,
    "klasa": <int 1-4>,
    "generatedAt": "<ISO 8601 timestamp>"
  }
  ```

---

## 📖 Przykładowa odpowiedź
```json
{
  "szczesliwyNumer": 17,
  "klasa": 3,
  "generatedAt": "2025-09-11T09:45:32.120Z"
}
```

---

## 🛠️ Krok po kroku (dla ucznia)
1. Utwórz trasę `GET /api/szczesliwy`.
2. W handlerze:
   - Wylosuj dwie liczby całkowite w wymaganych zakresach.
   - Złóż obiekt zgodny ze schematem.
   - Zwróć go przez `res.json(...)`.
3. Uruchom serwer i przetestuj:
   - w przeglądarce: `http://localhost:3000/api/szczesliwy`
   - lub przez curl:
     ```bash
     curl http://localhost:3000/api/szczesliwy
     ```

---

## ✅ Kryteria oceny (checklista)
- [ ] Endpoint działa pod `/api/szczesliwy` i zwraca status `200`.
- [ ] Zwracany jest **JSON** dokładnie w wymaganym kształcie.
- [ ] `szczesliwyNumer` ∈ `[1, 32]`, `klasa` ∈ `[1, 4]`.
- [ ] `generatedAt` to poprawny znacznik czasu w formacie ISO.
- [ ] Brak błędów w konsoli serwera przy wielokrotnych wywołaniach.

---

## 🌟 Rozszerzenia (dla chętnych)
- [ ] Dodaj parametry zapytania do zmiany zakresów, np. `?maxNumer=28&maxKlasa=5`.
- [ ] Dodaj prosty middleware logujący metodę i ścieżkę każdego żądania.
- [ ] Zabezpiecz zakresy (walidacja: wartości minimalne to 1, maksymalne to sensowne limity).
