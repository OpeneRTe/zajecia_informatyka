# 🚀 LEKCJA: Mistrz Middleware w Node.js (Express)

---

## 📑 CZĘŚĆ 1: Teoria – Co to jest Middleware?

Wyobraź sobie, że serwer Express.js to **taśma produkcyjna w fabryce** albo **punkty kontrolne na lotnisku**. Zanim żądanie (`req`) wysłane przez użytkownika dotrze do końcowego celu (np. wyświetlenia strony) i serwer odeśle odpowiedź (`res`), musi przejść przez serię stanowisk kontrolnych. Te stanowiska to właśnie **middleware**.

Middleware to funkcja, która ma dostęp do trzech obiektów:

1. `req` (request) – obiekt żądania (tu są informacje od użytkownika).
2. `res` (response) – obiekt odpowiedzi (stąd wysyłamy dane do przeglądarki).
3. `next` – funkcja, która mówi serwerowi: *"Moja praca skończona, puść żądanie do następnego stanowiska!"*.

### Anatomia Middleware:

```javascript
function nazwaFunkcji(req, res, next) {
    // 1. Tutaj czytamy dane z 'req' (np. sprawdzamy IP lub hasło)
    // 2. Tutaj możemy coś zmodyfikować
    
    next(); // 3. KLUCZOWE: Przekazujemy paczkę dalej!
}

```

---

## 🛠️ CZĘŚĆ 2: Pięć Zadań Krok po Kroku (Uzupełnij Kod)

*Zadaniem uczniów jest przepisać poniższe kody i uzupełnić luki oznaczone jako `???`.*

### Zadanie 1: Licznik Odwiedzin (Wywołanie przepływu)

**Cel:** Uruchomienie podstawowego middleware. Bez poprawnego wpisania funkcji sterującej, strona "zawiesi się" w przeglądarce.

```javascript
const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log("Ktoś odwiedził nasz serwer!");
    // LUKA: Co musisz wywołać, aby żądanie nie utknęło w miejscu?
    ???(); 
});

app.get('/', (req, res) => res.send('Strona Główna'));
app.listen(3000);

```

### Zadanie 2: Detektyw Adresów (Odczyt z `req`)

**Cel:** Wyciągnięcie informacji z obiektu żądania. Uczniowie muszą sprawdzić właściwości po kropce.

```javascript
app.use((req, res, next) => {
    // LUKA: Wpisz właściwości obiektu req, które przechowują metodę HTTP (np. GET) oraz ścieżkę URL
    console.log(`Wykryto żądanie metodą: ${req.???} na adres: ${req.???}`);
    next();
});

```

### Zadanie 3: Strażnik Czasu (Modyfikacja obiektu `req`)

**Cel:** Zrozumienie, że middleware może "dokładać" nowe właściwości do obiektu `req`, które będą dostępne w kolejnych funkcjach.

```javascript
app.use((req, res, next) => {
    // Tworzymy nową właściwość wewnątrz req i przypisujemy jej aktualną datę
    req.requestTime = new Date().toLocaleTimeString();
    next();
});

app.get('/czas', (req, res) => {
    // LUKA: Skąd pobrać czas dodany w middleware? Wpisz odpowiedni obiekt po kropce
    res.send(`Wszedłeś na stronę o godzinie: ${???.requestTime}`);
});

```

### Zadanie 4: Selekcja Ruchu (Przekierowanie i Blokowanie)

**Cel:** Zastosowanie instrukcji warunkowej. Middleware decyduje, czy puścić ruch dalej, czy zakończyć go błędem za pomocą obiektu odpowiedzi.

```javascript
app.use('/tajne', (req, res, next) => {
    const czyZalogowany = false; // Symulacja braku zalogowania

    if (czyZalogowany) {
        next();
    } else {
        // LUKA: Użyj odpowiedniego obiektu i metody, aby odesłać tekst "Brak dostępu!"
        ???.send("Brak dostępu!");
    }
});

```

### Zadanie 5: Formatowanie Danych (Middleware wbudowane)

**Cel:** Pokazanie, że Express ma gotowe middleware, np. do obsługi danych z formularzy (JSON).

```javascript
// LUKA: Express posiada wbudowane middleware do parsowania JSON. Jak się nazywa ta metoda po kropce?
app.use(express.???());

app.post('/profil', (req, res) => {
    // Dzięki middleware powyżej, dane z formularza trafiają do req.body
    res.send(`Witaj ${req.body.imie}!`);
});

```

---

## 🎮 CZĘŚĆ 3: WIELKI FINAŁ – Gra: "Cyber-Saper: Protokół IP"

