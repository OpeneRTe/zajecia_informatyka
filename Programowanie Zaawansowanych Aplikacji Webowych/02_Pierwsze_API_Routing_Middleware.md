# 02. Pierwsze API – Routing i Middleware w Express

## 🎯 Cele lekcji
- Zrozumieć pojęcie **API** i jego rolę w aplikacjach webowych.  
- Nauczyć się definiować **routing** w Express (GET, POST, PUT, DELETE).  
- Poznać działanie i zastosowanie **middleware**.  
- Stworzyć pierwsze API krok po kroku.  
- Wykonać praktyczne ćwiczenia z budowy API.  

---

## 📘 Teoria

### 1. Co to jest API?
- **API (Application Programming Interface)** – interfejs umożliwiający komunikację pomiędzy programami.  
- W kontekście aplikacji webowych najczęściej chodzi o **Web API**, które działa w oparciu o protokół HTTP.  
- Klient (np. przeglądarka, aplikacja mobilna, inna usługa) wysyła **żądanie** (request), a serwer odsyła **odpowiedź** (response).  
- API zwykle zwraca dane w formacie **JSON** (JavaScript Object Notation).  

📌 **Przykłady użycia API:**  
- Strona pogodowa pobiera dane z API serwisu meteorologicznego.  
- Aplikacja mobilna banku komunikuje się z serwerem przez API.  
- Google Maps udostępnia API do wyszukiwania lokalizacji.  

---

### 2. Routing w Express
- **Routing** to mechanizm decydujący, jak aplikacja odpowiada na różne żądania HTTP.  
- W Express do definiowania tras służą metody:
  - `app.get(path, handler)` – obsługa żądania GET (np. pobranie danych)  
  - `app.post(path, handler)` – obsługa żądania POST (np. dodanie danych)  
  - `app.put(path, handler)` – obsługa żądania PUT (np. edycja danych)  
  - `app.delete(path, handler)` – obsługa żądania DELETE (np. usunięcie danych)  

Handler (funkcja) przyjmuje 2 parametry:
- `req` – obiekt żądania (request), zawiera np. adres, parametry, body.  
- `res` – obiekt odpowiedzi (response), umożliwia odesłanie danych.  

📌 **Przykład – prosty routing:**
```js
app.get('/hello', (req, res) => {
  res.send('Witaj w moim API!');
});
```

---

### 3. Metody HTTP i ich zastosowanie
- **GET** – pobieranie danych (np. lista użytkowników).  
- **POST** – tworzenie nowego zasobu (np. dodanie użytkownika).  
- **PUT** – aktualizacja istniejącego zasobu (np. zmiana danych użytkownika).  
- **DELETE** – usunięcie zasobu (np. usunięcie użytkownika).  

📌 Dobre API powinno używać metod zgodnie z konwencją REST.  

---

### 4. Middleware – co to jest?
- **Middleware** to specjalna funkcja pośrednia, która działa **pomiędzy żądaniem klienta a odpowiedzią serwera**.  
- Każde żądanie przechodzi przez kolejne warstwy middleware zanim dotrze do swojego routingu.  
- Middleware może:
  - analizować żądanie (np. sprawdzić nagłówki, ciało zapytania)  
  - modyfikować dane żądania lub odpowiedzi  
  - logować informacje  
  - zatrzymać dalsze przetwarzanie i zwrócić odpowiedź (np. w przypadku błędu, braku uprawnień)  
  - przekazać kontrolę dalej za pomocą funkcji `next()`  

---

### 5. Schemat działania middleware
```
Klient -> Middleware 1 -> Middleware 2 -> Routing -> Middleware błędu -> Odpowiedź
```

- Jeśli **middleware nie wywoła `next()`**, przetwarzanie zostaje zatrzymane.  
- Kolejność definiowania middleware ma ogromne znaczenie.  

---

### 6. Rodzaje middleware
1. **Middleware aplikacji** – działa globalnie na wszystkie trasy.  
   ```js
   app.use((req, res, next) => {
     console.log('Middleware globalny');
     next();
   });
   ```
2. **Middleware dla konkretnej ścieżki**  
   ```js
   app.use('/admin', (req, res, next) => {
     console.log('Sprawdzam dostęp do /admin');
     next();
   });
   ```
3. **Middleware dla konkretnego routingu**  
   ```js
   app.get('/secret', (req, res, next) => {
     console.log('Weryfikacja dostępu');
     next();
   }, (req, res) => {
     res.send('Sekretne dane');
   });
   ```
4. **Wbudowane middleware** (np. `express.json()`, `express.static()`).  
5. **Zewnętrzne middleware** – instalowane paczki, np.:
   - `morgan` – logowanie żądań  
   - `cookie-parser` – obsługa ciasteczek  
   - `helmet` – bezpieczeństwo  

---

### 7. Typowe zastosowania middleware
- **Logowanie** – zapisywanie do konsoli lub pliku, kto i kiedy odwiedził API.  
- **Obsługa błędów** – przechwytywanie wyjątków i wysyłanie informacji do klienta.  
- **Autoryzacja i uwierzytelnianie** – sprawdzanie czy użytkownik ma prawo do zasobów.  
- **Analiza danych** – np. zamiana `req.body` (JSON) na obiekt JS.  
- **Serwowanie plików statycznych** – np. zdjęć, CSS, JavaScript.  

---

## 🛠️ Ćwiczenia praktyczne

### 🔹 Lekcja 1 (45 min) – Pierwsze API
Utwórz serwer Express z prostą trasą GET `/`, która zwróci tekst „Pierwsze API działa”.

---

### 🔹 Lekcja 2 (45 min) – API zwracające JSON
1. Utwórz trasę `/api/user`, która zwróci obiekt użytkownika w JSON.  
2. Utwórz trasę `/api/products`, która zwróci tablicę produktów.  
3. Sprawdź odpowiedzi w przeglądarce.  

---

### 🔹 Lekcja 3 (45 min) – Middleware i POST
1. Dodaj middleware logujący metodę i ścieżkę.  
2. Dodaj middleware `express.json()`, aby odczytywać dane przesłane w POST.  
3. Utwórz trasę POST `/api/data`, która odbierze dane i odeśle je w JSON.  

---

### 🔹 Lekcja 4 (45 min) – Zadanie projektowe
**Zadanie dla ucznia:**  
1. Utwórz mini-API samochodów z trasami:
   - GET `/api/cars` – lista samochodów,  
   - POST `/api/cars` – dodanie nowego samochodu,  
   - PUT `/api/cars/:id` – edycja samochodu,  
   - DELETE `/api/cars/:id` – usunięcie samochodu.  
2. Dodaj middleware, który mierzy czas obsługi żądania i wypisuje go w konsoli.  
3. Dodaj middleware, który zwróci błąd 403, jeśli użytkownik spróbuje wejść na `/admin`.  

---

## ✅ Podsumowanie
- API to interfejs komunikacji – w Express tworzony przez routing.  
- Middleware to funkcje pośrednie, które filtrują i obsługują żądania.  
- Kolejność middleware ma znaczenie.  
- Typowe zastosowania: logowanie, obsługa błędów, autoryzacja, przetwarzanie danych.  
- Potrafimy stworzyć pierwsze API z routingiem i middleware.  
