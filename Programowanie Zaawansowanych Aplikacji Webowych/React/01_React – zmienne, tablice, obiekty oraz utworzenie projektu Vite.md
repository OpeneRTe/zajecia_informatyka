# React – pierwsze kroki

## Projekt główny: WebTech

Podczas kolejnych zajęć będziemy rozwijać jeden projekt aplikacji React o nazwie **WebTech**.

W kolejnych etapach poznamy:

```text
JavaScript
↓
React + Vite
↓
JSX
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

# LEKCJA 1

# JavaScript potrzebny w React. `const`, `let`, tablice, obiekty oraz utworzenie projektu Vite

## 1. Cele lekcji

Po wykonaniu ćwiczeń uczeń potrafi:

- wyjaśnić, do czego służy React,
- rozróżnić frontend i backend,
- zadeklarować zmienną za pomocą `const` i `let`,
- wyjaśnić różnicę pomiędzy `const` i `let`,
- utworzyć prosty obiekt JavaScript,
- odczytać właściwość obiektu,
- utworzyć tablicę,
- odczytać element tablicy,
- rozpoznać tablicę obiektów,
- utworzyć projekt React za pomocą Vite,
- uruchomić projekt,
- rozpoznać najważniejsze pliki projektu React.

---

## 2. React – podstawowe informacje

React jest biblioteką JavaScript przeznaczoną do tworzenia interfejsów aplikacji internetowych.

Aplikacja React jest budowana z mniejszych części nazywanych **komponentami**.

Przykładowa aplikacja może mieć strukturę:

```text
App
│
├── Header
├── Menu
├── Technology
└── Footer
```

Na początku zajmujemy się częścią frontendową aplikacji.

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
MySQL
```

---

# 3. Przypomnienie JavaScript

React wykorzystuje JavaScript. Przed rozpoczęciem pracy musimy przypomnieć kilka podstawowych elementów języka.

---

## 3.1. Zmienna

Zmienna pozwala przechowywać wartość.

Przykład:

```javascript
const name = "React";
```

Zmienna `name` przechowuje tekst:

```text
React
```

---

# 4. `const`

`const` stosujemy wtedy, gdy nie zamierzamy przypisywać zmiennej nowej wartości.

```javascript
const name = "React";
```

Nie możemy później wykonać:

```javascript
name = "Node.js";
```

Taka operacja spowoduje błąd.

Przykład:

```javascript
const school = "ZST";
const year = 2026;
const active = true;
```

---

# 5. `let`

`let` stosujemy wtedy, gdy wartość zmiennej będzie się zmieniała.

```javascript
let points = 10;

points = 15;

points = 20;
```

Wartość `points` może zostać zmieniona.

---

## 5.1. `const` a `let`

```javascript
const name = "React";
let points = 10;
```

| Deklaracja | Czy można przypisać nową wartość? |
|---|---|
| `const` | nie |
| `let` | tak |

W większości przypadków zaczynamy od `const`.

`let` stosujemy wtedy, gdy rzeczywiście potrzebujemy zmienić wartość zmiennej.

---

# 6. Podstawowe typy wartości

## Tekst – string

```javascript
const name = "React";
```

## Liczba – number

```javascript
const hours = 20;
```

## Wartość logiczna – boolean

```javascript
const active = true;
```

Możliwe wartości:

```javascript
true
false
```

---

# 7. Tablice

Tablica umożliwia przechowywanie wielu wartości.

```javascript
const technologies = [
  "React",
  "Node.js",
  "MySQL"
];
```

Elementy tablicy posiadają indeksy.

Pierwszy element ma indeks `0`.

```text
0 → React
1 → Node.js
2 → MySQL
```

Odczyt elementu:

```javascript
console.log(technologies[0]);
```

Wynik:

```text
React
```

Drugi element:

```javascript
console.log(technologies[1]);
```

Wynik:

```text
Node.js
```

---

# 8. Obiekt JavaScript

Obiekt umożliwia przechowywanie kilku informacji opisujących jeden element.

Przykład:

```javascript
const student = {
  name: "Jan",
  age: 18,
  className: "4P"
};
```

Obiekt `student` posiada trzy właściwości:

```text
name
age
className
```

Każda właściwość ma wartość.

```text
name      → Jan
age       → 18
className → 4P
```

---

# 9. Dostęp do właściwości obiektu

Najczęściej stosujemy zapis z kropką.

```javascript
student.name
```

Wynik:

```text
Jan
```

Podobnie:

```javascript
student.age
```

Wynik:

```text
18
```

oraz:

```javascript
student.className
```

Wynik:

```text
4P
```

Przykład:

```javascript
console.log(student.name);
console.log(student.age);
console.log(student.className);
```

---

## 9.1. Drugi sposób dostępu

Możemy również zastosować zapis:

```javascript
student["name"]
```

Przykład:

```javascript
console.log(student["name"]);
```

Najczęściej będziemy jednak korzystać z:

```javascript
student.name
```

---

# 10. Obiekt zawierający różne typy danych

```javascript
const course = {
  name: "React",
  hours: 30,
  active: true
};
```

Odczyt:

```javascript
console.log(course.name);
console.log(course.hours);
console.log(course.active);
```

