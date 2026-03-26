# KARTA PRACY – React + Bootstrap (INF.04)

## WPROWADZENIE – STRUKTURA DANYCH

Przykładowa struktura danych:

```js
const events = [
  {
    id: 1,
    name: "Kolumna aktywna",
    place: "sala techniczna",
    available: true,
    loans: 0,
    type: 1
  }
]
```

---

## WPROWADZENIE – map() i return

Zasada:

```jsx
events.map(event => ( ... ))
```

- używamy, gdy tylko renderujemy JSX
- działa automatyczny `return`

```jsx
events.map(event => {
  return ( ... )
})
```

- używamy, gdy mamy dodatkową logikę (np. if)
- `return` jest obowiązkowy

Brak `return` → brak renderowania elementu

---

## WPROWADZENIE – filter() i if

```js
const filtered = events.filter(event => {
  if (event.type === 1) {
    return true
  }
  return false
})
```

Zasada:
- `filter` musi zwrócić `true` albo `false`
- `true` → element zostaje
- `false` → element jest usuwany

---

## WPROWADZENIE – aktualizacja (handleLoan)

```js
const handleLoan = (id) => {
  setEvents(prev => prev.map(
    event => event.id === id
      ? { ...event, loans: event.loans + 1 }
      : event
  ))
}
```

Zasada:
- `map` przechodzi po wszystkich elementach
- zmieniamy tylko jeden (po `id`)
- używamy `{ ...event }` aby nie modyfikować oryginalnego obiektu

### Dodatkowe zadania – handleLoan

Uzupełnij kod:

```js
const handleLoan = (id) => {
  setEvents(prev => prev.map(
    event => event.id === id
      ? { ...event, loans: event.loans + __________ }
      : event
  ))
}
```

Uzupełnij brakujące fragmenty:

```js
const handleLoan = (id) => {
  setEvents(prev => prev.__________(
    event => event.id === id
      ? { ...event, __________: event.loans + 1 }
      : event
  ))
}
```

Uzupełnij cały zapis:

```js
const handleLoan = (id) => {
  setEvents(_______________________________________________)
}
```

Opisz własnymi słowami, co robi `handleLoan`:

..............................................................

---


## Cel
Powtórzenie kluczowych elementów:
- useState
- map()
- filter()
- Bootstrap: container, row, col, g-*, card, badge

---

## CZĘŚĆ 1 – useState

Uzupełnij:

```js
const [events, setEvents] = __________(dane);
```

Co przechowuje zmienna `events`?

..............................................................

Do czego służy `setEvents`?

..............................................................

---

## CZĘŚĆ 2 – map()

Uzupełnij kod:

```jsx
{events.map(event => (
  <div>
    {__________}
  </div>
))}
```

Co robi funkcja `map()`?

..............................................................

---

## CZĘŚĆ 3 – filter()

Uzupełnij:

```js
const filtered = events.__________(event => event.type === 1);
```

Co robi `filter()`?

..............................................................

### Dodatkowe zadania – if w filter

Uzupełnij kod:

```js
const filteredEvents = events.filter(event => {
  if (event.available === true) {
    return __________
  }
  return __________
})
```

Uzupełnij kod tak, aby zostały tylko elementy typu `2`:

```js
const filteredEvents = events.filter(event => {
  if (event.type === __________) {
    return true
  }
  return false
})
```

Uzupełnij kod tak, aby zostały tylko elementy z liczbą wypożyczeń większą od 0:

```js
const filteredEvents = events.filter(event => {
  if (event.loans > __________) {
    return true
  }
  return false
})
```

Napisz własnymi słowami:

W `filter()` instrukcja `if` służy do:

........................................................................................

---

## CZĘŚĆ 4 – Bootstrap GRID

Uzupełnij strukturę:

```html
<div class="__________">
  <div class="row g-3">
    <div class="__________">
      KARTA
    </div>
  </div>
</div>
```

Wyjaśnij:

`row` → .......................................................

`g-3` → .......................................................

`col-12 col-md-6 col-lg-4` → ...................................

---

## CZĘŚĆ 5 – CARD

Uzupełnij strukturę:

```html
<div class="card">
  <img class="__________" />
  <div class="__________">
    <h5 class="__________">Tytuł</h5>
    <p class="__________">Opis</p>
    <a class="btn btn-success">Akcja</a>
  </div>
</div>
```

---

## CZĘŚĆ 6 – BADGE (status)

Uzupełnij:

```html
<span class="badge __________">Dostępny</span>
```

Jak zmienić na czerwony (niedostępny)?

..............................................................

---

## CZĘŚĆ 7 – React + Bootstrap (całość)

Uzupełnij kod:

```jsx
{events.map(event => (
  <div className="col-12 col-md-6 col-lg-4">
    <div className="card">
      <div className="card-body">

        <h5 className="card-title">{__________}</h5>

        <span className={`badge ${__________ ? 'text-bg-success' : 'text-bg-danger'}`}>
          {__________ ? 'Dostępny' : 'Niedostępny'}
        </span>

      </div>
    </div>
  </div>
))}
```

---

## CZĘŚĆ 8 – RÓŻNICA map

Uzupełnij:

```jsx
// wersja 1
{events.map(event => ( __________ ))}

// wersja 2
{events.map(event => {
  __________
})}
```

Kiedy trzeba użyć `return`?

..............................................................

---

## CZĘŚĆ 9 – FILTROWANIE + MAP

Uzupełnij:

```js
const filteredEvents = events.filter(event => __________);
```

```jsx
{filteredEvents.map(event => ( ... ))}
```

---

## CZĘŚĆ 10 – ANALIZA

Co się stanie, jeśli zabraknie `return` w map?

..............................................................

Dlaczego używamy `filter` przed `map`?

..............................................................

---

## PODSUMOWANIE – DO ZAPAMIĘTANIA

- useState → ................................................
- map → .....................................................
- filter → ..................................................
- row → .....................................................
- col → .....................................................
- badge → ...................................................

