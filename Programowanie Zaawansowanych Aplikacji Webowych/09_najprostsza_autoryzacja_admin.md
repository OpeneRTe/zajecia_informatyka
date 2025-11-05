# 🧩 Najprostsza autoryzacja i rola `admin` w Express.js  
**INF.04.7.3(3,5) – Systemy logowania i kontroli dostępu**

---

## 🎯 Cel
Zrozumieć **podstawową zasadę autoryzacji** i **sprawdzania roli użytkownika** w aplikacji Express.js – bez tokenów, bez haseł, tylko z prostą logiką `if`.

---

## 📁 1️⃣ Kod źródłowy – plik `server.js`
```js
const express = require("express")
const app = express()

app.use(express.json()) // obsługa JSON-a w body

// Tymczasowa lista użytkowników
const users = [
  { id: 1, name: "Jan", role: "admin" },
  { id: 2, name: "Ola", role: "user" }
]

// Proste logowanie (bez haseł, tylko nazwa użytkownika)
app.post("/login", (req, res) => {
  const { name } = req.body
  const user = users.find(u => u.name === name)

  if (!user) {
    return res.status(401).json({ error: "Nie ma takiego użytkownika!" })
  }

  // symulacja zapamiętania zalogowanego użytkownika
  res.json({ msg: `Witaj ${user.name}! Twoja rola to: ${user.role}` })
})

// Endpoint tylko dla admina
app.post("/admin", (req, res) => {
  const { name } = req.body
  const user = users.find(u => u.name === name)

  if (!user) {
    return res.status(401).json({ error: "Musisz się zalogować!" })
  }

  // Sprawdzenie roli
  if (user.role === "admin") {
    res.json({ msg: `Witaj ${user.name}! Masz dostęp do panelu administratora.` })
  } else {
    res.status(403).json({ error: "Brak uprawnień – nie jesteś administratorem." })
  }
})

app.listen(3000, () => console.log("Serwer działa na http://localhost:3000"))
```

---

## 🧪 Jak przetestować

1. Uruchom serwer:
   ```bash
   node server.js
   ```

2. Wykonaj polecenia w terminalu lub w Postmanie:

   🔹 **Zaloguj się jako admin:**
   ```bash
   curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d "{"name":"Jan"}"
   ```

   🔹 **Zaloguj się jako użytkownik:**
   ```bash
   curl -X POST http://localhost:3000/login -H "Content-Type: application/json" -d "{"name":"Ola"}"
   ```

   🔹 **Wejdź na panel admina jako Jan:**
   ```bash
   curl -X POST http://localhost:3000/admin -H "Content-Type: application/json" -d "{"name":"Jan"}"
   ```

   🔹 **Wejdź na panel admina jako Ola:**
   ```bash
   curl -X POST http://localhost:3000/admin -H "Content-Type: application/json" -d "{"name":"Ola"}"
   ```

---

## 🧠 Co tu się dzieje
- Serwer ma prostą tablicę `users` z dwoma osobami: Jan (admin) i Ola (user).  
- Po zalogowaniu wysyłamy tylko imię użytkownika.  
- W endpointzie `/admin` sprawdzamy, czy `user.role === "admin"`.  
- Jeśli tak → dostęp przyznany.  
- Jeśli nie → komunikat „Brak uprawnień”.

---

## ✅ Podsumowanie
- To najprostszy przykład autoryzacji w Express.  
- Pokazuje samą zasadę: **rola użytkownika decyduje o dostępie**.  
- W kolejnym etapie można dodać:
  - logowanie z hasłem (`bcrypt`),  
  - tokeny (`jsonwebtoken`),  
  - bazę danych (np. MySQL lub MongoDB).
