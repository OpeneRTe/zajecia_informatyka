# Stan komponentu – `useState`

## Cele lekcji

Po zakończeniu lekcji uczeń:

- wyjaśnia pojęcie stanu komponentu,
- rozumie różnicę między props a state,
- importuje `useState`,
- tworzy zmienną stanu,
- określa wartość początkową stanu,
- odczytuje aktualną wartość stanu,
- aktualizuje stan za pomocą funkcji ustawiającej,
- wykorzystuje `onClick` do zmiany stanu,
- tworzy licznik,
- przechowuje w stanie wartość logiczną,
- rozumie, że zmiana stanu powoduje ponowne renderowanie komponentu.

---

# 1. Problem

Załóżmy, że chcemy utworzyć licznik.

Moglibyśmy spróbować:

```jsx
function Counter() {

  let count = 0;

  function add() {
    count = count + 1;
    console.log(count);
  }

  return (
    <>
      <p>Licznik: {count}</p>

      <button onClick={add}>
        Zwiększ
      </button>
    </>
  );
}
```

Wartość w konsoli będzie się zmieniała.

Problem polega na tym, że zwykła zmienna nie jest mechanizmem stanu React.

React potrzebuje informacji, że zmiana danych ma spowodować aktualizację interfejsu.

Do przechowywania zmieniających się danych komponentu wykorzystujemy:

```javascript
useState
```

---

# 2. Czym jest state?

**State**, czyli stan, to dane komponentu, które mogą zmieniać się podczas działania aplikacji.

Przykłady stanu:

```text
licznik
czy element jest widoczny
wartość pola formularza
wybrany produkt
lista produktów
status zalogowania
```

---

# 3. Importowanie `useState`

`useState` importujemy z React:

```javascript
import { useState } from "react";
```

---

# 4. Tworzenie stanu

Podstawowy zapis:

```javascript
const [count, setCount] = useState(0);
```

Ten zapis składa się z trzech ważnych elementów.

```text
count
```

to aktualna wartość stanu.

```text
setCount
```

to funkcja służąca do zmiany stanu.

```text
useState(0)
```

tworzy stan z wartością początkową:

```text
0
```

Możemy to przedstawić:

```text
const [count, setCount] = useState(0);
       │       │                │
       │       │                └── wartość początkowa
       │       │
       │       └── funkcja zmieniająca stan
       │
       └── aktualna wartość
```

---

# 5. Pierwszy licznik

```jsx
import { useState } from "react";

function Counter() {

  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Licznik: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Zwiększ
      </button>
    </div>
  );
}

export default Counter;
```

Po kliknięciu:

```javascript
setCount(count + 1)
```

React:

1. oblicza nową wartość,
2. aktualizuje stan,
3. ponownie renderuje komponent,
4. wyświetla nową wartość.

---

# 6. Zmniejszanie wartości

Dodajmy drugi przycisk:

```jsx
<button onClick={() => setCount(count - 1)}>
  Zmniejsz
</button>
```

Całość:

```jsx
import { useState } from "react";

function Counter() {

  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Licznik: {count}</p>

      <button onClick={() => setCount(count + 1)}>
        Zwiększ
      </button>

      <button onClick={() => setCount(count - 1)}>
        Zmniejsz
      </button>
    </div>
  );
}

export default Counter;
```

---

# 7. Resetowanie stanu

Możemy ustawić stan ponownie na `0`.

```jsx
<button onClick={() => setCount(0)}>
  Reset
</button>
```

Mamy więc:

```text
Zwiększ  → setCount(count + 1)

Zmniejsz → setCount(count - 1)

Reset    → setCount(0)
```

---

# 8. Funkcja zamiast kodu w `onClick`

Nie musimy całej operacji umieszczać w JSX.

Możemy utworzyć funkcję:

```javascript
function add() {
  setCount(count + 1);
}
```

i:

```jsx
<button onClick={add}>
  Zwiększ
</button>
```

Pełny przykład:

```jsx
function Counter() {

  const [count, setCount] = useState(0);

  function add() {
    setCount(count + 1);
  }

  function subtract() {
    setCount(count - 1);
  }

  function reset() {
    setCount(0);
  }

  return (
    <div>
      <p>Licznik: {count}</p>

      <button onClick={add}>+</button>
      <button onClick={subtract}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
```

---