*Uczniowie kopiują poniższy kod do pliku `app.js`, instalują express (`npm install express`) i uruchamiają serwer (`node app.js`). Ich celem jest rozwiązanie zagadek bezpośrednio w kodzie, aby odblokować panel końcowy w przeglądarce.*

```javascript
const express = require('express');
const app = express();
const PORT = 3000;

let rozbrojony = false;

console.clear();
console.log("==================================================");
console.log("🎮 SYSTEM CYBER-SAPER URUCHOMIONY");
console.log("🤖 MISJA: Napraw system i wykonaj Skan Obiektów.");
console.log("🔗 Wejdź na: http://localhost:3000/");
console.log("==================================================");

// 🔴 SYSTEM DECYZYJNY SAPERA (MIDDLEWARE)
app.use('/panel-kontrolny', (req, res, next) => {
    // KROK 1: Hakerzy usunęli strukturę Query. 
    // Musisz odczytać z adresu URL parametr '?kod=1337'.
    // Zastąp ??? odpowiednią właściwością obiektu 'req' (podpowiedź: query)
    const kodRozbrojenia = req.???.kod;

    if (kodRozbrojenia === '1337') {
        rozbrojony = true;
        // KROK 2: Kod się zgadza! Co musisz wywołać, aby wpuścić użytkownika do panelu?
        ???();
    } else {
        // KROK 3: Kod jest błędny. Odeślij informację o blokadzie systemu za pomocą obiektu 'res'.
        ???.status(403).send("<h1>🚨 BLOKADA SYSTEMU! Podano zły kod rozbrojenia!</h1>");
    }
});

app.get('/', (req, res) => {
    res.send(`
        <h1>🤖 Witaj w Terminalu Saperskim</h1>
        <p>System został zablokowany. Aby go uratować, musisz naprawić middleware w pliku kodu.</p>
        <p>Gdy to zrobisz, przejdź pod adres: <a href="http://localhost:3000/panel-kontrolny?kod=1337">Uruchom procedurę rozbrojenia</a></p>
    `);
});

app.get('/panel-kontrolny', (req, res) => {
    res.send(`
        <h1>🟩 SYSTEM ROZBROJONY! SUKCES!</h1>
        <p>Świetna robota. Zrozumiałeś jak działa autoryzacja przez middleware.</p>
        <hr>
        <h2>🛸 CZAS NA FINALE ZADANIE INSPEKCYJNE</h2>
        <p>Spójrz teraz w konsolę (terminal) swojego serwera Node.js. Czeka tam na Ciebie ostateczny test.</p>
    `);
    
    // Wywołanie inspekcji obiektów
    uruchomSkanowanie(req, res);
});

function uruchomSkanowanie(req, res) {
    console.log("\n==================================================");
    console.log("🛸 INWENTARYZACJA MODUŁÓW REQ I RES (Object.keys)");
    console.log("==================================================");
    
    console.log("\n📦 WŁAŚCIWOŚCI UKRYTE POD KROPKĄ W OBIEKCIE 'req':");
    console.log(Object.keys(req).slice(0, 25)); // Wyświetlenie pierwszych 25 elementów
    console.log("... [i wiele więcej]");

    console.log("\n📦 METODY UKRYTE POD KROPKĄ W OBIEKCIE 'res':");
    console.log(Object.keys(res).slice(0, 25));
    console.log("... [i wiele więcej]");

    console.log("\n🔥 ZADANIE KOŃCOWE DLA AGENTA:");
    console.log("1. Przeanalizuj listę, która wyświetliła się w konsoli.");
    console.log("2. Znajdź na liście 'req' właściwość o nazwie 'ip'.");
    console.log("3. Wewnątrz funkcji 'app.get('/panel-kontrolny')' dopisz linijkę:");
    console.log("   console.log('Adres IP hakera to:', req.ip);");
    console.log("4. Odśwież stronę i odczytaj swoje IP w konsoli!");
    console.log("==================================================\n");
}

app.listen(PORT);

```

---

### 💡 Dlaczego ten układ zadziała idealnie na lekcji?

1. **Zadania 1-5** budują pewność siebie. Uczniowie dowiadują się izolowanych rzeczy: jak działa `next()`, jak działa `req`, jak działa `res`.
2. **Finałowa gra** łączy wszystkie te elementy w jeden działający mechanizm.
3. **Zadanie z `Object.keys()**` realizuje Twój cel – uczniowie na własne oczy zobaczą gigantyczną listę właściwości schowanych wewnątrz Node.js i nauczą się, że programowanie to po prostu sięganie po te elementy "po kropce".