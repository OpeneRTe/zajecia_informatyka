# React + Bootstrap 4 – obsługa `is-invalid` i `is-valid` (INF.04)

Dokument prezentuje **referencyjny sposób obsługi klas `is-invalid` oraz `is-valid` w React** z wykorzystaniem Bootstrap 4. Materiał przeznaczony jest do zadań formularzowych w standardzie egzaminu INF.04.

---

## Cel

- wizualne oznaczanie pól niepoprawnych (`is-invalid`),
- wizualne oznaczanie pól poprawnych (`is-valid`),
- powiązanie walidacji logicznej w React z warstwą prezentacji Bootstrap.

---

## Zasady ogólne

- klasy `is-invalid` i `is-valid` **nie są dodawane na stałe**,
- są dodawane **warunkowo**, na podstawie stanu walidacji,
- logika walidacji znajduje się w React, nie w HTML.

---

## Struktura stanu

- `form` – obiekt przechowujący wartości pól formularza,
- `errors` – obiekt przechowujący błędy (klucz = nazwa pola),
- `touched` – opcjonalny obiekt informujący, czy pole było sprawdzane,
- `success` – flaga poprawnego zapisu formularza.

---

## Przykładowa implementacja (referencyjna)

### Kod komponentu

```jsx
import { useState } from "react";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const nextErrors = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = "Imię musi mieć co najmniej 2 znaki";
    }

    if (!form.email.includes("@")) {
      nextErrors.email = "Niepoprawny adres e-mail";
    }

    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSuccess(false);
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="container py-4">
      <h2>Formularz walidowany</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Imię</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? "is-invalid" : success ? "is-valid" : ""}`}
          />
          {errors.name && (
            <div className="text-danger mt-1">{errors.name}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={`form-control ${errors.email ? "is-invalid" : success ? "is-valid" : ""}`}
          />
          {errors.email && (
            <div className="text-danger mt-1">{errors.email}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Zapisz
        </button>

        {success && (
          <div className="text-success mt-3">
            Formularz zapisany poprawnie.
          </div>
        )}
      </form>
    </div>
  );
}
```

---

## Interpretacja klas

- `is-invalid`
  - pole zawiera błąd,
  - wyświetlany jest komunikat `text-danger`.

- `is-valid`
  - pole przeszło walidację poprawnie,
  - klasa dodawana tylko po poprawnym `submit`.

---

## Zasady poprawnego użycia

- `is-invalid` ma **priorytet** nad `is-valid`,
- `is-valid` stosujemy dopiero po pozytywnej walidacji formularza,
- nie stosujemy `required` jako jedynego mechanizmu walidacji,
- klasy Bootstrap wynikają ze stanu React.

---

## Wymagania INF.04

- walidacja realizowana w React,
- klasy `is-invalid` / `is-valid` dodawane warunkowo,
- komunikaty błędów czytelne i przypisane do pól,
- brak własnego CSS do walidacji.

Ten dokument stanowi **samodzielny wzorzec** obsługi walidacji wizualnej formularzy React + Bootstrap 4 na egzamin INF.04.
