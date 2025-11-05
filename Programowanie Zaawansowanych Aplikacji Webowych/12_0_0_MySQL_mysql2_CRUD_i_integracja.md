# 📦 INF.04 — MySQL + Node.js (mysql2): instalacja, CRUD i integracja z projektem ról
**Zakres:** INF.04.7.1–7.3 • System logowania i kontrola dostępu • Etap: baza danych  
**Cel modułu:** 1) Zainstalować MySQL i opanować CRUD (SELECT/INSERT/UPDATE/DELETE) z `mysql2`. 2) Podpiąć DB pod wcześniejszy projekt Express (autoryzacja, role).

---

## 0) Wymagania
- Node.js ≥ 18
- MySQL 8.x (serwer + klient)
- Postman/cURL

---

## 1) Instalacja MySQL (skrót)
### Windows (MySQL Installer)
1. Pobierz **MySQL Installer (Community)** z mysql.com → wybierz *MySQL Server* i *MySQL Shell* / *Workbench* (opcjonalnie).
2. Ustaw `root` hasło, np. `rootpass` (zapisz!).
3. Uruchom usługę MySQL (zazwyczaj startuje automatycznie).

### macOS (Homebrew)
```bash
brew install mysql
brew services start mysql
mysql_secure_installation   # (opcjonalna konfiguracja bezpieczeństwa)
```

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl enable --now mysql
sudo mysql_secure_installation
```

**Sprawdzenie połączenia:**
```bash
mysql -u root -p
```

---

## 2) Przygotowanie bazy i użytkownika (SQL)
Zaloguj się do MySQL (jako `root`) i wykonaj:

```sql
-- Baza do ćwiczeń
CREATE DATABASE IF NOT EXISTS auth_demo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE auth_demo;

-- Użytkownik do aplikacji (zmień hasło!)
CREATE USER IF NOT EXISTS 'auth_user'@'%' IDENTIFIED BY 'StrongPass123!';
GRANT ALL PRIVILEGES ON auth_demo.* TO 'auth_user'@'%';
FLUSH PRIVILEGES;

-- Tabela użytkowników (na start bez hashy dla prostoty, potem dodamy bcrypt)
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','user','guest') NOT NULL DEFAULT 'guest',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dane przykładowe
INSERT INTO users (name, password, role) VALUES
('Jan',   'admin123', 'admin'),
('Ola',   'user123',  'user'),
('Tomek', 'guest123', 'guest');
```

---

## 3) Projekt Node.js (mysql2) — szybki start
```bash
mkdir mysql2-crud && cd mysql2-crud
npm init -y
npm i mysql2 express
```

**Struktura:**
```
mysql2-crud/
  server.js
  db.js
```

**db.js — połączenie (pool)**
```js
const mysql = require('mysql2/promise')

// Konfiguracja — dopasuj do swojego środowiska
const pool = mysql.createPool({
  host: 'localhost',
  user: 'auth_user',
  password: 'StrongPass123!',
  database: 'auth_demo',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

module.exports = { pool }
```

**server.js — CRUD na /users**
```js
const express = require('express')
const { pool } = require('./db')
const app = express()
app.use(express.json())

// READ (lista)
app.get('/users', async (req,res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, role, created_at FROM users ORDER BY id')
    res.json(rows)
  } catch (e) { res.status(500).json({ error: e.message }) }
})

// READ (po id)
app.get('/users/:id', async (req,res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, role, created_at FROM users WHERE id=?', [req.params.id])
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' })
    res.json(rows[0])
  } catch (e) { res.status(500).json({ error: e.message }) }
})

// CREATE
app.post('/users', async (req,res) => {
  const { name, password, role='guest' } = req.body || {}
  if (!name || !password) return res.status(400).json({ error: 'name and password required' })
  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, password, role) VALUES (?, ?, ?)',
      [name, password, role]
    )
    res.status(201).json({ id: result.insertId, name, role })
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'name already exists' })
    res.status(500).json({ error: e.message })
  }
})

