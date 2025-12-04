# zadanie_find.md

## Zadanie: Wyszukiwanie obiektu za pomocą metody `find`

### Cel
Przećwiczenie działania metody tablicowej `find` na tablicy obiektów oraz obsługi przypadku, gdy element nie został odnaleziony.

---

## Treść zadania
Masz tablicę użytkowników:
```js
const users = [
  { id: 1, name: "Anna", role: "admin" },
  { id: 2, name: "Bartek", role: "user" },
  { id: 3, name: "Celina", role: "moderator" },
  { id: 4, name: "Damian", role: "user" }
];
```

Twoim zadaniem jest:

1. Za pomocą metody `find` odnaleźć użytkownika o identyfikatorze **3**.
2. Wypisać w konsoli komunikat:
   ```text
   Znaleziono użytkownika: Celina, rola: moderator
   ```
3. Następnie wykonać wyszukiwanie użytkownika o identyfikatorze **99**.
4. Jeśli taki użytkownik **nie istnieje**, należy wypisać:
   ```text
   Nie znaleziono użytkownika o podanym ID
   ```

---

## Podpowiedź kodu
```js
const users = [
  { id: 1, name: "Anna", role: "admin" },
  { id: 2, name: "Bartek", role: "user" },
  { id: 3, name: "Celina", role: "moderator" },
  { id: 4, name: "Damian", role: "user" }
];

function findUserById(searchId) {
  const foundUser = users.find((user) => user.id === searchId);

  if (foundUser) {
    console.log(
      "Znaleziono użytkownika:",
      foundUser.name + ", rola:",
      foundUser.role
    );
  } else {
    console.log("Nie znaleziono użytkownika o podanym ID");
  }
}

findUserById(3);   // powinno wypisać dane Celiny
findUserById(99);  // powinno wypisać komunikat o braku użytkownika
```

---

## Zadania

### Zadanie 1 – wyszukiwanie książki
Masz tablicę książek:
```js
const books = [
  { id: 1, title: "Hobbit", author: "J.R.R. Tolkien" },
  { id: 2, title: "Wiedźmin", author: "Andrzej Sapkowski" },
  { id: 3, title: "Solaris", author: "Stanisław Lem" },
  { id: 4, title: "Pan Lodowego Ogrodu", author: "Jarosław Grzędowicz" }
];
```
Napisz funkcję `findBookByTitle(title)`, która znajdzie książkę o podanym tytule i wypisze odpowiedni komunikat w konsoli.

---

### Zadanie 2 – pierwsza liczba większa niż X
Masz tablicę:
```js
const numbers = [3, 18, 7, 42, 5, 100];
```
Napisz funkcję `findFirstGreaterThan(limit)`, która wyszukuje pierwszą liczbę większą niż wartość `limit`.

---

### Zadanie 3 – kombinacja `filter` + `find`
Masz tablicę produktów:
```js
const products = [
  { id: 1, name: "Monitor", category: "electronics", price: 800 },
  { id: 2, name: "Mysz", category: "electronics", price: 60 },
  { id: 3, name: "Krzesło", category: "furniture", price: 300 },
  { id: 4, name: "Biurko", category: "furniture", price: 650 },
  { id: 5, name: "Kabel USB", category: "electronics", price: 20 }
];
```

Wykonaj:
1. Za pomocą `filter` wybierz tylko produkty z kategorii `electronics`.
2. Użyj `find`, aby w tej przefiltrowanej liście odnaleźć pierwszy produkt droższy niż **100**.
3. Wypisz w konsoli:
   - `Znaleziono drogi produkt elektroniczny: <nazwa>, cena: <cena>`
   - lub `Brak drogich produktów elektronicznych`, jeśli takiego produktu nie ma.

---

