# React — wprowadzenie  
### Plik: tutorial_4_lekcje_React.md

## LEKCJA 1 – Wprowadzenie do React + pierwszy projekt Vite

### 1. Cele lekcji
- Poznanie podstaw React.
- Utworzenie projektu Vite.
- Uruchomienie aplikacji.
- Edycja podstawowego komponentu.

### 2. Teoria – wprowadzenie
React to biblioteka JavaScript służąca do tworzenia interfejsów użytkownika.  
Cechy:
- deklaratywne podejście,
- komponenty,
- działanie w oparciu o Virtual DOM,
- umożliwia tworzenie SPA.

Polecana dokumentacja:
- https://www.w3schools.com/react/react_intro.asp
- https://react.dev/learn

### 3. Tworzenie projektu

```bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
```

Otwórz adres wskazany w terminalu, np. http://localhost:5173/

### 4. Edycja komponentu App

Edytuj `src/App.jsx`:

```jsx
function App() {
  return (
    <div>
      <h1>Moja pierwsza aplikacja React</h1>
      <p>To jest projekt testowy.</p>
    </div>
  );
}

export default App;
```

### 5. Zadanie
- Zdefiniuj własną definicję „Co to jest React?”.
- Wypisz 3 przykłady zastosowań React.

---

## LEKCJA 2 – Komponenty i JSX

### 1. Cele lekcji
- Poznanie komponentów.
- Zapoznanie się z JSX.
- Utworzenie własnych komponentów.

### 2. Komponent – teoria
Komponent = funkcja zwracająca JSX.  
Musi być zapisany w PascalCase.

### 3. Ćwiczenie: komponent Header

Plik `Header.jsx`:

```jsx
function Header() {
  return (
    <header>
      <h1>System zarządzania zadaniami</h1>
      <p>Panel startowy</p>
    </header>
  );
}

export default Header;
```

Import i użycie:

```jsx
import Header from "./Header.jsx";

function App() {
  return (
    <div>
      <Header />
      <p>Treść aplikacji...</p>
    </div>
  );
}
```

### 4. Zadania
- Dodaj komponent `Footer`.
- Dodaj komponent `InfoBox` z nagłówkiem i akapitami.

### 5. Zadanie
Dodać listę `<ul>` do `InfoBox`.

---

## LEKCJA 3 – Deklaratywność, Virtual DOM, JSX głębiej

### 1. Cele lekcji
- Zrozumieć deklaratywność.
- Omówić Virtual DOM.
- Poćwiczyć JSX.

### 2. Imperatywne vs deklaratywne

**jQuery (imperatywne):**
```js
$("#counter").text("Wynik: " + value);
```

**React (deklaratywne):**
```jsx
<p>Wynik: {value}</p>
```

### 3. Virtual DOM – schemat działania
1. Zmiana danych.
2. Tworzenie nowego Virtual DOM.
3. Porównanie ze starym.
4. Aktualizacja tylko potrzebnych elementów.

### 4. Ćwiczenie: zmienne w JSX

```jsx
const appName = "Panel projektów";
const version = "1.0.0";
const author = "Imię";

return (
  <div>
    <h1>{appName}</h1>
    <p>Wersja: {version}</p>
    <p>Autor: {author}</p>
  </div>
);
```

### 5. Ćwiczenie: jeden element nadrzędny

```jsx
<>
  <h1>Tytuł</h1>
  <p>Opis</p>
</>
```

---

## LEKCJA 4 – SPA, camelCase, mini-projekt

### 1. Cele lekcji
- Poznać różnice SPA vs MPA.
- Zrozumieć camelCase w JSX.
- Zbudować mini-projekt.

### 2. SPA – skrót teorii
SPA = jedna strona, aktualizowane fragmenty UI.  
MPA = cała strona przeładowywana.

### 3. camelCase – różnice

HTML → JSX:
- class → className
- onclick → onClick
- maxlength → maxLength

### 4. Mini-projekt: Strona wizytówka

Komponenty:
- Header
- About
- Features
- Footer

Kod (fragment przykładowy):

```jsx
function Features() {
  return (
    <section>
      <h2>Funkcje</h2>
      <ul>
        <li>Przejrzysty interfejs</li>
        <li>Komponentowa struktura</li>
        <li>Możliwość dalszej rozbudowy</li>
      </ul>
    </section>
  );
}
```

`App.jsx`:

```jsx
import Header from "./Header.jsx";
import About from "./About.jsx";
import Features from "./Features.jsx";
import Footer from "./Footer.jsx";

function App() {
  return (
    <div>
      <Header />
      <About />
      <Features />
      <Footer />
    </div>
  );
}

export default App;
```

---

# Zadania na ocenę (2–5)

### Mini-projekt — „Strona wizytówka React”
Uczeń tworzy aplikację z minimum **4 komponentów**:
- Header
- About
- Features (lista)
- Footer

### Kryteria oceniania:

#### **Ocena 2**
- Projekt uruchamia się.
- Komponent App działa, ale brakuje większości komponentów lub są niespójne.

#### **Ocena 3**
- Działają przynajmniej 2 komponenty.
- JSX poprawny, ale ograniczony.
- Widoczne podstawy struktury projektu.

#### **Ocena 4**
- Wszystkie 4 komponenty istnieją i działają.
- JSX zgodny z zasadami.
- Widoczna poprawna struktura aplikacji.

#### **Ocena 5**
- Wszystkie komponenty poprawne i czytelne.
- Użyto list (`<ul>`, `<li>`) i sekcji (`<section>`).
- Poprawne camelCase oraz struktura JSX.
- Całość estetyczna i przejrzysta (czytelny kod).
