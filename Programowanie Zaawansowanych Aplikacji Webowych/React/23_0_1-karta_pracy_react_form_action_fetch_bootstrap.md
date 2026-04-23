# Karta pracy – React: `form`, `action`, `FormData`, `fetch GET`, `fetch POST`, Bootstrap

## Temat
Formularz i komunikacja z API w React z użyciem `action`, `FormData`, `fetch()` oraz stylowania Bootstrap.

## Cele lekcji
Uczeń:
- rozpoznaje elementy formularza w React,
- rozumie rolę `action` w formularzu,
- odczytuje dane formularza przez `FormData`,
- wykonuje zapytanie `GET` i `POST` przez `fetch()`,
- rozpoznaje zastosowanie `useState` i `useEffect`,
- korzysta z podstawowych klas Bootstrap,
- analizuje i uzupełnia kod aplikacji.

---

## 1. Analiza fragmentu aplikacji

Na podstawie przykładowego komponentu odpowiedz własnymi słowami.

### Zadanie 3
Wyjaśnij, po co zastosowano `useEffect()` w tym fragmencie:

```jsx
useEffect(() => {
  pobierzDane();
}, []);
```

Odpowiedź:

................................................................................

................................................................................

---

## 2. Formularz w React

### Zadanie 4
Wskaż elementy formularza w poniższym kodzie.

```jsx
<form action={dodajUzytkownika}>
  <div className="mb-3">
    <label className="form-label">Imię i nazwisko</label>
    <input name="imie" className="form-control" required />
  </div>

  <div className="mb-3">
    <label className="form-label">Email</label>
    <input name="email" type="email" className="form-control" required />
  </div>

  <button type="submit" className="btn btn-primary w-100">
    Wyślij
  </button>
</form>
```

### Zadanie 5
Wyjaśnij, co oznacza zapis:

```jsx
<form action={dodajUzytkownika}>
```

Odpowiedź:

................................................................................

................................................................................

### Zadanie 6
Dlaczego pola formularza mają atrybut `name`?

```jsx
<input name="imie" />
<input name="email" />
```

Odpowiedź:

................................................................................

................................................................................

---

## 3. `FormData`

### Zadanie 7
Przeanalizuj kod:

```jsx
const dodajUzytkownika = (formData) => {
  const nowyUser = {
    name: formData.get("imie"),
    email: formData.get("email")
  };
};
```

Uzupełnij zdania:
- parametr `formData` zawiera: ..................................................
- `formData.get("imie")` odczytuje: ............................................
- `formData.get("email")` odczytuje: ...........................................
- obiekt `nowyUser` zawiera pola: ...............................................

### Zadanie 8
Dokończ funkcję tworzącą obiekt z danych formularza.

```jsx
const dodajUzytkownika = (formData) => {
  const nowyUser = {
    name: ______________________________,
    email: ______________________________
  };
};
```

---

## 4. `fetch()` – metoda GET

### Zadanie 9
Przeanalizuj kod pobierania danych:

```jsx
fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(dane => {
    setUzytkownicy(dane);
    setCzyLaduje(false);
  })
  .catch(err => {
    console.error(err);
    setCzyLaduje(false);
  });
```

Uzupełnij:
- metoda HTTP użyta tutaj to: ...................................................
- `res.json()` zamienia odpowiedź na: ...........................................
- `setUzytkownicy(dane)` zapisuje do stanu: .....................................
- `catch()` służy do: ...........................................................

### Zadanie 10
Dopisz brakujące fragmenty funkcji `pobierzDane()`.

```jsx
const pobierzDane = () => {
  setCzyLaduje(true);

  fetch("____________________________________________")
    .then(res => _________________________________)
    .then(dane => {
      _________________________________;
      _________________________________;
    })
    .catch(err => {
      console.error(err);
      _________________________________;
    });
};
```


## 5. `fetch()` – metoda POST

### Zadanie 12
Przeanalizuj kod:

```jsx
fetch("https://jsonplaceholder.typicode.com/users", {
  method: "POST",
  body: JSON.stringify(nowyUser),
  headers: { "Content-type": "application/json; charset=UTF-8" },
})
```

Uzupełnij:
- metoda `POST` służy do: ........................................................
- `JSON.stringify(nowyUser)` zamienia obiekt na: ................................
- nagłówek `Content-type` informuje, że wysyłamy: ...............................

### Zadanie 13
Dokończ konfigurację zapytania `POST`.

