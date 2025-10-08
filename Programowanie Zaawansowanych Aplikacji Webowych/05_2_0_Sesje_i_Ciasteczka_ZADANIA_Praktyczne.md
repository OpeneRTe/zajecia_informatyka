# Sesje i ciasteczka — ZADANIA PRAKTYCZNE (PHP oraz Node.js/Express)
INF.04.7.1(19), INF.04.7.3(2)

> Cel: wyćwiczenie mechanizmu **cookies** i **sesji** w dwóch stosach (PHP oraz Node.js/Express).  
> Sposób oddania: repo/folder z kodem + krótkie notatki z testów (zrzuty ekranu lub logi z cURL).  
> Czas łączny sugerowany: 2 × 45 min.  
> Wymagania kluczowe: poprawne nagłówki HTTP, bezpieczne atrybuty ciasteczek, poprawne zarządzanie sesją.

---

## Zasady ogólne (dla obu stosów)
- Zastosuj **ciasteczka** do zapamiętywania preferencji (np. język interfejsu).
- Zastosuj **sesję** do przechowywania informacji o użytkowniku (np. zalogowany login, koszyk).
- W testach używaj **cURL** oraz zwykłej przeglądarki.
- W miarę możliwości skonfiguruj bezpieczne atrybuty ciasteczek: `HttpOnly`, `Secure` (dla HTTPS), `SameSite=Strict/Lax`.
- Użyj **statusów HTTP** adekwatnych do sytuacji (200, 201, 302, 400, 401, 403, 404).

---

## Zadanie 1 — „Preferencje w ciasteczku” (poziom start)
**Opis:**  
Utwórz endpoint ustawiający ciasteczko `language` (np. `pl`, `en`) oraz endpoint, który odczytuje jego wartość i zwraca prostą stronę lub JSON z informacją o wybranym języku.

**Wymagania techniczne:**  
- Endpoint: `GET /set-language?lang=pl|en` — ustawia ciasteczko `language` (ważność 1h).  
- Endpoint: `GET /get-language` — odczytuje i zwraca `{"language": "<wartość>"}` lub stronę z tekstem.  
- Atrybuty ciasteczka: `HttpOnly=true`, `SameSite=Lax`, `Path=/`.  
- Dla HTTPS (jeśli masz lokalny certyfikat) dodaj `Secure=true`.

**Testy (cURL):**
```bash
# ustawienie
curl -i -X GET "http://localhost:3000/set-language?lang=pl"

# odczyt (z zachowaniem cookies między wywołaniami; w bash możesz użyć -c/-b)
curl -i -X GET "http://localhost:3000/get-language" -c cookies.txt -b cookies.txt
```

**Kryteria oceny:**  
- [ ] Ciasteczko ustawione prawidłowo (nagłówek `Set-Cookie`).  
- [ ] Odczyt działa, gdy ciasteczko jest obecne.  
- [ ] Domyślna wartość (np. `unknown`), gdy ciasteczko nie istnieje.  
- [ ] Atrybuty bezpieczeństwa zastosowane.

---

## Zadanie 2 — „Logowanie z sesją” (poziom podstawowy)
**Opis:**  
Zaimplementuj proste logowanie oparte o **sesję**. Dopuszczalne jest „udawane” konto w pamięci procesu lub prosta tablica (`login: admin`, `hasło: zaq1@WSX`).

**Wymagania techniczne:**  
- Endpoint: `POST /login` — przyjmuje `email/login` i `password` (JSON albo `application/x-www-form-urlencoded`).  
- Po poprawnym logowaniu: zapisz w **sesji** obiekt `{ user: "<login>" }`.  
- Endpoint: `GET /me` — zwraca dane zalogowanego użytkownika na podstawie sesji.  
- Endpoint: `POST /logout` — niszczy sesję i czyści identyfikator.  
- Statusy HTTP: `401` dla niepoprawnych danych/niezalogowanego użytkownika.

**Testy (cURL, JSON):**
```bash
# logowanie (z zapisem ciasteczek sesyjnych do pliku)
curl -i -X POST "http://localhost:3000/login" \
  -H "Content-Type: application/json" \
  -d '{"login":"admin","password":"zaq1@WSX"}' \
  -c cookies.txt

# sprawdzenie zalogowania
curl -i -X GET "http://localhost:3000/me" -b cookies.txt

# wylogowanie
curl -i -X POST "http://localhost:3000/logout" -b cookies.txt
```

**Kryteria oceny:**  
- [ ] Poprawna walidacja danych wejściowych.  
- [ ] Poprawne utrzymanie sesji między żądaniami (ciasteczko z ID sesji).  
- [ ] Wylogowanie usuwa dane sesji.  
- [ ] Statusy HTTP zgodne z przypadkami.

---

## Zadanie 3 — „Koszyk w sesji” (poziom średni)
**Opis:**  
Zaimplementuj **koszyk** przechowywany w sesji. Dodawanie produktów, podgląd zawartości, usuwanie, czyszczenie.

