
# 14.1 React – State, useState, useEffect  
Klucz odpowiedzi / wskazówki dla nauczyciela

Dokument uzupełnia zadania praktyczne z pliku:  
**14_1_p_react_state_usestate_useeffect.md**

---

# 1. Zadanie – Counter (useState)
**Wymagania:**  
- Stan `count` = 0  
- Przycisk zwiększa wartość  
- Wyświetlanie w `<p>`

**Przykładowe poprawne rozwiązanie:**
```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Zwiększ</button>
    </>
  );
}
```

---

# 2. Zadanie – Message (zmiana tekstu)
**Wymagania:**  
- 2 przyciski ustawiają różne wartości stanu  
- Tekst wyświetlany dynamicznie

**Poprawne podejście:**
```jsx
function Message() {
  const [message, setMessage] = useState("Witaj w React");
  return (
    <>
      <p>{message}</p>
      <button onClick={() => setMessage("Pierwszy komunikat")}>Ustaw tekst A</button>
      <button onClick={() => setMessage("Drugi komunikat")}>Ustaw tekst B</button>
    </>
  );
}
```

---

# 3. Zadanie – TogglePanel (boolean)
**Poprawny efekt:**
```jsx
function TogglePanel() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <button onClick={() => setIsVisible(prev => !prev)}>
        {isVisible ? "Ukryj panel" : "Pokaż panel"}
      </button>

      {isVisible && <div>Panel treści</div>}
    </>
  );
}
```

---

# 4. Zadanie – UserProfile (obiekt)
**Najważniejsze:**  
- aktualizacja musi używać kopii obiektu: `{ ...prev }`

**Oczekiwane rozwiązanie:**
```jsx
const [user, setUser] = useState({
  name: "Jan",
  age: 20,
  city: "Tarnów"
});

<button onClick={() => setUser(prev => ({ ...prev, city: "Kraków" }))}>Zmień miasto</button>
<button onClick={() => setUser(prev => ({ ...prev, age: prev.age + 1 }))}>Urodziny</button>
<button onClick={() => setUser(prev => ({ ...prev, name: "Anna" }))}>Zmień imię</button>
```

---

# 5. Zadanie – TaskList (tablice)
**Najważniejsze:**  
- dodanie: `[...prev, newValue]`  
- usuwanie: `.filter(...)`

**Poprawne fragmenty:**
```jsx
setTasks(prev => [...prev, newTask]);

setTasks(prev => prev.filter((t, i) => i !== index));
```

---

# 6. Zadanie – useEffect bez tablicy zależności
**Efekt wykonuje się przy każdym renderowaniu.**

Rozwiązanie:
```jsx
useEffect(() => {
  console.log("Render komponentu, count =", count);
});
```

---

# 7. Zadanie – useEffect z pustą tablicą
**Efekt uruchamia się tylko raz (mount).**

```jsx
useEffect(() => {
  console.log("Komponent InitLogger został zamontowany");
}, []);
```

---

# 8. Zadanie – useEffect zależny od stanu
**Efekt reaguje tylko na zmianę `count`.**

```jsx
useEffect(() => {
  console.log("Nowa wartość count:", count);
}, [count]);
```

---

# 9. Zadanie – Timer (cleanup)
**Najważniejsze:**  
- użycie `setInterval`  
- wyczyszczenie timera w cleanup

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    setTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);
```

---

# 10. Zadanie – WindowWidth (nasłuch zdarzeń)
**Najważniejsze:**  
- addEventListener  
- removeEventListener

```jsx
useEffect(() => {
  function handleResize() {
    setWidth(window.innerWidth);
  }

  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);
```

---

# 11. Zadanie – Dashboard (połączenie state + useEffect)
**Oczekiwane działanie:**
- `count` zwiększa się po kliknięciu  
- `lastUpdate` aktualizuje się w useEffect zależnym od `[count]`

```jsx
const [count, setCount] = useState(0);
const [lastUpdate, setLastUpdate] = useState("");

useEffect(() => {
  setLastUpdate(new Date().toLocaleString());
}, [count]);
```

---

# 12. Zadanie – Dokumentacja
**Oczekiwane odpowiedzi (skrót):**

- Dane należy przechowywać w stanie, gdy zmiana wartości wpływa na UI.  
- Side effects to działania wykonywane poza czystym renderowaniem (np. zapytania HTTP, timery).  
- Funkcja cleanup w useEffect służy do zwalniania zasobów utworzonych przez efekt.


