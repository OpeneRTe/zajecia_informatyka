# LEKCJA 3

# Komponenty React – tworzenie komponentów w jednym pliku oraz w osobnych plikach

## 1. Cele lekcji

Po wykonaniu ćwiczeń uczeń potrafi:

- wyjaśnić, czym jest komponent React,
- utworzyć komponent funkcyjny,
- zastosować nazwę w PascalCase,
- wykorzystać komponent w JSX,
- użyć komponentu wielokrotnie,
- utworzyć kilka komponentów w jednym pliku,
- utworzyć komponent w osobnym pliku,
- zastosować `export default`,
- zastosować `import`,
- zorganizować komponenty w katalogu `components`.

---

# 2. Czym jest komponent?

Komponent jest wydzielonym fragmentem aplikacji odpowiedzialnym za określoną część interfejsu.

Przykład:

```jsx
function Header() {
  return (
    <header>
      <h1>WebTech</h1>
    </header>
  );
}
```

Komponent:

```text
Header
```

jest funkcją zwracającą JSX.

---

# 3. Nazwy komponentów

Własne komponenty React zapisujemy wielką literą.

Poprawnie:

```jsx
function Header() {
```

oraz:

```jsx
<Header />
```

Niepoprawnie:

```jsx
function header() {
```

oraz:

```jsx
<header />
```

`<header>` jest bowiem zwykłym elementem HTML.

Własny komponent:

```jsx
<Header />
```

rozpoczynamy wielką literą.

Taki sposób zapisu nazw nazywa się **PascalCase**.

Przykłady:

```text
Header
Footer
Student
Technology
TechnologyCard
UserProfile
```

---

# 4. Komponent w tym samym pliku

Na początku możemy mieć kilka komponentów w jednym pliku.

`App.jsx`:

```jsx
function Header() {
  return (
    <header>
      <h1>WebTech</h1>
      <p>Technologie aplikacji internetowych</p>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <p>Projekt React</p>
    </footer>
  );
}

function App() {
  return (
    <>
      <Header />

      <main>
        <h2>Technologie</h2>
      </main>

      <Footer />
    </>
  );
}

export default App;
```

Tutaj:

```text
Header
Footer
App
```

znajdują się w jednym pliku.

Dlatego nie musimy ich importować pomiędzy plikami.

---

# 5. Użycie komponentu

Po zdefiniowaniu:

```jsx
function Header() {
  return <h1>WebTech</h1>;
}
```

możemy go wykorzystać:

```jsx
<Header />
```

---

# 6. Wielokrotne użycie komponentu

Ten sam komponent może zostać wyświetlony wiele razy.

```jsx
function Technology() {
  return (
    <div>
      <h2>React</h2>
      <p>Technologia frontendowa</p>
    </div>
  );
}
```

Następnie:

```jsx
<Technology />
<Technology />
<Technology />
```

Każde użycie wyświetli obecnie te same dane.

Problem różniących się danych rozwiążemy za pomocą **props**.

---

# 7. Dlaczego rozdzielamy komponenty na pliki?

W małym przykładzie możemy mieć wszystko w `App.jsx`.

W większej aplikacji kod stałby się jednak trudny do zarządzania.

Dlatego tworzymy:

```text
src/
│
├── components/
│   ├── Header.jsx
│   ├── Technology.jsx
│   └── Footer.jsx
│
├── App.jsx
└── main.jsx
```

Każdy większy element aplikacji posiada własny plik.

---

# 8. Komponent w osobnym pliku

Utwórz:

```text
src/components/Header.jsx
```

Kod:

```jsx
function Header() {
  return (
    <header>
      <h1>WebTech</h1>
      <p>Panel technologii webowych</p>
    </header>
  );
}

export default Header;
```

---

# 9. `export default`

Instrukcja:

```javascript
export default Header;
```

umożliwia użycie komponentu w innym pliku.

Bez eksportu plik `App.jsx` nie może w zwykły sposób zaimportować tego komponentu.

---

# 10. `import`

W `App.jsx`:

```jsx
import Header from "./components/Header.jsx";
```

Następnie:

```jsx
function App() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
```

Schemat:

```text
Header.jsx
   │
   │ export
   ↓
App.jsx
   ↑
   │ import
```

---

# 11. Projekt WebTech – etap 2

Utwórz katalog:

```text
src/components/
```

Następnie utwórz:

```text
Header.jsx
Technology.jsx
Footer.jsx
```

---

## `Header.jsx`

```jsx
function Header() {
  return (
    <header>
      <h1>WebTech</h1>
      <p>Panel technologii webowych</p>
    </header>
  );
}

export default Header;
```

---

## `Technology.jsx`

```jsx
function Technology() {
  return (
    <section>
      <h2>React</h2>
      <p>Biblioteka frontendowa</p>
      <p>Liczba godzin: 30</p>
    </section>
  );
}

export default Technology;
```

---

## `Footer.jsx`

```jsx
function Footer() {
  return (
    <footer>
      <p>Zaawansowane aplikacje internetowe</p>
    </footer>
  );
}

export default Footer;
```

---

## `App.jsx`

```jsx
import Header from "./components/Header.jsx";
import Technology from "./components/Technology.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Header />

      <main>

        <Technology />

        <Technology />

        <Technology />

      </main>

      <Footer />
    </>
  );
}

export default App;
```

---

# 12. Komponent bezstanowy i stanowy – pojęcia

Na tym etapie nasze komponenty są przede wszystkim komponentami prezentacyjnymi.

Wyświetlają dane:

```jsx
function Logo() {
  return <h1>WebTech</h1>;
}
```

Później poznamy komponenty przechowujące dane, które mogą się zmieniać, na przykład:

- licznik,
- formularz,
- lista produktów,
- stan otwarcia panelu.

Do tego będziemy używać między innymi:

```text
state
useState
```

Nie implementujemy ich jeszcze na tej lekcji.

---

# 13. Zadanie samodzielne 1

Utwórz komponent:

```text
Student
```

Komponent ma wyświetlać:

```text
imię i nazwisko
klasę
specjalizację
```

Na tym etapie wartości mogą być wpisane bezpośrednio w komponencie.

Komponent umieść w osobnym pliku:

```text
Student.jsx
```

Następnie:

1. wyeksportuj go,
2. zaimportuj do `App.jsx`,
3. wyświetl w aplikacji.

---

# 14. Zadanie samodzielne 2

Utwórz komponent:

```text
InfoBox
```

Ma zawierać:

- nagłówek,
- dwa akapity,
- listę `<ul>`,
- minimum trzy elementy `<li>`.

Komponent ma znajdować się w osobnym pliku.

---

# 15. Zadanie dodatkowe

Utwórz komponent:

```text
Navigation
```

Powinien zawierać:

```text
Strona główna
Technologie
O projekcie
Kontakt
```

Zastosuj listę.

Dodaj komponent pomiędzy:

```jsx
<Header />
```

a:

```jsx
<main>
```

---

# 16. Pytania kontrolne

1. Czym jest komponent React?
2. Dlaczego własny komponent rozpoczynamy wielką literą?
3. Co oznacza PascalCase?
4. Jak wykorzystać komponent `Header`?
5. Czy komponent można wykorzystać więcej niż jeden raz?
6. Kiedy nie jest potrzebny `import`?
7. Kiedy potrzebujemy `import`?
8. Do czego służy `export default`?
9. Dlaczego warto umieszczać komponenty w osobnych plikach?
10. Gdzie najlepiej przechowywać komponenty aplikacji?

---