**Wymagania techniczne:**  
- Endpoint: `POST /cart/add` — body z `productId`, opcjonalnie `qty` (domyślnie 1). Dodaje do `req.session.cart`.  
- Endpoint: `GET /cart` — zwraca zawartość koszyka: tablica pozycji i suma ilości.  
- Endpoint: `POST /cart/remove` — usuwa pozycję po `productId`.  
- Endpoint: `POST /cart/clear` — czyści koszyk (np. po złożeniu zamówienia).  
- Walidacja: `productId` obowiązkowy, `qty` > 0.  
- Zwracaj JSON: `{ items: [...], totalQty: n }`.

**Testy (cURL):**
```bash
# dodajemy produkt 101, qty 2
curl -i -X POST "http://localhost:3000/cart/add" \
  -H "Content-Type: application/json" \
  -d '{"productId":101,"qty":2}' -c cookies.txt

# podgląd koszyka
curl -i -X GET "http://localhost:3000/cart" -b cookies.txt

# usunięcie pozycji
curl -i -X POST "http://localhost:3000/cart/remove" \
  -H "Content-Type: application/json" \
  -d '{"productId":101}' -b cookies.txt

# czyszczenie
curl -i -X POST "http://localhost:3000/cart/clear" -b cookies.txt
```

**Kryteria oceny:**  
- [ ] Działają wszystkie operacje (add/get/remove/clear).  
- [ ] Koszyk utrzymuje się między żądaniami (sesja).  
- [ ] Zwracane są sensowne kody i komunikaty błędów.

---

## Zadanie 4 — „Strefy dostępu” (poziom średni+)
**Opis:**  
Zaprogramuj **middleware** (lub filtr w PHP), który wpuszcza do `/admin/*` tylko użytkownika zalogowanego i o roli `admin` (rolę trzymaj w sesji).

**Wymagania techniczne:**  
- Dla niezalogowanych — `302` na `/login` (w aplikacji HTML) lub `401` w API.  
- Dla zalogowanych bez uprawnień — `403`.  
- Dla admina — wpuść do zasobu.  
- Dodaj prosty widok/JSON „Panel admina” dla ścieżki `/admin/dashboard`.

**Kryteria oceny:**  
- [ ] Poprawne rozróżnienie: niezalogowany vs. brak uprawnień.  
- [ ] Bramka dostępu przed zasobem (`/admin/*`).  
- [ ] Testy potwierdzające każde zachowanie.

---

## Zadanie 5 — „Twardnienie ciasteczek i sesji” (poziom zaawansowany)
**Opis:**  
Zaimplementuj ustawienia bezpieczeństwa: `SameSite`, `HttpOnly`, `Secure`, odpowiedni `Path`, rozsądny `Max-Age`. Zademonstruj też **ochronę przed CSRF** w jednym z POST-ów (np. `/cart/add`).

**Wymagania techniczne:**  
- Włącz atrybuty ciasteczek w całej aplikacji.  
- Dodaj prosty **token CSRF** przechowywany w sesji i wymagany w nagłówku (np. `X-CSRF-Token`) przy żądaniach mutujących.  
- Niepoprawny/Brak tokenu → `403`.

**Kryteria oceny:**  
- [ ] Atrybuty ciasteczek ustawione globalnie.  
- [ ] Działa weryfikacja CSRF (token losowy, inny per sesja).  
- [ ] Poprawne statusy HTTP.

---

# ŚCIEŻKI IMPLEMENTACYJNE

## A) PHP — wskazówki (mini‑dokumentacja)
- Włącz sesję na początku skryptu: `session_start();`.  
- Ciasteczko ustawisz: `setcookie("language", "pl", time()+3600, "/", "", false, true);`  
  - Parametry: nazwa, wartość, wygaśnięcie, ścieżka, domena, `secure`, `httponly`.  
- Przechowuj koszyk w `$_SESSION['cart']` (tablica asocjacyjna `productId => qty`).  
- Do CSRF możesz wygenerować token i wstawić w formularzach jako ukryte pole (`<input type="hidden" name="csrf">`) lub użyć nagłówka przy AJAX.  
- Rozsądna struktura plików:
```
/public
  index.php
  login.php
  logout.php
  cart_add.php
  cart.php
  cart_remove.php
  cart_clear.php
  admin_dashboard.php
/includes
  session.php    (start + wspólne ustawienia)
  auth.php       (sprawdzenie ról, middleware)
  csrf.php       (generowanie/weryfikacja tokenu)
```

**Przykładowy fragment (PHP):**
```php
// includes/session.php
<?php
session_set_cookie_params([
  'lifetime' => 3600,
  'path' => '/',
  'domain' => '',
  'secure' => false,     // true przy HTTPS
  'httponly' => true,
  'samesite' => 'Lax'
]);
session_start();

// includes/csrf.php
<?php
function csrf_token() {
  if (empty($_SESSION['csrf'])) {
    $_SESSION['csrf'] = bin2hex(random_bytes(32));
  }
  return $_SESSION['csrf'];
}
function csrf_verify($token) {
  return isset($_SESSION['csrf']) && hash_equals($_SESSION['csrf'], $token ?? '');
}
```

