## Projekt główny: WebTech

W poprzednich lekcjach poznaliśmy:

- zmienne `const` i `let`,
- tablice i obiekty,
- tworzenie projektu React za pomocą Vite,
- JSX,
- komponenty,
- importowanie i eksportowanie komponentów,
- props.

Do tej pory dane w aplikacji były w większości wpisywane bezpośrednio w kodzie:

```jsx
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
```

W kolejnych lekcjach aplikacja stanie się dynamiczna i interaktywna.

Poznamy następującą zależność:

```text
tablica obiektów
      ↓
    map()
      ↓
 komponenty
      ↓
    props
      ↓
  zdarzenia
      ↓
  useState
      ↓
zmiana interfejsu
```

---

# LEKCJA 5

# Tablice obiektów, `map()` i `key` – dynamiczne generowanie komponentów

## Cele lekcji

Po zakończeniu lekcji uczeń:

- tworzy tablicę obiektów,
- odczytuje element tablicy,
- odczytuje właściwości obiektu znajdującego się w tablicy,
- wyjaśnia działanie metody `map()`,
- wykorzystuje `map()` do przetwarzania tablicy,
- rozumie różnicę między `()` a `{}` w funkcji strzałkowej,
- stosuje `return` w funkcji strzałkowej,
- wykorzystuje `map()` w JSX,
- generuje wiele komponentów na podstawie danych,
- przekazuje dane z tablicy do komponentu za pomocą props,
- wyjaśnia znaczenie właściwości `key`,
- stosuje unikalny identyfikator jako `key`.

---

## 1. Przypomnienie – tablica

Tablica pozwala przechowywać wiele wartości w jednej zmiennej.

```javascript
const technologies = ["React", "Node.js", "MySQL"];
```

Elementy tablicy mają indeksy.

```text
indeks:       0          1          2
wartość:   "React"   "Node.js"   "MySQL"
```

Dostęp do elementu:

```javascript
console.log(technologies[0]);
console.log(technologies[1]);
console.log(technologies[2]);
```

Wynik:

```text
React
Node.js
MySQL
```

# Drugi parametr metody `map()`

Metoda `map()` może przyjmować drugi parametr, którym jest indeks elementu w tablicy.

Przykład:

```javascript
const technologies = ["React", "Node.js", "MySQL"];

const newTechnologies = technologies.map((technology, index) => {
  return `${technology} (${index})`;
});

console.log(newTechnologies);
```

Wynik:

```text
[ "React (0)", "Node.js (1)", "MySQL (2)" ]
```

## Możemy wykorzystać indeks jako `key` w React

W React każdemu elementowi w liście należy przypisać unikalną właściwość `key`. Jeśli nie mamy unikalnego identyfikatora, możemy tymczasowo użyć indeksu elementu w tablicy.

Przykład:

```jsx
const technologies = ["React", "Node.js", "MySQL"];

const TechnologyList = () => {
  return (
    <div>
      {technologies.map((technology, index) => (
        <Technology key={index} name={technology} />
      ))}
    </div>
  );
};
```

---

# 2. Przypomnienie – obiekt

Obiekt przechowuje dane w postaci właściwości.

```javascript
const technology = {
  id: 1,
  name: "React",
  category: "Frontend",
  hours: 30
};
```

Dostęp do właściwości:

```javascript
console.log(technology.name);
console.log(technology.category);
console.log(technology.hours);
```

---

# 3. Tablica obiektów

W aplikacjach bardzo często korzystamy z **tablic zawierających obiekty**.

Przykład:

```javascript
const technologies = [
  {
    id: 1,
    name: "React",
    category: "Frontend",
    hours: 30
  },
  {
    id: 2,
    name: "Node.js",
    category: "Backend",
    hours: 40
  },
  {
    id: 3,
    name: "MySQL",
    category: "Baza danych",
    hours: 20
  }
];
```

Mamy tutaj:

```text
technologies
│
├── [0] → obiekt React
├── [1] → obiekt Node.js
└── [2] → obiekt MySQL
```

Aby pobrać pierwszy obiekt:

```javascript
technologies[0]
```

Aby pobrać nazwę pierwszej technologii:

```javascript
technologies[0].name
```

Aby pobrać kategorię drugiej:

```javascript
technologies[1].category
```

Aby pobrać liczbę godzin trzeciej:

```javascript
technologies[2].hours
```

---

# 4. Problem z ręcznym tworzeniem komponentów

Dotychczas mogliśmy utworzyć komponenty w następujący sposób:

```jsx
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
```

Takie rozwiązanie działa.

Problem pojawi się jednak, gdy będziemy mieli:

- 20 technologii,
- 100 produktów,
- 500 użytkowników,
- dane pobrane z serwera.

Nie powinniśmy wtedy ręcznie tworzyć setek komponentów.

React powinien wygenerować komponenty na podstawie danych.

Do tego wykorzystamy metodę:

```javascript
map()
```

---

# 5. Metoda `map()`

`map()` jest metodą tablic JavaScript.

Pozwala przejść przez wszystkie elementy tablicy i utworzyć na ich podstawie nowe wartości.

Najprostszy przykład:

```javascript
const numbers = [1, 2, 3];

const newNumbers = numbers.map((number) => {
  return number * 2;
});

console.log(newNumbers);
```

Wynik:

```text
[2, 4, 6]
```

Możemy to przedstawić następująco:

```text
1 → 1 * 2 → 2
2 → 2 * 2 → 4
3 → 3 * 2 → 6
```

---

# 6. Co oznacza parametr funkcji w `map()`?

Spójrzmy na zapis:

```javascript
numbers.map((number) => {
  return number * 2;
});
```

`map()` wykonuje podaną funkcję dla każdego elementu tablicy.

Parametr:

```javascript
number
```

oznacza **aktualnie przetwarzany element tablicy**.

Dla tablicy:

```javascript
[1, 2, 3]
```

funkcja zostanie wykonana kolejno dla:

```text
number = 1
number = 2
number = 3
```

Nazwa parametru jest wybierana przez programistę.

Można byłoby napisać:

```javascript
numbers.map((x) => {
  return x * 2;
});
```

Jednak lepiej stosować nazwy opisujące dane.

---

# 7. Funkcja strzałkowa w `map()` – różnica między `()` a `{}`

W `map()` bardzo często spotkamy dwa podobne zapisy:

```javascript
numbers.map((number) => (
  number * 2
));
```

oraz:

```javascript
numbers.map((number) => {
  return number * 2;
});
```

Oba zapisy mogą dać taki sam wynik.

Różnica wynika z działania funkcji strzałkowej.

---

## 7.1. Nawiasy `()` – zwracanie wartości bez `return`

Jeżeli po `=>` używamy nawiasów okrągłych:

```javascript
(number) => (
  number * 2
)
```

wartość jest zwracana automatycznie.

Nie wpisujemy wtedy słowa:

```javascript
return
```

Przykład:

```javascript
const newNumbers = numbers.map((number) => (
  number * 2
));
```

Można zapisać jeszcze krócej:

```javascript
const newNumbers = numbers.map((number) => number * 2);
```

W obu przypadkach funkcja zwraca:

```javascript
number * 2
```

---

## 7.2. Nawiasy `{}` – trzeba użyć `return`

Jeżeli po `=>` używamy nawiasów klamrowych:

```javascript
(number) => {
  return number * 2;
}
```

tworzymy blok kodu.

W takim przypadku musimy jawnie określić, co funkcja ma zwrócić:

```javascript
return
```

Przykład:

```javascript
const newNumbers = numbers.map((number) => {
  return number * 2;
});
```

---

# 7.3. Najważniejsza różnica

```text
() → automatyczny return

{} → trzeba wpisać return
```

Przykład z `()`:

