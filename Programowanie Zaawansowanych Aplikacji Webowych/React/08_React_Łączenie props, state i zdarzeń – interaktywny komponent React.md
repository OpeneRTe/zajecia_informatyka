# Łączenie props, state i zdarzeń – interaktywny komponent React

## Cele lekcji

Po zakończeniu lekcji uczeń:

- łączy tablicę obiektów z `map()`,
- generuje komponenty na podstawie danych,
- przekazuje dane za pomocą props,
- wykorzystuje `key`,
- obsługuje zdarzenie `onClick`,
- wykorzystuje `useState`,
- zmienia stan komponentu,
- stosuje prostą instrukcję renderowania warunkowego,
- tworzy wielokrotnie wykorzystywany komponent interaktywny,
- rozumie podstawowy przepływ danych w aplikacji React.

---

# 1. Co już potrafimy?

Mamy już wszystkie podstawowe elementy potrzebne do utworzenia pierwszej interaktywnej aplikacji.

## Dane

```javascript
const technologies = [
  {
    id: 1,
    name: "React",
    category: "Frontend",
    hours: 30
  }
];
```

## Generowanie komponentów

```jsx
technologies.map(...)
```

## Komponent

```jsx
<Technology />
```

## Props

```jsx
<Technology name={technology.name} />
```

## Zdarzenie

```jsx
onClick={...}
```

## State

```javascript
const [visible, setVisible] = useState(false);
```

Teraz połączymy te mechanizmy.

---

# 2. Cel

Chcemy uzyskać komponent:

```text
React

[Pokaż szczegóły]
```

Po kliknięciu:

```text
React

Kategoria: Frontend
Liczba godzin: 30

[Ukryj szczegóły]
```

Każda technologia ma posiadać własny stan widoczności.

---

# 3. Stan `visible`

W komponencie:

```javascript
const [visible, setVisible] = useState(false);
```

Na początku:

```text
visible = false
```

Szczegóły są ukryte.

Po kliknięciu:

```javascript
setVisible(true);
```

możemy je wyświetlić.

Jednak chcemy, aby ten sam przycisk działał w obie strony.

Dlatego wykorzystujemy:

```javascript
setVisible(!visible);
```

---

# 4. Zmiana wartości na przeciwną

Jeżeli:

```text
visible = false
```

to:

```javascript
!visible
```

daje:

```text
true
```

Po następnym kliknięciu:

```text
visible = true
```

więc:

```javascript
!visible
```

daje:

```text
false
```

Otrzymujemy:

```text
false → kliknięcie → true
true  → kliknięcie → false
```

---

# 5. Renderowanie warunkowe

Nie zawsze chcemy wyświetlać wszystkie elementy.

Możemy zapisać:

```jsx
{visible && <p>Element jest widoczny</p>}
```

Oznacza to:

```text
jeżeli visible jest true
→ wyświetl element
```

Jeżeli:

```text
visible = false
```

element nie zostanie wyświetlony.

---

# 6. Kilka elementów warunkowych

Jeżeli chcemy wyświetlić kilka elementów, możemy użyć fragmentu:

```jsx
{visible && (
  <>
    <p>Kategoria: {category}</p>
    <p>Liczba godzin: {hours}</p>
  </>
)}
```

---

# 7. Dynamiczny tekst przycisku

Możemy również zmieniać napis na przycisku.

```jsx
{visible ? "Ukryj szczegóły" : "Pokaż szczegóły"}
```

Operator:

```javascript
warunek ? wartość1 : wartość2
```

działa następująco:

```text
jeżeli warunek = true
→ wartość1

jeżeli warunek = false
→ wartość2
```

Dlatego:

```jsx
<button>
  {visible ? "Ukryj szczegóły" : "Pokaż szczegóły"}
</button>
```

---

# 8. Kompletny komponent `Technology`

