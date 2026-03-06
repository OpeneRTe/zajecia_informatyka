# Karta pracy
## React – `map()`, struktura `Card` w Bootstrap, `handleSign()` i przycisk `button`

Forma pracy: ręcznie, na kartkach  

Cel: pamięciowe opanowanie podstawowych schematów używanych w zadaniach egzaminacyjnych.

---

# Zasady wykonania

- Wszystkie odpowiedzi zapisujemy ręcznie na kartkach.
- Ćwiczymy zapamiętanie i odtworzenie schematów kodu.
- Liczy się poprawna składnia, kolejność i rozumienie elementów.

---

# Zadanie 1
## Schemat `map()` w React – zapis z pamięci

Napisz z pamięci podstawowy schemat wyświetlania elementów tablicy za pomocą `map()`.

Uzupełnij:

```jsx
{______________.map((______________) => {
  return (
    <div key={______________}>
      {______________}
    </div>
  )
})}
```

---

## Zadanie 1B
### Wyjaśnienie własnymi słowami

Odpowiedz pisemnie:

1. Co robi `map()`?
2. Dlaczego w React często używamy `key`?
3. Co oznacza zmienna `event` lub `item` wewnątrz `map()`?

---

# Zadanie 2
## Struktura `Card` w Bootstrap – schemat

Zapisz z pamięci podstawowy schemat karty Bootstrap jako sam układ klas.

Uzupełnij:

```html
<div class="______________">
  <img class="______________" src="obraz.jpg" alt="obraz">

  <div class="______________">
    <h5 class="______________">Tytuł</h5>
    <p class="______________">Opis</p>
    <button class="______________">Przycisk</button>
  </div>
</div>
```

---

# Zadanie 3
## Struktura `Card` w Bootstrap – pełny zapis HTML

Przepisz z pamięci pełną kartę Bootstrap w HTML.

Karta ma zawierać:
- obraz,
- tytuł,
- opis,
- przycisk.

Zapisz cały kod poniżej:

```html

```

---

# Zadanie 4
## Funkcja `handleSign()` – zapis z pamięci

Przepisz z pamięci funkcję aktualizującą `signed` dla elementu o podanym `id`.

Wzorzec, który należy opanować:

```jsx
const handleSign = (id) => {
  setEvents(prev => prev.map(event =>
    event.id == id && event.signed < event.seats
      ? { ...event, signed: event.signed + 1 }
      : event
  ))
}
```

### Polecenie

Napisz tę funkcję z pamięci poniżej:

```jsx

```

---

# Zadanie 5
## Analiza funkcji `handleSign()`

Odpowiedz pisemnie:

1. Co oznacza `prev`?
2. Co robi `prev.map(...)`?
3. Kiedy liczba `signed` zostaje zwiększona?
4. Co oznacza fragment:

```jsx
{ ...event, signed: event.signed + 1 }
```

5. Dlaczego nie zmieniamy elementu bezpośrednio, tylko zwracamy nowy obiekt?

---

# Zadanie 6
## Przycisk `button`, który wywołuje `handleSign()`

Napisz z pamięci przycisk React, który:
- wywołuje funkcję `handleSign`,
- przekazuje `event.id`,
- ma napis `Zapisz`.

Uzupełnij:

```jsx
<button
  type="______________"
  className="______________"
  onClick={______________}
>
  ______________
</button>
```

---

# Zadanie 7
## Pełny fragment karty React

Napisz pełny fragment JSX, który zawiera:
- `map()` po tablicy `events`,
- kartę Bootstrap,
- tytuł wydarzenia,
- tekst `Zapisani: X / Y`,
- przycisk `Zapisz`, który wywołuje `handleSign(event.id)`.

Zapisz kod poniżej:

```jsx

```

---

# Zadanie 8
## Powtórzenie pamięciowe – bez patrzenia do notatek

Na osobnej kartce zapisz z pamięci:

- schemat `map()` w React,
- strukturę `card` w Bootstrap,
- funkcję `handleSign()`,
- przycisk z `onClick={() => handleSign(event.id)}`.

---

# Kryteria zaliczenia

Uczeń:
- zna schemat `map()` w React,
- potrafi zapisać strukturę `Card` w Bootstrap,
- potrafi odtworzyć funkcję `handleSign()`,
- potrafi zapisać przycisk wywołujący funkcję z argumentem,
- rozumie podstawowe elementy kodu.

---

# Informacja dla ucznia

To ćwiczenie ma utrwalić podstawowe wzorce kodu, które bardzo często pojawiają się w zadaniach praktycznych.
Celem nie jest napisanie dużej aplikacji.
Celem jest zapamiętanie i rozumienie najważniejszych schematów.

