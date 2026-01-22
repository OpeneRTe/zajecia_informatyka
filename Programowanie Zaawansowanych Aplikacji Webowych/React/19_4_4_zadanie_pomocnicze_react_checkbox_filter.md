# Zadania pomocnicze – React: checkbox + filtrowanie `filter()`

Poniższy zestaw składa się z kilku krótkich zadań. Każde zadanie dotyczy wyłącznie filtra typu **checkbox**.

---

## Dane startowe (wspólne dla wszystkich zadań)

Utwórz plik `src/data/products.js`:

```js
export const initialProducts = [
  { id: 1, name: "Laptop 14\"", isAvailable: true },
  { id: 2, name: "Mysz bezprzewodowa", isAvailable: true },
  { id: 3, name: "Klawiatura", isAvailable: false },
  { id: 4, name: "Monitor 24\"", isAvailable: true },
  { id: 5, name: "Słuchawki", isAvailable: false }
];
```

---

## Zadanie 1 – kontrolowany checkbox w React

### Cel

- Utworzyć checkbox sterowany stanem (`controlled component`).

### Wymagania

- W komponencie (`App` lub `ProductList`) utwórz stan:

  - `onlyAvailable` typu `boolean` z wartością początkową `false`.

- Wyświetl checkbox z etykietą `Tylko dostępne`.
- Checkbox ma być podłączony do stanu przez `checked`.
- Zmiana checkboxa ma aktualizować stan na podstawie `event.target.checked`.
- Pod checkboxem wyświetl tekst diagnostyczny:

  - `onlyAvailable: true` lub `onlyAvailable: false`.

---

## Zadanie 2 – filtrowanie listy tylko checkboxem

### Cel

- Przefiltrować listę produktów metodą `filter()` na podstawie `onlyAvailable`.

### Wymagania

- Załaduj dane z `initialProducts` i zapisz w stanie `products`.
- Wyświetl listę produktów w formie `ul` lub kart (dowolnie).
- Dodaj checkbox `Tylko dostępne` (stan `onlyAvailable`).
- Lista wyświetlana ma być tworzona na podstawie:

  - `products.filter(...)`

- Logika:

  - gdy checkbox jest **odznaczony** → wyświetl wszystkie produkty,
  - gdy checkbox jest **zaznaczony** → wyświetl tylko te, gdzie `isAvailable === true`.

- Nad listą wyświetl licznik:

  - `Wyniki: X`.

---

## Zadanie 3 – dwa checkboxy i filtrowanie łączone

### Cel

- Dodać drugi checkbox i zastosować filtrowanie łączone (oba warunki naraz).

### Rozszerzenie danych

Zmień strukturę danych w `products.js` tak, aby zawierała dodatkowe pole:

- `isPromo` typu `boolean`

Przykład (możesz dopisać do istniejących):

- produkt 1: `isPromo: true`
- produkt 2: `isPromo: false`
- produkt 3: `isPromo: true`
- produkt 4: `isPromo: false`
- produkt 5: `isPromo: true`

### Wymagania

- Utwórz stan:

  - `onlyAvailable` (checkbox `Tylko dostępne`)
  - `onlyPromo` (checkbox `Tylko promocje`)

- Filtrowanie ma działać łącznie:

  - jeśli zaznaczony tylko `Tylko dostępne` → pokazuj tylko dostępne,
  - jeśli zaznaczony tylko `Tylko promocje` → pokazuj tylko promocyjne,
  - jeśli zaznaczone oba → pokazuj tylko produkty, które są jednocześnie dostępne i promocyjne,
  - jeśli oba odznaczone → pokazuj wszystkie.

---

# Instrukcja techniczna – jak poprawnie użyć checkboxa w React

## 1. Dlaczego `checked`, a nie `value`

Checkbox przechowuje swój stan jako **wartość logiczną**. W React obsługujesz to przez atrybut `checked`.

Wymagane:

- `checked={someBoolean}`

Nie stosuj:

- `value={...}` do sterowania zaznaczeniem.

---

## 2. Odczyt stanu checkboxa

W `onChange` używaj:

- `event.target.checked`

To zwraca:

- `true` gdy zaznaczony
- `false` gdy odznaczony

---

## 3. Wzorzec implementacji (kontrolowany checkbox)

Minimalny schemat:

```jsx
const [onlyAvailable, setOnlyAvailable] = useState(false);

<input
  type="checkbox"
  checked={onlyAvailable}
  onChange={(e) => setOnlyAvailable(e.target.checked)}
/>
```

---

## 4. Wzorzec filtrowania z checkboxem

Najkrótsza poprawna logika warunku w `filter()`:

```js
const filtered = products.filter(p => !onlyAvailable || p.isAvailable);
```

Znaczenie:

- gdy `onlyAvailable` jest `false` → warunek zwraca `true` dla każdego elementu (brak ograniczeń)
- gdy `onlyAvailable` jest `true` → warunek przepuszcza tylko elementy z `p.isAvailable === true`

---

## 5. Typowe błędy

- użycie `value` zamiast `checked`
- użycie `event.target.value` zamiast `event.target.checked`
- filtrowanie przez modyfikację `products` (np. `setProducts(products.filter(...))`) zamiast wyliczania listy wynikowej
- mutowanie danych w obiektach produktów

