# 🔐 Test logowania i autoryzacji JWT w Node.js + Express

## 1️⃣ Plik `.env`

Upewnij się, że w katalogu projektu znajduje się plik:

```
ACCESS_SECRET=super_tajne_haslo_na_jwt
```

Możesz wygenerować długi, losowy klucz:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Wklej wynik do `ACCESS_SECRET`.

---

## 2️⃣ Uruchomienie serwera

```bash
node --watch server.js
```

Jeśli wszystko działa poprawnie, zobaczysz komunikat podobny do:

```
[dotenv@17.2.3] injecting env (0) from .env
```

---

## 3️⃣ Logowanie po token (Bearer)

### 🔸 Logowanie jako **admin**

```powershell
curl.exe -i -X POST http://localhost:3000/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@zst.edu\",\"password\":\"Zaq1@WSX\"}"
```

**Odpowiedź:**
```json
{
  "token": "<JWT>",
  "type": "Bearer"
}
```

---

### 🔸 Logowanie jako **user**

```powershell
curl.exe -i -X POST http://localhost:3000/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"user@zst.edu\",\"password\":\"user1234\"}"
```

**Odpowiedź:**
```json
{
  "token": "<JWT>",
  "type": "Bearer"
}
```

---

## 4️⃣ Wejście na chroniony endpoint `/api/secret`

Podmień `<JWT>` na token z logowania admina:

```powershell
curl.exe -i http://localhost:3000/api/secret ^
  -H "Authorization: Bearer <JWT>"
```

**Odpowiedź (rola admin):**
```json
{
  "message": "Witaj admin"
}
```

---

## ⚠️ Typowe błędy

| Kod | Opis błędu | Przyczyna |
|-----|-------------|-----------|
| 401 | `Brak tokenu` | Nie wysłano nagłówka `Authorization` lub token wygasł |
| 403 | `Brak uprawnień` | Token poprawny, ale rola ≠ `admin` |
| 401 | `Token niepoprawny lub wygasł` | Niewłaściwy sekret lub przekroczony czas `expiresIn` |

---

## ✅ Szybki checklist

- Masz **Node.js 24+** i **ES Modules** – używaj `import`.
- W pliku serwera dla `jsonwebtoken`:

  ```js
  import pkg from 'jsonwebtoken';
  const { sign, verify } = pkg;
  ```

- W pliku `package.json` dodaj:

  ```json
  {
    "type": "module",
    "scripts": {
      "start": "node server.js",
      "dev": "node --watch server.js"
    }
  }
  ```

---

## 🕒 Gdy pojawia się komunikat:
> „token niepoprawny lub wygasł”

Sprawdź:
- Czy `ACCESS_SECRET` w `.env` nie został zmieniony od momentu podpisania tokenu,
- Czy **czas systemowy** jest poprawny,
- Czy nie minął czas ważności:  
  `expiresIn: '10m'`.

---

## 🔧 Dodatkowe rozszerzenia (opcjonalne)

Chcesz dodać:
- Endpoint `/auth/me` – do odczytu danych z tokenu (`sub`, `role`, `exp`),
- Middleware CORS – aby testować z przeglądarki,
- Obsługę `refresh tokena`?

➡️ Można to łatwo dopisać do tego samego projektu.

---

📘 **Podsumowanie:**
- Serwer: `http://localhost:3000`
- Logowanie: `POST /auth/login`
- Zabezpieczony endpoint: `GET /api/secret`
- Uwierzytelnianie: JWT Bearer Token (rola `admin`)