---

# 11. Tablica obiektów

Bardzo często będziemy posiadać wiele obiektów tego samego typu.

Przykład:

```javascript
const users = [
  {
    id: 1,
    name: "Jan",
    age: 18
  },
  {
    id: 2,
    name: "Anna",
    age: 19
  }
];
```

Pierwszy obiekt:

```javascript
users[0]
```

Imię pierwszego użytkownika:

```javascript
users[0].name
```

Wynik:

```text
Jan
```

Drugi użytkownik:

```javascript
users[1].name
```

Wynik:

```text
Anna
```

Tablice obiektów będą później bardzo często wykorzystywane w aplikacjach React.

---

# 12. Funkcje – przypomnienie

Klasyczna funkcja:

```javascript
function hello() {
  console.log("Hello");
}
```

Uruchomienie:

```javascript
hello();
```

Funkcja strzałkowa:

```javascript
const hello = () => {
  console.log("Hello");
};
```

Do funkcji wrócimy szczegółowo podczas kolejnych zajęć.

---

# 13. Vite

Vite jest narzędziem wykorzystywanym do tworzenia, uruchamiania i budowania aplikacji webowych.

Umożliwia między innymi:

- szybkie uruchomienie projektu,
- uruchomienie lokalnego serwera deweloperskiego,
- automatyczne odświeżanie aplikacji po zmianie kodu,
- korzystanie z modułów JavaScript,
- przygotowanie aplikacji do publikacji.

---

# 14. Utworzenie projektu React

Otwórz terminal Visual Studio Code.

Wykonaj:

```bash
npm create vite@latest
```

Podaj nazwę projektu:

```text
webtech
```

Wybierz:

```text
React
```

Następnie:

```text
JavaScript
```

Przejdź do katalogu projektu:

```bash
cd webtech
```

Zainstaluj zależności:

```bash
npm install
```

Uruchom projekt:

```bash
npm run dev
```

W terminalu pojawi się adres podobny do:

```text
http://localhost:5173
```

Otwórz go w przeglądarce.

---

# 15. Struktura projektu

Projekt wygenerowany przez Vite posiada między innymi:

```text
webtech/
│
├── node_modules/
├── public/
│
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## `src/`

Tutaj znajduje się kod naszej aplikacji React.

---

## `App.jsx`

Główny komponent aplikacji.

To właśnie ten plik będziemy najczęściej modyfikować na początku nauki.

---

## `main.jsx`

Punkt startowy aplikacji React.

Plik uruchamia React i wyświetla komponent `App`.

Schemat:

```text
main.jsx
   ↓
<App />
   ↓
App.jsx
```

---

## `index.html`

Główny dokument HTML.

Zawiera element:

```html
<div id="root"></div>
```

React umieszcza w tym miejscu aplikację.

---

## `package.json`

Zawiera między innymi:

- informacje o projekcie,
- listę zainstalowanych bibliotek,
- dostępne polecenia npm.

Przykładowe polecenie:

```bash
npm run dev
```

---

## `node_modules/`

Zawiera biblioteki zainstalowane przez npm.

Katalog jest generowany automatycznie.

---

## `public/`

Przeznaczony na pliki statyczne.

---

## `App.css`

Style związane z komponentem `App`.

---

## `index.css`

Style globalne aplikacji.

---

## `vite.config.js`

Plik konfiguracji Vite.

---

# 16. Jak uruchamiana jest aplikacja?

Schemat:

```text
index.html
    ↓
main.jsx
    ↓
App.jsx
    ↓
interfejs w przeglądarce
```

---

# 17. Zadanie praktyczne – JavaScript

Utwórz obiekt:

```javascript
const student = {
  name: "Twoje imię",
  surname: "Twoje nazwisko",
  className: "4P",
  age: 18
};
```

Wyświetl w konsoli:

```text
imię
nazwisko
klasę
wiek
```

Nie wpisuj wartości ponownie.

Odczytaj je z obiektu.

---

# 18. Zadanie samodzielne

Utwórz obiekt:

```javascript
const technology = {
  name: "...",
  category: "...",
  hours: ...,
  active: ...
};
```

Następnie wyświetl wszystkie właściwości za pomocą `console.log()`.

---

# 19. Zadanie dodatkowe

Utwórz tablicę trzech obiektów opisujących technologie:

```javascript
const technologies = [
  {
    id: 1,
    name: "React",
    category: "frontend"
  },

  // kolejne obiekty
];
```

Wyświetl nazwę:

- pierwszej technologii,
- drugiej technologii,
- trzeciej technologii.

---

# 20. Pytania kontrolne

1. Do czego służy React?
2. Jaka jest różnica pomiędzy frontendem i backendem?
3. Jaka jest różnica pomiędzy `const` i `let`?
4. Czym jest tablica?
5. Od którego indeksu zaczyna się tablica?
6. Czym jest obiekt?
7. Jak odczytać właściwość `name` z obiektu `student`?
8. Co oznacza `users[0].name`?
9. Do czego służy Vite?
10. Co znajduje się w `App.jsx`?
11. Jaką rolę pełni `main.jsx`?
12. Do czego służy `package.json`?
13. Jak uruchomić projekt React?

