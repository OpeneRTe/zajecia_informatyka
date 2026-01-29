# Zadanie 2 – Textarea (react_forms_textarea)

## Temat
Formularz „Opis produktu” z licznikiem znaków.

## Wymagania
- Utwórz stan `description`.
- Wyświetl:
  - pole `textarea` z etykietą **Opis produktu**,
  - licznik znaków pod polem: `Liczba znaków: X`.
- Ustaw ograniczenie: **maksimum 120 znaków**.
- Jeżeli użytkownik przekroczy limit:
  - pokaż komunikat: `Przekroczono limit 120 znaków`,
  - przycisk **Zapisz** ma być zablokowany (`disabled`).

## Oczekiwany efekt
Uczeń rozumie: `textarea` jako kontrolkę kontrolowaną oraz reakcję aplikacji na długość wprowadzanego tekstu.

---

## Rozwiązanie (App.jsx)

```jsx
import { useState } from "react";

function App() {
  const [description, setDescription] = useState("");

  const maxLength = 120;
  const isLimitExceeded = description.length > maxLength;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Opis produktu:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <p>Liczba znaków: {description.length}</p>

        {isLimitExceeded && (
          <p style={{ color: "red" }}>Przekroczono limit 120 znaków</p>
        )}

        <button type="submit" disabled={isLimitExceeded}>
          Zapisz
        </button>
      </form>
    </div>
  );
}

export default App;
```

