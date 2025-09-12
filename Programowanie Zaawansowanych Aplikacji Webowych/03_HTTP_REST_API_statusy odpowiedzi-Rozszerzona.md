# INF.04 – Karta pracy (lekcje 6–10)

---

## Lekcja 6 (Teoria) – HTTP, REST API, statusy odpowiedzi
**Podstawa programowa: INF.04.7.1(9), 7.2(1)**

### Cele lekcji
- Poznanie zasad działania protokołu HTTP  
- Zrozumienie architektury REST API  
- Poznanie najważniejszych statusów odpowiedzi HTTP  

---

### 1. Protokół HTTP
HTTP (**Hypertext Transfer Protocol**) to podstawowy protokół komunikacji pomiędzy klientem (np. przeglądarką, aplikacją mobilną, aplikacją React) a serwerem (np. Express/Node.js).  
HTTP działa w modelu **request–response**, czyli klient wysyła żądanie, a serwer zwraca odpowiedź.  

**Cechy HTTP:**
- jest protokołem **bezstanowym** (stateless) – każde żądanie jest niezależne, serwer nie pamięta poprzednich interakcji,  
- opiera się na zasadzie **klient–serwer**,  
- działa zazwyczaj na porcie **80** (HTTP) lub **443** (HTTPS),  
- wykorzystuje metody żądań (GET, POST, PUT, DELETE…),  
- może przesyłać dane w formacie tekstowym (HTML, JSON, XML).  

