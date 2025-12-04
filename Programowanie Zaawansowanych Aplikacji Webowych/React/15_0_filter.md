# zadanie_filter.md

## Teoria obowiązująca
[Array filter() Method - W3Schools](https://www.w3schools.com/jsref/jsref_filter.asp)

## Zadanie: Filtrowanie produktów według ceny

### Cel
Przećwiczenie filtrowania tablicy obiektów przy użyciu metody `filter` w JavaScript oraz sposobu prezentacji wyników.

---

## Treść zadania
Otrzymujesz tablicę obiektów:
```js
const products = [
  { id: 1, name: "Długopis", price: 5 },
  { id: 2, name: "Zeszyt", price: 12 },
  { id: 3, name: "Słuchawki", price: 150 },
  { id: 4, name: "Klawiatura", price: 220 }
];
```

Twoje zadanie polega na:
1. Utworzeniu nowej tablicy `expensiveProducts`, która zawiera tylko te produkty, których cena jest większa niż **100**.
2. Wypisaniu nazw drogich produktów w konsoli, każdy w osobnej linii.

---

## Podpowiedź kodu
```js
const products = [
  { id: 1, name: "Długopis", price: 5 },
  { id: 2, name: "Zeszyt", price: 12 },
  { id: 3, name: "Słuchawki", price: 150 },
  { id: 4, name: "Klawiatura", price: 220 }
];

const expensiveProducts = products.filter((product) => product.price > 100);

console.log("Drogie produkty:");
expensiveProducts.forEach((product) => {
  console.log(product.name);
});
```

---

## Zadania

### Zadanie 1
Dla tablicy:
```js
const numbers = [5, 12, 99, 3, 44, 150, 2];
```
Utwórz tablicę `largeNumbers`, która zawiera tylko liczby większe niż 40.
Wypisz wynik w konsoli.

---

### Zadanie 2
Dla tablicy użytkowników:
```js
const users = [
  { name: "Anna", role: "admin" },
  { name: "Bartek", role: "user" },
  { name: "Celina", role: "admin" }
];
```
Utwórz tablicę zawierającą tylko użytkowników o roli `admin`.

---

### Zadanie 3 (trudniejsze)
Masz tablicę obiektów reprezentujących zdjęcia:
```js
const photos = [
  { id: 1, category: 1 },
  { id: 2, category: 3 },
  { id: 3, category: 2 },
  { id: 4, category: 1 },
];
```
Utwórz trzy osobne tablice:
- `flowers` — gdzie `category === 1`,
- `animals` — gdzie `category === 2`,
- `cars` — gdzie `category === 3`.

Wypisz długość każdej z tablic w konsoli.

