# Zadania praktyczne – Bootstrap + integracja z React

Dokument zawiera dwa etapy pracy:
1. Wykonanie zadań praktycznych w czystym HTML + Bootstrap (CDN).
2. Wdrożenie Bootstrapa w projekcie React (instalacja, importy, struktura komponentów).

---

# ETAP 1 — Wykonanie w zwykłej stronie HTML

## Zadanie 1 — Przygotowanie projektu i struktury plików
Utwórz projekt zawierający:
- `index.html`,
- katalog `css` z `style.css`,
- katalog `js` z `scripts.js`.

Dołącz Bootstrap przez CDN. Przygotuj minimalną stronę HTML.

---

## Zadanie 2 — Navbar
Utwórz responsywny pasek nawigacyjny z trzema linkami i hamburger menu poniżej `md`.

---

## Zadanie 3 — Grid 12-kolumnowy
Zaprojektuj trzy sekcje:
- pełna szerokość,
- dwie kolumny (`col-md-6`),
- trzy kolumny (`col-lg-4`, na mobile `col-12`).

---

## Zadanie 4 — Karty (Cards)
Dodaj trzy karty zawierające obraz, tytuł, opis, przycisk.

---

## Zadanie 5 — Formularz z walidacją
Formularz ma zawierać pola „Imię”, „E-mail”, „Wiadomość”. Walidacja za pomocą klas `is-valid` i `is-invalid`.

---

## Zadanie 6 — Alerty
Utwórz alert informacyjny (`alert-info`) i alert błędu (`alert-danger`).

---

## Zadanie 7 — Modal
Dodaj okno modal z tytułem, treścią i przyciskiem zamykającym. Umieść przycisk otwierający modal na stronie.

---

## Zadanie 8 — Utilities
Zastosuj klasy Bootstrapa:
- `mt-3`, `p-4`,
- `text-center`,
- `d-flex`, `justify-content-between`,
- `mx-auto`, `d-block`.

Dodaj komentarze HTML opisujące ich użycie.

---

## Zadanie 9 — Sekcja pełnej szerokości
Utwórz `container-fluid` z tłem `bg-dark`, białym tekstem i paddingiem `p-5`.

---

## Zadanie 10 — Połączenie wszystkich elementów
Zbuduj mini landing-page zawierający wszystkie poprzednie komponenty, w pełni responsywny.

---

# ETAP 2 — Wdrożenie Bootstrapa w React

Poniżej opisano, jak przenieść te same zadania do środowiska React.

---

## 1. Instalacja Bootstrapa w React
Projekt React może być utworzony za pomocą:
```
npx create-react-app moj-projekt
```

Instalacja Bootstrapa:
```
npm install bootstrap
```

---

## 2. Import Bootstrapa w React
W pliku `src/index.js` lub `src/main.jsx` dodaj:
```
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
```

`bundle.min.js` zawiera Popper wymagany do działania komponentów takich jak navbar collapse i modale.

---

## 3. Struktura komponentów
Zaleca się przeniesienie elementów z wersji HTML do osobnych komponentów React, np.:
- `Navbar.jsx`
- `CardsSection.jsx`
- `FormSection.jsx`
- `ModalComponent.jsx`
- `Footer.jsx`

React wymaga zamiany atrybutu `class` na `className`.

Przykład:
```
<div className="container mt-4">
  <h1 className="text-center">Moja strona</h1>
</div>
```

---

## 4. Użycie komponentu Navbar w React
Przykład minimalnej struktury:
```
export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Logo</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="#">Link 1</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Link 2</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Link 3</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
```

---

## 5. Formularz z walidacją w React
Walidacja może być wykonana za pomocą stanu komponentu.

Przykład uproszczony:
```
const [name, setName] = useState('');
const isValid = name.length > 0;

<input
  type="text"
  className={"form-control " + (isValid ? "is-valid" : "is-invalid")}
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
```

---

## 6. Modal w React
Bootstrapowy modal działa bez zmian, o ile importowane są pliki JS Bootstrapa.

Można także użyć stanu do sterowania widocznością modalnego okna.

---

## 7. Grid i Utilities w React
Wszystkie klasy działają tak samo, przykład:
```
<div className="container">
  <div className="row">
    <div className="col-lg-4 col-12 p-3">Kolumna 1</div>
    <div className="col-lg-4 col-12 p-3">Kolumna 2</div>
    <div className="col-lg-4 col-12 p-3">Kolumna 3</div>
  </div>
</div>
```

---

# Podsumowanie
- Pierwszy etap pozwala zrozumieć Bootstrap w tradycyjnej stronie HTML.
- Drugi etap pokazuje, jak identyczne elementy przenieść do środowiska React.
- Wszystkie komponenty Bootstrapa można stosować w React, pamiętając jedynie o używaniu `className` zamiast `class`.

---

Koniec dokumentu.