```jsx
fetch("https://jsonplaceholder.typicode.com/users", {
  method: "__________",
  body: _________________________________,
  headers: {
    "Content-type": "________________________________________"
  },
})
```

### Zadanie 14
Po poprawnym `POST` wykonuje się fragment:

```jsx
.then(dane => {
  alert("Sukces! Dodano: " + dane.name);
  setUzytkownicy([dane, ...uzytkownicy]);
})
```

Wyjaśnij:

- co robi `setUzytkownicy([dane, ...uzytkownicy])`: ..............................

---

## 6. Renderowanie listy użytkowników

### Zadanie 15
Przeanalizuj fragment:

```jsx
uzytkownicy.map((user, index) => (
  <div key={user.id || index} className="list-group-item p-3">
    <div className="d-flex w-100 justify-content-between">
      <h6 className="mb-1 fw-bold">{user.name}</h6>
      <small className="text-primary">#{user.id || 'nowy'}</small>
    </div>
    <p className="mb-1 text-muted small">{user.email}</p>
  </div>
))
```

Uzupełnij:
- `map()` służy do: .............................................................
- `{user.name}` wyświetla: ......................................................
- `{user.email}` wyświetla: .....................................................
- `key` w React jest potrzebny do: ..............................................

### Zadanie 16
Napisz, co zostanie wyświetlone, gdy `czyLaduje === true`.

```jsx
{czyLaduje ? (
  <div className="p-4 text-center text-muted italic">Ładowanie danych...</div>
) : (
  ...lista...
)}
```

Odpowiedź:

................................................................................

---

## 7. Bootstrap – analiza układu

### Zadanie 17
Dopasuj klasy Bootstrap do ich roli.

- `container` → ................................................................
- `row` → ......................................................................
- `col-md-5` → .................................................................
- `card` → .....................................................................
- `btn btn-primary` → ..........................................................
- `form-control` → .............................................................
- `text-center` → ..............................................................
- `w-100` → ....................................................................

### Zadanie 18
Wypisz trzy klasy Bootstrap użyte do budowy formularza.

- ..............................................................................
- ..............................................................................
- ..............................................................................

---

## 8. Uzupełnianie kodu

### Zadanie 20
Uzupełnij komponent o brakujące fragmenty.

```jsx
import React, { useState, useEffect } from 'react';

export default function Fetch() {
  const [uzytkownicy, setUzytkownicy] = useState(__________);
  const [czyLaduje, setCzyLaduje] = useState(__________);

  const pobierzDane = () => {
    setCzyLaduje(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(dane => {
        _________________________________;
        _________________________________;
      })
      .catch(err => {
        console.error(err);
        _________________________________;
      });
  };

  useEffect(() => {
    _________________________________;
  }, []);

  const dodajUzytkownika = (formData) => {
    const nowyUser = {
      name: _________________________________,
      email: _________________________________
    };

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(nowyUser),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(res => res.json())
      .then(dane => {
        _________________________________;
      });
  };
```

---

## 9. Zadanie praktyczne

### Zadanie 21
Napisz samodzielnie komponent React, który:
- wyświetla nagłówek strony,
- po wejściu na stronę pobiera listę użytkowników z API,
- pokazuje komunikat „Ładowanie danych...”,
- posiada formularz z polami `imie` i `email`,
- po wysłaniu formularza wykonuje `POST`,
- dodaje nowego użytkownika na początek listy,
- korzysta z układu Bootstrap: `container`, `row`, `col`, `card`, `btn`, `form-control`.

Miejsce na kod:

```jsx



```

---

## 10. Zadanie dodatkowe – analiza techniczna

### Zadanie 22
Wyjaśnij różnicę między:
- pobraniem danych z serwera,
- wysłaniem danych do serwera.

Odpowiedź:

................................................................................

................................................................................

### Zadanie 23
Wyjaśnij, dlaczego w tym projekcie użyto:
- `useState`,
- `useEffect`,
- `fetch`,
- `FormData`,
- Bootstrap.

Odpowiedź:

................................................................................

................................................................................

................................................................................

................................................................................

---

## 11. Słowniczek pojęć

Uzupełnij definicje.

### Zadanie 24
`form` – .......................................................................

### Zadanie 25
`action` – .....................................................................

### Zadanie 26
`FormData` – ...................................................................

### Zadanie 27
`fetch` – ......................................................................

### Zadanie 28
`GET` – ........................................................................

### Zadanie 29
`POST` – .......................................................................

### Zadanie 30
Bootstrap – ....................................................................

---

