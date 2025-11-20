# React – Props  
Dokumentacja techniczna  
Źródła:  
- W3Schools – React Props: https://www.w3schools.com/react/react_props.asp  
- React Official Docs – Passing Props: https://react.dev/learn/passing-props

---

## 1. Definicja  
Props (properties) są danymi wejściowymi przekazywanymi do komponentu React.  
Działają jak argumenty funkcji w JavaScript oraz jak atrybuty elementów HTML.  
Każdy komponent otrzymuje przekazane właściwości wewnątrz jednego obiektu `props`.

---

## 2. Przekazywanie danych do komponentu  
Props przekazywane są poprzez atrybuty JSX.

### Przykład
```jsx
createRoot(document.getElementById('root')).render(
  <Car brand="Ford" />
);
```

Komponent odbiera je jako obiekt:

```jsx
function Car(props) {
  return <h2>I am a {props.brand}!</h2>;
}
```

Nazwa argumentu (`props`) może być dowolna:

```jsx
function Car(myobj) {
  return <h2>I am a {myobj.brand}!</h2>;
}
```

---

## 3. Przekazywanie wielu właściwości  
Każdy atrybut JSX trafia jako pole do obiektu `props`.

### Przykład
```jsx
<Car brand="Ford" model="Mustang" color="red" />
```

Wykorzystanie:

```jsx
function Car(props) {
  return <h2>I am a {props.color} {props.brand} {props.model}!</h2>;
}
```

---

## 4. Typy danych w props  
React obsługuje wszystkie typy JavaScript:  
- tekst,  
- liczby,  
- zmienne,  
- obiekty,  
- tablice,  
- funkcje.

**Zasada:**  
- tekst → w cudzysłowach  
- liczby / zmienne / obiekty / tablice → w klamrach `{}`

### Przykłady

#### Liczba:
```jsx
<Car year={1969} />
```

#### Zmienna:
```jsx
const x = "Ford";
<Car brand={x} />
```

#### Obiekt i tablica:
```jsx
const years = [1964, 1965, 1966];
const info = { name: "Ford", model: "Mustang" };

<Car years={years} carinfo={info} />
```

---

## 5. Props jako obiekty  

```jsx
function Car(props) {
  return (
    <>
      <h2>My {props.carinfo.name} {props.carinfo.model}!</h2>
      <p>It is {props.carinfo.color} and it is from {props.carinfo.year}!</p>
    </>
  );
}
```

---

## 6. Props jako tablice  
Dostęp odbywa się przez indeksy:

```jsx
function Car(props) {
  return <h2>My car is a {props.carinfo[0]} {props.carinfo[1]}!</h2>;
}
```

---

## 7. Przekazywanie props między komponentami  

```jsx
function Car(props) {
  return <h2>I am a {props.brand}!</h2>;
}

function Garage() {
  return (
    <>
      <h1>Who lives in my garage?</h1>
      <Car brand="Ford" />
    </>
  );
}
```

---

## 8. Props są „read-only”  
Props są niemutowalne.  
Komponent nie może modyfikować wartości przekazanych przez komponent nadrzędny.

Dokumentacja:  
https://react.dev/learn/passing-props#props-are-read-only

---

## 9. Powiązanie z INF.04  
Zagadnienie props wpisuje się w wymagania:  
- **INF.04.7.2(1)** – stosowanie frameworków webowych (React.js)  
- **INF.04.7.3(1)** – implementacja logiki w JavaScript w aplikacjach webowych  