---

## B) Node.js + Express — wskazówki (mini‑dokumentacja)
**Instalacja:**
```bash
npm init -y
npm install express cookie-parser express-session
```

**Struktura plików (sugestia):**
```
server.js
routes/
  auth.js
  cart.js
  prefs.js
middleware/
  auth.js
  csrf.js
```

**Konfiguracja sesji (Express):**
```js
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(session({
  name: 'connect.sid',
  secret: 'bardzo_tajny_klucz',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    // secure: true, // włącz przy HTTPS
    maxAge: 60 * 60 * 1000
  }
}));

// prefs
app.get('/set-language', (req, res) => {
  const { lang } = req.query;
  res.cookie('language', lang || 'pl', {
    httpOnly: true,
    sameSite: 'lax',
    // secure: true,
    maxAge: 60 * 60 * 1000,
    path: '/'
  });
  res.status(200).json({ ok: true });
});

app.get('/get-language', (req, res) => {
  res.json({ language: req.cookies.language || 'unknown' });
});

// auth (very basic)
const USERS = [{ login: 'admin', password: 'zaq1@WSX', role: 'admin' }];

app.post('/login', (req, res) => {
  const { login, password } = req.body || {};
  const user = USERS.find(u => u.login === login && u.password === password);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  req.session.user = { login: user.login, role: user.role };
  res.status(200).json({ ok: true });
});

app.get('/me', (req, res) => {
  if (!req.session.user) return res.status(401).json({ error: 'unauthorized' });
  res.json({ user: req.session.user });
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => res.status(200).json({ ok: true }));
});

// cart in session
app.post('/cart/add', (req, res) => {
  const { productId, qty = 1 } = req.body || {};
  if (!productId || qty <= 0) return res.status(400).json({ error: 'bad input' });
  const cart = (req.session.cart ||= {});
  cart[productId] = (cart[productId] || 0) + qty;
  res.status(201).json({ items: cart });
});

app.get('/cart', (req, res) => {
  const cart = req.session.cart || {};
  const totalQty = Object.values(cart).reduce((a, b) => a + b, 0);
  res.json({ items: cart, totalQty });
});

app.post('/cart/remove', (req, res) => {
  const { productId } = req.body || {};
  const cart = req.session.cart || {};
  if (!productId || !cart[productId]) return res.status(404).json({ error: 'not found' });
  delete cart[productId];
  res.json({ items: cart });
});

app.post('/cart/clear', (req, res) => {
  req.session.cart = {};
  res.json({ items: {} });
});

// role guard
function requireAdmin(req, res, next) {
  if (!req.session.user) return res.status(401).json({ error: 'unauthorized' });
  if (req.session.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
  next();
}

app.get('/admin/dashboard', requireAdmin, (req, res) => {
  res.json({ panel: 'admin' });
});

// very simple CSRF (for demo)
function csrfToken(req) {
  if (!req.session.csrf) req.session.csrf = require('crypto').randomBytes(32).toString('hex');
  return req.session.csrf;
}
app.get('/csrf', (req, res) => res.json({ token: csrfToken(req) }));

function verifyCsrf(req, res, next) {
  const token = req.get('X-CSRF-Token');
  if (!token || token !== req.session.csrf) return res.status(403).json({ error: 'bad csrf' });
  next();
}

app.post('/cart/add-protected', verifyCsrf, (req, res) => {
  const { productId, qty = 1 } = req.body || {};
  if (!productId || qty <= 0) return res.status(400).json({ error: 'bad input' });
  const cart = (req.session.cart ||= {});
  cart[productId] = (cart[productId] || 0) + qty;
  res.status(201).json({ items: cart });
});

app.listen(3000, () => console.log('http://localhost:3000'));
```

---

## Rubryka oceny (propozycja, 30 pkt)
- Poprawne ciasteczka (ustawienie/odczyt + atrybuty) — **6 pkt**  
- Logowanie z sesją (login/me/logout + statusy) — **8 pkt**  
- Koszyk w sesji (add/get/remove/clear + walidacja) — **8 pkt**  
- Strefy dostępu (middleware/role 401/403) — **4 pkt**  
- CSRF + „twardnienie” ciasteczek — **4 pkt**

**Razem: 30 pkt**

---

## Co oddać?
1. Kod źródłowy (PHP i/lub Node.js).  
2. Plik `TESTY.md` z wyjściami poleceń cURL (lub zrzuty ekranu).  
3. Krótka notatka: jak uruchomić (komenda, port, zależności).

> **Uwaga (egzamin INF.04):** Na praktyce liczy się czytelny kod, spójne statusy HTTP, poprawna obsługa ciasteczek/sesji i prosta dokumentacja uruchomienia.
