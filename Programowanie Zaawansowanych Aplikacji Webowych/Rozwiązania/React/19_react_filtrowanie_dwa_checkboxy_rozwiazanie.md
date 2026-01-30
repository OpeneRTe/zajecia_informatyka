# Rozwiązanie – React: filtrowanie listy za pomocą dwóch checkboxów

## Struktura plików

- `src/data/products.js`
- `src/App.jsx`

---

## `src/data/products.js`

```js
export const productsData = [
  { id: 1, name: "Laptop", isAvailable: true, isPromo: true },
  { id: 2, name: "Mysz", isAvailable: true, isPromo: false },
  { id: 3, name: "Klawiatura", isAvailable: false, isPromo: true },
  { id: 4, name: "Monitor", isAvailable: true, isPromo: false },
  { id: 5, name: "Słuchawki", isAvailable: false, isPromo: true },
  { id: 6, name: "Głośnik", isAvailable: true, isPromo: true }
];
```

---

## `src/App.jsx`

```jsx
import { useState } from 'react'
import { productsData } from './data/products'

export default function App() {
  const [onlyAvailable, setOnlyAvailable] = useState(false)
  const [onlyPromo, setOnlyPromo] = useState(false)

  const filteredProducts = productsData.filter((p) => {
    if (onlyAvailable === true && p.isAvailable === false) {
      return false
    }

    if (onlyPromo === true && p.isPromo === false) {
      return false
    }

    return true
  })

  return (
    <div style={{ padding: 16, fontFamily: 'Arial' }}>
      <h2>Produkty</h2>

      <div style={{ marginBottom: 12 }}>
        <label>
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
          />{' '}
          Tylko dostępne
        </label>

        <br />

        <label>
          <input
            type="checkbox"
            checked={onlyPromo}
            onChange={(e) => setOnlyPromo(e.target.checked)}
          />{' '}
          Tylko promocje
        </label>
      </div>

      <div style={{ marginBottom: 8 }}>
        <strong>Wyniki: {filteredProducts.length}</strong>
      </div>

      <ul>
        {filteredProducts.map((p) => (
          <li key={p.id}>
            {p.name} — {p.isAvailable ? 'Dostępny' : 'Brak'} —{' '}
            {p.isPromo ? 'Promocja' : 'Standard'}
          </li>
        ))}
      </ul>
    </div>
  )
}
```

---

## Checklista

- `onlyAvailable` i `onlyPromo` są typu boolean i startują jako `false`.
- Checkboxy są sterowane przez `checked={...}`.
- Zmiana checkboxa pobiera wartość z `e.target.checked`.
- Filtrowanie odbywa się na bieżąco na podstawie dwóch warunków.
- Lista renderowana przez `map()` posiada `key`.
- Licznik wyników pokazuje `filteredProducts.length`.

