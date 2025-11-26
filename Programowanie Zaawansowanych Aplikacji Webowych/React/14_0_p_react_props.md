# React – Props  
Zadania praktyczne

Zakłada się, że środowisko React jest już skonfigurowane (np. Vite lub Create React App) i działa podstawowy komponent `App`.

---

## Zadanie 1 – Odczyt kodu z props

1. Przeanalizuj poniższy kod:

   ```jsx
   function Car(props) {
     return <h2>I am a {props.brand}!</h2>;
   }

   function App() {
     return (
       <div>
         <Car brand="Ford" />
         <Car brand="Toyota" />
       </div>
     );
   }
   ```

2. Odpowiedz pisemnie na pytania:
   - Jakie dokładnie napisy zostaną wyrenderowane w przeglądarce?
   - Ile razy komponent `Car` zostanie użyty?
   - Co reprezentuje obiekt `props` w funkcji `Car`?

3. Zapisz odpowiedzi w pliku tekstowym lub jako komentarze w kodzie (np. w pliku `App.jsx`).

---

## Zadanie 2 – Komponent z wieloma props

Utwórz komponent `Car`, który przyjmuje następujące props:
- `brand` – nazwa marki,
- `model` – nazwa modelu,
- `color` – kolor samochodu.

1. Zaimplementuj komponent:

   ```jsx
   function Car(props) {
     return (
       <h2>
         I am a {props.color} {props.brand} {props.model}!
       </h2>
     );
   }
   ```

2. W komponencie `App` wyrenderuj trzy różne samochody:

   ```jsx
   function App() {
     return (
       <div>
         <Car brand="Ford" model="Mustang" color="red" />
         <Car brand="Tesla" model="Model 3" color="white" />
         <Car brand="Toyota" model="Corolla" color="blue" />
       </div>
     );
   }
   ```

3. Uruchom aplikację i zweryfikuj, czy wyświetlane teksty są zgodne z przekazanymi props.

---

## Zadanie 3 – Różne typy danych w props

Rozszerz istniejący projekt o obsługę różnych typów danych w props.

1. Utwórz komponent `CarDetails`, który przyjmuje props:
   - `brand` (string),
   - `year` (number),
   - `features` (tablica stringów),
   - `spec` (obiekt z polami `engine` i `doors`).

2. Zaimplementuj komponent:

   ```jsx
   function CarDetails(props) {
     return (
       <div>
         <h2>{props.brand}</h2>
         <p>Year: {props.year}</p>
         <p>Engine: {props.spec.engine}</p>
         <p>Doors: {props.spec.doors}</p>
         <p>Features:</p>
         <ul>
           <li>{props.features[0]}</li>
           <li>{props.features[1]}</li>
           <li>{props.features[2]}</li>
         </ul>
       </div>
     );
   }
   ```

3. W komponencie `App` przekaż odpowiednie wartości:

   ```jsx
   const features = ["Air Conditioning", "ABS", "Navigation"];
   const spec = { engine: "2.0 TDI", doors: 5 };

   function App() {
     return (
       <CarDetails
         brand="Volkswagen Golf"
         year={2018}
         features={features}
         spec={spec}
       />
     );
   }
   ```

4. Sprawdź, czy wszystkie wartości są poprawnie wyświetlane.

---

## Zadanie 4 – Lista obiektów i mapowanie na komponenty

1. Utwórz tablicę obiektów `cars`:

   ```jsx
   const cars = [
     { id: 1, brand: "Ford", model: "Mustang", color: "red" },
     { id: 2, brand: "Tesla", model: "Model S", color: "black" },
     { id: 3, brand: "BMW", model: "M3", color: "blue" }
   ];
   ```

2. Utwórz komponent `CarItem`, który przyjmuje props:
   - `brand`,
   - `model`,
   - `color`.

   Przykładowa implementacja:

   ```jsx
   function CarItem(props) {
     return (
       <li>
         {props.color} {props.brand} {props.model}
       </li>
     );
   }
   ```

3. W komponencie `App` wyrenderuj listę samochodów na podstawie tablicy `cars`:

   ```jsx
   function App() {
     return (
       <ul>
         {cars.map((car) => (
           <CarItem
             key={car.id}
             brand={car.brand}
             model={car.model}
             color={car.color}
           />
         ))}
       </ul>
     );
   }
   ```

4. Wyjaśnij (w komentarzu lub krótkim opisie), do czego służy prop `key`.

---

## Zadanie 5 – Read-only props (błędny przykład i poprawa)

1. Przeanalizuj poniższy kod:

   ```jsx
   function Car(props) {
     props.brand = "Changed"; // próba zmiany props
     return <h2>I am a {props.brand}!</h2>;
   }

   function App() {
     return <Car brand="Ford" />;
   }
   ```

2. Odpowiedz pisemnie:
   - Dlaczego modyfikowanie `props.brand` jest nieprawidłowe?
   - Jakie mogą być skutki takich zmian (błąd, ostrzeżenia, nieprzewidywalne działanie)?

3. Popraw implementację tak, aby:
   - nie modyfikować props,
   - jeżeli konieczna jest zmiana danych, użyć stanu komponentu (w tym zadaniu wystarczy usunąć linię z przypisaniem i pozostawić odczyt z `props.brand`).

---

## Zadanie 6 – Destrukturyzacja props

1. Przepisz komponent `Car` wykorzystując destrukturyzację props:

   Wersja wejściowa:

   ```jsx
   function Car(props) {
     return <h2>I am a {props.color} {props.brand} {props.model}!</h2>;
   }
   ```

   Wersja docelowa:

   ```jsx
   function Car({ brand, model, color }) {
     return <h2>I am a {color} {brand} {model}!</h2>;
   }
   ```

2. Upewnij się, że użycie komponentu w `App` nie wymaga żadnych zmian:

   ```jsx
   function App() {
     return (
       <Car brand="Ford" model="Focus" color="silver" />
     );
   }
   ```

---

## Zadanie 7 – Praca z dokumentacją

1. Otwórz w przeglądarce:
   - W3Schools – React Props:  
     https://www.w3schools.com/react/react_props.asp
   - React Official Docs – Passing Props:  
     https://react.dev/learn/passing-props

2. Na podstawie dokumentacji odpowiedz krótko na pytania (w pliku tekstowym lub jako komentarze):

   - Jak dokumentacja React opisuje przepływ danych z komponentu nadrzędnego do podrzędnego?
   - Jakie przykłady props znajdują się w dokumentacji (tekst, liczba, komponent)?
   - Co oznacza sformułowanie „props are read-only” w oficjalnej dokumentacji?

3. Dołącz na końcu pliku notatki z linkami, z których korzystałeś.

---