```javascript
numbers.map((number) => (
  number * 2
));
```

Przykład z `{}`:

```javascript
numbers.map((number) => {
  return number * 2;
});
```

---

# 7.4. Częsty błąd

Niepoprawny zapis:

```javascript
numbers.map((number) => {
  number * 2;
});
```

Brakuje:

```javascript
return
```

Funkcja niczego nie zwraca.

Wynikiem będzie tablica zawierająca wartości:

```text
undefined
```

czyli:

```javascript
[undefined, undefined, undefined]
```

Poprawnie:

```javascript
numbers.map((number) => {
  return number * 2;
});
```

lub:

```javascript
numbers.map((number) => (
  number * 2
));
```

---

# 7.5. Dlaczego w React często używamy `()`?

W React często chcemy zwrócić fragment JSX:

```jsx
technologies.map((technology) => (
  <p>{technology.name}</p>
))
```

Nawiasy `()` pozwalają zapisać JSX czytelnie w kilku liniach.

To jest odpowiednik:

```jsx
technologies.map((technology) => {
  return (
    <p>{technology.name}</p>
  );
})
```

Oba zapisy są poprawne.

Pierwszy:

```jsx
(technology) => (
  <p>{technology.name}</p>
)
```

jest krótszy.

Drugi:

```jsx
(technology) => {
  return (
    <p>{technology.name}</p>
  );
}
```

jest przydatny, jeżeli przed `return` chcemy wykonać dodatkowy kod.

---

# 7.6. Kiedy użyć `{}`?

Jeżeli funkcja wykonuje kilka instrukcji, stosujemy `{}`.

Przykład:

```jsx
technologies.map((technology) => {

  console.log(technology.name);

  const title = technology.name.toUpperCase();

  return (
    <p>{title}</p>
  );
})
```

Tutaj potrzebujemy bloku kodu, ponieważ wykonujemy kilka instrukcji.

Dlatego stosujemy:

```javascript
{
}
```

oraz:

```javascript
return
```

---

# 7.7. Zasada praktyczna

Jeżeli funkcja ma tylko zwrócić jeden wynik:

```jsx
(technology) => (
  <Technology name={technology.name} />
)
```

możemy zastosować zapis skrócony.

Jeżeli funkcja wykonuje dodatkowe operacje:

```jsx
(technology) => {
  const name = technology.name.toUpperCase();

  return (
    <Technology name={name} />
  );
}
```

stosujemy `{}` i `return`.

---

# 8. `map()` dla tablicy obiektów

Mamy:

```javascript
const technologies = [
  { id: 1, name: "React" },
  { id: 2, name: "Node.js" },
  { id: 3, name: "MySQL" }
];
```

Możemy wykonać:

```javascript
technologies.map((technology) => {
  console.log(technology.name);

  return technology.name;
});
```

W kolejnych wykonaniach:

```text
technology = { id: 1, name: "React" }

technology = { id: 2, name: "Node.js" }

technology = { id: 3, name: "MySQL" }
```

Dlatego:

```javascript
technology.name
```

oznacza nazwę aktualnie przetwarzanej technologii.

---

# 9. `map()` w JSX

Najważniejsze zastosowanie `map()` w React to generowanie elementów interfejsu.

Wersja skrócona:

```jsx
{technologies.map((technology) => (
  <p>{technology.name}</p>
))}
```

Wersja z `return`:

```jsx
{technologies.map((technology) => {
  return (
    <p>{technology.name}</p>
  );
})}
```

Obie wersje działają tak samo.

Dla trzech obiektów React utworzy trzy elementy:

```html
<p>React</p>
<p>Node.js</p>
<p>MySQL</p>
```

Zwróć uwagę na dwie różne pary nawiasów.

Zewnętrzne:

```jsx
{
  technologies.map(...)
}
```

oznaczają przejście z JSX do JavaScript.

Natomiast:

```jsx
(technology) => (
  <p>{technology.name}</p>
)
```

