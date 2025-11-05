# 🧑‍💻 Mini projekt: Autoryzacja i role w Express.js  
**Kwalifikacja:** INF.04.7.1–7.3  
**Temat:** Middleware autoryzacyjny, role użytkowników, mini-system logowania (bez bazy danych)  
**Cel:** Zrozumienie zasad autoryzacji, ról i prostego logowania przed połączeniem z MySQL (`mysql2`)

---

## 🎯 Efekty kształcenia
Uczeń:
- rozumie różnicę **autentykacja** (logowanie) vs **autoryzacja** (uprawnienia),
- potrafi wprowadzić **role użytkowników** (`admin`, `user`, `guest`),
- potrafi napisać prosty **middleware autoryzacyjny**,
- potrafi stworzyć prosty **system logowania** w Express.js.

---

## 🧩 Etap 1 — Najprostsza autoryzacja i rola `admin`

**Cel:** Zrozumieć, czym jest rola użytkownika i jak działa warunek `if (role === 'admin')`.

**Plik:** `server.js`

```js
const express = require("express")
const app = express()
app.use(express.json())

// Prosta "baza" użytkowników
const users = [
  { id: 1, name: "Jan", role: "admin" },
  { id: 2, name: "Ola", role: "user" }
]

// Logowanie (bez hasła)
app.post("/login", (req, res) => {
  const { name } = req.body
  const user = users.find(u => u.name === name)
  if (!user) return res.status(401).json({ error: "Nie ma takiego użytkownika!" })
  res.json({ msg: `Witaj ${user.name}! Twoja rola to: ${user.role}` })
})

// Endpoint tylko dla admina
app.post("/admin", (req, res) => {
  const { name } = req.body
  const user = users.find(u => u.name === name)
  if (!user) return res.status(401).json({ error: "Musisz się zalogować!" })

  if (user.role === "admin") {
    res.json({ msg: `Witaj ${user.name}! Masz dostęp do panelu administratora.` })
  } else {
    res.status(403).json({ error: "Brak uprawnień – nie jesteś administratorem." })
  }
})

app.listen(3000, () => console.log("Serwer działa na http://localhost:3000"))
```

### 🧪 Testy (terminal / Postman)
```bash
# Jan (admin)
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d "{"name":"Jan"}"
curl -X POST http://localhost:3000/admin -H "Content-Type: application/json" -d "{"name":"Jan"}"

# Ola (user)
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d "{"name":"Ola"}"
curl -X POST http://localhost:3000/admin -H "Content-Type: application/json" -d "{"name":"Ola"}"
```

📝 **Do zeszytu:**  
- Co to jest *autoryzacja*?  
- Jak działa sprawdzenie roli użytkownika (`if (user.role === 'admin')`)?  
- Czym różnią się kody błędów **401** i **403**?

---

## 🚦 Etap 2 — Role z działaniami (`admin`, `user`, `guest`)

**Cel:** Zobaczyć, że różne role **mogą wykonywać różne czynności**.

Dodaj nowego użytkownika `guest`:

```js
const users = [
  { id: 1, name: "Jan", role: "admin" },
  { id: 2, name: "Ola", role: "user" },
  { id: 3, name: "Tomek", role: "guest" }
]
```

### 🔹 Działania dla ról

```js
// ADMIN – może przeglądać i dodawać użytkowników
app.get("/admin/users", (req, res) => {
  res.json({ allUsers: users })
})

app.post("/admin/add", (req, res) => {
  const { name, role } = req.body
  users.push({ id: users.length + 1, name, role })
  res.json({ msg: `Dodano użytkownika ${name} (${role})` })
})

// USER/ADMIN – mogą dodawać komentarze
const comments = []

app.post("/user/comment", (req, res) => {
  const { name, text } = req.body
  const user = users.find(u => u.name === name)
  if (!user) return res.status(401).json({ error: "Nie zalogowano." })

  if (user.role === "user" || user.role === "admin") {
    comments.push({ author: user.name, text })
    res.json({ msg: `Dziękujemy, ${user.name}! Komentarz zapisany.` })
  } else {
    res.status(403).json({ error: "Brak uprawnień – tylko user lub admin." })
  }
})

app.get("/comments", (req, res) => {
  res.json({ comments })
})

// GUEST – może tylko czytać powitanie
app.get("/guest/welcome", (req, res) => {
  res.json({ msg: "Witaj w strefie gościa! Treści publiczne." })
})
```

