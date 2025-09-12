# INF.04 – Karta pracy (lekcje 6–10)

---

## Lekcja 6 (Teoria) – HTTP, REST API, statusy odpowiedzi
**Podstawa programowa: INF.04.7.1(9), 7.2(1)**

### Cele lekcji
- Poznanie zasad działania protokołu HTTP  
- Zrozumienie architektury REST API  
- Poznanie najważniejszych statusów odpowiedzi HTTP  

---

### 1. Protokół HTTP – wyjaśnienie
HTTP (**Hypertext Transfer Protocol**) to podstawowy protokół wymiany danych w Internecie.  
Jest on używany do komunikacji pomiędzy **klientem** (np. przeglądarką, aplikacją React, Postman) a **serwerem** (np. Express w Node.js).  

**Cechy HTTP:**
- **Bezstanowość (stateless):** każde żądanie jest niezależne. Serwer nie pamięta poprzednich interakcji użytkownika.  
- **Model klient–serwer:** klient wysyła żądania, serwer odpowiada.  
- **Porty:** standardowo działa na porcie **80** (HTTP) i **443** (HTTPS – szyfrowane).  
- **Różne formaty danych:** HTML, CSS, JSON, XML, pliki graficzne.  

**Schemat działania:**  
1. Klient (np. przeglądarka) wysyła zapytanie HTTP do serwera.  
2. Serwer analizuje zapytanie i przygotowuje odpowiedź.  
3. Klient otrzymuje odpowiedź (np. stronę HTML, plik JSON).  

