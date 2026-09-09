# LEKCJA 4

# Props – przekazywanie danych do komponentów

## 1. Cele lekcji

Po wykonaniu ćwiczeń uczeń potrafi:

- wyjaśnić, do czego służą props,
- rozpoznać obiekt `props`,
- przekazać dane z komponentu nadrzędnego,
- odczytać props w komponencie,
- przekazać kilka właściwości,
- przekazać tekst, liczbę i wartość logiczną,
- wykorzystać jeden komponent z różnymi danymi,
- wyjaśnić, dlaczego props są tylko do odczytu,
- rozpoznać destrukturyzację props.

---

# 2. Problem

Mamy komponent:

```jsx
function Technology() {
  return (
    <section>
      <h2>React</h2>
      <p>Frontend</p>
    </section>
  );
}
```

Jeżeli wykonamy:

```jsx
<Technology />
<Technology />
<Technology />
```

otrzymamy trzy razy:

```text
React
Frontend
```

Chcielibyśmy jednak wykorzystać **ten sam komponent**, ale wyświetlić różne dane.

Przykład:

```text
React
Node.js
MySQL
```

Do tego służą **props**.

---

# 3. Pierwszy prop

W `App.jsx`:

```jsx
<Technology name="React" />
```

Przekazujemy do komponentu właściwość:

```text
name
```

o wartości:

```text
React
```

---

# 4. Odczyt props

Komponent:

```jsx
function Technology(props) {
  return (
    <h2>{props.name}</h2>
  );
}
```

Zwróć uwagę:

```javascript
props.name
```

To wygląda dokładnie jak dostęp do właściwości zwykłego obiektu:

```javascript
student.name
```

`props` jest obiektem zawierającym dane przekazane do komponentu.

---

# 5. Schemat przepływu

```text
App
 │
 │ name="React"
 ↓
Technology
 │
 │ props.name
 ↓
React
```

---

# 6. Jeden komponent – różne dane

```jsx
<Technology name="React" />

<Technology name="Node.js" />

<Technology name="MySQL" />
```

Komponent:

```jsx
function Technology(props) {
  return (
    <section>
      <h2>{props.name}</h2>
    </section>
  );
}
```

Na ekranie:

```text
React

Node.js

MySQL
```

Kod komponentu napisaliśmy tylko jeden raz.

---

# 7. Kilka props

Możemy przekazać kilka właściwości.

```jsx
<Technology
  name="React"
  category="Frontend"
  hours={30}
/>
```

Komponent:

```jsx
function Technology(props) {
  return (
    <section>

      <h2>{props.name}</h2>

      <p>
        Kategoria: {props.category}
      </p>

      <p>
        Liczba godzin: {props.hours}
      </p>

    </section>
  );
}
```

---

# 8. Tekst i liczby w props

Tekst możemy przekazać:

```jsx
name="React"
```

Liczbę przekazujemy jako wyrażenie JavaScript:

```jsx
hours={30}
```

Wartość logiczną:

```jsx
active={true}
```

Przykład:

```jsx
<Technology
  name="React"
  hours={30}
  active={true}
/>
```

---

# 9. Projekt WebTech – etap 3

Zmodyfikuj:

```text
Technology.jsx
```

Kod:

```jsx
function Technology(props) {
  return (
    <section>

      <h2>{props.name}</h2>

      <p>
        Kategoria: {props.category}
      </p>

      <p>
        Liczba godzin: {props.hours}
      </p>

    </section>
  );
}

export default Technology;
```

Następnie `App.jsx`:

```jsx
import Header from "./components/Header.jsx";
import Technology from "./components/Technology.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Header />

      <main>

        <Technology
          name="React"
          category="Frontend"
          hours={30}
        />

        <Technology
          name="Node.js"
          category="Backend"
          hours={40}
        />

        <Technology
          name="MySQL"
          category="Baza danych"
          hours={20}
        />

      </main>

      <Footer />
    </>
  );
}

export default App;
```

Teraz jeden komponent:

```text
Technology
```

obsługuje trzy różne zestawy danych.

---

# 10. Props są tylko do odczytu

Komponent powinien korzystać z danych otrzymanych przez props.

Nie powinien bezpośrednio zmieniać:

```javascript
props.name
```

Niepoprawnie:

```jsx
function Technology(props) {

  props.name = "Inna wartość";

  return <h2>{props.name}</h2>;
}
```

Props traktujemy jako dane przekazane do komponentu.

Jeżeli w przyszłości będziemy chcieli przechowywać i zmieniać dane komponentu, poznamy:

```text
state
useState
```

---

# 11. Destrukturyzacja props

Zapis:

```jsx
function Technology(props) {
  return (
    <h2>{props.name}</h2>
  );
}
```

możemy później skrócić za pomocą destrukturyzacji.

