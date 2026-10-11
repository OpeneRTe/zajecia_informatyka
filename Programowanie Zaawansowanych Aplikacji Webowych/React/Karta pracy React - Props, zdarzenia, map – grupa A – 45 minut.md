
# Karta pracy – React
## Grupa A

**Przedmiot:** Zaawansowane Programowanie Aplikacji Internetowych  
**Czas:** 45 minut  
**Zakres:** tablice obiektów, `map()`, `key`, komponenty, props, funkcje strzałkowe, `onClick`

**Imię i nazwisko:** ..............................................................  
**Data:** ....................................

---

# Zadanie 1. `map()` + komponent + props – 8 pkt

Dana jest tablica:

```javascript
const products = [
  { id: 1, name: "Laptop", category: "Komputery", price: 3500 },
  { id: 2, name: "Monitor", category: "Monitory", price: 1200 },
  { id: 3, name: "Klawiatura", category: "Akcesoria", price: 300 }
];
```

Uzupełnij kod tak, aby dla każdego elementu tablicy został utworzony komponent `Product`.

```jsx
{products.map((........................) => (
  <Product
    key={........................}
    name={........................}
    category={........................}
    price={........................}
  />
))}
```

Następnie odpowiedz:

### a)

Co oznacza parametr:

```javascript
product
```

wewnątrz:

```javascript
products.map((product) => ...)
```

....................................................................................

### b)

Ile komponentów `Product` zostanie utworzonych?

....................................................................................

### c)

Skąd komponent `Product` otrzymuje wartości `name`, `category` i `price`?

....................................................................................

---

# Zadanie 2. `map()` – `()` i `{}` – 6 pkt

Poniższy kod jest poprawny:

```jsx
{products.map((product) => (
  <p key={product.id}>
    {product.name}
  </p>
))}
```

Przepisz go do wersji wykorzystującej `{}` oraz `return`.

```jsx
{products.map((product) => {

  ......................................................................

  ......................................................................

})}
```

Następnie odpowiedz:

### a)

Kiedy funkcja strzałkowa może zwracać wartość bez wpisywania `return`?

....................................................................................

### b)

Co jest niepoprawne w poniższym kodzie?

```javascript
products.map((product) => {
  product.name;
});
```

....................................................................................

### c)

Kiedy zastosowanie `{}` jest wygodniejsze niż `()`?

....................................................................................

---

# Zadanie 3. Znajdź i popraw błędy – 7 pkt

Poniższy kod zawiera błędy.

```jsx
function Product(name, price) {
  return (
    <div>
      <h2>{product.name}</h2>
      <p>{price}</p>
    </div>
  );
}

products.map((product) => {
  <Product
    name={product.name}
    price={product.price}
  />
});
```

Znajdź błędy i zapisz poprawioną wersję kodu.

```jsx
....................................................................................

....................................................................................

....................................................................................

....................................................................................

....................................................................................

....................................................................................
```

Podaj co najmniej **dwa błędy**, które występowały w kodzie.

1. .................................................................................

2. .................................................................................

---

# Zadanie 4. `key` i generowanie listy – 5 pkt

Rozważ kod:

```jsx
{products.map((product) => (
  <Product
    key={product.id}
    name={product.name}
  />
))}
```

Odpowiedz:

### a)

Do czego służy `key`?

....................................................................................

### b)

Dlaczego:

```jsx
key={product.id}
```

jest poprawnym rozwiązaniem?

....................................................................................

### c)

Dlaczego nie powinno się przypisać wszystkim komponentom:

```jsx
key={1}
```

....................................................................................

---

# Zadanie 5. `onClick` i przekazywanie argumentów – 7 pkt

Dana jest funkcja:

```javascript
function showProduct(name) {
  console.log("Wybrano produkt: " + name);
}
```

### a)

Uzupełnij przycisk tak, aby po kliknięciu przekazywał nazwę produktu:

```jsx
<button onClick={........................................................}>
  Wybierz
</button>
```

### b)

Wyjaśnij różnicę między:

```jsx
onClick={showProduct}
```

a:

```jsx
onClick={showProduct()}
```

....................................................................................

....................................................................................

### c)

Dlaczego przy przekazywaniu argumentu stosujemy zapis:

```jsx
onClick={() => showProduct(name)}
```

....................................................................................

---

# Zadanie 6. Analiza przepływu danych – 7 pkt

Przeanalizuj kod:

```jsx
function Product({ name, price, onSelect }) {

  function showInfo() {
    console.log("Cena: " + price);
  }

  return (
    <section>
      <h2>{name}</h2>

      <button onClick={showInfo}>
        Pokaż cenę
      </button>

      <button onClick={() => onSelect(name)}>
        Wybierz produkt
      </button>
    </section>
  );
}
```

### a)

Wymień wszystkie props komponentu `Product`.

....................................................................................

### b)

Który z props jest funkcją?

....................................................................................

### c)

Która funkcja znajduje się bezpośrednio wewnątrz komponentu `Product`?

....................................................................................

### d)

Co zostanie przekazane do funkcji `onSelect`?

....................................................................................

### e)

Wyjaśnij różnicę pomiędzy:

```jsx
onClick={showInfo}
```

a:

```jsx
onClick={() => onSelect(name)}
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