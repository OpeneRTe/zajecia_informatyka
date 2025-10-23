# Rejestracja i logowanie użytkowników (bcrypt) — wersja z Postmanem
**Podstawa:** INF.04.7.3(3,5)  
**Założenia:** brak bazy danych (tablica w pamięci), testy w Postmanie.

---

## 1. Szybki start (projekt i serwer)
```bash
mkdir auth-bcrypt && cd auth-bcrypt
npm init -y
npm i express bcrypt
```

Utwórz plik `server.js` (wersja startowa - bez bazy):
```js
const express = require('express');
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());

// "Pseudo-baza" - dane w RAM (resetują się po restarcie serwera)
const users = []; // element: { email, passHash }

// Rejestracja
app.post('/register', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Podaj email i hasło' });
  }

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(409).json({ error: 'Użytkownik już istnieje' });
  }

  const passHash = await bcrypt.hash(password, 10); // 10 = rounds (koszt obliczeń)
  users.push({ email, passHash });
  return res.status(201).json({ message: 'Użytkownik zarejestrowany' });
});

// Logowanie
app.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ error: 'Nie ma takiego użytkownika' });
  }

  const ok = await bcrypt.compare(password, user.passHash);
  if (!ok) {
    return res.status(403).json({ error: 'Nieprawidłowe hasło' });
  }

  return res.json({ message: 'Zalogowano pomyślnie' });
});

// (Pomocnicze) Info
app.get('/health', (req, res) => {
  res.json({ usersCount: users.length });
});

app.listen(3000, () => console.log('Serwer działa na http://localhost:3000'));
```

Uruchom serwer:
```bash
node server.js
```

---

## 2. Testy w Postmanie (krok po kroku)

### 2.1 Rejestracja - sukces
- Method: POST
- URL: http://localhost:3000/register
- Headers: Content-Type: application/json
- Body (raw JSON):
```json
{
  "email": "user@zst.edu",
  "password": "tajne123"
}
```
- Expect: 201 Created
```json
{ "message": "Użytkownik zarejestrowany" }
```

### 2.2 Rejestracja - duplikat email
- Wyślij ten sam request drugi raz.
- Expect: 409 Conflict
```json
{ "error": "Użytkownik już istnieje" }
```

### 2.3 Logowanie - sukces
- Method: POST
- URL: http://localhost:3000/login
- Body:
```json
{
  "email": "user@zst.edu",
  "password": "tajne123"
}
```
- Expect: 200 OK
```json
{ "message": "Zalogowano pomyślnie" }
```

### 2.4 Logowanie - błędne hasło
- Body:
```json
{
  "email": "user@zst.edu",
  "password": "zlehaslo"
}
```
- Expect: 403 Forbidden
```json
{ "error": "Nieprawidłowe hasło" }
```

### 2.5 Logowanie - nieistniejący użytkownik
- Body:
```json
{
  "email": "ghost@zst.edu",
  "password": "tajne123"
}
```
- Expect: 400 Bad Request
```json
{ "error": "Nie ma takiego użytkownika" }
```

### 2.6 Health check (pomocniczo)
- Method: GET
- URL: http://localhost:3000/health
- Expect: 200 OK
```json
{ "usersCount": 1 }
```
(liczba zależna od tego, ile kont zarejestrowałeś)

---

## 3. Zadania "dopisz do kodu" (bez bazy)

W każdym zadaniu przetestuj efekt w Postmanie i opisz krótko, jakie kody HTTP zwraca serwer w scenariuszach: sukces, błąd walidacji, konflikt itp.

- Zadanie A - walidacja danych wejściowych
  - W /register: email niepusty i zawiera "@"; hasło min. 8 znaków, w tym litera i cyfra.
  - Zwracaj 400 Bad Request oraz komunikat, które pole jest błędne.
  - Podpowiedź: przygotuj funkcje isValidEmail, isValidPassword.

- Zadanie B - kanonizacja adresu e-mail
  - Przed zapisem i porównaniami zrób trim i toLowerCase().
  - Udowodnij w Postmanie, że "User@ZST.edu" i " user@zst.edu " to ten sam email.
  - Dla duplikatu - 409 Conflict.

- Zadanie C - konfigurowalne "rounds"
  - Użyj zmiennej BCRYPT_ROUNDS z .env (lub process.env) z domyślną wartością 10.
  - Zmierz czas rejestracji dla 8, 10, 12 - zapisz obserwacje.

- Zadanie D - zmiana hasła (PATCH /password)
  - Endpoint: PATCH /password z body:
    {
      "email": "user@zst.edu",
      "oldPassword": "tajne123",
      "newPassword": "NoweHaslo1"
    }
  - Weryfikuj stare hasło (bcrypt.compare); nowe musi przejść walidację (jak w Zadaniu A).
  - Kody: 200 OK (sukces), 400 Bad Request (błędne dane), 403 Forbidden (stare hasło niepoprawne), 404 Not Found (użytkownik nie istnieje).

- Zadanie E - limiter prób logowania (in-memory)
  - Zliczaj nieudane logowania per email/IP (np. w Map).
  - Po 5 błędnych próbach w 15 minutach blokuj logowanie na 10 minut.
  - Kody: 429 Too Many Requests w okresie blokady; nagłówek Retry-After w sekundach.

- Zadanie F - prosta obserwowalność
  - Dodaj middleware loggera żądań (metoda, ścieżka, kod statusu, czas wykonania w ms).
  - Wyświetlaj w konsoli; upewnij się, że nigdy nie logujesz haseł.

- Zadanie G - reset stanu na potrzeby ćwiczeń
  - Dodaj tylko dla środowiska developerskiego endpoint DELETE /__reset,
    który czyści tablicę users i licznik nieudanych logowań.
  - Zabezpiecz go prostym sekretem w nagłówku X-Dev-Secret (wartość z .env).
  - Kody: 204 No Content (sukces), 403 Forbidden (zły sekret).

---

## 4. Pytania kontrolne
- Co to jest hash i dlaczego nie można z niego odzyskać hasła?
- Jaka jest rola "salt" w bcrypt? Czy musisz ją przechowywać osobno?
- Jak "rounds" wpływa na bezpieczeństwo i wydajność?
- Dlaczego po restarcie serwera znikają zarejestrowani użytkownicy?
- Po co standaryzować (kanonizować) email?

---

## 5. Checklista zaliczeniowa
- [ ] Rejestracja i logowanie działają (201/200/400/403/409).
- [ ] Walidacja wejścia i kanonizacja email.
- [ ] Rounds z konfiguracji środowiskowej.
- [ ] Zmiana hasła (PATCH /password) z poprawnymi statusami.
- [ ] Limiter prób logowania i blokada (429 + Retry-After).
- [ ] Logger żądań (bez wycieków wrażliwych danych).
- [ ] (Dev) Reset stanu z nagłówkiem sekretnym.
