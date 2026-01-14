# Zadanie pomocnicze – aktualizacja stanu tablicy na podstawie identyfikatora (handleDownload)

## Cel zadania
- Zrozumienie mechanizmu aktualizacji stanu komponentu React przy użyciu `useState`.
- Ćwiczenie aktualizacji jednego elementu w tablicy obiektów bez mutowania danych.
- Przećwiczenie wzorca: **id → map → warunek → nowy obiekt**.

## Kontekst startowy
W stanie komponentu znajduje się tablica obiektów (np. zdjęcia/elementy listy):

```js
const [items, setItems] = useState([
  { id: 1, name: 'Element A', count: 0 },
  { id: 2, name: 'Element B', count: 0 },
  { id: 3, name: 'Element C', count: 0 }
])
```

Każdy obiekt posiada:
- `id` – unikalny identyfikator
- `name` – nazwa elementu
- `count` – licznik (analogiczny do `downloads`)

## Część A – analiza kodu
Przeanalizuj funkcję:

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

Odpowiedz pisemnie:
- jaka jest rola parametru `id`
- dlaczego używana jest funkcja `prev => ...`
- dlaczego używana jest metoda `map`
- co robi operator `{ ...item, ... }`
- dlaczego aktualizowany jest tylko jeden obiekt w tablicy

## Część B – implementacja
Zaimplementuj widok listy elementów i obsługę kliknięć:

Wymagania:
- przy każdym elemencie listy ma być widoczny licznik `count`
- przy każdym elemencie ma być przycisk **Zwiększ licznik**
- kliknięcie przycisku zwiększa `count` tylko dla klikniętego elementu
- pozostałe elementy tablicy nie zmieniają się

Przykład wywołania:

```jsx
<button onClick={() => handleIncrement(item.id)}>
  Zwiększ licznik
</button>
```

## Część C – modyfikacja funkcji (parametr wartości)
Wykonaj zmiany:
- zmień nazwę `handleIncrement` na `handleUpdateCount`
- dodaj drugi parametr `value`
- zamiast zwiększania o `1`, zwiększaj o `value`

Docelowy podpis:

```js
const handleUpdateCount = (id, value) => { ... }
```

Docelowe wywołanie (przykład):

```jsx
<button onClick={() => handleUpdateCount(item.id, 5)}>
  +5
</button>
```

## Część D – zadanie utrwalające (reset)
Napisz nową funkcję:

```js
const handleReset = (id) => { ... }
```

Wymagania:
- funkcja ustawia `count` na `0` tylko dla elementu o podanym `id`
- struktura rozwiązania ma być analogiczna (map + warunek + nowy obiekt)
- nie wolno bezpośrednio modyfikować obiektów w tablicy

## Kryteria poprawności
- brak bezpośredniej mutacji stanu
- poprawne użycie `setItems(prev => ...)`
- poprawne użycie `map`
- poprawne użycie operatora warunkowego
- zachowanie pozostałych elementów tablicy bez zmian

## Efekt końcowy
Uczeń potrafi:
- zaktualizować pojedynczy obiekt w tablicy stanu na podstawie `id`
- stosować niemutowalną aktualizację danych w React
- odtworzyć wzorzec: **id → map → warunek → nowy obiekt**

