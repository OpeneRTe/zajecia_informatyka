## Routing w React z wykorzystaniem React Router

### 1. Cel routingu w aplikacjach React

Aplikacje React zazwyczaj działają jako aplikacje typu Single Page Application (SPA). Oznacza to, że przeglądarka ładuje jeden dokument HTML, a kolejne „widoki” są wyświetlane poprzez dynamiczną wymianę komponentów, bez pełnego przeładowania strony.

Routing w takim środowisku:

- mapuje adresy URL na konkretne komponenty React,
- umożliwia podział aplikacji na logiczne „podstrony”,
- synchronizuje stan interfejsu użytkownika z paskiem adresu i historią przeglądarki,
- pozwala obsługiwać parametry w ścieżkach, wyszukiwaniu i nawigacji wstecz/do przodu.

W kontekście kwalifikacji INF.04 jest to element programowania zaawansowanych aplikacji webowych z wykorzystaniem frameworków frontendowych, takich jak React.js.

---

### 2. Biblioteka React Router – podstawowe informacje

React Router jest standardową biblioteką routingu dla React. Zapewnia zestaw komponentów oraz hooków do:

- definiowania tras,
- obsługi historii przeglądarki,
- implementacji zagnieżdżonych widoków,
- nawigacji programistycznej.

Przy pracy w przeglądarce wykorzystuje się pakiet:

```bash
npm install react-router-dom
```

Pakiet `react-router-dom` zawiera elementy specyficzne dla przeglądarki (między innymi `BrowserRouter`, `Link`, `Routes`, `Route`).

---

### 3. Rodzaje routerów

W typowym projekcie webowym w React używa się głównie następujących typów routerów:

- **BrowserRouter**  
  - opiera się na HTML5 History API (`pushState`, `popstate`),
  - aktualizuje adres w pasku przeglądarki bez przeładowania strony,
  - wymaga poprawnej konfiguracji serwera (obsługa przekierowania na `index.html` dla nieznanych ścieżek).

- **HashRouter**  
  - używa fragmentu adresu URL po znaku `#` (na przykład `/#/about`),
  - nie wymaga dodatkowej konfiguracji po stronie serwera,
  - stosowany w środowiskach, gdzie brak wsparcia dla przepisywania adresów.

- **MemoryRouter**  
  - przechowuje „historię” w pamięci,
  - wykorzystywany w testach oraz środowiskach innych niż przeglądarka.

W standardowej aplikacji SPA uruchamianej na serwerze www stosuje się najczęściej `BrowserRouter`.

---

### 4. Podstawowa konfiguracja – opakowanie aplikacji w `BrowserRouter`

Aby włączyć routing, główny komponent aplikacji musi zostać opakowany komponentem `BrowserRouter`. Najczęściej odbywa się to w pliku startowym (na przykład `main.jsx` lub `index.jsx`).

Przykład:

```jsx
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

Od tego momentu wszystkie komponenty zagnieżdżone w `App` mogą korzystać z funkcji React Router (trasy, linki, hooki nawigacyjne).

---

### 5. Definiowanie tras – `Routes` i `Route`

Do zdefiniowania mapowania adresów URL na komponenty służą komponenty:

- `Routes` – kontener dla zbioru tras,
- `Route` – pojedyncza definicja trasy.

Każda trasa określa:

- atrybut `path` – ścieżkę URL,
- atrybut `element` – komponent wyświetlany dla tej ścieżki.

Przykład prostej konfiguracji tras:

```jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <>
      {/* Inne elementy aplikacji, na przykład nagłówek */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
```

W powyższym przykładzie:

- odwiedzenie adresu `/` wyświetli komponent `Home`,
- `/about` wyświetli komponent `About`,
- `/contact` wyświetli komponent `Contact`.

---

### 6. Nawigacja między widokami – `Link` i `NavLink`

Do nawigacji wewnątrz aplikacji SPA nie należy używać zwykłego elementu `<a>`, ponieważ powoduje on pełne przeładowanie strony. Zamiast tego stosuje się komponenty:

- **`Link`** – podstawowy link nawigacyjny,
- **`NavLink`** – wariant `Link`, który umożliwia rozpoznanie aktualnie aktywnej trasy.

Przykład z wykorzystaniem `Link`:

```jsx
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <Link to="/">Strona główna</Link>
      {" | "}
      <Link to="/about">O aplikacji</Link>
      {" | "}
      <Link to="/contact">Kontakt</Link>
    </nav>
  );
}
```

Przykład z wykorzystaniem `NavLink`:

```jsx
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <NavLink
        to="/"
        end
        className={({ isActive }) => (isActive ? "active-link" : undefined)}
      >
        Strona główna
      </NavLink>
      {" | "}
      <NavLink
        to="/about"
        className={({ isActive }) => (isActive ? "active-link" : undefined)}
      >
        O aplikacji
      </NavLink>
    </nav>
  );
}
```

Parametr `isActive` umożliwia dostosowanie klasy CSS w zależności od tego, czy dany link odpowiada bieżącej ścieżce.

---

### 7. Zagnieżdżone trasy i layout – `Outlet`

React Router pozwala na budowę zagnieżdżonych struktur tras. Typowy scenariusz to wspólny layout (nagłówek, nawigacja, stopka) oraz różne widoki wewnętrzne. W tym celu wykorzystuje się komponent:

- `Outlet` – miejsce, w którym renderowany jest aktualnie dopasowany pod–route (dziecko).

Przykład: layout z zagnieżdżonymi widokami:

```jsx
import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div>
      <header>
        <h1>Panel aplikacji</h1>
        <nav>
          <Link to="/">Strona główna</Link>
          {" | "}
          <Link to="/blogs">Blog</Link>
          {" | "}
          <Link to="/contact">Kontakt</Link>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
