# INF.04 – Materiały dodatkowe: Morgan i Postman

---

## 1. Morgan – co to jest?
**Morgan** to popularne **middleware** dla Express.js, które służy do **logowania zapytań HTTP**.  
Każde żądanie, które trafia do serwera (np. GET, POST, PUT), jest rejestrowane w konsoli lub pliku logów.

### Co loguje Morgan?
- metodę HTTP (GET, POST, PUT, DELETE),  
- ścieżkę (np. `/api/users`),  
- kod odpowiedzi (200, 404, 500…),  
- czas odpowiedzi,  
- rozmiar odpowiedzi.  

---

## 2. Jak używać Morgana?
Najpierw instalacja:
```bash
npm install morgan
```

Następnie dodanie do aplikacji Express:
```js
const express = require('express');
const morgan = require('morgan');
const app = express();

// Użycie Morgana w trybie 'dev' (kolorowe logi w konsoli)
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000, () => console.log('Server działa na porcie 3000'));
```

### Wynik w konsoli przy wejściu na `/`:
```
GET / 200 5.123 ms - 11
```

---

## 3. Zapisywanie logów do pliku
Morgan domyślnie loguje do konsoli, ale można go skonfigurować tak, aby zapisywał logi do pliku.

```js
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

// Utworzenie strumienia zapisu do pliku access.log
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Logowanie w formacie 'combined' i zapis do pliku
app.use(morgan('combined', { stream: accessLogStream }));
```

➡️ Teraz wszystkie żądania będą zapisywane do pliku `access.log`.  

**Format `combined`** zawiera szczegółowe dane: adres IP, datę, metodę, URL, status, user-agent itp.

---

## 4. Postman – co to jest?
**Postman** to aplikacja (darmowa i płatna), która służy do **testowania API**.  
Dzięki niej można:
- wysyłać zapytania HTTP (GET, POST, PUT, DELETE),  
- dodawać nagłówki (np. `Content-Type: application/json`),  
- wysyłać dane w formacie JSON,  
- oglądać odpowiedzi serwera (status, treść, nagłówki),  
- zapisywać kolekcje zapytań do wielokrotnego użycia,  
- automatyzować testy API.  

### Przykład użycia Postmana:
1. Uruchom aplikację Postman.  
2. Wybierz metodę **POST**.  
3. Wpisz adres: `http://localhost:3000/user`.  
4. W zakładce **Body** → wybierz **raw** i format **JSON**.  
5. Wpisz:
```json
{ "name": "Anna", "age": 21 }
```
6. Kliknij **Send** – zobaczysz odpowiedź serwera.  

🔗 Oficjalna strona: [https://www.postman.com/](https://www.postman.com/)

---

## 5. Czy Morgan używa się na egzaminie INF.04?
- **Nie, Morgan nie jest wymagany na egzaminie**.  
- Na egzaminie INF.04 korzysta się głównie z podstawowych funkcji **Node.js i Express** – np. routing, obsługa żądań, praca z bazą danych, sesje, ciasteczka.  
- Morgan jest przydatny w praktyce (szczególnie w prawdziwych projektach), ale na egzaminie raczej nie występuje w zadaniach.  
- Do testowania API na egzaminie można korzystać z **Postmana** (jest dostępny w środowisku egzaminacyjnym).  

---

# ✅ Podsumowanie
- **Morgan** – middleware do logowania żądań HTTP w Express, może logować do konsoli i pliku.  
- **Postman** – aplikacja do testowania API, pozwala wysyłać zapytania i analizować odpowiedzi.  
- **Egzamin INF.04** – Morgan raczej nie występuje, ale Postman jest używany do testowania API.  