to składnia funkcji strzałkowej zwracającej JSX.

---

# 10. Generowanie komponentów

Zamiast `<p>` możemy generować własny komponent.

```jsx
{technologies.map((technology) => (
  <Technology
    name={technology.name}
    category={technology.category}
    hours={technology.hours}
  />
))}
```

Dla każdego obiektu powstaje jeden komponent `Technology`.

Przepływ danych:

```text
technologies
      ↓
    map()
      ↓
technology
      ↓
<Technology />
      ↓
    props
```

---

# 11. `key`

Podczas generowania listy komponentów React wymaga identyfikatora:

```jsx
key
```

Dlatego zapisujemy:

```jsx
{technologies.map((technology) => (
  <Technology
    key={technology.id}
    name={technology.name}
    category={technology.category}
    hours={technology.hours}
  />
))}
```

`key` pozwala Reactowi identyfikować poszczególne elementy listy.

Każdy element powinien mieć unikalny `key`.

Dlatego bardzo dobrym rozwiązaniem jest:

```jsx
key={technology.id}
```

Nie używamy tej samej wartości dla kilku elementów.

---

# 12. Projekt WebTech – etap 4

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
      hours: 30
    },
    {
      id: 2,
      name: "Node.js",
      category: "Backend",
      hours: 40
    },
    {
      id: 3,
      name: "MySQL",
      category: "Baza danych",
      hours: 20
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
function Technology({ name, category, hours }) {
  return (
    <section>
      <h2>{name}</h2>
      <p>Kategoria: {category}</p>
      <p>Liczba godzin: {hours}</p>
    </section>
  );
}

export default Technology;
```

Teraz dodanie kolejnej technologii nie wymaga tworzenia kolejnego komponentu ręcznie.

Wystarczy dopisać obiekt:

```javascript
{
  id: 4,
  name: "Express",
  category: "Backend",
  hours: 25
}
```

---

# Zadanie samodzielne

Utwórz tablicę:

```javascript
const students = [
  { id: 1, name: "Anna", className: "4P" },
  { id: 2, name: "Jan", className: "4P" },
  { id: 3, name: "Adam", className: "4P" }
];
```

Utwórz komponent:

```text
Student
```

który otrzymuje przez props:

- `name`,
- `className`.

Za pomocą `map()` wygeneruj trzy komponenty `Student`.

Każdy komponent musi posiadać prawidłowy `key`.

Najpierw zastosuj zapis:

```jsx
students.map((student) => (
  ...
))
```

Następnie przepisz go na wersję:

```jsx
students.map((student) => {
  return (
    ...
  );
})
```

Obie wersje mają dać taki sam efekt.

---

# Zadanie dodatkowe

Rozszerz każdy obiekt o:

```javascript
age
specialization
```

Wyświetl wszystkie dane w komponencie `Student`.

Dodaj czwartego ucznia wyłącznie przez dodanie nowego obiektu do tablicy.

---

# Pytania kontrolne

1. Czym jest tablica obiektów?
2. Co oznacza `technologies[0]`?
3. Co oznacza `technologies[0].name`?
4. Do czego służy `map()`?
5. Ile razy wykona się `map()` dla tablicy zawierającej pięć elementów?
6. Co oznacza parametr `technology` w funkcji przekazanej do `map()`?
7. Jaka jest różnica między `=> (...)` a `=> {...}`?
8. Kiedy można pominąć `return`?
9. Kiedy trzeba zastosować `return`?
10. Co stanie się, jeśli zastosujemy `{}` bez `return`?
11. Dlaczego w JSX często stosujemy `=> (...)`?
12. Kiedy lepiej zastosować `=> {...}`?
13. Dlaczego `map()` umieszczamy w JSX wewnątrz `{}`?
14. Czy za pomocą `map()` można generować komponenty?
15. Do czego służy `key`?
16. Dlaczego `id` jest dobrym kandydatem na `key`?