### 🧪 Scenariusze do sprawdzenia
| Użytkownik | Role | Co może zrobić |
|-------------|------|----------------|
| Jan | admin | /admin/users, /admin/add, /user/comment, /comments, /guest/welcome |
| Ola | user | /user/comment, /comments, /guest/welcome |
| Tomek | guest | /guest/welcome, /comments |

📝 **Do zeszytu:**  
– Wypisz, jakie akcje ma każda rola (admin/user/guest).  
– Zastanów się, dlaczego `guest` ma tylko dostęp do treści publicznych.

---

## 🔐 Etap 3 — Dodanie autentykacji (Auth)

**Cel:** Dodać **logowanie z hasłem** i middleware `requireAuth` – bez bazy danych.

```js
const express = require("express")
const app = express()
app.use(express.json())

const users = [
  { id: 1, name: "Jan",   password: "admin123", role: "admin" },
  { id: 2, name: "Ola",   password: "user123",  role: "user"  },
  { id: 3, name: "Tomek", password: "guest123", role: "guest" }
]

// Pamiętanie zalogowanego użytkownika
let loggedUser = null

// Logowanie
app.post("/login", (req, res) => {
  const { name, password } = req.body
  const user = users.find(u => u.name === name && u.password === password)
  if (!user) return res.status(401).json({ error: "Błędne dane logowania!" })
  loggedUser = user
  res.json({ msg: `Zalogowano jako ${user.name} (${user.role})` })
})

// Wylogowanie
app.post("/logout", (req, res) => {
  loggedUser = null
  res.json({ msg: "Wylogowano." })
})

// Middleware – wymaga logowania
function requireAuth(req, res, next) {
  if (loggedUser) return next()
  res.status(401).json({ error: "Musisz się zalogować!" })
}

// Endpoint dostępny tylko po zalogowaniu
app.get("/profile", requireAuth, (req, res) => {
  res.json({ me: loggedUser })
})

// Endpoint tylko dla admina
app.get("/admin", requireAuth, (req, res) => {
  if (loggedUser.role !== "admin") return res.status(403).json({ error: "Brak uprawnień!" })
  res.json({ msg: `Panel admina – witaj, ${loggedUser.name}` })
})

app.listen(3000, () => console.log("Serwer działa na http://localhost:3000"))
```

### 🧪 Testy
```bash
# 1) Dostęp bez logowania
curl http://localhost:3000/profile   # 401
curl http://localhost:3000/admin     # 401

# 2) Logowanie jako admin
curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d "{"name":"Jan","password":"admin123"}"

# 3) Po zalogowaniu
curl http://localhost:3000/profile
curl http://localhost:3000/admin

# 4) Wylogowanie
curl -X POST http://localhost:3000/logout
```

📝 **Do zeszytu:**  
– Czym różni się **autentykacja** (sprawdzenie tożsamości) od **autoryzacji** (sprawdzenie uprawnień)?  
– Co robi middleware `requireAuth`?

---

## 📦 Co oddajesz
- Folder projektu z trzema etapami (lub trzema wersjami pliku `server.js`).  
- Screeny z testowania w Postmanie lub terminalu.  
- Notatki z definicjami i różnicami między etapami w Google Doc.

---

## 🧭 Rubryka oceny (0–10 pkt)
| Element | Punkty |
|----------|---------|
| Etap 1 działa (admin vs user) | 3 |
| Etap 2 działa (role z akcjami) | 3 |
| Etap 3 działa (logowanie, requireAuth) | 3 |
| Notatki i testy | 1 |

---

## 🔜 Co dalej
W następnym etapie połączymy ten projekt z **bazą danych MySQL** przez bibliotekę `mysql2`.  
Użytkownicy i role będą pobierani z tabel, a `loggedUser` zastąpimy **sesją** lub **JWT**.
