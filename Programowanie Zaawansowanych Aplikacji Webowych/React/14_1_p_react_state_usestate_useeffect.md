
# 14.1 React – State, useState, useEffect  
Zadania praktyczne

Zakłada się, że:
- środowisko React jest skonfigurowane (np. Vite lub Create React App),
- istnieje główny komponent `App`,
- import `useState` i `useEffect` jest dostępny z pakietu `react`.

---

## Zadanie 1 – Pierwszy licznik (useState)

1. Utwórz komponent `Counter`, który:
   - przechowuje w stanie liczbę całkowitą `count`, początkowo `0`,
   - wyświetla aktualną wartość `count` w elemencie `<p>`,
   - zawiera przycisk „Zwiększ”, który po kliknięciu zwiększa `count` o 1.

2. W komponencie `App` wyrenderuj komponent `Counter`.

3. Sprawdź, czy po każdym kliknięciu wartość `count` poprawnie się zwiększa.

Wskazówka: użyj `const [count, setCount] = useState(0);`.

---

## Zadanie 2 – Zmiana tekstu (state + useState)

1. Utwórz komponent `Message`, który:
   - przechowuje w stanie tekst `message`, początkowo `"Witaj w React"`,
   - wyświetla tekst w elemencie `<p>`,
   - ma dwa przyciski:
     - „Ustaw tekst A” – zmienia `message` na `"Pierwszy komunikat"`,
     - „Ustaw tekst B” – zmienia `message` na `"Drugi komunikat"`.

2. Umieść komponent `Message` w `App`.

3. Sprawdź, czy kliknięcie odpowiedniego przycisku zawsze ustawia właściwy tekst.

---

## Zadanie 3 – Przełącznik widoczności (boolean w stanie)

1. Utwórz komponent `TogglePanel`, który:
   - przechowuje w stanie wartość logiczną `isVisible`, początkowo `false`,
   - zawiera przycisk z napisem:
     - „Pokaż panel” jeśli `isVisible === false`,
     - „Ukryj panel” jeśli `isVisible === true`,
   - wyświetla dodatkowy element `<div>Panel treści</div>` tylko wtedy, gdy `isVisible === true`.

2. Do zmiany wartości użyj `setIsVisible(prev => !prev)`.

3. W komponencie `App` wyrenderuj `TogglePanel` i sprawdź zachowanie przełącznika.

---

## Zadanie 4 – Obiekt w stanie (aktualizacja z użyciem kopii)

1. Utwórz komponent `UserProfile`, który:
   - przechowuje w stanie obiekt:
     ```jsx
     {
       name: "Jan",
       age: 20,
       city: "Tarnów"
     }
     ```
   - wyświetla dane użytkownika w jednym akapicie, np.:
     `Jan, 20 lat, Tarnów`.

2. Dodaj trzy przyciski:
   - „Zmień miasto na Kraków” – zmienia tylko `city` na `"Kraków"`,
   - „Urodziny” – zwiększa `age` o 1,
   - „Zmień imię na Anna” – zmienia tylko `name` na `"Anna"`.

3. Do aktualizacji stanu używaj wyłącznie:
   ```jsx
   setUser(prev => ({ ...prev, poleDoZmiany: nowaWartość }));
   ```

4. Sprawdź, czy zmienia się zawsze tylko to jedno pole, które powinno być zmienione.

---

## Zadanie 5 – Tablica w stanie (dodawanie i usuwanie)

1. Utwórz komponent `TaskList`, który:
   - przechowuje w stanie tablicę zadań `tasks`, np. `["Nauka React", "Obejrzeć dokumentację"]`,
   - wyświetla listę zadań w `<ul>`.

2. Dodaj:
   - pole tekstowe `<input>` do wpisania nowego zadania,
   - przycisk „Dodaj zadanie”:
     - po kliknięciu dodaje wpisany tekst na koniec tablicy `tasks`,
     - czyści zawartość pola `<input>`.

3. Dodaj przy każdym elemencie listy przycisk „Usuń”, który usuwa tylko to jedno zadanie z listy.

4. Aktualizacje tablicy wykonuj przez tworzenie nowej tablicy:
   - dodawanie: `setTasks(prev => [...prev, newTask])`,
   - usuwanie: `setTasks(prev => prev.filter((task, index) => index !== idDoUsunięcia))`.

---

## Zadanie 6 – useEffect bez tablicy zależności (każdy render)

1. Utwórz komponent `RenderLogger`, który:
   - przechowuje w stanie liczbę `count` (początkowo 0),
   - przyciskiem zwiększa `count` o 1,
   - używa `useEffect` bez tablicy zależności do wypisania w konsoli:
     `"Render komponentu, count = X"`.

