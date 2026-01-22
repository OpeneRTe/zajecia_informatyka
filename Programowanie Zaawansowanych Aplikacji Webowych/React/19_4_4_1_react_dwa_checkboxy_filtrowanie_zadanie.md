# Zadanie pomocnicze – React: filtrowanie listy za pomocą dwóch checkboxów

Poziom: **początkujący** (kolejny krok po wersji z jednym checkboxem)

---

## Cel zadania

- Utrwalić obsługę checkboxów w React.
- Nauczyć się filtrować listę na podstawie **dwóch warunków**.
- Zobaczyć, że filtry mogą działać razem.

---

## Dane startowe

Utwórz lub zaktualizuj plik `src/data/products.js`:

```js
export const productsData = [
  { id: 1, name: "Laptop", isAvailable: true, isPromo: true },
  { id: 2, name: "Mysz", isAvailable: true, isPromo: false },
  { id: 3, name: "Klawiatura", isAvailable: false, isPromo: true },
  { id: 4, name: "Monitor", isAvailable: true, isPromo: false },
  { id: 5, name: "Słuchawki", isAvailable: false, isPromo: true },
  { id: 6, name: "Głośnik", isAvailable: true, isPromo: true }
];
```

---

## Treść zadania (dla ucznia)

Stwórz aplikację React, która:

- wyświetla listę produktów,
- posiada **dwa checkboxy**:

  - `Tylko dostępne`
  - `Tylko promocje`

- po zmianie checkboxów lista ma się filtrować na bieżąco.

### Zasady filtrowania

- jeśli oba checkboxy są odznaczone → pokaż wszystkie produkty
- jeśli zaznaczony tylko `Tylko dostępne` → pokaż tylko produkty z `isAvailable === true`
- jeśli zaznaczony tylko `Tylko promocje` → pokaż tylko produkty z `isPromo === true`
- jeśli zaznaczone oba → pokaż tylko produkty, które są:

  - dostępne (`isAvailable === true`)
  - i promocyjne (`isPromo === true`)

---

## Krok 1 – stany checkboxów

Utwórz dwa stany typu `boolean`:

- `onlyAvailable` (start: `false`)
- `onlyPromo` (start: `false`)

---

## Krok 2 – dwa checkboxy w JSX

Dodaj dwa checkboxy i podłącz je do stanu przez `checked`.

Wymagania:

- `checked={...}`
- `onChange={(e) => setXxx(e.target.checked)}`

### Przykładowy kod (do skopiowania)

```jsx
<label>
  <input
    type="checkbox"
    checked={onlyAvailable}
    onChange={(e) => setOnlyAvailable(e.target.checked)}
  />{" "}
  Tylko dostępne
</label>

<br />

<label>
  <input
    type="checkbox"
    checked={onlyPromo}
    onChange={(e) => setOnlyPromo(e.target.checked)}
  />{" "}
  Tylko promocje
</label>
```

Wskazówki:

- `checked={onlyAvailable}` łączy checkbox ze stanem `onlyAvailable`.
- `e.target.checked` zwraca `true` (zaznaczony) lub `false` (odznaczony).
- Nie używaj `value` do sterowania zaznaczeniem checkboxa.

---


## Krok 3 – filtrowanie listy

- Nie zmieniaj tablicy z danymi.
- Utwórz zmienną `filteredProducts`.
- Użyj `filter()`.

### Przykładowy kod filtrowania (czytelny)

```js
const filteredProducts = productsData.filter((p) => {
  // Jeżeli zaznaczono "Tylko dostępne" i produkt jest niedostępny → usuń z listy
  if (onlyAvailable === true && p.isAvailable === false) {
    return false;
  }

  // Jeżeli zaznaczono "Tylko promocje" i produkt nie jest w promocji → usuń z listy
  if (onlyPromo === true && p.isPromo === false) {
    return false;
  }

  // W innych przypadkach produkt zostaje
  return true;
});
```

Wskazówki:

- `return false` oznacza: ten element nie ma się pojawić na liście.
- `return true` oznacza: ten element ma zostać.
- Jeżeli checkbox jest odznaczony (`false`), to jego warunek nie ogranicza listy.

---


## Krok 4 – wyświetlenie listy + licznik

- Wyświetl produkty w liście.
- Nad listą pokaż:

  - `Wyniki: X`

- Każdy produkt ma pokazywać:

  - nazwę
  - `Dostępny` / `Brak`
  - `Promocja` / `Standard`

---

# Proste wyjaśnienie (jak działa filtrowanie z dwoma checkboxami)

## 1. Checkbox tylko ustawia `true` albo `false`

- `onlyAvailable` mówi: czy ograniczamy listę do dostępnych.
- `onlyPromo` mówi: czy ograniczamy listę do promocyjnych.

## 2. `filter()` decyduje, co pokazać

Dla każdego produktu `filter()` sprawdza warunki.

- Jeśli checkbox jest odznaczony, to ten warunek nie ma ograniczać listy.

## 3. Najprostszy sposób warunków (czytelny)

W `filter()` można zrobić to tak:

- jeśli `onlyAvailable` jest zaznaczony i produkt nie jest dostępny → produkt odpada
- jeśli `onlyPromo` jest zaznaczony i produkt nie jest promocyjny → produkt odpada
- w innym wypadku produkt zostaje na liście

---

## Najczęstsze błędy

- użycie `value` zamiast `checked`
- użycie `e.target.value` zamiast `e.target.checked`
- filtrowanie przez usuwanie elementów z tablicy danych
- brak `key` w `map()`

---

## Sprawdzenie działania

- Start: widzisz wszystkie produkty.
- Zaznacz `Tylko dostępne`: znikają produkty niedostępne.
- Zaznacz `Tylko promocje`: zostają tylko promocyjne.
- Zaznacz oba: zostają tylko dostępne i promocyjne.
- Odznacz oba: wraca pełna lista.

