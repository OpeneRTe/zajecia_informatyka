
# 14.1 React – State, useState, useEffect  
Dokumentacja techniczna z przykładami  
Źródła:  
- React Official Docs — State: https://react.dev/learn/state  
- React Official Docs — useState: https://react.dev/reference/react/useState  
- React Official Docs — useEffect: https://react.dev/reference/react/useEffect  
- W3Schools — React State: https://www.w3schools.com/react/react_state.asp  
- W3Schools — React useEffect: https://www.w3schools.com/react/react_useeffect.asp  

---

# 1. State — definicja rozszerzona

State (stan) to wewnętrzne dane komponentu React, które mogą zmieniać się podczas działania aplikacji. React wykorzystuje aktualną wartość stanu do generowania widoku. Zmiana stanu automatycznie powoduje ponowne renderowanie komponentu.

Cechy:
- State jest **prywatny** dla komponentu.
- State jest **niemutowalny** — nie wolno go zmieniać bezpośrednio.
- Aktualizacja stanu jest **asynchroniczna**.
- UI React zawsze odzwierciedla aktualny stan.
- State opisuje wartości, które zmieniają się w czasie (liczniki, formularze, widoczność elementów, dane API).

---

# 2. Przykłady użycia state

## 2.1. Komponent bez stanu (stateless)
```jsx
function Hello(props) {
  return <h2>Hello {props.name}</h2>;
}
```

## 2.2. Komponent ze stanem (stateful)
```jsx
import { useState } from "react";

function Message() {
  const [text, setText] = useState("Witaj!");

  return (
    <>
      <p>{text}</p>
      <button onClick={() => setText("Zmieniono tekst!")}>
        Zmień
      </button>
    </>
  );
}
```

---

# 3. useState — definicja rozszerzona

`useState` jest hookiem umożliwiającym zarządzanie stanem w komponentach funkcyjnych.  
Pozwala na przechowywanie danych między kolejnymi renderowaniami.

Składnia:
```jsx
const [value, setValue] = useState(initialValue);
```

Opis:
- `value` — aktualna wartość stanu,
- `setValue` — funkcja do aktualizacji stanu,
- `initialValue` — wartość początkowa ustawiona przy pierwszym renderze.

Zasady:
- Nie wolno przypisywać bezpośrednio: `value = 5` ❌
- Zawsze używać funkcji setValue: `setValue(5)` ✔️
- Jeśli nowy stan zależy od poprzedniego — należy używać funkcji:
```jsx
setValue(prev => prev + 1);
```

---

# 4. Przykłady useState

## 4.1. Licznik
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>Wartość: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +
      </button>
    </>
  );
}
```

## 4.2. Przełącznik true/false
```jsx
function Toggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        Przełącz
      </button>

      {isOpen && <p>Widoczna sekcja</p>}
    </>
  );
}
```

## 4.3. Obiekt w stanie
```jsx
function UserCard() {
  const [user, setUser] = useState({
    name: "Jan",
    age: 25
  });

  return (
    <>
      <p>{user.name} — {user.age} lat</p>
      <button
        onClick={() =>
          setUser(prev => ({ ...prev, age: prev.age + 1 }))
        }
      >
        Urodziny 🎉
      </button>
    </>
  );
}
```

## 4.4. Tablica w stanie
```jsx
function Tasks() {
  const [tasks, setTasks] = useState(["A", "B"]);

  return (
    <>
      <button
        onClick={() => setTasks(prev => [...prev, "C"])}
      >
        Dodaj zadanie
      </button>

      <ul>
        {tasks.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </>
  );
}
```

---

# 5. useEffect — definicja rozszerzona

`useEffect` pozwala wykonywać efekty uboczne (side effects), czyli operacje niezwiązane z samym renderowaniem UI.  
Przykłady efektów:
- pobieranie danych z API,
- operacje na timerach,
- subskrypcje zdarzeń,
- zapisy do localStorage,
- synchronizacja danych.

Składnia:
```jsx
useEffect(() => {
  // kod efektu
}, [dependencies]);
```

Działanie:
- React uruchamia efekt po renderowaniu,
- zależności określają, kiedy efekt się wykona ponownie.

---

# 6. Typy użycia useEffect

## 6.1. Efekt przy każdym renderowaniu
```jsx
useEffect(() => {
  console.log("render");
});
```

## 6.2. Efekt tylko raz (mount)
```jsx
useEffect(() => {
  console.log("init");
}, []);
```

## 6.3. Efekt zależny od zmiennej
```jsx
useEffect(() => {
  console.log("count zmienione");
}, [count]);
```

---

# 7. Cleanup — czyszczenie efektów

```jsx
useEffect(() => {
  const handler = () => console.log("resize");

  window.addEventListener("resize", handler);

  return () => {
    window.removeEventListener("resize", handler);
  };
}, []);
```

Cleanup usuwa zasoby takie jak event listenery czy timery.

---

# 8. Przykłady useEffect

## 8.1. Efekt tylko raz (init)
```jsx
useEffect(() => {
  console.log("Komponent załadowany");
}, []);
```

## 8.2. Reakcja na zmianę wartości
```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Zmieniono count:", count);
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      +
    </button>
  );
}
```

## 8.3. Pobieranie danych z API
```jsx
function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
```

## 8.4. Timer + cleanup
```jsx
function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <p>{time.toLocaleTimeString()}</p>;
}
```

## 8.5. Nasłuch zdarzeń + cleanup
```jsx
function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <p>Szerokość okna: {width}px</p>;
}
```

---

