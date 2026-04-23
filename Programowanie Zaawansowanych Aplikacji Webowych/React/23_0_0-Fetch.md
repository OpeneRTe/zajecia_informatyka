# `fetch` to nowoczesny, wbudowany w przeglądarkę sposób na komunikację z serwerem. Pozwala on stronie internetowej "rozmawiać" z API (pobierać lub wysyłać dane) bez konieczności odświeżania całej strony.

---

## Czym jest `fetch`?

W dużym skrócie: **`fetch` to kurier**. 
* Kiedy chcesz coś z serwera (np. listę postów), wysyłasz go z prośbą o dane (**GET**).
* Kiedy chcesz coś serwerowi przekazać (np. dane z formularza rejestracji), dajesz mu paczkę i wysyłasz go z instrukcją dostarczenia (**POST**).

Działa on asynchronicznie, co oznacza, że reszta kodu na Twojej stronie może działać dalej, podczas gdy `fetch` czeka na odpowiedź od serwera.

```js
 fetch("/api/rejestracja", {
            method: "POST",
            headers: {  "Content-Type": "application/json" },
            body: JSON.stringify(inputs)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Odpowiedź z serwera:", data);
            resetForm();
        })
        .catch(err => {
            console.error("Błąd podczas wysyłania danych:", err);
        });
```
---

## Szczegółowa analiza powyższego kodu

Twój kod to klasyczny przykład wysyłania danych (np. z formularza rejestracji) na serwer. Rozbijmy go na czynniki pierwsze:

### 1. Konfiguracja "Paczki"
```javascript
fetch("/api/rejestracja", {
    method: "POST", // 1. Określasz typ operacji. POST służy do wysyłania/tworzenia danych.
    headers: {  
        "Content-Type": "application/json" // 2. Informujesz serwer, że dane w środku są w formacie JSON.
    },
    body: JSON.stringify(inputs) // 3. To jest właściwa zawartość. Zamieniasz obiekt JS (inputs) na tekst JSON.
})
```

### 2. Obsługa Odpowiedzi (Sukces)
Ponieważ `fetch` zwraca tzw. **Promise** (obietnicę), używamy `.then()`, aby powiedzieć: "Kiedy kurier wróci, zrób to:".

```javascript
.then(res => res.json()) // Przekształcasz surową odpowiedź od serwera na czytelny obiekt JS.
.then(data => {
    console.log("Odpowiedź z serwera:", data); // Wyświetlasz co serwer "odpowiedział" (np. "Konto utworzone").
    resetForm(); // Czyścisz formularz po udanej akcji.
})
```

### 3. Obsługa Błędów
Nigdy nie mamy 100% pewności, że internet nie zniknie lub serwer nie padnie, dlatego używamy `.catch()`.

```javascript
.catch(err => {
    // Jeśli po drodze coś pójdzie nie tak (np. brak sieci), tutaj obsłużysz błąd.
    console.error("Błąd podczas wysyłania danych:", err);
});
```

-----------------------
```js
  // Pobieranie danych przy użyciu funkcji strzałkowych
  const pobierzDane = () => {
    setCzyLaduje(true);
    
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json()) // Krótka forma: brak {} i return (niejawny zwrot)
      .then(dane => {
        setUzytkownicy(dane);
        setCzyLaduje(false);
      })
      .catch(err => {
        console.error("Błąd pobierania:", err);
        setCzyLaduje(false);
      });
  };
```
## Podsumowanie parametrów
* **URL (`/api/rejestracja`)**: Adres "mieszkania" na serwerze, pod który wysyłasz dane.
* **Method**: Rodzaj akcji. Najpopularniejsze to:
    * `GET`: "Daj mi dane" (domyślne).
    * `POST`: "Zapisz te dane".
    * `PUT/PATCH`: "Zaktualizuj to, co już masz".
    * `DELETE`: "Usuń to".
* **Body**: To, co faktycznie chcesz wysłać. Uwaga: W metodzie `GET` zazwyczaj nie wysyłamy `body`.

Pamiętaj, że `fetch` domyślnie **nie rzuca błędu** przy błędach serwera takich jak 404 (nie znaleziono) czy 500 (błąd serwera). Wchodzi do `.catch()` tylko wtedy, gdy w ogóle nie udało się nawiązać połączenia. Warto więc w pierwszym `.then()` sprawdzać, czy `res.ok` jest prawdziwe!


Analiza kodu funkcji `pobierzDane`, która odpowiada za pobieranie danych z zewnętrznego API.

Oto co dzieje się krok po kroku w tej funkcji:

