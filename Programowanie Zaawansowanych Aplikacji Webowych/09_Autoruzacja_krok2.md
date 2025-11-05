# Ćwiczenie: Kontrola dostępu – profil użytkownika (Krok 2)
**Temat:** Wprowadzenie do autoryzacji w Express – ochrona wybranych zasobów  
**Zakres:** INF.04.7.3(3,5)  
**Poziom:** Podstawowy  
**Czas:** ok. 30 min

---

## 🎯 Cel
Poznasz, jak dodać **pierwszą formę kontroli dostępu** do aplikacji Express.  
Celem jest stworzenie endpointu `/profile`, który będzie dostępny tylko dla zalogowanego użytkownika.

Nie używamy jeszcze haseł ani tokenów – jedynie proste sprawdzenie po nazwie użytkownika.

---

## 🧩 Kod wyjściowy

Korzystamy z kodu z poprzedniego ćwiczenia (Krok 1 – Gość i użytkownik):

```js
const express = require("express")
const app = express()

app.use(express.json())

const users = [
  { id: 1, name: "Jan", role: "admin" },
  { id: 2, name: "Ola", role: "user" }
]

app.get("/public", (req, res) => {
  res.json({ msg: "Strefa publiczna: tu każdy ma dostęp (także gość)." })
})

app.get("/whoami", (req, res) => {
  const name = req.query.name
  const user = users.find(u => u.name === name)

  if (!name || !user) {
    return res.json({
      isGuest: true,
      msg: "Jesteś gościem (podaj ?name=Jan albo ?name=Ola, aby zobaczyć rolę)."
    })
  }

  res.json({
    isGuest: false,
    name: user.name,
    role: user.role,
    msg: `Witaj ${user.name}! Twoja rola to: ${user.role}.`
  })
})

app.listen(3000, () => console.log("Serwer działa na http://localhost:3000"))
```

---

## 🧠 Zadanie do wykonania

Dodaj nowy endpoint `GET /profile`, który:
- przyjmuje nazwę użytkownika przez `?name=...`
- jeśli użytkownik istnieje → zwraca jego dane i komunikat powitalny
- jeśli użytkownik nie istnieje → zwraca błąd `401` z informacją, że trzeba się zalogować

---

## 💻 Kod do dopisania

```js
app.get("/profile", (req, res) => {
  const name = req.query.name
  const user = users.find(u => u.name === name)

  if (!user) {
    return res.status(401).json({ error: "Musisz się zalogować, aby zobaczyć swój profil." })
  }

  res.json({ msg: `Witaj ${user.name}!`, role: user.role })
})
```

---

## 🧪 Testowanie

Użyj przeglądarki lub terminala:

```bash
curl -i "http://localhost:3000/profile"
curl -i "http://localhost:3000/profile?name=Ola"
curl -i "http://localhost:3000/profile?name=Jan"
```

### Oczekiwane wyniki:
| Zapytanie | Wynik |
|------------|--------|
| `/profile` | `401` – brak zalogowania |
| `/profile?name=Ola` | 200 – `role: "user"` |
| `/profile?name=Jan` | 200 – `role: "admin"` |

---

## ✅ Kryteria zaliczenia
- Endpoint `/profile` działa poprawnie.
- Gość (bez `?name`) otrzymuje błąd `401`.
- Uczeń potrafi wyjaśnić, że „autoryzacja” oznacza sprawdzenie, kto ma dostęp do danego zasobu.

---

## 📘 Co dalej?
W kolejnym kroku dodamy **różne poziomy uprawnień** (np. `/admin` tylko dla roli `admin`), a potem nauczymy się tworzyć **middleware** do automatycznego sprawdzania ról.
