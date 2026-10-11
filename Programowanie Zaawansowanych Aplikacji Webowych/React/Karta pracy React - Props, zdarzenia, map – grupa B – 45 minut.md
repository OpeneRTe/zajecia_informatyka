
# Karta pracy – React
## Grupa B

**Przedmiot:** Zaawansowane Programowanie Aplikacji Internetowych  
**Czas:** 45 minut  
**Zakres:** tablice obiektów, `map()`, `key`, komponenty, props, funkcje strzałkowe, `onClick`

**Imię i nazwisko:** ..............................................................  
**Data:** ....................................

---

# Zadanie 1. `map()` + komponent + props – 8 pkt

Dana jest tablica:

```javascript
const movies = [
  { id: 1, title: "Matrix", category: "Science fiction", year: 1999 },
  { id: 2, title: "Incepcja", category: "Science fiction", year: 2010 },
  { id: 3, title: "Gladiator", category: "Dramat", year: 2000 }
];
```

Uzupełnij kod tak, aby dla każdego filmu został utworzony komponent `Movie`.

```jsx
{movies.map((........................) => (
  <Movie
    key={........................}
    title={........................}
    category={........................}
    year={........................}
  />
))}
```

Następnie odpowiedz:

### a)

Co oznacza parametr:

```javascript
movie
```

w funkcji przekazanej do `map()`?

....................................................................................

### b)

Ile komponentów `Movie` zostanie utworzonych?

....................................................................................

### c)

Skąd komponent `Movie` otrzymuje dane?

....................................................................................

---

# Zadanie 2. `map()` – `()` i `{}` – 6 pkt

Przepisz:

```jsx
{movies.map((movie) => (
  <p key={movie.id}>
    {movie.title}
  </p>
))}
```

do wersji wykorzystującej `{}` i `return`.

```jsx
{movies.map((movie) => {

  ......................................................................

  ......................................................................

})}
```

Odpowiedz:

### a)

Kiedy można pominąć `return`?

....................................................................................

### b)

Co stanie się w przypadku:

```javascript
movies.map((movie) => {
  movie.title;
});
```

....................................................................................

### c)

Kiedy warto zastosować blok `{}`?

....................................................................................

---

# Zadanie 3. Znajdź i popraw błędy – 7 pkt

Kod:

```jsx
function Movie(title, year) {
  return (
    <div>
      <h2>{movie.title}</h2>
      <p>{year}</p>
    </div>
  );
}

movies.map((movie) => {
  <Movie
    title={movie.title}
    year={movie.year}
  />
});
```

Popraw kod.

```jsx
....................................................................................

....................................................................................

....................................................................................

....................................................................................

....................................................................................

....................................................................................
```

Podaj dwa błędy:

1. .................................................................................

2. .................................................................................

---

# Zadanie 4. `key` – 5 pkt

Dany jest kod:

```jsx
{movies.map((movie) => (
  <Movie
    key={movie.id}
    title={movie.title}
  />
))}
```

Odpowiedz:

### a)

Do czego służy `key`?

....................................................................................

### b)

Dlaczego można wykorzystać `movie.id`?

....................................................................................

### c)

Czy kilka komponentów może posiadać taki sam `key`?

....................................................................................

Uzasadnij.

....................................................................................

---

# Zadanie 5. `onClick` i argument – 7 pkt

Dana jest funkcja:

```javascript
function showMovie(title) {
  console.log("Wybrano film: " + title);
}
```

Uzupełnij:

```jsx
<button onClick={........................................................}>
  Wybierz
</button>
```

Następnie wyjaśnij różnicę:

```jsx
onClick={showMovie}
```

oraz:

```jsx
onClick={showMovie()}
```

....................................................................................

....................................................................................

Wyjaśnij także, dlaczego przy przekazywaniu `title` stosujemy:

```jsx
onClick={() => showMovie(title)}
```

....................................................................................

---

# Zadanie 6. Analiza przepływu danych – 7 pkt

Przeanalizuj:

```jsx
function Movie({ title, year, onSelect }) {

  function showYear() {
    console.log("Rok: " + year);
  }

  return (
    <section>
      <h2>{title}</h2>

      <button onClick={showYear}>
        Pokaż rok
      </button>

      <button onClick={() => onSelect(title)}>
        Wybierz film
      </button>
    </section>
  );
}
```

Odpowiedz:

### a)

Wymień props komponentu `Movie`.

....................................................................................

### b)

Który props jest funkcją?

....................................................................................

### c)

Która funkcja została utworzona wewnątrz komponentu?

....................................................................................

### d)

Co jest przekazywane do `onSelect`?

....................................................................................

### e)

Wyjaśnij różnicę pomiędzy:

```jsx
onClick={showYear}
```

oraz:

```jsx
onClick={() => onSelect(title)}
```

....................................................................................

....................................................................................

---

# Punktacja

| Zadanie | Punkty |
|---|---:|
| 1 | 8 |
| 2 | 6 |
| 3 | 7 |
| 4 | 5 |
| 5 | 7 |
| 6 | 7 |
| **Razem** | **40** |