2. Obserwuj w konsoli, że efekt jest wywoływany:
   - przy pierwszym renderowaniu,
   - przy każdym kliknięciu zwiększającym `count`.

---

## Zadanie 7 – useEffect z pustą tablicą (inicjalizacja)

1. Utwórz komponent `InitLogger`, który:
   - nie musi mieć żadnego stanu (lub może mieć prosty licznik),
   - używa `useEffect` z pustą tablicą `[]`, aby:
     - wypisać w konsoli `"Komponent InitLogger został zamontowany"`,
     - opcjonalnie ustawić dowolną wartość w stanie, np. `setInitialized(true)`.

2. Sprawdź, że komunikat w konsoli pojawia się tylko raz – przy pierwszym wyświetleniu komponentu.

---

## Zadanie 8 – useEffect z zależnością (śledzenie zmian stanu)

1. Utwórz komponent `WatchedCounter`, który:
   - przechowuje w stanie `count` (początkowo 0),
   - zwiększa `count` przyciskiem,
   - używa `useEffect` z tablicą zależności `[count]`, aby:
     - przy każdej zmianie `count` wypisać w konsoli:
       `"Nowa wartość count: X"`.

2. Zwróć uwagę, że efekt nie jest wywoływany przy zmianie innych stanów, jeśli takie dodasz (np. dodatkowego pola tekstowego).

---

## Zadanie 9 – Timer (useEffect + cleanup)

1. Utwórz komponent `Clock`, który:
   - przechowuje w stanie aktualny czas `time` jako obiekt `new Date()`,
   - wyświetla czas w elemencie `<p>` za pomocą `time.toLocaleTimeString()`.

2. Za pomocą `useEffect`:
   - utwórz timer `setInterval`, który co 1000 ms (1 s) aktualizuje stan:
     `setTime(new Date());`
   - zwróć funkcję cleanup, która wykona `clearInterval(timer)`.

3. Sprawdź:
   - czy czas jest aktualizowany co sekundę,
   - czy po usunięciu komponentu (np. warunkowe renderowanie w `App`) timer zostaje poprawnie wyczyszczony (brak błędów w konsoli).

---

## Zadanie 10 – Szerokość okna (useEffect + nasłuch zdarzeń)

1. Utwórz komponent `WindowWidth`, który:
   - przechowuje w stanie `width` początkowo `window.innerWidth`,
   - wyświetla wartość `width` w `<p>`.

2. W `useEffect`:
   - zdefiniuj funkcję `handleResize`, która aktualizuje `width` na `window.innerWidth`,
   - dodaj nasłuch zdarzenia `resize`:
     `window.addEventListener("resize", handleResize)`,
   - w funkcji cleanup usuń nasłuchiwanie:
     `window.removeEventListener("resize", handleResize)`.

3. Sprawdź, czy przy zmianie rozmiaru okna przeglądarki wartość `width` aktualizuje się na ekranie.

---

## Zadanie 11 – Połączenie state, useState i useEffect (prosty „mini-dashboard”)

1. Utwórz komponent `Dashboard`, który:
   - przechowuje w stanie:
     - `count` (licznik kliknięć przycisku),
     - `lastUpdate` (ciąg tekstowy z datą i czasem ostatniej zmiany),
   - wyświetla:
     - aktualną wartość `count`,
     - tekst `"Ostatnia aktualizacja: ..."`.

2. Zaimplementuj:
   - przycisk „Kliknij mnie”, który zwiększa `count` o 1,
   - `useEffect` z zależnością `[count]`, który:
     - przy każdej zmianie `count` ustawia `lastUpdate` na aktualną datę/czas (`new Date().toLocaleString()`).

3. Sprawdź, czy:
   - zwiększanie licznika aktualizuje `count`,
   - tekst z datą aktualizuje się po każdej zmianie `count`.

---

## Zadanie 12 – Dokumentacja

1. Otwórz w przeglądarce:
   - https://react.dev/reference/react/useState  
   - https://react.dev/reference/react/useEffect  

2. Odpowiedz krótko, w osobnym pliku tekstowym lub w komentarzu w kodzie:
   - W jakich sytuacjach React zaleca przechowywanie danych w stanie?
   - Jak dokumentacja definiuje „side effects”?
   - Dlaczego funkcja zwracana z `useEffect` jest traktowana jako cleanup?

3. Dołącz na końcu pliku listę linków, z których korzystałeś.

---

## Uwagi końcowe

- Wszystkie zmiany stanu wykonuj wyłącznie za pomocą funkcji `set...` zwróconej przez `useState`.
- Dbaj o poprawne usuwanie zasobów w `useEffect` (timery, nasłuchiwacze).
- Kod powinien być czytelny i podzielony na małe komponenty, jeśli zadanie staje się zbyt rozbudowane.
