**„Śledztwo w kodzie Reacta”**

**Runda 1. Kto ma rację? — 6 punktów**

Wyświetlaj kolejno trzy sytuacje. Za każdą: **1 punkt za wybór i 1 za uzasadnienie**.

**1. Znikające napisy**

```jsx
const names = ["Ala", "Ola", "Jan"];

const elements = names.map((name) => {
  <p key={name}>{name}</p>
});
```

- **Ala:** „Powstaną trzy elementy `<p>`”.
- **Bartek:** „Powstanie tablica trzech wartości `undefined`”.
- **Celina:** „To błąd składni — kod się nie uruchomi”.

**Polecenie:** Kto ma rację? Wyjaśnij dlaczego.

**2. Przycisk, który się spieszy**

```jsx
function showMessage() {
  console.log("Cześć!");
}

<button onClick={showMessage()}>Powitaj</button>
```

- **Ala:** „Wiadomość pojawi się dopiero po kliknięciu”.
- **Bartek:** „Funkcja zostanie wywołana podczas renderowania”.
- **Celina:** „React automatycznie zaczeka z wywołaniem do kliknięcia”.

**Polecenie:** Kto ma rację? Jak poprawić kod?

**3. Tajemniczy `key`**

```jsx
const products = [
  { id: 11, name: "Monitor" },
  { id: 12, name: "Monitor" }
];
```

Uczniowie wybierają klucz do listy produktów:

- **Ala:** `key={product.name}`
- **Bartek:** `key={product.id}`
- **Celina:** `key={1}`

**Polecenie:** Która propozycja jest najlepsza dla tych danych? Co jest nie tak z pozostałymi?

---

**Runda 2. Serwis naprawczy — 8 punktów**

„Dostaliście fragment aplikacji po nieudanej aktualizacji. Naprawcie cztery wskazane obszary: odbieranie props, zwracanie wyniku `map()`, klucze i obsługę kliknięcia”.

```jsx
const courses = [
  { id: 1, title: "React" },
  { id: 2, title: "Node.js" }
];

function Course(title) {
  return (
    <button onClick={console.log(title)}>
      {title}
    </button>
  );
}

function App() {
  return (
    <main>
      {courses.map((course) => {
        <Course title={course.title} />
      })}
    </main>
  );
}
```

**Zadanie zespołu:**

1. Zapiszcie poprawioną wersję kodu.
2. Przy każdej z czterech poprawek dopiszcie krótkie wyjaśnienie.

**Punktacja:** po 1 punkcie za poprawkę i po 1 punkcie za jej wyjaśnienie.

Podczas omówienia każdemu z czterech zespołów możesz przydzielić jedną poprawkę do wyjaśnienia. Przy większej liczbie zespołów pozostałe oceniają, czy wyjaśnienie jest kompletne.

---

**Runda 3. Co naprawdę się wydarzy? — 10 punktów**

```jsx
const books = [
  { id: 1, title: "React od podstaw", pages: 120 },
  { id: 2, title: "JavaScript w praktyce", pages: 200 }
];

function Book({ title, pages, onChoose }) {
  return (
    <article>
      <h2>{title}</h2>

      <button onClick={() => console.log(pages)}>
        Pokaż liczbę stron
      </button>

      <button onClick={() => onChoose(title)}>
        Wybierz
      </button>
    </article>
  );
}

function App() {
  function chooseBook(title) {
    console.log("Wybrano: " + title);
  }

  return (
    <main>
      {books.map((book) => (
        <Book
          key={book.id}
          title={book.title}
          pages={book.pages}
          onChoose={chooseBook}
        />
      ))}
    </main>
  );
}
```

**Pytania — każde za 2 punkty:**

1. Ile elementów `<article>` i ile przycisków pojawi się na stronie?
2. Co pojawi się w konsoli po kliknięciu „Pokaż liczbę stron” przy drugiej książce? Czy ta liczba pojawi się również na stronie?
3. Co pojawi się w konsoli po kliknięciu „Wybierz” przy pierwszej książce?
4. Wymień trzy props odbierane przez `Book`. Który z nich jest funkcją?
5. Ułóż kolejność zdarzeń:

   **A.** `chooseBook` wypisuje komunikat.  
   **B.** Użytkownik klika „Wybierz”.  
   **C.** Funkcja strzałkowa wywołuje `onChoose(title)`.

**Urozmaicenie:** zanim pokażesz rozwiązanie pytania 5, poproś jeden zespół, aby własnymi słowami opowiedział drogę „od kliknięcia do konsoli”.

---

**Runda 4. Zastaw pułapkę na inny zespół — 6 punktów**

Każdy zespół otrzymuje poprawny kod:

```jsx
const colors = [
  { id: 1, label: "Czerwony" },
  { id: 2, label: "Zielony" }
];

function Color({ label }) {
  return <p>{label}</p>;
}

function App() {
  return (
    <div>
      {colors.map((color) => (
        <Color key={color.id} label={color.label} />
      ))}
    </div>
  );
}
```

**Instrukcja:**

1. Wprowadźcie **jeden celowy błąd** dotyczący props, `map()` albo `key`.
2. Na osobnej kartce zapiszcie rozwiązanie: co zmieniliście, jaki będzie skutek i jak to naprawić.
3. Przekażcie kod sąsiedniemu zespołowi.
4. Rozwiążcie zagadkę, którą otrzymaliście.

Nie wolno usuwać całego kodu ani robić przypadkowych literówek. Przy `key` dopuszczalną pułapką jest ostrzeżenie Reacta — nie trzeba powodować zniknięcia listy.

**Punktacja:**

- 2 pkt — własna pułapka zgodna z zasadami i poprawny klucz odpowiedzi;
- 1 pkt — znalezienie błędu sąsiadów;
- 1 pkt — poprawne opisanie skutku;
- 2 pkt — poprawa kodu.
