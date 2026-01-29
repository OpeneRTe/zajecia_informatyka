# Zadanie 1 – Submit formularza (react_forms_submit)

## Temat
Formularz „Dodaj użytkownika” z potwierdzeniem wysłania.

## Wymagania
- W komponencie `App` utwórz stan `name` (string).
- Wyświetl formularz z:
  - polem tekstowym **Imię**
  - przyciskiem **Zapisz**
- Po kliknięciu **Zapisz**:
  - zablokuj przeładowanie strony (submit bez odświeżenia) poprzez `event.preventDefault()`
  - pokaż pod formularzem komunikat: `Zapisano użytkownika: {name}`
- Jeżeli pole jest puste:
  - pokaż komunikat błędu: `Imię jest wymagane`
  - nie wyświetlaj komunikatu „Zapisano…”

## Oczekiwany efekt
Uczeń rozumie: `onSubmit`, `preventDefault`, odczyt stanu w momencie wysłania.

---

## Rozwiązanie (App.jsx)

```jsx
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name === "") {
      setError("Imię jest wymagane");
      setMessage("");
      return;
    }

    setMessage(`Zapisano użytkownika: ${name}`);
    setError("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Imię:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <button type="submit">Zapisz</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
```