🔗 Źródło: [W3Schools – HTTP Methods](https://www.w3schools.com/tags/ref_httpmethods.asp)

---

### 2. Metody HTTP – teoria i praktyka
Najważniejsze metody i ich odpowiedniki w operacjach CRUD:

- **GET** → Read → pobieranie danych (np. pobranie listy produktów).  
- **POST** → Create → tworzenie nowych danych (np. rejestracja użytkownika).  
- **PUT** → Update → aktualizacja całego zasobu (np. pełna edycja profilu).  
- **PATCH** → Update → częściowa aktualizacja danych (np. zmiana jednego pola).  
- **DELETE** → Delete → usunięcie danych (np. usunięcie konta).  

🔗 Źródło: [W3Schools – HTTP Methods](https://www.w3schools.com/tags/ref_httpmethods.asp)

---

### 3. REST API – wyjaśnienie
REST (**Representational State Transfer**) to **styl architektury** budowania API. Nie jest technologią, tylko zestawem zasad.

**Cechy REST API:**
- Każdy zasób ma własny unikalny URL (np. `/users/1`).  
- API powinno być **stateless** – każde żądanie zawiera wszystkie dane potrzebne do jego obsługi (np. token JWT).  
- Metody HTTP odwzorowują operacje CRUD.  
- Dane przesyłane są najczęściej w formacie JSON.  
- REST pozwala na prostą integrację systemów (frontend–backend, aplikacje mobilne, serwisy internetowe).  

🔗 Źródło: [W3Schools – What is REST?](https://www.w3schools.com/whatis/whatis_rest.asp)

---

### 4. Kody statusów HTTP – teoria
Kody statusów HTTP informują, jaki był wynik obsługi żądania.

**Kategorie:**
- **1xx – Informacyjne** (np. 100 Continue)  
- **2xx – Sukces** (np. 200 OK, 201 Created)  
- **3xx – Przekierowania** (np. 301 Moved Permanently, 302 Found)  
- **4xx – Błędy klienta** (np. 400 Bad Request, 401 Unauthorized, 404 Not Found)  
- **5xx – Błędy serwera** (np. 500 Internal Server Error, 503 Service Unavailable)  

**Przykład w Express:**
```js
app.get('/ok', (req, res) => {
  res.status(200).json({ message: 'Sukces!' });
});

app.post('/created', (req, res) => {
  res.status(201).json({ message: 'Utworzono nowy zasób!' });
});

app.get('/error', (req, res) => {
  res.status(500).json({ error: 'Błąd serwera' });
});
```

🔗 Źródło: [W3Schools – HTTP Status Messages](https://www.w3schools.com/tags/ref_httpmessages.asp)

---

### Pytania kontrolne
1. Co oznacza REST i jakie są jego zasady?  
2. Jaka jest różnica między POST a PUT?  
3. Co oznacza status 404?  
4. Dlaczego REST API powinno być stateless?  
5. Jakie są różnice między błędami klienta (4xx) a serwera (5xx)?  

---

## Lekcje 7–8 (Praktyka) – Obsługa JSON, body-parser, pliki statyczne
**Podstawa programowa: INF.04.7.1(8), 7.3(1)**  
🔗 Źródło: [W3Schools – JSON Introduction](https://www.w3schools.com/js/js_json_intro.asp)

### JSON – teoria
- JSON to najczęściej używany format wymiany danych w aplikacjach webowych.  
- Jest prosty, czytelny i uniwersalny.  
- Dane JSON można przesyłać w ciele zapytania (`req.body`).

### Obsługa JSON w Express
Express używa `express.json()` aby zamienić dane z formatu JSON na obiekt JS.  
Dzięki temu mamy dostęp do `req.body`.  

```js
app.use(express.json());

app.post('/user', (req, res) => {
  const { name, age } = req.body;
  res.json({ message: `Witaj ${name}, masz ${age} lat!` });
});
```

➡️ Test w Postman → `POST http://localhost:3000/user`  
Body:
```json
{ "name": "Ala", "age": 17 }
```

---

### Body-parser – teoria i praktyka
Dawniej używano zewnętrznej paczki `body-parser`. Dziś jest wbudowana w Express.  
- `express.json()` – obsługa JSON.  
- `express.urlencoded()` – obsługa danych formularzy HTML.

```js
app.use(express.urlencoded({ extended: true }));

app.post('/form', (req, res) => {
  res.send(`Dostałem dane: ${req.body.username}`);
});
```

Formularz HTML:
```html
<form action="/form" method="post">
  <input type="text" name="username" placeholder="Podaj imię">
  <button type="submit">Wyślij</button>
</form>
```

---

### Pliki statyczne – teoria
- To pliki udostępniane użytkownikowi **bez przetwarzania**: HTML, CSS, JS, obrazy.  
- `express.static()` umożliwia serwowanie takich plików.  
- Pliki statyczne **nie blokują** obsługi innych tras (API).  
- Kolejność middleware ma znaczenie – Express najpierw sprawdza, czy plik istnieje. Jeśli nie, przechodzi do kolejnych tras.

```js
app.use(express.static('public'));
```

Struktura:
```
project/
│ server.js
└── public/
   │ index.html
   │ style.css
   │ logo.png
```

➡️ `http://localhost:3000/index.html` → otwiera plik HTML  
➡️ Jeśli plik nie istnieje, Express sprawdzi kolejne route’y (np. `/api/...`).  

---

### Mini-projekt – pliki statyczne + API
**Cel:** pokazać, że można równolegle obsługiwać pliki statyczne i API.

```js
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Cześć z API!' });
});

app.post('/api/data', (req, res) => {
  res.json({ otrzymano: req.body });
});

app.listen(3000, () => console.log('Server działa na porcie 3000'));
```

➡️ `http://localhost:3000/` → strona statyczna (np. index.html).  
➡️ `http://localhost:3000/api/hello` → JSON z backendu.  

---

## Lekcje 9–10 (Praktyka) – Obsługa błędów w Express, logger
**Podstawa programowa: INF.04.7.3(1)**  
🔗 Źródło: [Express – Error Handling](https://expressjs.com/en/guide/error-handling.html)  
🔗 Źródło: [Express – Morgan](https://expressjs.com/en/resources/middleware/morgan.html)

### Obsługa błędów w Express
Express ma specjalne middleware do błędów – musi mieć 4 parametry `(err, req, res, next)`.

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

### Logger (Morgan)
Morgan to middleware logujący każde zapytanie HTTP.  
- `dev` → kolorowe logi w konsoli (szybka diagnostyka).  
- `combined` → szczegółowe logi (do produkcji, np. zapisywane w pliku).  

```bash
npm install morgan
```
```js
const morgan = require('morgan');
app.use(morgan('dev'));
```

---

# ✅ Podsumowanie
- HTTP to podstawowy protokół wymiany danych (request–response).  
- REST API to styl architektury oparty na HTTP i zasadzie stateless.  
- JSON to najważniejszy format wymiany danych frontend–backend.  
- express.json() i express.urlencoded() służą do obsługi danych w backendzie.  
- express.static() pozwala na serwowanie plików statycznych **równolegle** z obsługą API.  
- Middleware Morgan loguje każde żądanie.  
- Middleware błędów w Express pozwala centralnie obsłużyć wyjątki.  
