

# 🚀 LEKCJA: Mistrz Middleware w Node.js

## 📝 CZĘŚĆ 1: Co to jest Middleware i jak jest zbudowany?

Wyobraź sobie, że serwer Express.js to **restauracja**.

1. Klient składa zamówienie (**Request - `req**`).
2. Zanim kucharz wyda gotowe danie (**Response - `res**`), zamówienie przechodzi przez ręce kelnera, managera i pomocnika kuchennego.

Każda z tych osób to **middleware** – funkcja, która stoi na drodze zapytania i może coś sprawdzić, dodać lub zmodyfikować.

### Anatomia Middleware

Każdy middleware w Node.js to funkcja, która przyjmuje **trzy argumenty**:

```javascript
app.use((req, res, next) => {
    // 1. REQ - obiekt żądania (tu są informacje OD użytkownika, np. co wpisał w URL)
    // 2. RES - obiekt odpowiedzi (stąd wysyłamy dane z serwera DO użytkownika)
    // 3. NEXT - funkcja-przekaźnik (mówi serwerowi: "Ja skończyłem, idź do kolejnego kroku!")
});

```

---

## 🛠️ CZĘŚĆ 2: Rozgrzewka – 5 Zadań Uzupełnianki (Krok po Kroku)

*Uczniowie kopiują poniższy kod i uzupełniają luki oznaczone jako `???`.*

### Zadanie 1: "Przepustka"

**Cel:** Serwer po wejściu na stronę główną wiesza się. Dopisz brakujące polecenie, które pozwoli przejść do kolejnej funkcji.

```javascript
app.use((req, res, next) => {
    console.log("Ktoś puka do serwera...");
    // ??? Uruchom funkcję, która przekaże żądanie dalej
});

```

### Zadanie 2: "Detektyw Metod"

**Cel:** Chcemy wiedzieć, jaką metodą (GET, POST itp.) użytkownik uderza w serwer. Wyciągnij tę informację z obiektu żądania.

```javascript
app.use((req, res, next) => {
    // ??? Po kropce w obiekcie req wpisz odpowiednią właściwość (metodę HTTP)
    console.log(`Wykryto żądanie typu: ${req.???}`); 
    next();
});

```

### Zadanie 3: "Znakowanie Czasu"

**Cel:** Chcemy do każdego żądania dopisać czas jego odebrania, aby kolejne funkcje miały do tego dostęp. Wskocz do środka obiektu `req`.

```javascript
app.use((req, res, next) => {
    // Tworzymy nową, własną właściwość o nazwie 'czas' w obiekcie req
    req.czas = new Date().toLocaleTimeString();
    next();
});

// W kolejnym punkcie programu używamy tej właściwości:
app.get('/status', (req, res) => {
    // ??? Wyciągnij zapisany wcześniej czas z obiektu żądania
    res.send(`Serwer działa! Czas odebrania zapytania: ${req.???}`);

```

### Zadanie 4: "Bramkarz (Prosta Autoryzacja)"

**Cel:** Jeśli użytkownik nie jest zalogowany, zablokuj go i wyślij mu komunikat błędu, używając obiektu odpowiedzi.

```javascript
let czyZalogowany = false; // Zmień na true, aby przetestować drugą opcję

app.use('/profil', (req, res, next) => {
    if (czyZalogowany) {
        next();
    } else {
        // ??? Użyj obiektu res i metody wysyłającej tekst, by odesłać komunikat "Brak dostępu!"
        ???.send("Brak dostępu!"); 
    }
});

```

### Zadanie 5: "Prywatny Inspektor"

**Cel:** Zanim przejdziemy do finału, musimy zmusić uczniów do przejrzenia zawartości obiektów. Uzupełnij kod, by wyciągnąć listę wszystkich ukrytych tam rzeczy.

```javascript
app.use((req, res, next) => {
    // ??? Co wpisać w Object.keys(), aby zobaczyć właściwości żądania?
    console.log("Wszystkie sekrety REQ:", Object.keys(???));
    next();
});

```

---

## 🎮 CZĘŚĆ 3: WIELKI FINAŁ – Gra "Cyber-Saper"

*Kiedy uczniowie zaliczą rozgrzewkę, dajesz im ten jeden, kompletny plik. Gra sprawdza ich wiedzę w praktyce i na koniec rzuca ostateczne wyzwanie z kropką.*

Zapisz jako `gra.js`, zainstaluj express (`npm install express`) i uruchom (`node gra.js`).

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

let poziom1Zaliczony = false;

console.clear();
console.log("==================================================");
console.log("🎮 SYSTEM OBRONNY CYBER-SAPER: MIDDLEWARE PROTOCOL");
console.log("==================================================");
console.log("STATUS: Serwer uruchomiony na porcie " + PORT);
console.log("MISJA: Otwórz w przeglądarce: http://localhost:3000/");
console.log("--------------------------------------------------\n");

// FINAŁOWE WYZWANIE 1: Odblokuj taśmociąg!
app.use((req, res, next) => {
    console.log(`[LOG] Ktoś wszedł na: ${req.url}`);
    // Uczeń musi zamienić poniższy komentarz na działający kod:
    // ??? 
});

app.get('/', (req, res) => {
    poziom1Zaliczony = true;
    res.send(`
        <h1>🟩 Poziom 1 Osiągnięty!</h1>
        <p>Uratowałeś przepływ danych za pomocą funkcji next()!</p>
        <hr>
        <h2>🛸 CZAS NA WIELKĄ INSPEKCJĘ (Zadanie z kropką)</h2>
        <p>Spójrz teraz w terminal (konsolę) swojego serwera – hakerzy zostawili tam zrzut pamięci systemu!</p>
    `);
    
    uruchomFinalowaInspekcje(req, res);
});

function uruchomFinalowaInspekcje(req, res) {
    console.log("\n==================================================");
    console.log("🛸 TRWA ZAKOŃCZENIE MISJI: INSPEKCJA KROPKI");
    console.log("==================================================");
    
    // Uczniowie widzą na własne oczy potężną listę ukrytych właściwości
    console.log("\n📦 METODY DOSTĘPNE PO KROPCE W 'req':");
    console.log(Object.keys(req).slice(0, 25)); 
    console.log("... i wiele innych!");

    console.log("\n🔥 OSTATECZNE ZADANIE DLA AGENTA:");
    console.log("1. Znajdź na wyświetlonej liście 'req' właściwość o nazwie 'ip'.");
    console.log("2. Dopisz w kodzie (zaraz pod tym tekstem w pliku gra.js):");
    console.log("   console.log('Adres IP hakera to:', req.ip);");
    console.log("3. Zrestartuj serwer, wejdź na stronę i odczytaj swoje IP w konsoli!");
    console.log("==================================================\n");
}

app.listen(PORT);

```

### 🎯 Dlaczego to zadziała świetnie na lekcji?

1. **Brak nudy:** Teoria trwa tylko kilka minut.
2. **Bezpieczne środowisko:** W 5 zadaniach krok po kroku popełniają błędy na sucho.
3. **Praktyczny szok (Object.keys):** Kiedy w grze terminal nagle wypluje 25 potężnych nazw metod (jak `headers`, `query`, `cookies`, `ip`), uczniowie doznają olśnienia: *"Aaaa, to dlatego pisaliśmy req.method albo req.url! Bo to tam po prostu jest!"*.