1.  **Zarządzanie stanem ładowania (`setCzyLaduje(true)`):**
    Na samym początku funkcja informuje aplikację, że proces pobierania właśnie się rozpoczął. Dzięki temu użytkownik widzi w interfejsie np kręcący się spinner (wskaźnik ładowania).

2.  **Inicjowanie żądania (`fetch`):**
    Używamy wbudowanej w przeglądarkę funkcji `fetch`, aby wysłać zapytanie pod adres `jsonplaceholder.typicode.com/users`. Jest to operacja asynchroniczna, co oznacza, że reszta kodu może działać dalej, podczas gdy przeglądarka czeka na odpowiedź z internetu.

3.  **Pierwszy etap (`.then(res => res.json())`):**
    Kiedy serwer odpowie, otrzymujemy obiekt `res` (Response). W tej linii używamy skróconej funkcji strzałkowej, aby "rozpakować" treść odpowiedzi i spróbować zamienić ją na format JSON. Ponieważ nie ma klamerek `{ }`, następuje tutaj automatyczny zwrot (return) obietnicy do następnego kroku.

4.  **Drugi etap (`.then(dane => { ... })`):**
    Gdy rozpakowywanie danych się zakończy, otrzymujemy gotową tablicę obiektów (`dane`). 
    - `setUzytkownicy(dane)` aktualizuje stan aplikacji, co wyzwala ponowne wyrenderowanie listy na ekranie.
    - `setCzyLaduje(false)` wyłącza kręcący się spinner.

5.  **Obsługa błędów (`.catch(err => { ... })`):**
    Jeśli wystąpi problem (np. brak internetu), blok `catch` przechwyci błąd, wypisze go w konsoli i upewni się, że spinner zniknie z ekranu, aby aplikacja nie pozostała w stanie zawieszenia.


-----------------------------
```js
  const dodajUzytkownika = (formData) => {
    const nowyUser = {
      name: formData.get("imie"),
      email: formData.get("email")
    };

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(nowyUser),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(res => res.json())
      .then(dane => {
        alert(`Sukces! Dodano użytkownika: ${dane.name}`);
        setUzytkownicy(staraLista => [dane, ...staraLista]);
      })
      .catch(err => console.error("Błąd POST:", err));
  };

  ```

Analiza krok po kroku:

### 1. Pobieranie danych z `formData`
```javascript
const nowyUser = {
  name: formData.get("imie"),
  email: formData.get("email")
};
```
* Dzięki temu, że funkcja jest podpięta pod `action` w formularzu, otrzymuje ona obiekt `formData`.
* Metoda `.get("nazwa")` wyciąga wartość z pola `<input>`, który posiada atrybut `name="imie"`.
* Tworzymy prosty obiekt JavaScript, który przygotowujemy do wysyłki.

### 2. Konfiguracja `fetch` dla metody POST
```javascript
fetch("...", {
  method: "POST",
  body: JSON.stringify(nowyUser),
  headers: { "Content-type": "application/json; charset=UTF-8" },
})
```
* **`method: "POST"`**: Informujemy serwer, że nie chcemy tylko pobrać danych (GET), ale chcemy coś stworzyć/dodać.
* **`body: JSON.stringify(nowyUser)`**: Serwer nie rozumie obiektów JavaScript. Musimy zamienić nasz obiekt na tekst (string) w formacie JSON.
* **`headers`**: To "etykieta" na paczce. Mówimy serwerowi: "Hej, to co przesyłam w środku, to dane w formacie JSON, potraktuj je odpowiednio".

### 3. Przetwarzanie odpowiedzi
```javascript
.then(res => res.json())
.then(dane => {
  alert(`Sukces! Dodano użytkownika: ${dane.name}`);
  setUzytkownicy(staraLista => [dane, ...staraLista]);
})
```
* **`res.json()`**: Czekamy, aż serwer potwierdzi odebranie danych i odeśle nam kopię nowo stworzonego obiektu (często z nadanym nowym ID).
* **`setUzytkownicy(...)`**: Zamiast odświeżać całą stronę, używamy funkcji aktualizującej stan. 
    * Bierzemy "starą listę" (`staraLista`).
    * Tworzymy nową tablicę, gdzie na samym początku wrzucamy nowego użytkownika (`dane`), a po przecinku rozpakowujemy resztę starej listy (`...staraLista`).
    

### 4. Bezpieczeństwo (`.catch`)
* Jeśli serwer leży lub nie ma internetu, funkcja nie "wywali" całej aplikacji, tylko grzecznie wypisze błąd w konsoli programisty.
