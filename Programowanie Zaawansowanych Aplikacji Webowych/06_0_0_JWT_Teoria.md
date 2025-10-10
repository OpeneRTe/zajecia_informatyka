# JWT i autoryzacja w aplikacjach webowych  
## INF.04.7.3(3,5) – Systemy logowania i kontroli dostępu

---

### 🔹 1. Dlaczego potrzebujemy autoryzacji?

Większość aplikacji webowych (np. sklepy internetowe, portale społecznościowe, fora czy systemy rezerwacji) musi wiedzieć **kto wysyła żądanie**.  
Niektóre dane mogą być dostępne dla wszystkich (np. strona główna sklepu), ale inne tylko dla **zalogowanego użytkownika** lub **administratora**.

➡️ **Autentykacja** – sprawdza *kim jesteś* (np. login + hasło).  
➡️ **Autoryzacja** – określa *co możesz robić* (np. admin może dodać produkt, użytkownik nie).

W dawnych aplikacjach (PHP, ASP) używano **sesji i ciasteczek**, ale w nowoczesnych systemach (React, Angular, API REST) coraz częściej stosuje się **tokeny JWT**.

---

### 🔹 2. Czym jest token?

Token to **mały elektroniczny klucz**, który potwierdza, że użytkownik został zalogowany.  
Po poprawnym logowaniu serwer **wydaje token**, który klient (np. przeglądarka) wysyła przy każdym kolejnym zapytaniu.

To trochę tak, jakbyś w recepcji hotelu dostał **kartę dostępu do pokoju** – zamiast za każdym razem podawać swoje nazwisko, pokazujesz kartę, a system rozpoznaje Cię automatycznie.

---

### 🔹 3. JWT – co to właściwie jest?

