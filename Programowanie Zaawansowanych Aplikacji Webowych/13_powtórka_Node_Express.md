Oto rozszerzony materiał na 45-minutową lekcję powtórzeniową, podzielony na sekcje teorii z przykładami kodu oraz powiązanymi zadaniami do karty pracy, przygotowany na podstawie dostarczonych źródeł.

---

### **1. Wstęp: Node.js, Express i API**
**Teoria:**
Node.js to środowisko, które pozwala uruchamiać JavaScript na serwerze, a nie tylko w przeglądarce. Działa w oparciu o silnik V8 i jest świetne do budowy serwerów API. **API (Application Programming Interface)** to „most” komunikacyjny między aplikacjami. W Internecie najczęściej używamy Web API, gdzie klient wysyła żądanie (request), a serwer odsyła odpowiedź (response), zazwyczaj w formacie JSON. **Express** to lekki framework dla Node.js, który upraszcza routing i obsługę żądań.

*   **Przykład podstawowego serwera:**
```javascript
const express = require('express');
const app = express();
app.use(express.json()); // Middleware do obsługi formatu JSON

app.get('/status', (req, res) => {
  res.json({ status: "ok" }); // Wysyłanie odpowiedzi JSON
});
```

> **Zadanie 1 na kartę pracy:**
> Wyjaśnij własnymi słowami, co to znaczy, że API służy do komunikacji „klient-serwer” i w jakim formacie najczęściej przesyłane są tam dane.
> **Miejsce na odpowiedź:** ____________________________________________________________________

---

### **2. Routing (Trasy)**
**Teoria:**
Routing to mechanizm decydujący o tym, jak aplikacja odpowiada na konkretne żądania HTTP pod określonym adresem URL. Używamy do tego metod:
*   **GET:** pobieranie danych.
*   **POST:** tworzenie nowych danych.
*   **PUT/PATCH:** aktualizacja danych.
*   **DELETE:** usuwanie danych.

*   **Przykład:**
```javascript
app.get('/api/user/:id', (req, res) => {
  const id = req.params.id; // Pobieranie parametru z adresu
  res.send(`Użytkownik o ID: ${id}`);
});
```

> **Zadanie 2 na kartę pracy:**
> Napisz brakujący fragment kodu dla endpointu, który obsłuży żądanie **POST** pod adresem `/api/add` i zwróci status 201 (Created).
> `app.________('/api/add', (req, res) => { res.status(____).send("Dodano"); });`

---

### **3. Middleware – Rodzaje i działanie**
**Teoria:**
Middleware to funkcje pośrednie działające między żądaniem a odpowiedzią. Mogą modyfikować obiekt żądania (`req`), odpowiedzi (`res`) lub kończyć cykl żądania. Jeśli nie kończą cyklu, muszą wywołać funkcję `next()`, aby przekazać kontrolę dalej.

#### **A. Middleware aplikacji (Globalne)**
Działa na każde żądanie trafiające do serwera, niezależnie od ścieżki.
*   **Przykład:** `app.use(express.json());` – parsuje body każdego przychodzącego żądania do formatu JSON.

> **Zadanie 3 na kartę pracy:**
> Stwórz middleware globalny, który dla każdego zapytania wypisze w konsoli aktualną godzinę.
> **Miejsce na odpowiedź:** ____________________________________________________________________

#### **B. Middleware dla konkretnej ścieżki**
Wykonuje się tylko wtedy, gdy adres URL zaczyna się od zdefiniowanego prefiksu.
*   **Przykład:**
```javascript
app.use('/admin', (req, res, next) => {
  console.log("Próba wejścia do panelu administratora");
  next();
});
```

> **Zadanie 4 na kartę pracy:**
> Napisz middleware, który zablokuje dostęp do wszystkich tras zaczynających się od `/private`, wysyłając status 403.
> **Miejsce na odpowiedź:** ____________________________________________________________________

#### **C. Middleware dla konkretnego routingu**
Przekazywany jako argument do konkretnej trasy (np. tylko dla jednego endpointu GET).
*   **Przykład:**
```javascript
const checkToken = (req, res, next) => { /* logika */ next(); };
app.get('/dashboard', checkToken, (req, res) => {
  res.send("Witaj w panelu");
});
```

> **Zadanie 5 na kartę pracy:**
> Masz funkcję `validateUser`. Dopisz ją w odpowiednim miejscu w trasie:
> `app.post('/register', __________, (req, res) => { ... });`

---

### **4. Asynchroniczność: Promises i Async/Await**
**Teoria:**
JavaScript jest jednowątkowy, więc długie operacje (np. pobieranie danych z bazy) nie mogą blokować programu.
*   **Promise (Obietnica):** Reprezentuje wynik operacji w przyszłości. Stany: *pending* (oczekiwanie), *fulfilled* (sukces), *rejected* (błąd).
*   **Async/Await:** Sposób na pisanie kodu asynchronicznego, który wygląda jak sekwencyjny. Słowo `await` „pauzuje” funkcję do czasu rozstrzygnięcia Promise.

*   **Przykład:**
```javascript
async function pobierzDane() {
  try {
    const dane = await jakisPromise();
    console.log(dane);
  } catch (err) {
    console.error("Błąd!");
  }
}
```

> **Zadanie 6 na kartę pracy:**
> Co się stanie, jeśli użyjesz słowa `await` wewnątrz zwykłej funkcji, która nie ma przed sobą słowa `async`?
> **Odpowiedź:** ______________________________________________________________________________

---

### **5. Sesje, Ciasteczka i JWT**
**Teoria:**
Protokół HTTP jest **bezstanowy** – serwer nie „pamięta” klienta między żądaniami.
*   **Ciasteczka (Cookies):** Małe pliki tekstowe zapisane w przeglądarce użytkownika.
*   **Sesje (Sessions):** Dane przechowywane na serwerze, identyfikowane przez unikalne ID sesji (SID) przesłane w ciasteczku.
*   **JWT (JSON Web Token):** Nowoczesny standard tokenów. Składa się z nagłówka, ładunku (danych) i podpisu. Pozwala na autoryzację bez zapisywania sesji na serwerze (stateless).

*   **Przykład JWT:** `Authorization: Bearer <token>`.

> **Zadanie 7 na kartę pracy:**
> Uzupełnij tabelę porównawczą:
> | Cecha | Ciasteczka | Sesje | JWT |
> | :--- | :--- | :--- | :--- |
> | Gdzie są dane? | Przeglądarka | Serwer | Klient (w tokenie) |
> | Czy serwer musi je pamiętać? | Nie | Tak (w RAM/bazie) | ________ |

---

### **Podsumowanie i ostatnie zadanie**
> **Zadanie 8 (Finałowe):**
> Wyjaśnij, dlaczego flaga `httpOnly` w ciasteczkach jest ważna dla bezpieczeństwa?
> **Odpowiedź:** ______________________________________________________________________________