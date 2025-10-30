# 👑 Role użytkowników w Express.js – krok po kroku
**INF.04.7.3(3,5) – Systemy logowania i kontroli dostępu**

---

## 🔧 Krok 0 – Przygotowanie projektu
1. Utwórz folder projektu i zainicjuj Node.js:
   ```bash
   mkdir auth-roles && cd auth-roles
   npm init -y
   npm i express jsonwebtoken bcrypt dotenv
   ```

2. Utwórz pliki:
   - `server.js`
   - `authMiddleware.js`
   - `roleMiddleware.js`
   - `users.js`
   - `.env`

---

## ⚙️ Krok 1 – Konfiguracja środowiska i Express
**Plik `.env`:**
```
ACCESS_SECRET=super_tajne_haslo_na_jwt
TOKEN_EXPIRES=10m
PORT=3000
```

**Plik `server.js`:**
```js
require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { USERS } = require('./users')
const auth = require('./authMiddleware')
const { authorizeRole, authorizeAnyRole } = require('./roleMiddleware')

const app = express()
app.use(express.json())

function signAccess(user) {
  return jwt.sign(
    { sub: user.id, role: user.role, email: user.email },
    process.env.ACCESS_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRES || '10m' }
  )
}

// test zdrowia
app.get('/health', (req,res) => {
  res.json({ ok: true, users: USERS.map(u => ({id:u.id,email:u.email,role:u.role})) })
})

// logowanie
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {}
  const user = USERS.find(u => u.email.toLowerCase() === String(email).toLowerCase())
  if (!user) return res.status(401).json({ error: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.passHash)
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' })
  const token = signAccess(user)
  res.json({ token, type: 'Bearer' })
})

// strefa zalogowanego
app.get('/me', auth, (req,res)=>{
  res.json({ id:req.user.sub, role:req.user.role, email:req.user.email })
})

// tylko admin
app.get('/admin', auth, authorizeRole('admin'), (req,res)=>{
  res.json({ msg:'Panel admina', who:req.user.email })
})

// admin lub editor
app.get('/editor-or-admin', auth, authorizeAnyRole(['admin','editor']), (req,res)=>{
  res.json({ msg:'Masz uprawnienia edycyjne', role:req.user.role })
})

// strefa usera
app.get('/user-area', auth, authorizeAnyRole(['user','admin','editor']), (req,res)=>{
  res.json({ msg:'Strefa użytkownika', role:req.user.role })
})

app.listen(process.env.PORT, ()=> console.log('Serwer działa na http://localhost:'+process.env.PORT))
```

---

## 👥 Krok 2 – „Baza użytkowników” (wersja testowa)

**Plik `users.js`:**
```js
const bcrypt = require('bcrypt')
const seed = (pass) => bcrypt.hashSync(pass, 10)

const USERS = [
  { id: 1, email: 'admin@zst.edu',  passHash: seed('Zaq1@WSX'), role: 'admin'  },
  { id: 2, email: 'user@zst.edu',   passHash: seed('user1234'),  role: 'user'   },
  { id: 3, email: 'editor@zst.edu', passHash: seed('edit1234'),  role: 'editor' }
]

module.exports = { USERS }
```

---

## 🔐 Krok 3 – Middleware autoryzacyjny (JWT)

**Plik `authMiddleware.js`:**
```js
const jwt = require('jsonwebtoken')

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization || ''
  const [scheme, token] = header.split(' ')
  if (scheme !== 'Bearer' || !token)
    return res.status(401).json({ error: 'Brak tokena' })

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
    req.user = decoded
    next()
  } catch {
    res.status(403).json({ error: 'Niepoprawny token' })
  }
}
```

---

## 👑 Krok 4 – Middleware ról użytkowników

**Plik `roleMiddleware.js`:**
```js
function authorizeRole(requiredRole) {
  return (req, res, next) => {
    if (req.user?.role === requiredRole) return next()
    res.status(403).json({ error: 'Brak uprawnień' })
  }
}

function authorizeAnyRole(allowedRoles = []) {
  return (req, res, next) => {
    if (req.user && allowedRoles.includes(req.user.role)) return next()
    res.status(403).json({ error: 'Brak uprawnień' })
  }
}

module.exports = { authorizeRole, authorizeAnyRole }
```

---

## 🚀 Krok 5 – Uruchomienie i testowanie
1. Uruchom serwer:  
   ```bash
   node server.js
   ```
2. Zaloguj się przez Postman lub cURL:  
   ```bash
   curl -X POST http://localhost:3000/auth/login      -H "Content-Type: application/json"      -d '{"email":"admin@zst.edu","password":"Zaq1@WSX"}'
   ```
3. Skopiuj token i przetestuj endpointy:
   ```bash
   curl -H "Authorization: Bearer <token>" http://localhost:3000/admin
   curl -H "Authorization: Bearer <token>" http://localhost:3000/editor-or-admin
   curl -H "Authorization: Bearer <token>" http://localhost:3000/user-area
   ```
4. Sprawdź różnice między rolami: `admin`, `user`, `editor`.

---

## 💡 Dobre praktyki
- Token ważny krótko (`10m`), a do odświeżania używaj „refresh tokenów”.  
- Komunikaty błędów:
  - `401` – brak tokena lub błędny,
  - `403` – brak uprawnień.
- W produkcji hasła przechowuj tylko w formie hashów (`bcrypt`).

---

## 🧩 Rozszerzenia
Hierarchiczne role:
```js
const LEVEL = { user: 1, editor: 2, admin: 3 }
const minLevel = (needed) => (req, res, next) =>
  LEVEL[req.user?.role] >= LEVEL[needed]
    ? next()
    : res.status(403).json({ error: 'Za niski poziom roli' })
```

Użycie:
```js
app.get('/manage', auth, minLevel('editor'), (req,res)=>{...})
```

---

## ✅ Podsumowanie
- `bcrypt` – bezpieczne hasła.  
- `jsonwebtoken` – tokeny autoryzacyjne.  
- `middleware` – funkcje kontrolujące dostęp.  
- Role (`admin`, `user`, `editor`) – określają poziom uprawnień.  
- Całość tworzy bezpieczny system logowania i autoryzacji w Express.js.
