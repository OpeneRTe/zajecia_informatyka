# Checkbox – wersja egzaminacyjna (bez obiektu stanu)

## Cel
Najprostsza możliwa obsługa checkboxów w React:
- bez obiektu stanu,
- bez destrukturyzacji,
- bez dynamicznych nazw pól (`[name]`).

Każdy checkbox posiada **własny useState**.

---

## Stan komponentu

```jsx
import { useState } from "react";

function App() {
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);
```

---

## Obsługa checkboxów

```jsx
  const handleOnlyAvailableChange = () => {
    setOnlyAvailable(!onlyAvailable);
  };

  const handleFreeDeliveryChange = () => {
    setFreeDelivery(!freeDelivery);
  };
```

---

## Czyszczenie filtrów

```jsx
  const clearFilters = () => {
    setOnlyAvailable(false);
    setFreeDelivery(false);
  };
```

---

## JSX – checkboxy i lista filtrów

```jsx
  return (
    <div>
      <h2>Filtry ofert</h2>

      <label>
        <input
          type="checkbox"
          checked={onlyAvailable}
          onChange={handleOnlyAvailableChange}
        />
        Tylko dostępne
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          checked={freeDelivery}
          onChange={handleFreeDeliveryChange}
        />
        Darmowa dostawa
      </label>

      <hr />

      <h3>Aktywne filtry</h3>

      {!onlyAvailable && !freeDelivery && <p>Brak filtrów</p>}

      <ul>
        {onlyAvailable && <li>Tylko dostępne</li>}
        {freeDelivery && <li>Darmowa dostawa</li>}
      </ul>

      <button onClick={clearFilters}>Wyczyść filtry</button>
    </div>
  );
}

export default App;
```

---

## Wyjaśnienie (dla ucznia)

- Każdy checkbox ma osobny stan typu `true / false`.
- Kliknięcie checkboxa ustawia wartość przeciwną niż była wcześniej.
- Brak obiektu oznacza prostszą logikę i łatwiejszą analizę kodu.

Ta wersja jest **zalecana na egzamin** dla uczniów początkujących.

