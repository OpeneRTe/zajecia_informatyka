# Karta pracy (teoria) – React: `map`, `useState`, `filter`, checkbox (kontrolowany)

## Informacje organizacyjne

- Imię i nazwisko: ..........................................................
- Klasa / grupa: .............................................................
- Data: ...........................................................

## Cel karty pracy

- Sprawdzenie rozumienia mechanizmu renderowania list w React na podstawie tablicy danych.
- Sprawdzenie umiejętności aktualizacji stanu tablicy obiektów bez mutowania danych.
- Sprawdzenie rozumienia filtrowania danych (`filter`) oraz obsługi checkboxa jako kontrolowanego pola formularza.

---

## Dane do zadań (wspólne)

Przyjmij, że w pliku `src/data/products.js` znajdują się dane:

```js
export const products = [
  { id: 1, name: 'Kawa',   price: 12, inStock: true,  category: 'napoje' },
  { id: 2, name: 'Herbata', price: 10, inStock: false, category: 'napoje' },
  { id: 3, name: 'Chleb',  price:  8, inStock: true,  category: 'pieczywo' },
  { id: 4, name: 'Masło',  price: 15, inStock: true,  category: 'nabiał' },
]
```

---

## Zadanie A – `map` (renderowanie listy)

W komponencie React chcemy wyświetlić listę produktów w elementach `li`.

Uzupełnij kod tak, aby:

- dla każdego elementu tablicy powstał `li`
- `key` był ustawiony na `id`
- treść zawierała `name` oraz `price`

```jsx
<ul>
  {products.[________](p => (
    <li key={p.[________]}>
      {p.[________]} – {p.[________]} zł
    </li>
  ))}
</ul>
```

Odpowiedź (wstaw brakujące elementy):

- `map` / `filter` / `forEach`: ☐ ...........................................
- `key`: ☐ ...........................................
- `name`: ☐ ...........................................
- `price`: ☐ ...........................................

---

## Zadanie B – Co zwraca `map`

Rozważ kod JavaScript:

```js
const arr = [2, 4, 6]
const result = arr.map(x => x / 2)
```

Zapisz wartość `result`:

- `result` = ☐ ...........................................

Zapisz, czy `arr` zostało zmienione:

- `arr` zostało zmienione: ☐ tak ☐ nie

Uzasadnienie w jednym zdaniu:

- ☐ ........................................................................

---

## Zadanie C – `useState` (stan jako tablica obiektów)

W komponencie:

```jsx
const [items, setItems] = useState(products)
```

Zaznacz prawidłowe stwierdzenia:

- ☐ `items` to aktualna wartość stanu.
- ☐ `setItems` to funkcja do aktualizacji stanu.
- ☐ `setItems(items)` zawsze zwiększa liczbę elementów w tablicy.
- ☐ W React stan powinien być traktowany jako niemutowalny (nie zmieniamy obiektu „w miejscu”).

---

## Zadanie D – Aktualizacja jednego elementu w stanie (wzorzec `id → map → nowy obiekt`)

Chcemy zaimplementować funkcję `handleToggleStock`, która odwraca wartość `inStock` dla produktu o podanym `id`.

Uzupełnij brakujące fragmenty:

```jsx
const handleToggleStock = (id) => {
  setItems(prev =>
    prev.map(p =>
      p.id === id
        ? { ...p, inStock: [________] }
        : p
    )
  )
}
```

Wpisz, co należy wstawić w miejsce `[________]`:

- ☐ ........................................................................

Dodatkowe pytanie:

- Dlaczego w części „prawda” tworzymy nowy obiekt `{ ...p, ... }`, a nie zmieniamy `p.inStock` bezpośrednio?
  - ☐ ......................................................................

---

## Zadanie E – `filter` (warunek i wynik)

Zapisz wyrażenie, które:

- zwróci tylko produkty z `category === 'napoje'`

```js
const onlyDrinks = products.[________](p => p.[________] === [________])
```

Odpowiedź:

- nazwa metody: ☐ ...........................................
- pole obiektu: ☐ ...........................................
- wartość porównywana: ☐ ...........................................

Dodatkowo: podaj, ile elementów będzie w `onlyDrinks` dla danych startowych:

- liczba elementów: ☐ ............

---

## Zadanie F – Łączenie filtrów (kaskadowo)

Mamy dwa filtry:

- `onlyInStock` (tylko produkty dostępne)
- `maxPrice` (cena mniejsza lub równa podanej wartości)

Uzupełnij kod tak, aby `filtered` zawierało tylko elementy spełniające oba warunki:

```js
const onlyInStock = true
const maxPrice = 12

const filtered = products
  .filter(p => onlyInStock ? p.[________] === [________] : true)
  .filter(p => p.[________] <= [________])
```

Odpowiedź (wstaw brakujące elementy):

- pole dostępności: ☐ ...........................................
- wartość dostępności: ☐ ...........................................
- pole ceny: ☐ ...........................................
- wartość limitu: ☐ ...........................................

Dodatkowo: wypisz nazwy (`name`) produktów, które zostaną w `filtered`:

- ☐ ...........................................
- ☐ ...........................................

---

## Zadanie G – Checkbox w React (pole kontrolowane)

Założenia:

- checkbox ma sterować filtrem `onlyInStock`
- stan jest w `useState`

Uzupełnij kod:

```jsx
const [onlyInStock, setOnlyInStock] = useState([________])

return (
  <label>
    <input
      type="checkbox"
      checked={onlyInStock}
      onChange={(e) => setOnlyInStock(e.target.[________])}
    />
    Tylko dostępne
  </label>
)
```

Odpowiedź:

- wartość startowa stanu (true/false): ☐ .....................................
- właściwość eventu (checked/value): ☐ ........................................

---

## Zadanie H – Filtrowanie listy na podstawie checkboxa

Mamy stan `onlyInStock` oraz stan `items`.

Uzupełnij kod tak, aby:

- gdy `onlyInStock` jest `true`, zwracał tylko elementy z `inStock === true`
- gdy `onlyInStock` jest `false`, zwracał wszystkie elementy

```js
const visibleItems = onlyInStock
  ? items.filter(p => p.[________] === [________])
  : items
```

Odpowiedź:

- pole dostępności: ☐ ...........................................
- wartość porównywana: ☐ ...........................................

---

## Zadanie H2 – Dwa checkboxy (logika łączona)

Założenia:

- `onlyInStock` – pokazuje tylko dostępne produkty
- `onlyDrinks` – pokazuje tylko produkty z kategorii `napoje`

Stany komponentu:

```jsx
const [onlyInStock, setOnlyInStock] = useState(false)
const [onlyDrinks, setOnlyDrinks] = useState(false)
```

Uzupełnij kod filtrowania tak, aby lista spełniała **oba** warunki jednocześnie:

```js
const filteredItems = items
  .filter(p => onlyInStock ? p.[________] === [________] : true)
  .filter(p => onlyDrinks ? p.[________] === [________] : true)
```

Odpowiedź:

- pole dostępności: ☐ ...........................................
- wartość dostępności: ☐ ...........................................
- pole kategorii: ☐ ...........................................
- wartość kategorii: ☐ ...........................................

---

## Zadanie H3 – Dwa checkboxy (formularz)

Uzupełnij kod JSX tak, aby oba checkboxy poprawnie sterowały stanem:

```jsx
<label>
  <input
    type="checkbox"
    checked={onlyInStock}
    onChange={e => setOnlyInStock(e.target.[________])}
  />
  Tylko dostępne
</label>

<label>
  <input
    type="checkbox"
    checked={onlyDrinks}
    onChange={e => setOnlyDrinks(e.target.[________])}
  />
  Tylko napoje
</label>
```

Wpisz brakującą właściwość obiektu zdarzenia:

- ☐ ...........................................

---

## Zadanie H4 – Filtrowanie listy przy użyciu dwóch checkboxów

Na podstawie stanów `onlyInStock` oraz `onlyDrinks` przygotuj logikę filtrowania listy `items`.

Zasady działania:

- jeżeli **oba checkboxy są zaznaczone**, lista zawiera tylko dostępne produkty z kategorii `napoje`
- jeżeli zaznaczony jest **tylko jeden checkbox**, lista jest filtrowana tylko według tego kryterium
- jeżeli **żaden checkbox nie jest zaznaczony**, wyświetlane są wszystkie produkty

Uzupełnij kod:

```js
const visibleItems = items.filter(p => {
  if (onlyInStock && onlyDrinks) {
    return p.[________] === [________] && p.[________] === [________]
  }

  if (onlyInStock) {
    return p.[________] === [________]
  }

  if (onlyDrinks) {
    return p.[________] === [________]
  }

  return true
})
```

Odpowiedź – wpisz brakujące elementy:

- pole dostępności: ☐ ...........................................
- wartość dostępności: ☐ ...........................................
- pole kategorii: ☐ ...........................................
- wartość kategorii: ☐ ...........................................

Dodatkowo (opisowo, jedno zdanie):

- Dlaczego na końcu funkcji filtrującej zwracamy `true`?
  - ☐ ......................................................................

---

## Zadanie I – Analiza błędów (krótko)

Wskaż błąd i zapisz poprawną wersję (jedno zdanie i poprawka):

Fragment:

```jsx
{items.map(p => (
  <li key={p.id}>
    <button onClick={handleToggleStock(p.id)}>Zmień</button>
  </li>
))}
```

- Na czym polega błąd?
  - ☐ ......................................................................

- Jak poprawić `onClick`, aby funkcja wykonała się dopiero po kliknięciu?
  - ☐ ......................................................................

---

## Zadanie J – Odpowiedzi opisowe (po jednym zdaniu)

Odpowiedz **jednym zdaniem** na każde pytanie:

1. Dlaczego w React do wyświetlania list najczęściej używa się metody `map`?
   - ☐ ......................................................................

2. Dlaczego przy aktualizacji stanu tablicy nie należy modyfikować obiektów bezpośrednio?
   - ☐ ......................................................................

3. Do czego służy właściwość `checked` w checkboxie kontrolowanym?
   - ☐ ......................................................................

4. Czym różni się `filter` od `map`?
   - ☐ ......................................................................

---

## Miejsce na notatki

- ☐ ........................................................................
- ☐ ........................................................................
- ☐ ........................................................................
- ☐ ........................................................................