```jsx
function Technology({ name }) {
  return (
    <h2>{name}</h2>
  );
}
```

Przy kilku właściwościach:

```jsx
function Technology({ name, category, hours }) {
  return (
    <section>
      <h2>{name}</h2>
      <p>{category}</p>
      <p>{hours}</p>
    </section>
  );
}
```

Na początku można stosować pełny zapis:

```javascript
props.name
```

ponieważ bardzo dobrze pokazuje, że `props` jest obiektem.

---

# 12. Zadanie samodzielne

Utwórz komponent:

```text
StudentCard
```

Powinien przyjmować:

```text
name
className
specialization
```

Przykładowe użycie:

```jsx
<StudentCard
  name="Jan Kowalski"
  className="4P"
  specialization="technik programista"
/>
```

Komponent powinien wyświetlić:

```text
Jan Kowalski
Klasa: 4P
Kierunek: technik programista
```

---

# 13. Druga część zadania

Za pomocą tego samego komponentu utwórz trzech różnych uczniów.

```jsx
<StudentCard ... />

<StudentCard ... />

<StudentCard ... />
```

Nie twórz:

```text
Student1
Student2
Student3
```

Wykorzystaj jeden komponent z różnymi props.

---

# 14. Zadanie dodatkowe – różne typy danych

Rozbuduj komponent o:

```text
age
active
```

Przykład:

```jsx
<StudentCard
  name="Jan Kowalski"
  className="4P"
  specialization="technik programista"
  age={18}
  active={true}
/>
```

Wyświetl również wiek.

---

# 15. Rozszerzenie – obiekt jako prop

Props może również otrzymać cały obiekt.

Przykład:

```javascript
const specification = {
  language: "JavaScript",
  type: "Frontend"
};
```

Przekazanie:

```jsx
<Technology
  name="React"
  specification={specification}
/>
```

Odczyt:

```jsx
<p>
  Język: {props.specification.language}
</p>
```

Zauważ:

```text
props
↓
specification
↓
language
```

czyli:

```javascript
props.specification.language
```

---

# 16. Rozszerzenie – tablica jako prop

Możemy również przekazać tablicę.

```javascript
const features = [
  "Komponenty",
  "JSX",
  "Props"
];
```

Przekazanie:

```jsx
<Technology
  name="React"
  features={features}
/>
```

Odczyt:

```jsx
<ul>
  <li>{props.features[0]}</li>
  <li>{props.features[1]}</li>
  <li>{props.features[2]}</li>
</ul>
```

---

# 17. Materiał rozszerzający – tablica obiektów

W kolejnych zajęciach będziemy mogli połączyć:

- tablice,
- obiekty,
- komponenty,
- props.

Przykład danych:

```javascript
const technologies = [
  {
    id: 1,
    name: "React",
    category: "Frontend"
  },
  {
    id: 2,
    name: "Node.js",
    category: "Backend"
  },
  {
    id: 3,
    name: "MySQL",
    category: "Database"
  }
];
```

Następnym krokiem będzie automatyczne tworzenie komponentów na podstawie takiej tablicy za pomocą:

```javascript
map()
```

oraz właściwości:

```text
key
```

Nie jest to wymagane do wykonania podstawowej części dzisiejszej lekcji.

---

# 18. Pytania kontrolne

1. Do czego służą props?
2. Czym jest obiekt `props`?
3. Co oznacza `props.name`?
4. Skąd komponent otrzymuje dane?
5. Czy jeden komponent może otrzymać różne props?
6. Jak przekazujemy tekst?
7. Jak przekazujemy liczbę?
8. Dlaczego używamy `{30}`, a nie `"30"`, jeśli chcemy przekazać liczbę?
9. Czy komponent powinien modyfikować props?
10. Do czego służy destrukturyzacja?
11. Czy jako prop możemy przekazać obiekt?
12. Czy jako prop możemy przekazać tablicę?

---

# PODSUMOWANIE CZTERECH LEKCJI

Po wykonaniu czterech lekcji powinieneś rozumieć następujący ciąg:

```text
const / let
     ↓
tablice i obiekty
     ↓
React + Vite
     ↓
App.jsx
     ↓
JSX
     ↓
JavaScript w { }
     ↓
komponenty
     ↓
import / export
     ↓
props
```

Projekt powinien mieć strukturę:

```text
webtech/
│
└── src/
    │
    ├── components/
    │   ├── Header.jsx
    │   ├── Technology.jsx
    │   └── Footer.jsx
    │
    ├── App.jsx
    └── main.jsx
```

Najważniejsza zależność:

```text
App
 │
 ├── Header
 │
 ├── Technology
 │      ↑
 │      props
 │
 └── Footer
```

W następnych zajęciach rozwiniemy projekt o:

```text
tablice obiektów
↓
map()
↓
key
↓
zdarzenia
↓
state
↓
useState
```