# Ćwiczenie: Gość i zwykły użytkownik (bez autoryzacji)
**Temat:** Wprowadzenie do autoryzacji w Express – rozpoznawanie roli użytkownika  
**Zakres:** INF.04.7.3(3,5)  
**Poziom:** Podstawowy  
**Czas:** ok. 30 min

---

## 🎯 Cel
Poznasz, w jaki sposób serwer może rozróżniać **gościa** od **zalogowanego użytkownika**, zanim wprowadzimy właściwą autoryzację.

W tym ćwiczeniu nie używamy haseł, tokenów ani logowania — tylko proste rozpoznanie po nazwie użytkownika.

---

## 🧩 Kod wyjściowy

Masz przygotowany serwer Express:

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

  res.json({ msg: `Witaj ${user.name}! Twoja rola to: ${user.role}` })
})

// Endpoint tylko dla admina
app.post("/admin", (req, res) => {
  const { name } = req.body
  const user = users.find(u => u.name === name)

  if (!user) {
    return res.status(401).json({ error: "Musisz się zalogować!" })
  }

  if (user.role === "admin") {
    res.json({ msg: `Witaj ${user.name}! Masz dostęp do panelu administratora.` })
  } else {
    res.status(403).json({ error: "Brak uprawnień – nie jesteś administratorem." })
  }
})

app.listen(3000, () => console.log("Serwer działa na http://localhost:3000"))
```

---

## 🧠 Zadanie do wykonania

Rozszerz powyższy kod o dwa nowe endpointy:

### 1️⃣ `GET /public`
- Dostępny **dla każdego** (gość, user, admin)
- Zwraca komunikat:
  ```json
  { "msg": "Strefa publiczna: tu każdy ma dostęp (także gość)." }
  ```

### 2️⃣ `GET /whoami`
- Odczytuje nazwę użytkownika z parametru zapytania `?name=...`
- Jeśli użytkownik istnieje w tablicy `users`, zwraca:
  ```json
  { "isGuest": false, "name": "Ola", "role": "user" }
  ```
- Jeśli nie ma parametru `name` lub użytkownik nie istnieje, zwraca:
  ```json
  { "isGuest": true, "msg": "Jesteś gościem (podaj ?name=Jan albo ?name=Ola, aby zobaczyć rolę)." }
  ```

---

## 💡 Wskazówka
Nie używamy ciasteczek ani tokenów.  
Identyfikacja odbywa się tylko przez adres URL (np. `?name=Ola`).

---

## 🧪 Testowanie

Użyj przeglądarki lub terminala:

```bash
curl -i "http://localhost:3000/public"
curl -i "http://localhost:3000/whoami"
curl -i "http://localhost:3000/whoami?name=Ola"
curl -i "http://localhost:3000/whoami?name=Jan"
```

### Oczekiwane wyniki:
| Zapytanie | Wynik |
|------------|--------|
| `/public` | dostępne zawsze |
| `/whoami` | `isGuest: true` |
| `/whoami?name=Ola` | `role: "user"` |
| `/whoami?name=Jan` | `role: "admin"` |

---

## ✅ Kryteria zaliczenia
- Kod działa i uruchamia się bez błędów (`node server.js`)
- Endpointy `/public` i `/whoami` działają zgodnie z opisem
- Uczeń potrafi wyjaśnić, czym różni się **gość** od **zalogowanego użytkownika**

---

## 📘 Co dalej?
W kolejnym kroku dodamy prostą kontrolę dostępu (np. `/profile` tylko dla użytkowników), nadal bez tokenów ani sesji.
