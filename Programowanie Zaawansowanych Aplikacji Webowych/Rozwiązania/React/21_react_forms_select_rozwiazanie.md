# Zadanie 3 – Select (react_forms_select)

## Temat
Wybór kategorii dla ogłoszenia.

## Wymagania
- Utwórz stan `category`.
- Wyświetl pole `select` z opcjami:
  - `Wybierz kategorię` (wartość pusta)
  - `Elektronika`
  - `Dom i ogród`
  - `Motoryzacja`
- Pod polem `select` wyświetl:
  - jeżeli nic nie wybrano: `Nie wybrano kategorii`,
  - jeżeli wybrano: `Wybrana kategoria: ...`.
- Po wysłaniu formularza:
  - wyświetl komunikat: `Ogłoszenie zapisane w kategorii: ...`.
- Nie pozwalaj wysłać formularza, jeżeli kategoria nie jest wybrana.

## Oczekiwany efekt
Uczeń rozumie: `select`, `value`, `onChange`, walidację wyboru.

---

## Rozwiązanie (App.jsx)

```jsx
import { useState } from "react";

function App() {
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (category === "") {
      return;
    }

    setMessage(`Ogłoszenie zapisane w kategorii: ${category}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Kategoria:
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Wybierz kategorię</option>
            <option value="Elektronika">Elektronika</option>
            <option value="Dom i ogród">Dom i ogród</option>
            <option value="Motoryzacja">Motoryzacja</option>
          </select>
        </label>

        <div>
          {category === "" ? (
            <p>Nie wybrano kategorii</p>
          ) : (
            <p>Wybrana kategoria: {category}</p>
          )}
        </div>

        <button type="submit" disabled={category === ""}>
          Zapisz
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
```

