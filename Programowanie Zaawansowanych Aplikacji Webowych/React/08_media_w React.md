
# Umieszczanie i wyświetlanie obrazów w React

W aplikacjach opartych na React istnieją dwa główne miejsca, w których można umieszczać grafiki: `src/assets` oraz `public`. Wybór zależy od sposobu wykorzystania obrazów.

## 1. Folder `src/assets` – stałe elementy interfejsu

Folder `src/assets` jest przeznaczony na grafiki będące częścią kodu aplikacji, np. logo, ikony lub tła komponentów.

Pliki importowane z tego folderu są przetwarzane przez Vite podczas budowania aplikacji. Narzędzie może między innymi zmieniać nazwy plików i uwzględniać je w procesie optymalizacji zasobów. Nie oznacza to automatycznej kompresji każdego obrazu.

### Struktura katalogów

```text
src/
├── assets/
│   └── images/
│       └── card-header.jpg
├── components/
│   └── Card.jsx
└── App.jsx
```

### Przykład komponentu

```jsx
import headerImg from '../assets/images/card-header.jpg';

function Card() {
  return (
    <div className="card">
      <div className="card-header">
        <img src={headerImg} alt="Nagłówek karty" />
      </div>
      <div className="card-body">
        <h3>Tytuł karty</h3>
      </div>
    </div>
  );
}

export default Card;
```

**Zasada:** Grafikę importujemy do pliku komponentu, a następnie wykorzystujemy zaimportowaną zmienną w atrybucie `src`.

---

## 2. Folder `public` – obrazy wskazywane przez dane

Folder `public` jest przydatny, gdy nazwy lub ścieżki grafik są zapisane w tablicy obiektów, pliku JSON lub danych pobieranych z API.

Pliki z tego folderu są kopiowane do katalogu wynikowego bez przetwarzania przez mechanizm importowania zasobów Vite.

### Struktura katalogów

```text
public/
└── images/
    ├── header1.jpg
    └── header2.jpg
src/
└── App.jsx
```

### Przykład komponentu

```jsx
function Card() {
  return (
    <div className="card">
      <div className="card-header">
        <img src="/images/header1.jpg" alt="Nagłówek karty" />
      </div>
    </div>
  );
}

export default Card;
```

**Zasada:** W adresie nie wpisujemy `public`. Ścieżka `/images/header1.jpg` wskazuje plik znajdujący się w `public/images/header1.jpg` przy wdrożeniu w katalogu głównym domeny.

---

## 3. Wyświetlanie obrazów z tablicy obiektów za pomocą `.map()`

```jsx
const cardData = [
  { id: 1, title: 'Karta 1', img: '/images/header1.jpg' },
  { id: 2, title: 'Karta 2', img: '/images/header2.jpg' },
];

function App() {
  return (
    <div className="container">
      {cardData.map((card) => (
        <div className="card" key={card.id}>
          <img src={card.img} alt={card.title} />
          <h3>{card.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
```

Metoda `.map()` przechodzi przez wszystkie obiekty tablicy i generuje osobną kartę dla każdego elementu.

- `card.id` – identyfikator używany jako `key`.
- `card.title` – tytuł karty.
- `card.img` – ścieżka do obrazu.

---

## 4. Porównanie folderów

| Cecha | `src/assets` | `public` |
|---|---|---|
| Zastosowanie | Grafiki importowane w kodzie | Grafiki dostępne pod określonym adresem |
| Odwołanie | `import` | Ścieżka tekstowa |
| Przetwarzanie przez Vite | Tak | Nie |
| Zmiana nazw przy budowaniu | Możliwa | Nie |
| Dane z tablicy lub API | Możliwe, wymagają odpowiedniego mapowania importów | Proste użycie ścieżki |
| Przykład | `import logo from './assets/logo.png'` | `/images/logo.png` |

---

## 5. Podsumowanie

- **`src/assets`** – stosuj, gdy grafiki są importowane bezpośrednio w komponentach.
- **`public`** – stosuj, gdy obrazy mają stałe adresy i ich ścieżki są przechowywane w danych.
- **`.map()`** – wykorzystuj do dynamicznego generowania kart na podstawie tablicy obiektów.

**Uwaga:** Przy wdrażaniu aplikacji w podkatalogu serwera należy uwzględnić konfigurację `base` w Vite, ponieważ ścieżki zaczynające się od `/` odnoszą się do katalogu głównego domeny.
