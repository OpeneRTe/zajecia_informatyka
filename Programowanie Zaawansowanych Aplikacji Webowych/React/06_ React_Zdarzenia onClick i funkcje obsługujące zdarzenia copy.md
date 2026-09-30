# Zdarzenia w React – `onClick` i funkcje obsługujące zdarzenia

## Cele lekcji

Po zakończeniu lekcji uczeń:

- wyjaśnia pojęcie zdarzenia,
- obsługuje kliknięcie przycisku,
- stosuje `onClick`,
- tworzy funkcję obsługującą zdarzenie,
- przekazuje funkcję do `onClick`,
- odróżnia przekazanie funkcji od jej wywołania,
- stosuje funkcję strzałkową,
- przekazuje argument do funkcji obsługującej zdarzenie,
- łączy props z obsługą zdarzeń.

---

# 1. Czym jest zdarzenie?

Aplikacja internetowa reaguje na działania użytkownika.

Przykładowe zdarzenia:

```text
kliknięcie
zmiana wartości pola
wysłanie formularza
naciśnięcie klawisza
ruch myszy
```

W React obsługujemy zdarzenia za pomocą odpowiednich właściwości JSX.

Przykłady:

```text
onClick
onChange
onSubmit
onKeyDown
onMouseEnter
```

Na tej lekcji zajmiemy się:

```jsx
onClick
```

---

# 2. Zwykła funkcja JavaScript

Najpierw utwórzmy funkcję:

```javascript
function showMessage() {
  console.log("Kliknięto przycisk");
}
```

Funkcja nie zostanie wykonana, dopóki jej nie wywołamy:

```javascript
showMessage();
```

---

# 3. `onClick`

W React możemy przypisać funkcję do zdarzenia kliknięcia.

```jsx
function App() {

  function showMessage() {
    console.log("Kliknięto przycisk");
  }

  return (
    <button onClick={showMessage}>
      Kliknij
    </button>
  );
}
```

Po kliknięciu React wywoła funkcję:

```javascript
showMessage
```

---

# 4. Bardzo ważna różnica

Poprawnie:

```jsx
onClick={showMessage}
```

Tutaj **przekazujemy funkcję**, która ma zostać wykonana później – po kliknięciu.

Niepoprawnie w tym przypadku:

```jsx
onClick={showMessage()}
```

Tutaj **wywołujemy funkcję natychmiast podczas renderowania komponentu**.

Porównanie:

```text
showMessage      → funkcja

showMessage()    → wywołanie funkcji
```

Dla obsługi zdarzenia najczęściej przekazujemy funkcję:

```jsx
onClick={showMessage}
```

---

# 5. Funkcja strzałkowa

Możemy również zapisać:

```jsx
<button onClick={() => console.log("Kliknięto")}>
  Kliknij
</button>
```

Fragment:

```javascript
() => console.log("Kliknięto")
```

jest funkcją strzałkową.

Funkcja zostanie wykonana dopiero po kliknięciu.

---

# 6. Przekazywanie argumentu

Załóżmy, że mamy funkcję:

```javascript
function showTechnology(name) {
  console.log(name);
}
```

Chcemy po kliknięciu przekazać do niej:

```text
React
```

Nie zapisujemy:

```jsx
onClick={showTechnology("React")}
```

ponieważ spowodowałoby to natychmiastowe wywołanie funkcji.

Stosujemy funkcję strzałkową:

```jsx
onClick={() => showTechnology("React")}
```

Pełny przykład:

```jsx
function App() {

  function showTechnology(name) {
    console.log("Wybrano: " + name);
  }

  return (
    <button onClick={() => showTechnology("React")}>
      Pokaż technologię
    </button>
  );
}
```

---

# 7. Zdarzenie i props

Komponent może otrzymać nazwę technologii przez props.

```jsx
function Technology({ name }) {

  function showTechnology() {
    console.log("Wybrano technologię: " + name);
  }

  return (
    <section>
      <h2>{name}</h2>

      <button onClick={showTechnology}>
        Pokaż w konsoli
      </button>
    </section>
  );
}
```

Dla:

```jsx
<Technology name="React" />
```

po kliknięciu otrzymamy:

```text
Wybrano technologię: React
```

Dla:

```jsx
<Technology name="Node.js" />
```

otrzymamy:

```text
Wybrano technologię: Node.js
```

Ten sam komponent zachowuje się inaczej w zależności od otrzymanych props.

---

# 8. Projekt WebTech – etap 5

Rozbudujemy `Technology.jsx`.

```jsx
function Technology({ name, category, hours }) {

  function showTechnology() {
    console.log("Technologia: " + name);
    console.log("Kategoria: " + category);
    console.log("Liczba godzin: " + hours);
  }

  return (
    <section>
      <h2>{name}</h2>
      <p>Kategoria: {category}</p>
      <p>Liczba godzin: {hours}</p>

      <button onClick={showTechnology}>
        Pokaż informacje
      </button>
    </section>
  );
}

export default Technology;
```

`App.jsx` nadal generuje komponenty za pomocą `map()`:

```jsx
{technologies.map((technology) => (
  <Technology
    key={technology.id}
    name={technology.name}
    category={technology.category}
    hours={technology.hours}
  />
))}
```

Mamy już połączenie:

```text
tablica
   ↓
 map()
   ↓
komponent
   ↓
 props
   ↓
onClick
```

---

# 9. Przekazywanie funkcji przez props

Funkcja również może być przekazana jako props.

W `App.jsx`:

```jsx
function App() {

  function selectTechnology(name) {
    console.log("Wybrano: " + name);
  }

  return (
    <Technology
      name="React"
      category="Frontend"
      hours={30}
      onSelect={selectTechnology}
    />
  );
}
```

W komponencie:

```jsx
function Technology({ name, category, hours, onSelect }) {
  return (
    <section>
      <h2>{name}</h2>
      <p>{category}</p>
      <p>{hours}</p>

      <button onClick={() => onSelect(name)}>
        Wybierz
      </button>
    </section>
  );
}
```

Przepływ:

```text
App
 │
 │ funkcja selectTechnology
 ↓
Technology
 │
 │ onSelect
 ↓
button
 │
 │ kliknięcie
 ↓
onSelect(name)
```

To rozwiązanie będzie bardzo ważne w kolejnych aplikacjach.

---

# Zadanie samodzielne

Utwórz komponent:

```text
Product
```

Komponent otrzymuje:

```text
name
price
```

Wyświetl nazwę i cenę produktu.

Dodaj przycisk:

```text
Pokaż produkt
```

Po kliknięciu w konsoli ma pojawić się:

```text
Wybrano produkt: Laptop
```

Nazwa produktu musi pochodzić z props.

---

# Zadanie dodatkowe

W `App.jsx` utwórz funkcję:

```javascript
function selectProduct(name) {
  console.log("Wybrany produkt: " + name);
}
```

Przekaż ją do komponentu `Product` przez props.

Przycisk znajdujący się w `Product` powinien uruchomić funkcję znajdującą się w `App`.

---

# Pytania kontrolne

1. Czym jest zdarzenie?
2. Do czego służy `onClick`?
3. Co oznacza `onClick={showMessage}`?
4. Czym różni się `showMessage` od `showMessage()`?
5. Dlaczego przy przekazywaniu argumentu często stosujemy funkcję strzałkową?
6. Co wykona `onClick={() => showTechnology("React")}`?
7. Czy funkcję można przekazać przez props?
8. Gdzie może znajdować się funkcja obsługująca zdarzenie?
9. Czy kliknięcie przycisku powoduje ponowne uruchomienie całej strony?
10. Jak połączyć `map()`, props i `onClick`?