```jsx
import { useState } from "react";

function Technology({ name, category, hours }) {

  const [visible, setVisible] = useState(false);

  function toggleDetails() {
    setVisible(!visible);
  }

  return (
    <section>
      <h2>{name}</h2>

      <button onClick={toggleDetails}>
        {visible ? "Ukryj szczegóły" : "Pokaż szczegóły"}
      </button>

      {visible && (
        <>
          <p>Kategoria: {category}</p>
          <p>Liczba godzin: {hours}</p>
        </>
      )}
    </section>
  );
}

export default Technology;
```

Przeanalizujmy poszczególne elementy.

### Props

```javascript
{ name, category, hours }
```

Dane pochodzą z komponentu nadrzędnego.

### State

```javascript
const [visible, setVisible] = useState(false);
```

Komponent przechowuje informację o widoczności.

### Zdarzenie

```jsx
onClick={toggleDetails}
```

Kliknięcie uruchamia funkcję.

### Aktualizacja stanu

```javascript
setVisible(!visible);
```

Stan zostaje zmieniony.

### Renderowanie warunkowe

```jsx
{visible && (...)}
```

Interfejs zależy od aktualnego stanu.

---

# 9. Projekt WebTech – etap 7

## `App.jsx`

```jsx
import Header from "./components/Header";
import Technology from "./components/Technology";
import Footer from "./components/Footer";

function App() {

const technologies = [
  {
    id: 1,
    name: "React",
    category: "Frontend",
    hours: 30,
    image: "react.webp"
  },
  {
    id: 2,
    name: "Node.js",
    category: "Backend",
    hours: 40,
    image: "nodejs.webp"
  },
  {
    id: 3,
    name: "MySQL",
    category: "Baza danych",
    hours: 20,
    image: "mysql.webp"
  },
  {
    id: 4,
    name: "Express",
    category: "Backend",
    hours: 25,
    image: "express.webp"
  },
  {
    id: 5,
    name: "MongoDB",
    category: "Baza danych",
    hours: 30,
    image: "mongodb.webp"
  },
  {
    id: 6,
    name: "Bootstrap",
    category: "Frontend",
    hours: 15,
    image: "bootstrap.webp"
  },
  {
    id: 7,
    name: "CSS",
    category: "Frontend",
    hours: 20,
    image: "css.webp"
  },
  {
    id: 8,
    name: "HTML",
    category: "Frontend",
    hours: 10,
    image: "html.webp"
  },
  {
    id: 9,
    name: "PHP",
    category: "Backend",
    hours: 35,
    image: "php.webp"
  }
];

  return (
    <>
      <Header />

      <main>
        {technologies.map((technology) => (
          <Technology
            key={technology.id}
            name={technology.name}
            category={technology.category}
            hours={technology.hours}
          />
        ))}
      </main>

      <Footer />
    </>
  );
}

export default App;
```

## `Technology.jsx`

```jsx
import { useState } from "react";

function Technology({ name, category, hours }) {

  const [visible, setVisible] = useState(false);

  function toggleDetails() {
    setVisible(!visible);
  }

  return (
    <section>
      <h2>{name}</h2>

      <button onClick={toggleDetails}>
        {visible ? "Ukryj szczegóły" : "Pokaż szczegóły"}
      </button>

      {visible && (
        <>
          <p>Kategoria: {category}</p>
          <p>Liczba godzin: {hours}</p>
        </>
      )}
    </section>
  );
}

export default Technology;
```

---

# 10. Co dzieje się po uruchomieniu aplikacji?

`App` posiada tablicę obiektów:

```text
technologies
```

Następnie:

```text
technologies
      ↓
    map()
      ↓
Technology
      ↓
    props
```

Każdy `Technology` otrzymuje:

```text
name
category
hours
```

Każdy komponent posiada również własny:

```text
visible
```

Dlatego możemy otworzyć szczegóły React:

```text
React → visible = true
```

a jednocześnie:

```text
Node.js → visible = false
MySQL   → visible = false
Express → visible = false
```

Każda instancja komponentu posiada własny stan.

---

# 11. Props a state w naszej aplikacji

Dla:

```jsx
<Technology
  name="React"
  category="Frontend"
  hours={30}
/>
```

mamy:

```text
PROP:
name = React

PROP:
category = Frontend

PROP:
hours = 30

STATE:
visible = false / true
```

Props opisują technologię.

State opisuje aktualny stan interfejsu komponentu.

---

# Zadanie samodzielne – ProductCard

Utwórz tablicę:

```javascript
const products = [
  {
    id: 1,
    name: "Laptop",
    category: "Komputery",
    price: 3500
  },
  {
    id: 2,
    name: "Monitor",
    category: "Monitory",
    price: 1200
  },
  {
    id: 3,
    name: "Klawiatura",
    category: "Akcesoria",
    price: 300
  }
];
```

Utwórz komponent:

```text
ProductCard
```

Do komponentu przekaż przez props:

```text
name
category
price
```

Komponent początkowo ma wyświetlać tylko:

```text
Laptop
[Pokaż szczegóły]
```

Po kliknięciu:

```text
Laptop

Kategoria: Komputery
Cena: 3500 zł

[Ukryj szczegóły]
```

Każdy produkt musi posiadać niezależny stan widoczności.

---

# Zadanie dodatkowe 1

Dodaj do obiektów:

```javascript
available: true
```

lub:

```javascript
available: false
```

Przekaż tę wartość przez props.

Wyświetl:

```text
Dostępny
```

lub:

```text
Niedostępny
```

w zależności od wartości.

---

# Zadanie dodatkowe 2

Dodaj w `ProductCard`:

```javascript
const [likes, setLikes] = useState(0);
```

Dodaj przycisk:

```text
Lubię
```

Po każdym kliknięciu licznik ma zwiększać się o jeden.

Przykład:

```text
Laptop

Polubienia: 3

[Lubię]
[Pokaż szczegóły]
```

Każdy produkt ma posiadać własny licznik.

---

# Zadanie dodatkowe 3

Dodaj przycisk:

```text
Resetuj polubienia
```

który ustawia:

```text
likes = 0
```

---

# Pytania kontrolne

1. Skąd pochodzą dane `name`, `category` i `hours`?
2. Czym różnią się te dane od `visible`?
3. Co robi `map()`?
4. Do czego służy `key`?
5. Co oznacza `useState(false)`?
6. Co przechowuje `visible`?
7. Co robi `setVisible()`?
8. Co oznacza `!visible`?
9. Co robi `onClick`?
10. Co oznacza zapis `{visible && (...)}`?
11. Jak działa operator `warunek ? wartość1 : wartość2`?
12. Czy każdy komponent `Technology` posiada własny stan?
13. Czy zmiana stanu jednego `Technology` zmienia stan pozostałych?
14. Czym różnią się props od state?
15. Jakie elementy poznane podczas lekcji 1–8 zostały wykorzystane w aplikacji?

---

# Podsumowanie lekcji 1–8

Po wykonaniu ośmiu lekcji znamy już podstawowy przepływ danych w React:

```text
DANE
│
│ tablica obiektów
↓
App
│
│ map()
↓
komponent
│
│ props
↓
Technology
│
├── wyświetlanie danych
│
├── onClick
│
└── useState
        │
        ↓
   zmiana stanu
        │
        ↓
ponowne renderowanie komponentu
```

Poznaliśmy:

```text
const / let
      ↓
obiekty
      ↓
tablice
      ↓
Vite
      ↓
JSX
      ↓
komponenty
      ↓
import / export
      ↓
props
      ↓
tablice obiektów
      ↓
map()
      ↓
key
      ↓
zdarzenia
      ↓
onClick
      ↓
useState
      ↓
renderowanie zależne od stanu
```

## Następny etap

W kolejnych lekcjach przejdziemy do:

```text
renderowanie warunkowe
        ↓
tablica przechowywana w state
        ↓
dodawanie i usuwanie elementów
        ↓
formularze
        ↓
onChange
        ↓
mini CRUD
        ↓
useEffect
        ↓
API
```

Dzięki temu przejdziemy od prostych komponentów do aplikacji React, która pozwala użytkownikowi dodawać, modyfikować i usuwać dane.