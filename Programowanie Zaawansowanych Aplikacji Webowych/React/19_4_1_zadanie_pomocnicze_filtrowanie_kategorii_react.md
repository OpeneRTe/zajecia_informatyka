# Zadanie pomocnicze – filtrowanie danych po kategorii (React)

## Cel zadania

Celem zadania jest przećwiczenie:

- warunkowego filtrowania tablicy obiektów,
- wykorzystania operatora warunkowego `?:`,
- pracy na niemutowalnych danych,
- podstawowego renderowania listy w JSX.

Zadanie ma charakter pomocniczy i stanowi punkt zaczepienia do dalszej pracy z filtrowaniem danych w aplikacji React.

---

## Kontekst danych

Dane aplikacji przechowywane są w tablicy obiektów `photos`:

```js
const photos = [
  { id: 1, title: 'Zdjęcie A', category: 1 },
  { id: 2, title: 'Zdjęcie B', category: 2 },
  { id: 3, title: 'Zdjęcie C', category: 1 },
  { id: 4, title: 'Zdjęcie D', category: 3 }
]
```

Dodatkowo dostępna jest zmienna stanu `category`, która określa aktualnie wybraną kategorię:

- `0` – brak filtrowania (wszystkie elementy),
- `1, 2, 3, ...` – konkretna kategoria.

---

## Treść zadania

Napisz logikę filtrowania danych w taki sposób, aby:

- dla `category === 0` wyświetlane były wszystkie elementy tablicy `photos`,
- dla `category !== 0` wyświetlane były tylko te elementy, których pole `category` jest równe wybranej wartości.

Rozwiązanie powinno:

- wykorzystywać operator warunkowy `?:`,
- korzystać z metody `filter`,
- nie modyfikować oryginalnej tablicy `photos`,
- zapisywać wynik do nowej zmiennej `filteredPhotos`.

---

## Logika filtrowania (JavaScript)

```js
const filteredPhotos = category === 0
  ? photos
  : photos.filter(photo => photo.category === category)
```

---

## Przykład użycia w JSX (punkt zaczepienia)

Poniższy przykład pokazuje, w jaki sposób przefiltrowane dane mogą zostać wyświetlone w komponencie React.

```jsx
function Gallery({ photos, category }) {
  const filteredPhotos = category === 0
    ? photos
    : photos.filter(photo => photo.category === category)

  return (
    <div className="row">
      {filteredPhotos.map(photo => (
        <div key={photo.id} className="col-3">
          <div className="border p-2 text-center">
            {photo.title}
          </div>
        </div>
      ))}
    </div>
  )
}
```

---

## Oczekiwany efekt działania

- przy `category = 0` komponent renderuje wszystkie elementy,
- przy `category = 1` renderowane są tylko elementy z kategorią `1`,
- przy zmianie wartości `category` lista aktualizuje się automatycznie.

---

Zadanie przygotowane jako ćwiczenie pomocnicze do zagadnień: filtrowanie danych, renderowanie list oraz logika warunkowa w React.

---

## Wersja rozszerzona – `useState` i przyciski zmiany kategorii

Poniższy przykład przedstawia kompletny komponent React, w którym:

- aktualna kategoria przechowywana jest w stanie (`useState`),
- użytkownik zmienia kategorię za pomocą przycisków,
- lista aktualizuje się automatycznie po zmianie stanu.

### Przykładowy komponent

```jsx
import { useState } from 'react'

function Gallery() {
  const [category, setCategory] = useState(0)

  const photos = [
    { id: 1, title: 'Zdjęcie A', category: 1 },
    { id: 2, title: 'Zdjęcie B', category: 2 },
    { id: 3, title: 'Zdjęcie C', category: 1 },
    { id: 4, title: 'Zdjęcie D', category: 3 }
  ]

  const filteredPhotos = category === 0
    ? photos
    : photos.filter(photo => photo.category === category)

  return (
    <div className="container">
      <div className="mb-3">
        <button className="btn btn-secondary me-2" onClick={() => setCategory(0)}>
          Wszystkie
        </button>
        <button className="btn btn-primary me-2" onClick={() => setCategory(1)}>
          Kategoria 1
        </button>
        <button className="btn btn-primary me-2" onClick={() => setCategory(2)}>
          Kategoria 2
        </button>
        <button className="btn btn-primary" onClick={() => setCategory(3)}>
          Kategoria 3
        </button>
      </div>

      <div className="row">
        {filteredPhotos.map(photo => (
          <div key={photo.id} className="col-3 mb-3">
            <div className="border p-2 text-center">
              {photo.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Gallery
```

---

## Oczekiwany efekt działania

- kliknięcie przycisku zmienia wartość `category`,
- zmiana stanu powoduje ponowne renderowanie komponentu,
- wyświetlana lista zawsze odpowiada aktualnie wybranej kategorii,
- brak bezpośredniej modyfikacji tablicy `photos`.

---

Ten wariant stanowi punkt wyjścia do dalszych ćwiczeń z `useState`, obsługi zdarzeń oraz dynamicznego renderowania danych w React.



---

## Zadanie pomocnicze – analiza instrukcji filtrowania

### Fragment kodu wejściowego

```js
const filteredPhotos = category === 0
  ? photos
  : photos.filter(photo => photo.category === category)
```

---

### Treść zadania

Na podstawie powyższego fragmentu kodu:

- określ, jaki warunek decyduje o tym, czy dane są filtrowane,
- wskaż, w jakim przypadku zwracana jest pełna tablica danych,
- wskaż, w jakim przypadku wykonywane jest filtrowanie,
- określ, jaka właściwość obiektu jest używana jako kryterium filtrowania.

Nie modyfikuj podanego kodu.

---

### Przykładowy kontekst użycia (JSX – punkt zaczepienia)

```jsx
function App() {
  const photos = [
    { id: 1, title: 'Zdjęcie A', category: 1 },
    { id: 2, title: 'Zdjęcie B', category: 2 },
    { id: 3, title: 'Zdjęcie C', category: 1 }
  ]

  const category = 1

  const filteredPhotos = category === 0
    ? photos
    : photos.filter(photo => photo.category === category)

  return (
    <ul>
      {filteredPhotos.map(photo => (
        <li key={photo.id}>{photo.title}</li>
      ))}
    </ul>
  )
}
```

---

### Oczekiwany rezultat logiczny

- dla `category = 0` renderowane są wszystkie elementy tablicy `photos`,
- dla `category = 1` renderowane są wyłącznie elementy z `category === 1`,
- zmiana wartości `category` wpływa bezpośrednio na zawartość renderowanej listy.

---

Zadanie ma na celu utrwalenie rozumienia operatora warunkowego, metody `filter` oraz zależności pomiędzy stanem a renderowaniem komponentu React.

