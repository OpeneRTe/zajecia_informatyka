# Zadanie 5 – Radio (react_forms_radio)

## Temat
Wybór sposobu płatności (jedna opcja).

## Wymagania
- Utwórz stan `payment`.
- Wyświetl grupę przycisków radio:
  - **Karta**
  - **BLIK**
  - **Przelew**
- Pod grupą pokaż:
  - jeżeli nic nie wybrano: `Wybierz sposób płatności`,
  - jeżeli wybrano: `Wybrano: ...`.
- Po kliknięciu **Zamów** (submit):
  - zablokuj wysyłkę, jeżeli nie wybrano opcji,
  - jeżeli wybrano: pokaż komunikat `Zamówienie złożone. Płatność: ...`.

## Oczekiwany efekt
Uczeń rozumie: radio buttons, `checked`, jedną wspólną wartość w stanie oraz walidację wyboru.

---

## Rozwiązanie (App.jsx)

```jsx
import { useState } from "react";

function App() {
  const [payment, setPayment] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (payment === "") {
      return;
    }

    setMessage(`Zamówienie złożone. Płatność: ${payment}`);
  };

  return (
    <div>
      <h2>Sposób płatności</h2>

      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="radio"
            name="payment"
            value="Karta"
            checked={payment === "Karta"}
            onChange={(e) => setPayment(e.target.value)}
          />
          Karta
        </label>

        <br />

        <label>
          <input
            type="radio"
            name="payment"
            value="BLIK"
            checked={payment === "BLIK"}
            onChange={(e) => setPayment(e.target.value)}
          />
          BLIK
        </label>

        <br />

        <label>
          <input
            type="radio"
            name="payment"
            value="Przelew"
            checked={payment === "Przelew"}
            onChange={(e) => setPayment(e.target.value)}
          />
          Przelew
        </label>

        <div style={{ marginTop: "12px" }}>
          {payment === "" ? (
            <p>Wybierz sposób płatności</p>
          ) : (
            <p>Wybrano: {payment}</p>
          )}
        </div>

        <button type="submit" disabled={payment === ""}>
          Zamów
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
```

