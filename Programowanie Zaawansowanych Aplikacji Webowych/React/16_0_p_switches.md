# zadanie_switches.md

## Zadanie: Przełączniki sterujące widocznością tekstu

### Cel
Stworzenie komponentu React wykorzystującego przełączniki (switch) Bootstrap do kontrolowania widoczności trzech akapitów tekstu.

---

## Treść zadania
Utwórz komponent React o nazwie `SwitchPanel`, który:

- posiada trzy przełączniki typu switch,
- posiada trzy akapity tekstowe,
- każdy przełącznik pokazuje lub ukrywa odpowiadający mu akapit,
- wszystkie przełączniki są domyślnie włączone.

Nagłówek komponentu ma brzmieć: **„Panel przełączników”**.

---

## Podpowiedź kodu
```jsx
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

export default function SwitchPanel() {
  const [showFirst, setShowFirst] = useState(true);
  const [showSecond, setShowSecond] = useState(true);
  const [showThird, setShowThird] = useState(true);

  return (
    <div className="container my-4">
      <h2>Panel przełączników</h2>

      <div className="form-check form-switch mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="switch1"
          checked={showFirst}
          onChange={() => setShowFirst(!showFirst)}
        />
        <label className="form-check-label" htmlFor="switch1">Opis 1</label>
      </div>

      <div className="form-check form-switch mb-2">
        <input
          className="form-check-input"
          type="checkbox"
          id="switch2"
          checked={showSecond}
          onChange={() => setShowSecond(!showSecond)}
        />
        <label className="form-check-label" htmlFor="switch2">Opis 2</label>
      </div>

      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="switch3"
          checked={showThird}
          onChange={() => setShowThird(!showThird)}
        />
        <label className="form-check-label" htmlFor="switch3">Opis 3</label>
      </div>

      {showFirst && <p>To jest tekst numer 1</p>}
      {showSecond && <p>To jest tekst numer 2</p>}
      {showThird && <p>To jest tekst numer 3</p>}
    </div>
  );
}
```

---

## Zadania

### Zadanie 1
Dodaj czwarty przełącznik i czwarty akapit tekstu. Domyślnie ma być wyłączony.

### Zadanie 2
Zmień treść przełączników tak, aby reprezentowały trzy ulubione hobby, a akapity wyświetlały ich krótki opis.

### Zadanie 3
Stwórz wariant komponentu, w którym wszystkie przełączniki można wyłączyć jednym głównym przełącznikiem „Ukryj wszystko”.

