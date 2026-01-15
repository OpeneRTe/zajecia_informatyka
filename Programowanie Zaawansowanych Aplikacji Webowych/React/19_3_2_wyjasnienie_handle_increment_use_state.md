# Wyjaśnienie działania funkcji `handleIncrement` (useState + map)

## Kod analizowany

```js
const handleIncrement = (id) => {
  setItems(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, count: item.count + 1 }
        : item
    )
  )
}
```

---

## Cel funkcji
Funkcja `handleIncrement` zwiększa wartość pola `count` **tylko dla jednego elementu tablicy**, wskazanego przez `id`, bez modyfikowania pozostałych elementów i bez mutowania stanu.

---

## Szczegółowe wyjaśnienie (krok po kroku)

### 1. `handleIncrement(id)`
Funkcja przyjmuje parametr `id`, który jednoznacznie identyfikuje element tablicy wymagający aktualizacji.

---

### 2. `setItems(prev => ...)`
`setItems` to funkcja aktualizująca stan `items`.

Zastosowana jest **funkcyjna postać aktualizacji stanu**:

```js
setItems(prev => { ... })
```

- `prev` oznacza **poprzednią (aktualną w danym momencie) wartość stanu** `items`.
- React gwarantuje, że `prev` jest zawsze najnowszą wersją danych.
- Ten zapis jest wymagany, gdy nowy stan zależy od poprzedniego.

---

### 3. Czy są tu „dwa prev”?

Nie. Występuje **jeden parametr `prev`**:

- `prev` – parametr funkcji przekazanej do `setItems`
- `prev.map(...)` – użycie tego samego parametru

Nie są to dwa różne obiekty, tylko jedno i to samo odwołanie do poprzedniego stanu.

---

### 4. `prev.map(item => ...)`
Metoda `map`:
- przechodzi po każdym elemencie tablicy,
- **zawsze zwraca nową tablicę**,
- zachowuje kolejność i liczbę elementów.

Jest to wymagane, ponieważ React wykrywa zmiany stanu na podstawie **nowych referencji**.

---

### 5. Warunek `item.id === id`

```js
item.id === id
```

- sprawdza, czy aktualnie przetwarzany element jest tym, który ma zostać zmodyfikowany,
- tylko jeden element spełnia ten warunek.

---

### 6. Operator warunkowy `? :`

```js
item.id === id
  ? { ...item, count: item.count + 1 }
  : item
```

- jeśli warunek jest spełniony → tworzony jest **nowy obiekt** z podniesioną wartością `count`,
- jeśli nie → zwracany jest **oryginalny obiekt**, bez zmian.

---

### 7. `{ ...item, count: item.count + 1 }`

- `{ ...item }` tworzy kopię obiektu `item`,
- `count: item.count + 1` nadpisuje tylko jedno pole,
- brak mutowania danych źródłowych.

To jest kluczowa zasada pracy ze stanem w React.

---

## Dlaczego nie można zmodyfikować obiektu bezpośrednio?

❌ Błędne podejście:

```js
item.count++
return item
```

- modyfikuje istniejący obiekt w stanie,
- React może nie wykryć zmiany,
- prowadzi do błędów logicznych.

---

## Czy da się to zapisać prościej?

### Wariant bardziej czytelny (rozpisany)

```js
const handleIncrement = (id) => {
  setItems(prev => {
    return prev.map(item => {
      if (item.id !== id) return item
      return { ...item, count: item.count + 1 }
    })
  })
}
```

Logika pozostaje identyczna – zmienia się tylko forma zapisu.

---

## Wzorzec do zapamiętania

**Aktualizacja jednego elementu w tablicy stanu:**

```
id
↓
setState(prev => prev.map(...))
↓
warunek (id)
↓
nowy obiekt
```

Ten schemat obowiązuje dla:
- liczników (`count`, `downloads`),
- flag (`isActive`, `isSelected`),
- ocen, punktów, statusów.

---

## Podsumowanie
- `prev` to poprzedni stan, a nie kopia „druga”
- `map` jest wymagany przy pracy z tablicą
- operator spread zapobiega mutacji danych
- React wymaga tworzenia nowych obiektów i tablic

