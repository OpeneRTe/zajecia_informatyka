# Obsługa błędów i logowanie w Express (INF.04.7.3(1))

## Cel
Uczeń potrafi wykryć i zapisać błędy aplikacji Express do pliku logów.

---

## 🧠 Najważniejsze informacje

### 1️⃣ Obsługa błędów
W Express błędy obsługujemy za pomocą specjalnego **middleware** z czterema parametrami:
```js
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: 'Błąd serwera' });
});
```
Każdy błąd przekazany przez `next(err)` lub `throw new Error()` trafi tutaj.

### 2️⃣ Zapisywanie błędów do pliku
Do logowania błędów używamy modułu **winston**.

#### logger.js
```js
const { createLogger, format, transports } = require('winston');
const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [ new transports.File({ filename: 'logs/error.log', level: 'error' }) ]
});
module.exports = logger;
```

#### w server.js
```js
const logger = require('./logger');

app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.url} - ${err.message}`);
  res.status(500).json({ error: 'Wewnętrzny błąd serwera' });
});
```

Każdy błąd zostanie zapisany w pliku **logs/error.log** z datą, statusem i opisem.

### 3️⃣ Morgan
Morgan służy do logowania wszystkich żądań HTTP (np. GET, POST).  
Dzięki niemu powstaje plik `logs/access.log` z historią wywołań:
```js
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));
```

---

## 💻 Zadania praktyczne
1. Utwórz projekt Express i zainstaluj:
   ```bash
   npm install express winston morgan
   ```
2. Dodaj dwa endpointy:
   - `/ok` — zwraca `{"status": "OK"}`
   - `/error` — rzuca błąd `throw new Error('Coś poszło nie tak!')`
3. Utwórz `logger.js` jak powyżej.
4. W `server.js` dodaj middleware błędów, który zapisuje błąd do pliku przez `logger.error()`.
5. Uruchom serwer i sprawdź plik `logs/error.log` po wejściu na `/error`.

---

## 🧩 Do zapamiętania
- Middleware błędu zawsze ma **cztery argumenty** (`err, req, res, next`).
- `next(err)` przekazuje błąd dalej do handlera.
- `winston` → błędy aplikacji, `morgan` → żądania HTTP.
- Pliki logów pomagają śledzić problemy w działającej aplikacji.