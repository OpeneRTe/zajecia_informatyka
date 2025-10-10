# Rozwiązania: JWT i autoryzacja  
## INF.04.7.3(3,5)

---

### ✅ Rozwiązanie Ćwiczenia 1 – „Hello JWT”

```js
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

const USERS = [
  { id: 1, email: 'admin@zst.edu', passHash: bcrypt.hashSync('Zaq1@WSX', 10), role: 'admin' },
  { id: 2, email: 'user@zst.edu', passHash: bcrypt.hashSync('user1234', 10), role: 'user' }
];

function signAccess(user) {
  return jwt.sign(
    { sub: user.id, role: user.role },
    process.env.ACCESS_SECRET,
    { expiresIn: '10m' }
  );
}

function auth(requiredRole) {
  return (req, res, next) => {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token)
      return res.status(401).json({ error: 'Brak tokenu' });
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.user = decoded;
      if (requiredRole && decoded.role !== requiredRole)
        return res.status(403).json({ error: 'Brak uprawnień' });
      next();
    } catch (e) {
      res.status(401).json({ error: 'Token niepoprawny lub wygasł' });
    }
  };
}

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email);
  if (!user || !(await bcrypt.compare(password, user.passHash)))
    return res.status(401).json({ error: 'Nieprawidłowe dane logowania' });
  const token = signAccess(user);
  res.json({ token, type: 'Bearer' });
});

app.get('/api/secret', auth('admin'), (req, res) => {
  res.json({ message: `Witaj ${req.user.role}` });
});

app.listen(3000);
```

💬 **Komentarz:**  
W tym ćwiczeniu uczniowie uczą się generowania tokenu, jego przekazywania i weryfikacji w middleware.

---

### ✅ Rozwiązanie Ćwiczenia 2 – Refresh Token

Dodaj `cookie-parser` i rotację refresh tokenów (np. w Mapie `REFRESH_STORE`).  
Przykładowe rozwiązanie uproszczone:

```js
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const REFRESH_STORE = new Map();

function signRefresh(user) {
  const jti = Date.now().toString();
  const token = jwt.sign({ sub: user.id, jti }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
  REFRESH_STORE.set(jti, user.id);
  return token;
}

app.post('/auth/refresh', (req, res) => {
  const token = req.cookies.refresh;
  if (!token) return res.status(401).json({ error: 'Brak refresh tokenu' });
  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET);
    if (!REFRESH_STORE.has(payload.jti)) return res.status(401).json({ error: 'Token odrzucony' });
    const user = USERS.find(u => u.id === payload.sub);
    const access = signAccess(user);
    res.json({ accessToken: access, type: 'Bearer' });
  } catch (e) {
    res.status(401).json({ error: e.message });
  }
});
```

---

### ✅ Rozwiązanie Ćwiczenia 3 – Testy w cURL

```bash
curl -i http://localhost:3000/api/secret   -H "Authorization: Bearer <TOKEN>"
```

➡ Wynik:  
`HTTP/1.1 200 OK {"message":"Witaj admin"}`

Bez tokenu:
➡ `HTTP/1.1 401 Unauthorized {"error":"Brak tokenu"}`

💬 **Komentarz:**  
Tu uczniowie rozumieją, że token jest konieczny, a jego brak lub wygaśnięcie skutkuje błędem autoryzacji.

---

### ✅ Rozwiązanie Ćwiczenia 4 – Porównanie JWT z sesją

| Kryterium | Sesja | JWT |
|------------|--------|-----|
| Przechowywanie danych | Po stronie serwera | W tokenie po stronie klienta |
| Restart serwera | Usuwa sesję | Token działa do `exp` |
| Wylogowanie | Usunięcie sesji | Wymaga „czarnej listy” lub rotacji refresh tokenów |
| Skalowalność | Trudna (stan po stronie serwera) | Bardzo dobra (stateless) |
| Bezpieczeństwo | Bardzo dobre z cookie httpOnly | Dobre przy silnym sekrecie |

💬 **Komentarz:**  
To ćwiczenie pozwala uczniom zrozumieć, kiedy lepiej używać JWT (np. API, SPA), a kiedy sesji (np. klasyczne logowanie w CMS).

---

**Zalecenia dla nauczyciela:**  
- Weryfikuj poprawność tokenów i obsługę błędów.  
- Omów różnice między access i refresh tokenami.  
- Zapytaj uczniów o zastosowania JWT w prawdziwych aplikacjach (np. system logowania Google, Facebook itp.).
