# Zadania do lekcji 5–8 React

## LEKCJA 5 – Tablice obiektów, `map()` i `key`

### Zadanie 1 – Lista książek

Utwórz tablicę obiektów:

```javascript
const books = [
  { id: 1, title: "Wiedźmin", author: "Andrzej Sapkowski" },
  { id: 2, title: "Hobbit", author: "J.R.R. Tolkien" },
  { id: 3, title: "Lalka", author: "Bolesław Prus" }
];
```

Następnie:

1. utwórz komponent `Book`,
2. przekaż do niego przez props:
   - `title`,
   - `author`,
3. za pomocą `map()` wygeneruj komponent dla każdej książki,
4. jako `key` zastosuj `id`.

Efekt:

```text
Wiedźmin
Autor: Andrzej Sapkowski

Hobbit
Autor: J.R.R. Tolkien

Lalka
Autor: Bolesław Prus
```

Dodatkowo przepisz `map()` w dwóch wersjach:

```jsx
books.map((book) => (
  ...
))
```

oraz:

```jsx
books.map((book) => {
  return (
    ...
  );
})
```

---

### Zadanie 2 – Lista samochodów

Utwórz tablicę:

```javascript
const cars = [
  { id: 1, brand: "Toyota", model: "Corolla", year: 2020 },
  { id: 2, brand: "Ford", model: "Focus", year: 2019 },
  { id: 3, brand: "Skoda", model: "Octavia", year: 2021 }
];
```

Utwórz komponent:

```text
Car
```

Komponent ma wyświetlać:

```text
Toyota Corolla
Rok produkcji: 2020
```

Wymagania:

- zastosuj `map()`,
- zastosuj `key`,
- dane muszą pochodzić z tablicy obiektów,
- nie wolno wpisywać danych samochodu bezpośrednio w komponencie.

---

### WebTech – zadanie projektowe

Rozbuduj tablicę `technologies`.

Dodaj co najmniej dwie nowe technologie, np.:

```javascript
{
  id: 4,
  name: "Express",
  category: "Backend",
  hours: 25
}
```

oraz:

```javascript
{
  id: 5,
  name: "MongoDB",
  category: "Baza danych",
  hours: 20
}
```

Następnie:

1. usuń wszystkie ręcznie wpisane komponenty `Technology`,
2. wygeneruj całą listę za pomocą `map()`,
3. zastosuj `key={technology.id}`,
4. przekaż dane do komponentu przez props.

Po dodaniu nowej technologii do tablicy powinna ona automatycznie pojawić się na stronie bez dodawania kolejnego `<Technology />`.

---

# LEKCJA 6 – Zdarzenia i `onClick`

### Zadanie 1 – Informacja o użytkowniku

Utwórz komponent:

```text
User
```

który otrzymuje:

```text
name
role
```

Przykład użycia:

```jsx
<User name="Anna" role="Administrator" />
```

Dodaj przycisk:

```text
Pokaż użytkownika
```

Po kliknięciu w konsoli ma pojawić się:

```text
Użytkownik: Anna
Rola: Administrator
```

Funkcja obsługująca zdarzenie powinna znajdować się wewnątrz komponentu.

---

### Zadanie 2 – Wybór produktu

W `App.jsx` utwórz funkcję:

```javascript
function selectProduct(name) {
  console.log("Wybrano produkt: " + name);
}
```

Utwórz komponent:

```text
Product
```

który otrzymuje:

```text
name
price
onSelect
```

Przykład:

```jsx
<Product
  name="Laptop"
  price={3500}
  onSelect={selectProduct}
/>
```

W komponencie `Product` dodaj przycisk:

```text
Wybierz
```

Po kliknięciu ma zostać wykonana funkcja z `App.jsx`.

Zastosuj:

```jsx
onClick={() => onSelect(name)}
```

---

### WebTech – zadanie projektowe

Do komponentu `Technology` dodaj przycisk:

```text
Wybierz technologię
```

W `App.jsx` utwórz funkcję:

```javascript
function selectTechnology(name) {
  console.log("Wybrano technologię: " + name);
}
```

Przekaż funkcję do komponentu przez props.

Każdy przycisk powinien wyświetlić w konsoli nazwę właściwej technologii.

Przykład:

```text
Wybrano technologię: React
```

lub:

```text
Wybrano technologię: Node.js
```

---

# LEKCJA 7 – `useState`

### Zadanie 1 – Licznik punktów

Utwórz komponent:

```text
Score
```

Stan początkowy:

```javascript
const [score, setScore] = useState(0);
```

Wyświetl:

```text
Punkty: 0
```

Dodaj przyciski:

```text
+1
+5
-1
Reset
```

Przyciski powinny odpowiednio zmieniać wartość stanu.

---

### Zadanie 2 – Włącz / wyłącz

Utwórz komponent:

```text
Lamp
```

Stan początkowy:

```javascript
const [active, setActive] = useState(false);
```

Dodaj przycisk:

```text
Zmień stan
```

Po kliknięciu wartość powinna zmieniać się:

```text
false → true
true → false
```

Na stronie wyświetl:

```text
Stan: Włączona
```

lub:

```text
Stan: Wyłączona
```

Możesz zastosować:

```jsx
{active ? "Włączona" : "Wyłączona"}
```

---

### WebTech – zadanie projektowe

Do komponentu `Technology` dodaj licznik polubień.

Stan:

```javascript
const [likes, setLikes] = useState(0);
```

Wyświetl:

```text
Polubienia: 0
```

Dodaj przyciski:

```text
Lubię
Reset
```

Przycisk `Lubię` zwiększa liczbę o `1`.

Przycisk `Reset` ustawia:

```text
0
```

Każda technologia powinna posiadać własny niezależny licznik.

---

# LEKCJA 8 – Props + state + zdarzenia

### Zadanie 1 – Karta kursu

Utwórz tablicę:

```javascript
const courses = [
  {
    id: 1,
    name: "JavaScript",
    level: "Podstawowy",
    hours: 30
  },
  {
    id: 2,
    name: "React",
    level: "Średniozaawansowany",
    hours: 40
  },
  {
    id: 3,
    name: "Node.js",
    level: "Średniozaawansowany",
    hours: 35
  }
];
```

Utwórz komponent:

```text
CourseCard
```

Początkowo ma wyświetlać tylko:

```text
React
[Pokaż szczegóły]
```

Po kliknięciu:

```text
React
Poziom: Średniozaawansowany
Liczba godzin: 40
[Ukryj szczegóły]
```

Wymagania:

- tablica obiektów,
- `map()`,
- `key`,
- props,
- `useState`,
- `onClick`,
- `visible`,
- renderowanie warunkowe.

---

### Zadanie 2 – Karta filmu

Utwórz tablicę:

```javascript
const movies = [
  {
    id: 1,
    title: "Incepcja",
    year: 2010,
    category: "Science fiction"
  },
  {
    id: 2,
    title: "Matrix",
    year: 1999,
    category: "Science fiction"
  },
  {
    id: 3,
    title: "Gladiator",
    year: 2000,
    category: "Dramat"
  }
];
```

Utwórz komponent:

```text
MovieCard
```

Każda karta ma posiadać:

- tytuł,
- przycisk `Pokaż informacje`,
- ukrywane informacje o roku i kategorii,
- licznik `Lubię`.

Przykład:

```text
Matrix

Polubienia: 2

[Lubię]
[Pokaż informacje]
```

Po pokazaniu:

```text
Matrix
Rok: 1999
Kategoria: Science fiction

Polubienia: 2

[Lubię]
[Ukryj informacje]
```

Każdy film posiada własny stan.

---

### WebTech – zadanie projektowe

Rozbuduj komponent `Technology`, aby każda technologia posiadała:

- nazwę,
- kategorię,
- liczbę godzin,
- przycisk pokazujący i ukrywający szczegóły,
- licznik polubień,
- przycisk zwiększający liczbę polubień.

Przykład początkowy:

```text
React

Polubienia: 0

[Lubię]
[Pokaż szczegóły]
```

Po kliknięciu:

```text
React

Kategoria: Frontend
Liczba godzin: 30

Polubienia: 3

[Lubię]
[Ukryj szczegóły]
```

W projekcie muszą zostać wykorzystane:

```text
tablica obiektów
map()
key
komponent
props
onClick
useState
renderowanie warunkowe
```

Każdy komponent `Technology` powinien posiadać własny:

```text
visible
likes
```

Zmiana stanu jednego komponentu nie może zmieniać stanu pozostałych.

---

# Podsumowanie

Po wykonaniu zadań uczeń powinien przejść przez trzy poziomy pracy:

```text
ZADANIE 1
proste zastosowanie nowego mechanizmu

        ↓

ZADANIE 2
samodzielne zastosowanie w innym przykładzie

        ↓

WEBTECH
zastosowanie mechanizmu w rozwijanym projekcie
```

Taki układ pozwala oddzielić naukę konkretnego mechanizmu od pracy projektowej i łatwiej ocenić, czy uczeń rzeczywiście rozumie dane zagadnienie.