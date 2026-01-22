# Rozwiązanie – React: filtrowanie listy za pomocą checkboxa

Poniżej kompletne, minimalne rozwiązanie zadania.

---

## 1. Plik z danymi: `src/data/products.js`

```js
export const productsData = [
  { id: 1, name: "Laptop", isAvailable: true },
  { id: 2, name: "Mysz", isAvailable: true },
  { id: 3, name: "Klawiatura", isAvailable: false },
  { id: 4, name: "Monitor", isAvailable: true },
  { id: 5, name: "Słuchawki", isAvailable: false }
];
```

---

## 2. Komponent: `src/App.js`

```jsx
import { useState } from "react";
import { productsData } from "./data/products";

export default function App() {
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filteredProducts = productsData.filter((p) => {
    if (onlyAvailable === false) {
      return true;
    }

    return p.isAvailable === true;
  });

  return (
    <div style={{ padding: 16, fontFamily: "Arial" }}>
      <h2>Lista produktów</h2>

      <label>
        <input
          type="checkbox"
          checked={onlyAvailable}
          onChange={(e) => setOnlyAvailable(e.target.checked)}
        />{" "}
        Tylko dostępne
      </label>

      <div style={{ marginTop: 12 }}>
        <strong>Wyniki:</strong> {filteredProducts.length}
      </div>

      <ul style={{ marginTop: 12 }}>
        {filteredProducts.map((p) => (
          <li key={p.id}>
            {p.name} – {p.isAvailable ? "Dostępny" : "Brak"}
          </li>
        ))}
      </ul>

      <div style={{ marginTop: 12, fontSize: 12 }}>
        onlyAvailable: <strong>{String(onlyAvailable)}</strong>
      </div>
    </div>
  );
}
```

---

## 3. Co sprawdzić po uruchomieniu

- Start: lista pokazuje 5 produktów.
- Zaznacz checkbox: lista pokazuje tylko dostępne.
- Odznacz checkbox: wraca pełna lista.
- Licznik `Wyniki` zmienia się poprawnie.