**JWT (JSON Web Token)** to standardowy sposób zapisu tokenów w formacie JSON.  
Został opisany w dokumencie **RFC 7519** → [https://www.rfc-editor.org/rfc/rfc7519](https://www.rfc-editor.org/rfc/rfc7519)

JWT to po prostu **ciąg trzech części rozdzielonych kropkami:**

```
header.payload.signature
```

Każda część jest zakodowana w formacie **Base64URL**, czyli w postaci, którą można bezpiecznie przesyłać w adresach i nagłówkach.

---

### 🔹 4. Jak zbudowany jest token JWT?

| Część | Nazwa | Co zawiera | Przykład |
|-------|--------|------------|-----------|
| **Header** | nagłówek | informacje o algorytmie i typie tokenu | `{ "alg": "HS256", "typ": "JWT" }` |
| **Payload** | dane (roszczenia) | kto się zalogował, jakie ma uprawnienia, do kiedy token jest ważny | `{ "sub": "123", "name": "Jan", "role": "admin" }` |
| **Signature** | podpis | zabezpieczenie, które pozwala serwerowi sprawdzić, czy token nie został podmieniony | wynik funkcji HMACSHA256 |

Token po zakodowaniu wygląda mniej więcej tak:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0IiwibmFtZSI6IkphbiIsInJvbGUiOiJhZG1pbiJ9.
hC0oZyZ6h0CJm4wPbT1rYFqEUCuYb1wB9fMZb3E8Up8
```

---

### 🔹 5. Roszczenia (claims) – czyli co zawiera payload

Środkowa część JWT, czyli **payload**, zawiera dane o użytkowniku i o samym tokenie.  
Te dane nazywamy **roszczeniami (claims)** – są to informacje, które „token rości sobie” wobec serwera.

Nie są one szyfrowane (można je odczytać np. na stronie [jwt.io](https://jwt.io)), ale są **podpisane**, więc nie da się ich zmienić bez unieważnienia tokenu.

| Nazwa | Znaczenie | Przykład |
|--------|------------|----------|
| `sub` | ID użytkownika | `"sub": "12345"` |
| `name` | nazwa / login | `"name": "Jan"` |
| `role` | rola użytkownika | `"role": "admin"` |
| `iat` | czas utworzenia tokenu | `"iat": 1715000000"` |
| `exp` | data wygaśnięcia | `"exp": 1715003600"` |
| `iss` | wystawca (issuer) | `"iss": "zst-auth"` |
| `aud` | odbiorca (audience) | `"aud": "zst-api"` |

Dzięki temu serwer może wiedzieć:
- kto wysyła żądanie (`sub`),  
- czy token jest jeszcze ważny (`exp`),  
- czy ma odpowiednią rolę (`role`).

---

### 🔹 6. Jak token trafia do serwera – Bearer Authorization

Token najczęściej przekazywany jest w nagłówku HTTP:

```
Authorization: Bearer <TWÓJ_TOKEN_JWT>
```

Słowo **Bearer** oznacza „posiadacz”.  
Czyli: *„Ten, kto ma ten token, ma prawo dostępu do zasobu.”*

📦 Przykład:
```
GET /api/profile
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 🔹 7. Gdzie przechowujemy tokeny

| Miejsce | Typowy przypadek | Zalety | Wady |
|----------|------------------|--------|------|
| **Nagłówek Authorization** | Access token (krótkie życie) | Proste i szybkie | Ryzyko XSS (jeśli kod JS jest niebezpieczny) |
| **Cookie httpOnly, Secure** | Refresh token (odświeżanie sesji) | Chronione przed JS | Wymaga HTTPS i konfiguracji CORS |
| **LocalStorage / SessionStorage** | SPA (React, Angular) | Łatwy dostęp | Niebezpieczne przy XSS |

💡 Dobra praktyka:  
- **Access token** – przechowuj w pamięci aplikacji (np. w zmiennej JS) krótkożyjący token (np. ważny 10–15 minut).  
- **Refresh token** – w cookie httpOnly (niedostępne dla JS), token do odświeżania access tokenu (np. ważny kilka dni).

# 🔐 Access token i Refresh token – gdzie je trzymać?

**Access token** – to krótkożyjący token (np. ważny 10–15 minut)  
**Refresh token** – to token służący do odświeżania access tokenu (np. ważny kilka dni)

---

## 🔹 Access token – w pamięci aplikacji

Access tokena najlepiej przechowywać **tymczasowo w pamięci aplikacji** (np. w zmiennej JavaScript).  
Dzięki temu znika po odświeżeniu strony lub zamknięciu przeglądarki.

📘 **Przykład:**
```js
let accessToken = null;
fetch('/auth/login', { ... })
  .then(res => res.json())
  .then(data => accessToken = data.accessToken);
```

✅ **Zaleta:** nie zapisuje się nigdzie w przeglądarce (mniejsze ryzyko kradzieży).  
❌ **Wada:** trzeba ponownie zalogować się po zamknięciu strony.

---

## 🔹 Refresh token – w ciasteczku httpOnly

Refresh token przechowujemy w **ciasteczku (cookie)**, które ma ustawione specjalne flagi:

- `httpOnly` – dzięki temu **JavaScript nie ma do niego dostępu** (chroni przed XSS)  
- `secure` – cookie działa tylko po **HTTPS**  
- `SameSite=Strict` – cookie **nie zostanie wysłane z obcych stron** (chroni przed CSRF)

📘 **Przykład:**
```js
res.cookie('refresh', refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: 'strict'
});
```

✅ **Zaleta:** bardzo bezpieczne miejsce na dłuższy token  
❌ **Wada:** wymaga HTTPS i odpowiedniej konfiguracji serwera

---

## 🧩 Podsumowanie

- 🔸 **Access token** służy do autoryzacji bieżących żądań – działa krótko i jest lekki.  
- 🔸 **Refresh token** służy do odświeżania sesji – trzymany bezpiecznie w cookie, aby przeglądarka sama go przesyłała, ale JavaScript go nie widział.  
- 🔸 Połączenie obu zapewnia **bezpieczeństwo i wygodę** – użytkownik nie musi logować się co 10 minut, a atakujący nie może łatwo przejąć tokenu.
---

### 🔹 8. Porównanie: sesje vs tokeny JWT

| Cecha | Sesje (express-session) | JWT |
|-------|--------------------------|-----|
| Gdzie zapisane | Na serwerze (RAM, plik, baza) | Po stronie klienta |
| Co przechowuje serwer | ID sesji i dane użytkownika | Tylko sekret do weryfikacji podpisu |
| Skalowalność | Trudniejsza – wymaga współdzielonej pamięci | Bardzo dobra (stateless) |
| Bezpieczeństwo | Bardzo dobre, cookie httpOnly | Dobre – zależy od sekretu |
| Czas ważności | Do momentu wylogowania lub restartu | Do czasu `exp` |
| Cofnięcie dostępu | Wystarczy usunąć sesję | Trudniejsze – wymaga tzw. czarnej listy |
| Typowe użycie | Panele logowania, CMS, admin | REST API, SPA, aplikacje mobilne |

🟩 **W skrócie:**  
- Dla prostych stron logowania – sesje.  
- Dla aplikacji SPA lub API – JWT.

---

### 🔹 9. Jak wygląda cały proces działania JWT

```mermaid
sequenceDiagram
    participant U as Użytkownik (frontend)
    participant S as Serwer API

    U->>S: POST /auth/login (email + hasło)
    S-->>U: access_token + refresh_token
    U->>S: GET /api/profile (Authorization: Bearer access_token)
    S-->>U: Dane użytkownika (jeśli token ważny)
    Note over U,S: Gdy access_token wygaśnie → użyj refresh_token<br>→ nowy access_token
