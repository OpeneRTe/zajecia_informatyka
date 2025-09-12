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

### Ćwiczenie 1 – Obsługa JSON
```js
const express = require('express');
const app = express();

app.use(express.json()); // body-parser wbudowany w Express

app.post('/hello', (req, res) => {
  const { name } = req.body;
  res.json({ message: `Witaj ${name}!` });
});

app.listen(3000, () => console.log('Server działa na porcie 3000'));
```
➡️ Przetestuj w **Postman**:  
`POST http://localhost:3000/hello`  
Body → JSON:
```json
{
  "name": "Jan"
}
```

---

### Ćwiczenie 2 – Pliki statyczne
```js
app.use(express.static('public'));
```
➡️ Umieść plik **index.html** w folderze `public/` i sprawdź w przeglądarce:  
[http://localhost:3000](http://localhost:3000)

---

## Lekcje 9–10 (Praktyka) – Obsługa błędów w Express, logger
**Podstawa programowa: INF.04.7.3(1)**  
🔗 Źródło: [Express – Error Handling](https://expressjs.com/en/guide/error-handling.html)  
🔗 Źródło: [Express – Morgan](https://expressjs.com/en/resources/middleware/morgan.html)

### Ćwiczenie 1 – Obsługa błędów
```js
app.get('/error', (req, res, next) => {
  const err = new Error('Coś poszło nie tak!');
  next(err);
});

// Middleware do obsługi błędów
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
```

**Wyjaśnienie:**  
- Express rozpoznaje middleware obsługujące błędy po **czterech argumentach** `(err, req, res, next)`.  
- Funkcja `next(err)` przekazuje błąd do tego middleware.  
- Dzięki temu możesz centralnie obsłużyć wszystkie wyjątki w aplikacji i zwrócić odpowiedni status.  

---

### Ćwiczenie 2 – Logger (morgan)
Instalacja:
```bash
npm install morgan
```
Użycie:
```js
const morgan = require('morgan');
app.use(morgan('dev'));
```

**Wyjaśnienie:**  
- **Morgan** to middleware do logowania zapytań HTTP.  
- Format `dev` wyświetla kolorowe logi w konsoli (metoda, status, czas odpowiedzi).  
- Format `combined` jest szczegółowy i nadaje się do produkcji.  
- `morgan` można skonfigurować, aby zapisywał logi do pliku (np. `access.log`).  

---

# ✅ Podsumowanie
- **Lekcja 6 (Teoria):** HTTP, REST API, statusy odpowiedzi  
- **Lekcje 7–8 (Praktyka):** Obsługa JSON, body-parser, pliki statyczne  
- **Lekcje 9–10 (Praktyka):** Obsługa błędów w Express, logger (morgan)  
