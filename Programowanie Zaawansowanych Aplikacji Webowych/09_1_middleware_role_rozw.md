# 🧑‍🏫 Middleware autoryzacyjny i role użytkowników – rozwiązania i wskazówki  
**INF.04.7.3(3,5)**

---

## 💬 Odpowiedzi do zeszytu
1. **Middleware** – funkcja pośrednicząca, wykonywana między żądaniem klienta a odpowiedzią serwera. Może modyfikować żądanie, wykonywać logowanie, sprawdzać uprawnienia lub obsługiwać błędy.  
2. **Role użytkowników:**
   - `admin` – pełny dostęp do zasobów systemu.  
   - `user` – dostęp do własnych danych.  
   - `guest` – tylko do publicznych stron.  
3. **bcrypt** – biblioteka służąca do bezpiecznego hashowania haseł użytkowników. Używa tzw. „soli” (salt), aby utrudnić złamanie haseł metodą słownikową.

---

## 💻 Odpowiedzi – kod

**Middleware autoryzacyjny**
```js
const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {
  const header = req.headers.authorization || ""
  const [scheme, token] = header.split(" ")

  if (scheme !== "Bearer" || !token)
    return res.status(401).json({ error: "Brak tokena" })

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(403).json({ error: "Niepoprawny token" })
  }
}
```

**Middleware ról**
```js
function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user?.role === role) next()
    else res.status(403).json({ error: "Brak uprawnień" })
  }
}
```

**Użycie:**
```js
app.get("/admin", authMiddleware, authorizeRole("admin"), (req, res) => {
  res.json({ msg: "Panel administratora" })
})
```

---

## 🧾 Uwagi dydaktyczne
- Temat realizuje wymagania **INF.04.7.3(3)** (system logowania) oraz **(5)** (kontrola dostępu).  
- Uczniowie powinni przetestować kod w **Postmanie** – to pozwala zrozumieć przepływ autoryzacji.  
- Warto pokazać strukturę tokena JWT na stronie [jwt.io](https://jwt.io).  
- Można rozszerzyć lekcję o `bcrypt.compare()` – porównanie hasła przy logowaniu.

---

## 🏁 Kryteria sukcesu
Uczeń:
- umie wyjaśnić pojęcie *middleware*, *rola użytkownika*, *bcrypt*,  
- potrafi zaimplementować middleware autoryzacyjny,  
- potrafi przypisać użytkownikowi rolę,  
- potrafi zastosować kontrolę dostępu do endpointu.