🔗 Źródło: [W3Schools – HTTP Methods](https://www.w3schools.com/tags/ref_httpmethods.asp)

---

### 2. Metody HTTP
Najważniejsze metody żądań HTTP i ich powiązanie z operacjami CRUD:

- **GET** → Read (odczyt danych, np. pobranie listy użytkowników)  
- **POST** → Create (tworzenie nowych danych, np. rejestracja użytkownika)  
- **PUT** → Update (aktualizacja całego zasobu, np. edycja profilu)  
- **PATCH** → Update (częściowa aktualizacja danych)  
- **DELETE** → Delete (usuwanie danych)  

🔗 Źródło: [W3Schools – HTTP Methods](https://www.w3schools.com/tags/ref_httpmethods.asp)

---

### 3. REST API
REST (**Representational State Transfer**) to styl projektowania API oparty na HTTP.

**Cechy REST API:**
- Każdy zasób ma własny URL (np. `/users/1`),  
- API jest **stateless** – serwer nie przechowuje sesji użytkownika między zapytaniami,  
- Operacje CRUD są odwzorowane w metodach HTTP,  
- Dane są często przesyłane w formacie **JSON**,  
- Architektura jest **prosta, skalowalna i niezależna od platformy**.  

🔗 Źródło: [W3Schools – What is REST?](https://www.w3schools.com/whatis/whatis_rest.asp)

---

### 4. Kody statusów HTTP
Kody odpowiedzi HTTP informują, czy żądanie zostało obsłużone poprawnie.

**Kategorie kodów:**
- **1xx** – Informacyjne (np. 100 Continue)  
- **2xx** – Sukces (np. 200 OK, 201 Created)  
- **3xx** – Przekierowania (np. 301 Moved Permanently, 302 Found)  
- **4xx** – Błędy po stronie klienta (np. 400 Bad Request, 401 Unauthorized, 404 Not Found)  
- **5xx** – Błędy po stronie serwera (np. 500 Internal Server Error, 503 Service Unavailable)  

🔗 Źródło: [W3Schools – HTTP Status Messages](https://www.w3schools.com/tags/ref_httpmessages.asp)

---

### Pytania kontrolne
1. Co oznacza REST?  
2. Jaka jest różnica między POST a PUT?  
3. Co oznacza status 404?  
4. Dlaczego REST API powinno być stateless?  
5. Jakie są główne różnice między kodami 4xx a 5xx?  

---

## Lekcje 7–8 (Praktyka) – Obsługa JSON, body-parser, pliki statyczne
**Podstawa programowa: INF.04.7.1(8), 7.3(1)**  
🔗 Źródło: [W3Schools – JSON Introduction](https://www.w3schools.com/js/js_json_intro.asp)

### 1. JSON – teoria
- **JSON (JavaScript Object Notation)** to standardowy format wymiany danych w aplikacjach webowych.  
- Używany do komunikacji **frontend ↔ backend**.  
- Składa się z par klucz–wartość.  
- Najczęściej przesyłany w nagłówkach `Content-Type: application/json`.  

---

### 2. Obsługa JSON w Express
Express domyślnie nie rozumie JSON-a. Do tego służy **middleware** `express.json()`.

```js
const express = require('express');
const app = express();

app.use(express.json());

app.post('/user', (req, res) => {
  const { name, age } = req.body;
  res.json({ message: `Witaj ${name}, masz ${age} lat!` });
});

app.listen(3000, () => console.log('Server działa na porcie 3000'));
```

➡️ Test w Postman:  
`POST http://localhost:3000/user`  
Body → JSON:
```json
{ "name": "Ala", "age": 17 }
```

---

### 3. Body-parser (formularze)
Do danych z formularzy HTML używamy `express.urlencoded()`.

```js
app.use(express.urlencoded({ extended: true }));

app.post('/form', (req, res) => {
  res.send(`Otrzymano: ${req.body.username}`);
});
```

➡️ Formularz HTML:
```html
<form action="/form" method="post">
  <input type="text" name="username" placeholder="Podaj imię">
  <button type="submit">Wyślij</button>
</form>
```

---

### 4. Pliki statyczne
Pliki statyczne to takie, które serwer udostępnia „wprost”, bez przetwarzania – np. HTML, CSS, obrazki, JS.

```js
app.use(express.static('public'));
```

➡️ Teraz każdy plik z katalogu `public/` jest dostępny w przeglądarce.  
Np. `http://localhost:3000/index.html` → otworzy plik `public/index.html`.

**Struktura projektu:**
```
project/
│ server.js
│
└── public/
   │ index.html
   │ style.css
   │ logo.png
```

---

### 5. Pliki statyczne a API – teoria
- `express.static()` działa **równolegle** z trasami API.  
- Kolejność middleware ma znaczenie: Express szuka pliku statycznego → jeśli go nie znajdzie, przechodzi do kolejnych route’ów.  
- Możesz serwować **frontend (np. React build)** i jednocześnie obsługiwać **API**.  

```js
// Pliki statyczne
app.use(express.static('public'));

// API dynamiczne
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Witaj z backendu!' });
});
```

➡️ `http://localhost:3000/index.html` → plik HTML  
➡️ `http://localhost:3000/api/hello` → JSON z backendu

---

## Lekcje 9–10 (Praktyka) – Obsługa błędów w Express, logger
**Podstawa programowa: INF.04.7.3(1)**  
🔗 Źródło: [Express – Error Handling](https://expressjs.com/en/guide/error-handling.html)  
🔗 Źródło: [Express – Morgan](https://expressjs.com/en/resources/middleware/morgan.html)

### Obsługa błędów
```js
app.get('/error', (req, res, next) => {
  const err = new Error('Coś poszło nie tak!');
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
```

### Logger (morgan)
```bash
npm install morgan
```
```js
const morgan = require('morgan');
app.use(morgan('dev'));
```

**Morgan** loguje każde zapytanie HTTP.  
- `dev` – kolorowe logi w konsoli, przydatne podczas nauki.  
- `combined` – szczegółowe logi, używane w aplikacjach produkcyjnych.  

---

## 🛠️ Mini-projekt – Pliki statyczne + API
**Cel:** pokazać, że można równolegle obsługiwać pliki statyczne i zapytania API.

### Struktura projektu
```
project/
│ server.js
└── public/
   │ index.html
   │ style.css
```

### Kod `server.js`
```js
const express = require('express');
const morgan = require('morgan');
const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// Pliki statyczne
app.use(express.static('public'));

// API
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Cześć z API!' });
});

app.post('/api/data', (req, res) => {
  res.json({ otrzymano: req.body });
});

// Obsługa błędów
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Błąd serwera!');
});

app.listen(3000, () => console.log('Server działa na porcie 3000'));
```

### `public/index.html`
```html
<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <title>Mini-projekt Express</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Witaj w aplikacji Express</h1>
  <button onclick="getHello()">Pobierz wiadomość z API</button>
  <p id="result"></p>
  <script>
    async function getHello() {
      const res = await fetch('/api/hello');
      const data = await res.json();
      document.getElementById('result').textContent = data.message;
    }
  </script>
</body>
</html>
```

### `public/style.css`
```css
body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
h1 { color: darkblue; }
button { padding: 10px 20px; font-size: 16px; }
```

➡️ `http://localhost:3000/` → otworzy stronę z przyciskiem.  
➡️ Kliknięcie przycisku wyśle zapytanie do `/api/hello` i pokaże odpowiedź.  

---

# ✅ Podsumowanie
- **JSON** – standard wymiany danych (frontend ↔ backend).  
- **express.json()** – obsługa danych JSON.  
- **express.urlencoded()** – obsługa formularzy HTML.  
- **express.static()** – serwuje pliki statyczne, równocześnie można obsługiwać API.  
- **Morgan** – logowanie żądań.  
- **Obsługa błędów** – centralne middleware przechwytujące błędy.  
