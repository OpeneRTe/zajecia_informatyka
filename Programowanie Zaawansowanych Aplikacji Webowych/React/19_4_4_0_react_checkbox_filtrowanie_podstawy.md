# Zadanie pomocnicze – React: filtrowanie listy za pomocą checkboxa

Poziom: **początkujący**

---

## Cel zadania

- Nauczyć się używać checkboxa w React.
- Nauczyć się reagować na zaznaczenie i odznaczenie checkboxa.
- Nauczyć się filtrować listę danych metodą `filter()`.

---

## Dane startowe

Utwórz plik `src/data/products.js` i wklej:

```js
export const productsData = [
  { id: 1, name: "Laptop", isAvailable: true },
  { id: 2, name: "Mysz", isAvailable: true },
  { id: 3, name: "Klawiatura", isAvailable: false },
  { id: 4, name: "Monitor", isAvailable: true },
  { id: 5, name: "Słuchawki", isAvailable: false }
];
```

---

## Treść zadania (dla ucznia)

Twoim zadaniem jest stworzenie prostej aplikacji React, która:

- wyświetla listę produktów,
- posiada **jeden checkbox** `Tylko dostępne`,
- po zaznaczeniu checkboxa pokazuje **tylko produkty dostępne**,
- po odznaczeniu checkboxa pokazuje **wszystkie produkty**.

---

## Krok 1 – stan checkboxa

- Utwórz stan typu `boolean` o nazwie `onlyAvailable`.
- Wartość początkowa: `false`.

Przykład:

```js
const [onlyAvailable, setOnlyAvailable] = useState(false);
```

---

## Krok 2 – checkbox w JSX

- Dodaj checkbox z napisem `Tylko dostępne`.
- Checkbox ma być połączony ze stanem przez `checked`.
- Przy zmianie checkboxa aktualizuj stan.

### Przykładowy kod checkboxa

Poniższy kod pokazuje **jak ma wyglądać poprawnie podłączony checkbox**:

```jsx
<label>
  <input
    type="checkbox"
    checked={onlyAvailable}
    onChange={(e) => setOnlyAvailable(e.target.checked)}
  />
  Tylko dostępne
</label>
```

W tym kodzie:

- `checked={onlyAvailable}` – checkbox jest połączony ze stanem
- `e.target.checked` – zwraca `true` lub `false`
- `setOnlyAvailable(...)` – zapisuje nową wartość w stanie

---


## Krok 3 – filtrowanie listy

- Nie zmieniaj tablicy z danymi.
- Utwórz nową zmienną `filteredProducts`.
- Do filtrowania użyj `filter()`.

Zasada działania:

- jeśli `onlyAvailable === false` → pokaż wszystkie produkty
- jeśli `onlyAvailable === true` → pokaż tylko te, gdzie `isAvailable === true`

---

## Krok 4 – wyświetlenie listy

- Wyświetl produkty w liście (`ul > li` lub karty).
- Każdy produkt ma pokazywać:

  - nazwę produktu
  - informację `Dostępny` lub `Brak`

---

## Wskazówki (bardzo proste)

- Checkbox **nie filtruje sam** – on tylko ustawia wartość `true` albo `false`.
- `checked` oznacza: czy checkbox jest zaznaczony.
- `e.target.checked` zwraca `true` lub `false`.
- `filter()` decyduje, które elementy listy pokazać.

---

## Najczęstsze błędy

- użycie `value` zamiast `checked`
- użycie `e.target.value` zamiast `e.target.checked`
- usuwanie elementów z tablicy danych
- brak połączenia checkboxa ze stanem

---

## Sprawdzenie działania

- Po uruchomieniu aplikacji widzisz wszystkie produkty.
- Po zaznaczeniu checkboxa znikają produkty niedostępne.
- Po odznaczeniu checkboxa wszystkie produkty wracają.

