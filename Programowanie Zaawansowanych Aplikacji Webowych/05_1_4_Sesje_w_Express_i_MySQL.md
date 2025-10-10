# Sesje w Express.js -- jak i gdzie są przechowywane

## 🧠 Czym jest sesja

Sesja to mechanizm pozwalający serwerowi zapamiętać dane użytkownika
między kolejnymi żądaniami HTTP. Użytkownik dostaje unikalny
identyfikator (SID), zapisany w **ciasteczku** (`connect.sid`), a dane
sesji są trzymane **po stronie serwera**.

------------------------------------------------------------------------

## 🔍 Gdzie Express przechowuje sesje

Po użyciu:

``` js
const session = require('express-session');
app.use(session({
  secret: 'tajny_klucz',
  resave: false,
  saveUninitialized: false
}));
```

Express (a dokładniej `express-session`) korzysta domyślnie z
**MemoryStore**.

### 🧩 MemoryStore

-   dane sesji są trzymane w pamięci RAM procesu Node.js,
-   sesje **znikają po restarcie serwera**,
-   działa tylko w jednym procesie,
-   **nie nadaje się do produkcji**, ale jest dobra do nauki.

------------------------------------------------------------------------

## 📦 Popularne sposoby przechowywania sesji

  ------------------------------------------------------------------------
  Typ                Pakiet                          Opis
  ------------------ ------------------------------- ---------------------
  🧠 W pamięci       `MemoryStore`                   tylko do nauki i
  (domyślnie)                                        testów

  💾 Redis           `connect-redis`                 bardzo szybki,
                                                     używany w dużych
                                                     aplikacjach

  🗄️ MongoDB         `connect-mongo`                 trzyma sesje w bazie
                                                     Mongo

  📁 Pliki           `session-file-store`            zapisuje sesje jako
                                                     pliki JSON

  💽                 `express-mysql-session`,        sesje w bazie SQL
  MySQL/PostgreSQL   `connect-pg-simple`             
  ------------------------------------------------------------------------

------------------------------------------------------------------------

## 🔧 Jak to działa technicznie

1.  Użytkownik loguje się i serwer tworzy obiekt `req.session`.
2.  Express zapisuje dane sesji w wybranym magazynie (Memory, plik,
    Redis, SQL...).
3.  Do przeglądarki wysyła ciasteczko `connect.sid` z unikalnym
    identyfikatorem.
4.  Przy każdym żądaniu przeglądarka wysyła `connect.sid`, a Express
    odnajduje dane sesji.

------------------------------------------------------------------------

## 💾 Przykład zapisu sesji do MySQL

Instalacja potrzebnych pakietów:

``` bash
npm install express express-session express-mysql-session
```

Kod przykładowy:

``` js
const express = require('express');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const app = express();

// Konfiguracja połączenia z MySQL
const options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'sesje_test'
};

// Tworzymy store dla sesji
const sessionStore = new MySQLStore(options);

// Middleware sesji
app.use(session({
  key: 'session_cookie_name',
  secret: 'tajny_klucz',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 1000, // 10 minut
    httpOnly: true
  }
}));

app.get('/', (req, res) => {
  if (!req.session.views) req.session.views = 0;
  req.session.views++;
  res.send(`Odwiedziłeś tę stronę ${req.session.views} razy`);
});

app.listen(3000, () => console.log('Serwer działa na http://localhost:3000'));
```

Po uruchomieniu serwera `express-mysql-session` automatycznie utworzy w
bazie tabelę **`sessions`**, gdzie przechowywane będą dane sesji w
postaci JSON.

------------------------------------------------------------------------

## 📂 Podgląd przykładowej tabeli `sessions` w MySQL

  -------------------------------------------------------------------------------------------------------------------------
  session_id                      expires                  data
  ------------------------------- ------------------------ ----------------------------------------------------------------
  abc123xyz                       1723200000               {"cookie":{"originalMaxAge":600000,"httpOnly":true},"views":3}

  -------------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------

## 🧰 Podsumowanie

  Magazyn       Trwałość                Zastosowanie
  ------------- ----------------------- ------------------------------------
  MemoryStore   ❌ po restarcie znika   nauka, testy
  FileStore     ✅ pliki lokalne        małe aplikacje lokalne
  MySQLStore    ✅ baza danych          aplikacje wielosesyjne, edukacyjne
  RedisStore    ✅ bardzo szybki        aplikacje produkcyjne, skalowalne