# 9. State a props

To bardzo ważne rozróżnienie.

## Props

Props są przekazywane do komponentu z zewnątrz.

```jsx
<Technology name="React" />
```

Komponent otrzymuje:

```javascript
name
```

## State

State należy do komponentu i może zmieniać się podczas jego działania.

```javascript
const [count, setCount] = useState(0);
```

Porównanie:

| Props | State |
|---|---|
| dane przekazywane do komponentu | dane przechowywane przez komponent |
| pochodzą od komponentu nadrzędnego | są tworzone w komponencie |
| komponent nie powinien ich modyfikować | można je aktualizować przez funkcję ustawiającą |
| służą do przekazywania danych | służą do obsługi zmieniających się danych |

---

# 10. `useState` może przechowywać różne typy danych

Liczba:

```javascript
const [count, setCount] = useState(0);
```

Tekst:

```javascript
const [name, setName] = useState("React");
```

Wartość logiczna:

```javascript
const [visible, setVisible] = useState(true);
```

Tablica:

```javascript
const [products, setProducts] = useState([]);
```

Obiekt:

```javascript
const [user, setUser] = useState({
  name: "Jan",
  age: 18
});
```

Na tej lekcji skupiamy się przede wszystkim na liczbach i wartościach logicznych.

---

# 11. Stan logiczny – `true` / `false`

Utwórzmy:

```javascript
const [visible, setVisible] = useState(true);
```

Stan może przyjmować:

```text
true
false
```

Zmiana:

```javascript
setVisible(false);
```

Możemy również ustawić wartość przeciwną:

```javascript
setVisible(!visible);
```

Jeżeli:

```text
visible = true
```

to:

```text
!visible = false
```

Jeżeli:

```text
visible = false
```

to:

```text
!visible = true
```

---

# 12. Prosty przykład

```jsx
import { useState } from "react";

function Info() {

  const [visible, setVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setVisible(!visible)}>
        Zmień
      </button>

      <p>Stan visible: {visible ? "true" : "false"}</p>
    </div>
  );
}
```

Tutaj pojawia się prosty operator warunkowy:

```javascript
warunek ? wartość_gdy_true : wartość_gdy_false
```

Czyli:

```jsx
{visible ? "true" : "false"}
```

---

# 13. Projekt WebTech – etap 6

Do komponentu `Technology` dodamy stan licznika zainteresowania.

```jsx
import { useState } from "react";

function Technology({ name, category, hours }) {

  const [likes, setLikes] = useState(0);

  return (
    <section>
      <h2>{name}</h2>
      <p>Kategoria: {category}</p>
      <p>Liczba godzin: {hours}</p>

      <p>Polubienia: {likes}</p>

      <button onClick={() => setLikes(likes + 1)}>
        Lubię
      </button>
    </section>
  );
}

export default Technology;
```

Każdy komponent posiada własny stan.

Jeżeli klikniemy przycisk przy React, zmieni się licznik komponentu React.

Pozostałe komponenty zachowują własne wartości.

---

# Zadanie samodzielne

Utwórz komponent:

```text
Counter
```

Stan początkowy:

```text
0
```

Dodaj trzy przyciski:

```text
+1
-1
Reset
```

Przyciski mają odpowiednio:

- zwiększać licznik,
- zmniejszać licznik,
- ustawiać licznik na `0`.

---

# Zadanie dodatkowe

Dodaj przyciski:

```text
+5
-5
```

oraz:

```text
Ustaw 100
```

---

# Zadanie rozszerzone

Utwórz stan:

```javascript
const [active, setActive] = useState(false);
```

Dodaj przycisk zmieniający:

```text
false → true
true → false
```

Wyświetl aktualny stan jako tekst:

```text
Aktywny
```

lub:

```text
Nieaktywny
```

---

# Pytania kontrolne

1. Czym jest state?
2. Do czego służy `useState`?
3. Skąd importujemy `useState`?
4. Co oznacza `count`?
5. Co oznacza `setCount`?
6. Co oznacza `0` w `useState(0)`?
7. Jak zwiększyć `count` o jeden?
8. Co dzieje się z interfejsem po zmianie stanu?
9. Czym różnią się props od state?
10. Czy state może przechowywać tekst?
11. Czy state może przechowywać wartość `true` lub `false`?
12. Co oznacza `!visible`?