```

Definicja tras z wykorzystaniem `Layout`:

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

Mechanizm działania:

- `Layout` jest trasą nadrzędną pod adresem `/`,
- `Outlet` wewnątrz `Layout` renderuje aktualnie dopasowaną trasę potomną (`Home`, `Blogs`, `Contact` lub `NoPage`),
- ścieżka `"blogs"` odnosi się do adresu `/blogs`, ścieżka `"contact"` do `/contact`, a trasa `"*"` przechwytuje niepoprawne adresy.

---

### 8. Trasa domyślna (`index`) i obsługa błędu 404

W zagnieżdżonych trasach można zdefiniować trasę domyślną dla danego poziomu. Służy do tego specjalny atrybut `index`:

```jsx
<Route path="/" element={<Layout />}>
  <Route index element={<Home />} />
  {/* inne trasy */}
</Route>
```

Trasa oznaczona jako `index` odpowiada ścieżce nadrzędnej bez dodatkowego segmentu (tutaj `/`).

Do obsługi nieistniejących adresów wykorzystuje się trasę o ścieżce `"*"`:

```jsx
<Route path="*" element={<NoPage />} />
```

Jest to odpowiednik strony błędu 404 wewnątrz SPA.

---

### 9. Parametry ścieżek – `useParams`

React Router umożliwia definiowanie tras z parametrami, które są następnie odczytywane w komponentach docelowych.

Definicja trasy z parametrem:

```jsx
import { Routes, Route } from "react-router-dom";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <Routes>
      <Route path="/users/:id" element={<UserDetails />} />
    </Routes>
  );
}
```

Odczyt parametru w komponencie:

```jsx
import { useParams } from "react-router-dom";

function UserDetails() {
  const { id } = useParams();

  return (
    <section>
      <h2>Szczegóły użytkownika</h2>
      <p>Identyfikator użytkownika: {id}</p>
    </section>
  );
}

export default UserDetails;
```

Parametry mogą być wykorzystywane do pobierania danych z API, filtrowania widoków oraz budowy bardziej złożonych struktur nawigacyjnych.

---

### 10. Nawigacja programistyczna – `useNavigate`

Oprócz komponentów `Link` i `NavLink` biblioteka udostępnia hook `useNavigate`, który pozwala przełączyć trasę z poziomu logiki komponentu, na przykład po wysłaniu formularza lub po zalogowaniu użytkownika.

Przykład:

```jsx
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    // logika walidacji i logowania

    navigate("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* pola formularza */}
      <button type="submit">Zaloguj</button>
    </form>
  );
}
```

Hook `useNavigate` umożliwia także przejścia względne (na przykład `navigate(-1)` do cofnięcia o jeden krok w historii).

---

### 11. Struktura plików a routing

Przy rosnącej liczbie tras, zalecane jest uporządkowanie struktury projektu:

- katalog `pages` lub `views` zawierający komponenty odpowiadające konkretnym adresom,
- oddzielny plik z definicją wszystkich tras (na przykład `AppRoutes.jsx`),
- komponenty layoutu (`Layout`, `AdminLayout`) grupujące wspólne elementy interfejsu.

Przykładowa struktura:

```text
src/
  main.jsx
  App.jsx
  routes/
    AppRoutes.jsx
  pages/
    Layout.jsx
    Home.jsx
    Blogs.jsx
    Contact.jsx
    NoPage.jsx
    users/
      UsersList.jsx
      UserDetails.jsx
```

---

### 12. Podsumowanie

Routing w React z wykorzystaniem biblioteki React Router umożliwia:

- zdefiniowanie wielostronicowej nawigacji w architekturze SPA,
- mapowanie ścieżek URL na komponenty,
- tworzenie layoutów z zagnieżdżonymi trasami,
- obsługę parametrów ścieżek i tras „404”,
- nawigację zarówno deklaratywną (`Link`, `NavLink`), jak i programistyczną (`useNavigate`).

Prawidłowe zaprojektowanie struktury tras oraz layoutów jest kluczowe przy implementacji zaawansowanych aplikacji webowych w ramach kwalifikacji INF.04, szczególnie w projektach wykorzystujących framework React.js po stronie klienta.