// UPDATE (zmiana hasła/roli)
app.put('/users/:id', async (req,res) => {
  const { password, role } = req.body || {}
  if (!password && !role) return res.status(400).json({ error: 'nothing to update' })
  const fields = []
  const values = []
  if (password) { fields.push('password=?'); values.push(password) }
  if (role)     { fields.push('role=?');     values.push(role) }
  values.push(req.params.id)

  try {
    const [result] = await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE id=?`, values)
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  } catch (e) { res.status(500).json({ error: e.message }) }
})

// DELETE
app.delete('/users/:id', async (req,res) => {
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id=?', [req.params.id])
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Not found' })
    res.status(204).end()
  } catch (e) { res.status(500).json({ error: e.message }) }
})

app.listen(3001, () => console.log('CRUD: http://localhost:3001'))
```

**Testy cURL:**
```bash
# CREATE
curl -X POST http://localhost:3001/users -H "Content-Type: application/json" -d "{"name":"Anna","password":"haslo","role":"user"}"

# READ (lista)
curl http://localhost:3001/users

# READ (po id)
curl http://localhost:3001/users/1

# UPDATE
curl -X PUT http://localhost:3001/users/1 -H "Content-Type: application/json" -d "{"role":"admin"}"

# DELETE
curl -X DELETE http://localhost:3001/users/1 -i
```

> **Uwaga dydaktyczna:** w produkcji hasła **hashujemy** (np. `bcrypt`), a błędy i walidację rozbudowujemy.

---

## 4) Integracja z wcześniejszym projektem (role + auth) — podpięcie bazy
Teraz podepniemy DB do prostego projektu ról/autentykacji (z Etapów 1–3). Na razie bez sesji/JWT (to kolejny krok) — sprawdzamy dane użytkownika i jego rolę **z bazy**.

**Struktura (przykład):**
```
auth-project/
  server.js         # wcześniejszy Express z /login, /logout, /profile, /admin
  db.js             # połączenie do MySQL (pool)
```

**db.js** (jak wyżej — skopiuj z sekcji 3).

**server.js — modyfikacje:**
1) Zamiast tablicy `users` — pobieramy użytkownika z DB po `name`:
```js
const express = require('express')
const { pool } = require('./db')
const app = express()
app.use(express.json())

let loggedUser = null   // edukacyjnie (potem sesja/JWT)

app.post('/login', async (req,res) => {
  const { name, password } = req.body || {}
  if (!name || !password) return res.status(400).json({ error: 'name & password required' })

  try {
    const [rows] = await pool.query('SELECT id, name, password, role FROM users WHERE name=?', [name])
    if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' })
    const user = rows[0]

    // Edukacyjnie: proste porównanie (w produkcji: bcrypt.compare)
    if (user.password !== password) return res.status(401).json({ error: 'Invalid credentials' })

    loggedUser = { id: user.id, name: user.name, role: user.role }
    res.json({ msg: `Zalogowano jako ${user.name} (${user.role})` })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

function requireAuth(req, res, next) {
  if (loggedUser) return next()
  res.status(401).json({ error: 'Musisz się zalogować!' })
}

app.get('/profile', requireAuth, (req,res) => {
  res.json({ me: loggedUser })
})

app.get('/admin', requireAuth, (req,res) => {
  if (loggedUser.role !== 'admin') return res.status(403).json({ error: 'Brak uprawnień!' })
  res.json({ msg: `Panel admina — witaj, ${loggedUser.name}` })
})

app.post('/logout', (req,res) => { loggedUser = null; res.json({ msg: 'Wylogowano.' }) })

app.listen(3000, () => console.log('App: http://localhost:3000'))
```

**Testy (po wypełnieniu bazy z pkt 2):**
```bash
# Logowanie (Jan/admin123) -> baza
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d "{"name":"Jan","password":"admin123"}"

# Zasoby
curl http://localhost:3000/profile
curl http://localhost:3000/admin
```

---

## 5) Zadania dla ucznia
- **Z1 (obowiązkowe):** Uzupełnij CRUD: walidacja pól, komunikaty błędów, testy (skrypty cURL lub Postman Collection).
- **Z2 (obowiązkowe):** W projekcie ról/logowania podmień wszystkie miejsca odczytu użytkownika na **SELECT z MySQL** (brak tablicy w pamięci).
- **Z3 (na bdb):** Dodaj endpoint `/whoami` (pobiera dane z `loggedUser`) oraz `/users/:id/role` (zmiana roli w DB, UPDATE).
- **Z4 (na +):** Zaimplementuj wyszukiwanie po fragmencie nazwy: `GET /users?name=ol` → `LIKE '%ol%'` (SQL i zabezpieczenie parametrów).

---

## 6) Co dalej (kolejna lekcja)
- Hashowanie haseł (`bcrypt`) + migracja starych haseł.
- Sesje (`express-session`) **lub** JWT (`Authorization: Bearer`).
- Rozdzielenie warstw: *repozytoria* (zapytania SQL), *serwis* (logika), *routery* (Express).
- Dodanie ograniczeń ról w SQL (np. tabele `roles`, `user_roles`).

---

## 🔎 Diagnostyka i typowe błędy
- `ER_ACCESS_DENIED_ERROR` — złe hasło/ użytkownik nie ma uprawnień do DB.
- `ECONNREFUSED` — MySQL nie działa / zły host/port.
- `ER_DUP_ENTRY` — próba dodania istniejącej nazwy (naruszenie `UNIQUE`).
- Locale znaków: używaj `utf8mb4_unicode_ci` (pełne emoji i PL znaki).



## 🧠 Wyjaśnienie poleceń tworzących użytkownika MySQL

```sql
CREATE USER IF NOT EXISTS 'auth_user'@'%' IDENTIFIED BY 'StrongPass123!';
GRANT ALL PRIVILEGES ON auth_demo.* TO 'auth_user'@'%';
FLUSH PRIVILEGES;
```

### 🔹 1️⃣ CREATE USER IF NOT EXISTS …

Tworzy **nowego użytkownika MySQL** o nazwie `auth_user`, który może łączyć się z dowolnego hosta (`%`).

- `CREATE USER` — tworzy konto użytkownika w MySQL.  
- `IF NOT EXISTS` — zapobiega błędowi, jeśli użytkownik już istnieje.  
- `'auth_user'@'%'` — określa nazwę użytkownika (`auth_user`) i host, z którego może się logować.  
  - `'auth_user'@'localhost'` → logowanie tylko lokalnie,  
  - `'auth_user'@'%'` → logowanie z dowolnego miejsca (np. z aplikacji Node.js).  
- `IDENTIFIED BY 'StrongPass123!'` — ustawia hasło użytkownika.  

👉 **Efekt:** powstaje konto, które można wykorzystać w konfiguracji połączenia Node.js:

```js
const pool = mysql.createPool({
  host: 'localhost',
  user: 'auth_user',
  password: 'StrongPass123!',
  database: 'auth_demo'
})
```

---

### 🔹 2️⃣ GRANT ALL PRIVILEGES ON auth_demo.* TO …

Nadaje użytkownikowi **pełne uprawnienia (privileges)** do pracy z bazą `auth_demo`.

- `GRANT ALL PRIVILEGES` — pozwala na wszystkie operacje:  
  `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `CREATE`, `DROP` itp.  
- `ON auth_demo.*` — oznacza: „na wszystkich tabelach (`*`) w bazie `auth_demo`”.  
- `TO 'auth_user'@'%'` — wskazuje, komu nadajemy te prawa.  

👉 **Efekt:** użytkownik `auth_user` ma pełen dostęp do bazy `auth_demo`, ale **nie** do innych baz w systemie MySQL.

---

### 🔹 3️⃣ FLUSH PRIVILEGES;

To polecenie **odświeża prawa dostępu** w MySQL.

- Po wykonaniu `CREATE USER` lub `GRANT` MySQL zapisuje dane w tabelach systemowych.  
- `FLUSH PRIVILEGES` wymusza ponowne wczytanie tych danych bez restartu serwera.  

👉 **Efekt:** nowe konto i uprawnienia są aktywne **natychmiast**.

---

### 🧩 Podsumowanie

| Polecenie | Co robi | Efekt |
|------------|----------|--------|
| `CREATE USER` | Tworzy konto użytkownika | Konto `auth_user` z hasłem |
| `GRANT ALL PRIVILEGES` | Nadaje prawa do bazy | Pełen dostęp do `auth_demo` |
| `FLUSH PRIVILEGES` | Odświeża prawa w MySQL | Aktywuje uprawnienia bez restartu |

---

💡 **W skrócie:**  
Tworzymy użytkownika `auth_user`, nadajemy mu pełne prawa do bazy `auth_demo`, a następnie aktywujemy te prawa, aby można było logować się z poziomu Node.js i wykonywać operacje CRUD.
