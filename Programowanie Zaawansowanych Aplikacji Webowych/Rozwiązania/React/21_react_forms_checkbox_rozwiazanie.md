# Zadanie 4 – Checkbox (react_forms_checkbox)

## Temat
Panel filtrów ofert (2 checkboxy).

## Wymagania
- Utwórz stan obiektu `filters` z polami:
  - `onlyAvailable` (boolean)
  - `freeDelivery` (boolean)
- Wyświetl dwa checkboxy:
  - **Tylko dostępne**
  - **Darmowa dostawa**
- Pod checkboxami wyświetl listę aktywnych filtrów:
  - jeżeli żaden filtr nie jest zaznaczony: `Brak filtrów`,
  - jeżeli zaznaczone: wypisz nazwy aktywnych filtrów w punktach.
- Dodaj przycisk **Wyczyść filtry**, który ustawia oba filtry na `false`.

## Oczekiwany efekt
Uczeń rozumie: `checked`, booleany w stanie, aktualizację pól obiektu w `useState`.

---

## Rozwiązanie (App.jsx)

```jsx
import { useState } from "react";

function App() {
  const [filters, setFilters] = useState({
    onlyAvailable: false,
    freeDelivery: false,
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const checked = e.target.checked;

    setFilters({
      ...filters,
      [name]: checked,
    });
  };

  const clearFilters = () => {
    setFilters({
      onlyAvailable: false,
      freeDelivery: false,
    });
  };

  const activeFilters = [];

  if (filters.onlyAvailable) {
    activeFilters.push("Tylko dostępne");
  }

  if (filters.freeDelivery) {
    activeFilters.push("Darmowa dostawa");
  }

  return (
    <div>
      <label>
        <input
          type="checkbox"
          name="onlyAvailable"
          checked={filters.onlyAvailable}
          onChange={handleChange}
        />
        Tylko dostępne
      </label>
      <br />
      <label>
        <input
          type="checkbox"
          name="freeDelivery"
          checked={filters.freeDelivery}
          onChange={handleChange}
        />
        Darmowa dostawa
      </label>

      <div style={{ marginTop: "16px" }}>
        <strong>Aktywne filtry:</strong>
        {activeFilters.length === 0 ? (
          <p>Brak filtrów</p>
        ) : (
          <ul>
            {activeFilters.map((filter) => (
              <li key={filter}>{filter}</li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={clearFilters}>Wyczyść filtry</button>
    </div>
  );
}

export default App;
```
