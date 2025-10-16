# 🔐 Funkcja `jwt.sign()` – tworzenie tokenów JWT w Node.js

## 📘 Co robi `jwt.sign()`

Funkcja `sign()` z biblioteki `jsonwebtoken` służy do **utworzenia (podpisania)** tokena JWT – czyli bezpiecznego ciągu znaków zawierającego dane użytkownika.  
Po zalogowaniu się użytkownika serwer generuje token przy pomocy `jwt.sign()` i przekazuje go klientowi (np. przeglądarce).

Token JWT może być potem używany w nagłówku `Authorization: Bearer <token>` przy każdym żądaniu do API.

---

## 🧩 Składnia

```js
jwt.sign(payload, secretOrPrivateKey, [options, callback])
```

### Parametry:

| Parametr | Opis |
|-----------|------|
| `payload` | Dane, które mają być zapisane w tokenie (np. `id`, `rola`, `email`) |
| `secretOrPrivateKey` | Sekret z pliku `.env`, którym token zostanie podpisany (np. `ACCESS_SECRET`) |
| `options` | (opcjonalnie) dodatkowe ustawienia, np. `expiresIn`, `issuer`, `subject` |
| `callback` | (opcjonalnie) funkcja callback, jeśli chcesz tworzyć token asynchronicznie |

---

## 🧠 Przykład użycia

```js
import pkg from 'jsonwebtoken';
const { sign } = pkg;

function signAccess(user) {
  return sign(
    { sub: user.id, role: user.role }, // dane zapisane w tokenie (payload)
    process.env.ACCESS_SECRET,         // sekret z pliku .env
    { expiresIn: '10m' }               // token ważny 10 minut
  );
}
```

Przykładowy wynik tokena:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNzY5MzU3MiwiZXhwIjoxNzA3Njk0MTcyfQ.1P2...
```

---

## 🔍 Co zawiera token JWT

Token składa się z 3 części (rozdzielonych kropkami):

1. **Header** – typ tokena i algorytm (`alg`, `typ`)
2. **Payload** – dane użytkownika (`sub`, `role`, `iat`, `exp`)
3. **Signature** – podpis kryptograficzny

Przykład dekodowania tokena możesz zobaczyć na stronie [jwt.io](https://jwt.io).

---

## 🔓 Odczyt i weryfikacja tokena

Aby sprawdzić poprawność tokena i odczytać dane z jego środka, użyj funkcji `jwt.verify()`:

```js
import pkg from 'jsonwebtoken';
const { verify } = pkg;

try {
  const decoded = verify(token, process.env.ACCESS_SECRET);
  console.log(decoded);
} catch (err) {
  console.log("Token niepoprawny lub wygasł");
}
```

W Twoim projekcie dzieje się to automatycznie w middleware `auth()`, który sprawdza token w nagłówku `Authorization` i udostępnia dane w `req.user`.

---

## 📄 Podsumowanie

| Funkcja | Działanie |
|----------|------------|
| `jwt.sign()` | Tworzy nowy token JWT |
| `jwt.verify()` | Sprawdza poprawność tokena i zwraca dane (`payload`) |
| `jwt.decode()` | Odczytuje dane bez sprawdzania podpisu (niezalecane do autoryzacji) |

---

📘 **Praktyczne zastosowanie:**
- `jwt.sign()` – przy logowaniu (serwer generuje token)
- `jwt.verify()` – przy każdym żądaniu do chronionego endpointu (serwer sprawdza token)

---

🔒 **Uwaga:** Sekret (`ACCESS_SECRET`) musi być ten sam przy generowaniu i weryfikacji tokena.  
Jeśli zmienisz go w pliku `.env`, wszystkie dotychczasowe tokeny staną się nieważne.
