# React – pierwsza aplikacja i komponenty

## 1. Cel zajęć

Podczas zajęć:

- utworzysz pierwszy projekt React,
- poznasz podstawową strukturę projektu,
- poznasz składnię JSX,
- nauczysz się wyświetlać dane JavaScript w JSX,
- utworzysz własny komponent,
- wykorzystasz komponent wewnątrz aplikacji.

---

# 2. Czym jest React?

**React** jest biblioteką JavaScript przeznaczoną do tworzenia interfejsów aplikacji internetowych.

Aplikację React budujemy z mniejszych elementów nazywanych:

**komponentami**

Przykładowa aplikacja może składać się z komponentów:

```text
App
│
├── Header
├── Menu
├── User
├── Course
└── Footer
```

Każdy komponent może odpowiadać za określony fragment interfejsu.

---

# 3. Frontend i backend

Podczas zajęć będziemy tworzyć kompletną aplikację internetową.

Schemat:

```text
FRONTEND
React
   │
   │ żądania HTTP
   ↓
BACKEND
Node.js + Express
   │
   ↓
BAZA DANYCH
```

Na początku zajmiemy się frontendem w React.

W kolejnych etapach pojawią się:

```text
React
↓
komponenty
↓
props
↓
state
↓
formularze
↓
routing
↓
API
↓
Node.js + Express
↓
baza danych
```

---

# 4. Przypomnienie JavaScript

React wykorzystuje JavaScript, dlatego będziemy korzystać między innymi z:

```javascript
const
let
```

tablic:

```javascript
const numbers = [10, 20, 30];
```

obiektów:

```javascript
const user = {
  name: "Jan",
  age: 18
};
```

tablic obiektów:

```javascript
const users = [
  { id: 1, name: "Jan", age: 18 },
  { id: 2, name: "Anna", age: 19 }
];
```

oraz funkcji:

```javascript
function hello() {
  console.log("Hello");
}
```

i funkcji strzałkowych:

```javascript
const hello = () => {
  console.log("Hello");
};
```

---

# 5. Utworzenie projektu React

Otwórz terminal w Visual Studio Code.

Wpisz:

```bash
npm create vite@latest
```

Podaj nazwę projektu:

```text
react-start
```

Wybierz:

```text
React
```

następnie:

```text
JavaScript
```

Przejdź do katalogu projektu:

```bash
cd react-start
```

Zainstaluj wymagane pakiety:

```bash
npm install
```

Uruchom aplikację:

```bash
npm run dev
```

W terminalu zostanie wyświetlony adres aplikacji, np.:

```text
http://localhost:5173
```

Otwórz go w przeglądarce.

---

# 6. Podstawowa struktura projektu

Najważniejsze elementy projektu:

```text
react-start
│
├── src
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
│
└── node_modules
```

## `App.jsx`

Główny komponent aplikacji.

## `main.jsx`

Uruchamia aplikację React i wyświetla komponent `App`.

## `package.json`

Zawiera informacje o projekcie oraz wykorzystywanych bibliotekach.

## `node_modules`

Zawiera biblioteki zainstalowane za pomocą npm.

---

# 7. Pierwszy komponent

Otwórz plik:

```text
src/App.jsx
```

Usuń jego zawartość i wpisz:

```jsx
function App() {
  return (
    <div>
      <h1>Moja pierwsza aplikacja React</h1>
      <p>Programowanie aplikacji internetowych</p>
    </div>
  );
}

export default App;
```

Zapisz plik.

Przeglądarka powinna automatycznie wyświetlić zmiany.

---

# 8. JSX

Kod:

```jsx
<h1>Moja pierwsza aplikacja React</h1>
```

wygląda podobnie do HTML.

W React stosowana jest jednak składnia:

**JSX**

JSX pozwala zapisywać strukturę interfejsu bezpośrednio w kodzie JavaScript.

---

# 9. JavaScript wewnątrz JSX

W komponencie możemy utworzyć zmienną JavaScript:

```jsx
function App() {

  const nazwa = "Kurs React";

  return (
    <div>
      <h1>{nazwa}</h1>
    </div>
  );
}

export default App;
```

Zwróć uwagę na:

```jsx
{nazwa}
```

Klamry:

```text
{ }
```

umożliwiają użycie wyrażenia JavaScript wewnątrz JSX.

---

# 10. Więcej zmiennych

Rozbuduj komponent:

```jsx
function App() {

  const nazwa = "Kurs React";
  const autor = "Jan Kowalski";
  const liczbaLekcji = 12;

  return (
    <div>

      <h1>{nazwa}</h1>

      <p>Autor: {autor}</p>

      <p>
        Liczba lekcji: {liczbaLekcji}
      </p>

      <button>Rozpocznij</button>

    </div>
  );
}

export default App;
```

