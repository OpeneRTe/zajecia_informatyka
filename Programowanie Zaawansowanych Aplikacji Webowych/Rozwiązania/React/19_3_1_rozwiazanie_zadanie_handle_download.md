# Rozwiązanie – Zadanie pomocnicze (aktualizacja stanu tablicy po `id`)

## Założenia
- Stan przechowuje tablicę obiektów `items`.
- Aktualizacja dotyczy jednego elementu na podstawie `id`.
- Brak mutacji: tworzona jest nowa tablica i (dla jednego elementu) nowy obiekt.

---

## Część A – odpowiedzi (analiza kodu)

### Rola parametru `id`
- `id` identyfikuje element tablicy, który ma zostać zaktualizowany.
- Warunek `item.id === id` wskazuje, który obiekt ma zostać zmieniony.

### Dlaczego używana jest funkcja `prev => ...`
- Funkcyjna forma `setItems(prev => ...)` gwarantuje, że aktualizacja bazuje na **najnowszym** stanie.
- Jest to poprawne podejście, gdy nowy stan zależy od poprzedniego (np. liczniki, kliknięcia).

### Dlaczego używana jest metoda `map`
- `map` tworzy **nową tablicę** o tej samej długości.
- Umożliwia modyfikację tylko jednego elementu, pozostawiając resztę bez zmian.
- React wykrywa zmiany stanu na podstawie nowych referencji (nowa tablica / nowy obiekt).

### Co robi operator `{ ...item, ... }`
- `{ ...item }` kopiuje wszystkie pola obiektu do nowego obiektu.
- `count: item.count + 1` nadpisuje tylko jedno pole.
- Dzięki temu nie jest modyfikowany oryginalny obiekt w stanie.

### Dlaczego aktualizowany jest tylko jeden obiekt
- Warunek `item.id === id` jest spełniony tylko dla jednego elementu (unikalny `id`).
- Dla pozostałych elementów zwracany jest `item` bez zmian.

---

## Część B – implementacja (widok + kliknięcie)

### Komponent `App.jsx`

```jsx
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'Element A', count: 0 },
    { id: 2, name: 'Element B', count: 0 },
    { id: 3, name: 'Element C', count: 0 }
  ])

  const handleIncrement = (id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, count: item.count + 1 }
          : item
      )
    )
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Lista elementów</h2>

      <div className="row g-3">
        {items.map(item => (
          <div className="col-12 col-md-6 col-lg-4" key={item.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>

                <span className="badge text-bg-primary mb-3">
                  Licznik: {item.count}
                </span>

                <button
                  className="btn btn-outline-primary mt-auto"
                  onClick={() => handleIncrement(item.id)}
                >
                  Zwiększ licznik
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```jsx
import { useState } from 'react'

export default function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'Element A', count: 0 },
    { id: 2, name: 'Element B', count: 0 },
    { id: 3, name: 'Element C', count: 0 }
  ])

  const handleIncrement = (id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, count: item.count + 1 }
          : item
      )
    )
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Lista elementów</h2>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map(item => (
          <li key={item.id} style={{ marginBottom: 12, border: '1px solid #ddd', padding: 12 }}>
            <div><strong>{item.name}</strong></div>
            <div>Licznik: {item.count}</div>

            <button onClick={() => handleIncrement(item.id)}>
              Zwiększ licznik
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

## Część C – modyfikacja funkcji (parametr `value`)

### Funkcja `handleUpdateCount(id, value)`

```js
const handleUpdateCount = (id, value) => {
  setItems(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, count: item.count + value }
        : item
    )
  )
}
```

### Przykładowe użycie w JSX

```jsx
<button onClick={() => handleUpdateCount(item.id, 5)}>
  +5
</button>
```

---

## Część D – reset licznika

### Funkcja `handleReset(id)`

```js
const handleReset = (id) => {
  setItems(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, count: 0 }
        : item
    )
  )
}
```

### Przykładowe użycie w JSX

```jsx
<button onClick={() => handleReset(item.id)}>
  Reset
</button>
```

---

## Wersja kompletna (C + D w jednym komponencie)

```jsx
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function App() {
  const [items, setItems] = useState([
    { id: 1, name: 'Element A', count: 0 },
    { id: 2, name: 'Element B', count: 0 },
    { id: 3, name: 'Element C', count: 0 }
  ])

  const handleUpdateCount = (id, value) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, count: item.count + value }
          : item
      )
    )
  }

  const handleReset = (id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, count: 0 }
          : item
      )
    )
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Lista elementów</h2>

      <div className="row g-3">
        {items.map(item => (
          <div className="col-12 col-md-6 col-lg-4" key={item.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.name}</h5>

                <span className="badge text-bg-primary mb-3">
                  Licznik: {item.count}
                </span>

                <div className="d-flex gap-2 mt-auto">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleUpdateCount(item.id, 1)}
                  >
                    +1
                  </button>

                  <button
                    className="btn btn-outline-success"
                    onClick={() => handleUpdateCount(item.id, 5)}
                  >
                    +5
                  </button>

                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => handleReset(item.id)}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