```

---

### 🔹 10. Jak to wygląda w praktyce

#### Logowanie
```http
POST /auth/login
Content-Type: application/json

{
  "email": "admin@zst.edu",
  "password": "Zaq1@WSX"
}
```

Serwer po sprawdzeniu danych tworzy token i odsyła:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6...",
  "tokenType": "Bearer",
  "expiresIn": 600
}
```

#### Kolejne żądanie
```http
GET /api/secret
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

Jeśli token poprawny → serwer odpowiada:
```json
{ "message": "Witaj admin!" }
```

Jeśli token nieprawidłowy lub wygasł →  
`HTTP/1.1 401 Unauthorized`

---

### 🔹 11. Dlaczego JWT jest popularny

- Nie trzeba pamiętać sesji po stronie serwera.  
- Działa w rozproszonych systemach (np. mikroserwisy).  
- Łatwo używać go w aplikacjach React, Vue, Angular.  
- Można go weryfikować w różnych językach (Node, PHP, Java, Python).  
- Odczyt tokenu jest szybki – tylko podpis HMAC / RSA.

---

### 🔹 12. Zasady bezpieczeństwa przy JWT

✅ Stosuj **HTTPS** – token nie może iść po HTTP.  
✅ Sekret JWT przechowuj w pliku `.env`.  
✅ Access token ustaw na krótki czas (np. 10–15 minut).  
✅ Nie wkładaj poufnych danych (np. hasła) do payload.  
✅ Refresh token trzymaj w `httpOnly` cookie i stosuj jego rotację.  
✅ Używaj bibliotek (`jsonwebtoken`, `bcrypt`) zamiast własnych implementacji.

---

### 🔹 13. Podsumowanie

| Pojęcie | Znaczenie |
|----------|------------|
| **Token** | Elektroniczny klucz potwierdzający logowanie |
| **JWT (JSON Web Token)** | Standardowy format tokenu oparty o JSON |
| **Roszczenia (claims)** | Dane w tokenie – kto, jaka rola, do kiedy ważny |
| **Bearer** | Schemat przesyłania tokenu w nagłówku HTTP |
| **Access Token** | Krótkotrwały token używany przy każdym żądaniu |
| **Refresh Token** | Dłuższy token służący do odświeżenia access tokenu |
| **RFC 7519** | Oficjalna specyfikacja JWT |

---

### 🔹 14. Źródła i materiały dodatkowe

- 📘 [W3Schools – Node.js API Authentication (JWT)](https://www.w3schools.com/nodejs/nodejs_jwt.asp)  
- 📘 [W3Schools – Express.js Tutorial](https://www.w3schools.com/nodejs/nodejs_express.asp)  
- 📗 [RFC 7519 – JSON Web Token (JWT)](https://www.rfc-editor.org/rfc/rfc7519)  
- 🛡️ [OWASP JSON Web Token Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/JSON_Web_Token_Cheat_Sheet_for_Java.html)