---

# 11. Zadanie 1

Zmodyfikuj aplikację.

Dodaj zmienne:

```javascript
const opis = "...";
const liczbaGodzin = ...;
```

Następnie wyświetl je w JSX.

Aplikacja powinna zawierać:

```text
nazwa kursu
autor
opis
liczba lekcji
liczba godzin

[Rozpocznij]
[Informacje]
```

---

# 12. Komponent

Aplikację React można podzielić na mniejsze części.

Utwórz komponent:

```jsx
function Course() {
  return (
    <div>
      <h2>React</h2>
      <p>Frontend aplikacji internetowej</p>
    </div>
  );
}
```

Następnie użyj go w `App`:

```jsx
function Course() {
  return (
    <div>
      <h2>React</h2>
      <p>Frontend aplikacji internetowej</p>
    </div>
  );
}

function App() {
  return (
    <div>

      <h1>Moje kursy</h1>

      <Course />

    </div>
  );
}

export default App;
```

---

# 13. Uruchamianie komponentu

Komponent:

```jsx
function Course() {
```

możemy wykorzystać jako:

```jsx
<Course />
```

Nazwy własnych komponentów React zapisujemy wielką literą.

Poprawnie:

```jsx
<Course />
```

Niepoprawnie:

```jsx
<course />
```

---

# 14. Wielokrotne wykorzystanie komponentu

Jeden komponent może zostać użyty wiele razy:

```jsx
function App() {
  return (
    <div>

      <h1>Moje kursy</h1>

      <Course />
      <Course />
      <Course />

    </div>
  );
}
```

Dzięki temu nie musimy wielokrotnie kopiować tego samego kodu.

---

# 15. Zadanie 2

Utwórz komponent:

```text
Student
```

Komponent powinien wyświetlać:

- imię i nazwisko,
- klasę,
- specjalizację.

Przykład:

```jsx
function Student() {
  return (
    <div>
      <h2>Jan Kowalski</h2>
      <p>Klasa: 4P</p>
      <p>Specjalizacja: programowanie</p>
    </div>
  );
}
```

Następnie wyświetl komponent wewnątrz `App`:

```jsx
<Student />
```

---

# 16. Zadanie 3

Utwórz komponent:

```text
Technology
```

Powinien wyświetlać:

```text
Nazwa technologii
Opis
Liczba godzin
```

Przykład:

```jsx
function Technology() {
  return (
    <div>
      <h2>React</h2>
      <p>Biblioteka frontendowa</p>
      <p>Liczba godzin: 20</p>

      <button>Więcej</button>
    </div>
  );
}
```

Wyświetl komponent minimum trzy razy.

---

# 17. Zadanie dodatkowe

Utwórz trzy różne komponenty:

```jsx
<ReactCourse />
<JavaScriptCourse />
<NodeCourse />
```

Każdy komponent powinien zawierać:

- nazwę technologii,
- opis,
- liczbę godzin,
- przycisk `Więcej`.

---

# 18. Najważniejsze elementy

## Uruchomienie projektu

```bash
npm run dev
```

## Komponent

```jsx
function Course() {
  return (
    <div>
      <h2>React</h2>
    </div>
  );
}
```

## Użycie komponentu

```jsx
<Course />
```

## Zmienna JavaScript

```javascript
const name = "React";
```

## Wyświetlenie zmiennej w JSX

```jsx
<h1>{name}</h1>
```

---

# 19. Do zapamiętania

```text
React
↓
projekt
↓
App.jsx
↓
komponent
↓
JSX
↓
JavaScript w JSX
```

---

# 20. Pytania kontrolne

1. Do czego służy React?
2. Czym jest komponent?
3. Czym jest JSX?
4. Do czego służy plik `App.jsx`?
5. Jak uruchomić projekt React?
6. Jak wyświetlić zmienną JavaScript wewnątrz JSX?
7. Jak wykorzystać własny komponent?
8. Dlaczego nazwa komponentu powinna zaczynać się wielką literą?
9. Co daje podział aplikacji na komponenty?
10. Jakie technologie wykorzystamy później do utworzenia backendu?

---

# 21. Efekt końcowy

Po wykonaniu ćwiczeń powinieneś potrafić samodzielnie utworzyć strukturę:

```jsx
function Course() {
  return (
    <div>
      <h2>React</h2>
      <p>Frontend</p>
    </div>
  );
}

function App() {

  const title = "Moja aplikacja";

  return (
    <div>

      <h1>{title}</h1>

      <Course />
      <Course />

    </div>
  );
}

export default App;
```