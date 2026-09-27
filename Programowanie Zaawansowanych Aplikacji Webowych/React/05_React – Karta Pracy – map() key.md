# Karta pracy: React `map()` i `key`

Imię i nazwisko: ............................................................  Klasa: ................  Data: ................

**Cel:** odczytywanie wyniku mapowania tablicy oraz tworzenie list komponentów React z poprawnym kluczem.

## Przypomnienie

`map()` tworzy nową tablicę. Funkcja przekazana do `map()` jest wywoływana dla każdego elementu tablicy, a zwrócone wartości trafiają do nowej tablicy w tej samej kolejności. Oryginalna tablica nie jest modyfikowana przez samo `map()`.

```javascript
const result = items.map((item) => item.name);

const result2 = items.map((item) => {
  return item.name;
});
```

W JSX lista elementów lub komponentów wymaga stabilnego `key`, unikalnego wśród elementów tej samej listy. `key` umieszcza się na elemencie zwracanym bezpośrednio z `map()`. Nie jest zwykłym prop przekazywanym do komponentu.

```jsx
{items.map((item) => (
  <Item key={item.id} name={item.name} />
))}
```

## Zadanie 1. Wynik mapowania liczb

Zapisz dokładny wynik polecenia `console.log(result)`.

```javascript
const numbers = [2, 5, 8];
const result = numbers.map((number) => number * 2);
console.log(result);
```

**Wynik:** ..........................................................................................................................

Czy po wykonaniu kodu tablica `numbers` nadal zawiera `[2, 5, 8]`? Uzasadnij.

........................................................................................................................................

## Zadanie 2. Skrócony zapis i jawny `return`

Podaj wynik obu poleceń `console.log`. Zwróć uwagę na nawiasy klamrowe funkcji strzałkowej.

```javascript
const names = ["React", "Node.js", "MySQL"];
const short = names.map((name) => name.toUpperCase());
const full = names.map((name) => {
  return name.length;
});
console.log(short);
console.log(full);
```

**Wynik `short`:** ................................................................................................................

**Wynik `full`:** ..................................................................................................................

## Zadanie 3. Tablica obiektów

Zapisz dokładny wynik obu poleceń `console.log`. W drugim mapowaniu użyto bloku instrukcji z `return`.

```javascript
const technologies = [
  { id: 1, name: "React", hours: 30 },
  { id: 2, name: "Express", hours: 25 },
  { id: 3, name: "MySQL", hours: 20 }
];
const labels = technologies.map((tech) => `${tech.name}: ${tech.hours} h`);
const longCourses = technologies.map((tech) => {
  return tech.hours >= 25;
});
console.log(labels);
console.log(longCourses);
```

**Wynik `labels`:**

........................................................................................................................................

........................................................................................................................................

**Wynik `longCourses`:** .......................................................................................................

Czy druga operacja wybiera tylko kursy trwające co najmniej 25 godzin? Wyjaśnij, co znajduje się w tablicy.

........................................................................................................................................

........................................................................................................................................

## Zadanie 4. Wynik renderowania w React

Przyjmij, że ten fragment jest wewnątrz komponentu `App`. Zapisz widoczny tekst w kolejności wyświetlania oraz wartości `key` dla trzech elementów `li`.

```jsx
const products = [
  { id: "p1", name: "Laptop", price: 3500 },
  { id: "p2", name: "Monitor", price: 1200 },
  { id: "p3", name: "Mysz", price: 80 }
];

return (
  <ul>
    {products.map((product) => (
      <li key={product.id}>
        {product.name}: {product.price} zł
      </li>
    ))}
  </ul>
);
```

**Widoczny tekst listy:**

1. ....................................................................................................................................
2. ....................................................................................................................................
3. ....................................................................................................................................

**Wartości `key` w kolejności:** ..............................................................................................

Czy użytkownik widzi wartości `key` na stronie? .................................................................

## Zadanie 5. Projekt WebTech

W istniejącym projekcie utwórz tablicę `technologies` z co najmniej czterema obiektami. Każdy obiekt ma mieć pola `id`, `name`, `category` i `hours`. W komponencie `App` wygeneruj komponenty `Technology` za pomocą `map()`. Przekaż `name`, `category` i `hours` jako props. Nadaj każdemu komponentowi `key` oparty na `id`.

Wykonaj mapowanie kolejno w dwóch wersjach:

1. Z nawiasami okrągłymi i niejawnym zwrotem.
2. Z nawiasami klamrowymi i jawnym `return`.

Po sprawdzeniu obu wersji zostaw jedną działającą w pliku. Zapisz fragment `App.jsx` zawierający tablicę i mapowanie albo dołącz plik projektu.

```jsx







```

## Zadanie 6. Analiza błędów

Wskaż dwa problemy w poniższym kodzie i zapisz poprawioną wersję mapowania.

```jsx
{technologies.map((technology) => {
  <Technology name={technology.name} />
})}
```

**Problem 1:** .....................................................................................................................

**Problem 2:** .....................................................................................................................

**Poprawiona wersja:**

```jsx




```

## Sprawdzenie

- [ ] Potrafię przewidzieć tablicę zwracaną przez `map()`.
- [ ] Rozróżniam niejawny zwrot od `return`.
- [ ] Stosuję stabilny `key` na elemencie listy.
