# Tutorial — React + Node.js + API użytkowników

## Etap 1: Odczyt użytkowników z Node.js w React

---

## Cel

Tworzymy prostą aplikację, która: w backendzie Node.js przechowuje dane użytkowników i udostępnia je przez API, a frontend React pobiera te dane i wyświetla je w formie kart.

w Backend Node.js

- uruchamia serwer,
- przechowuje użytkowników w tablicy JSON,
- udostępnia endpoint API:

```txt
GET http://localhost:3000/users
```

a w Frontend React

- pobiera dane z API za pomocą `fetch()`,
- zapisuje dane w `useState`,
- wyświetla użytkowników w kartach Bootstrap.

---

# Struktura projektu

```txt
projekt-crud/
│
├── backend/
│   ├── server.js
│   └── package.json
│
└── frontend/
    └── aplikacja React
```

---

# Backend — Node.js

## Instalacja

W folderze `backend``

```bash
npm init -y
npm install express cors
```

---

## Plik `server.js`

Utwórz plik:

```txt
server.js
```

Wklej kod:

```js
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    name: "Jan Kowalski",
    email: "jan.kowalski@example.com",
    city: "Tarnów",
    role: "Uczeń"
  },
  {
    id: 2,
    name: "Anna Nowak",
    email: "anna.nowak@example.com",
    city: "Kraków",
    role: "Uczeń"
  },
  {
    id: 3,
    name: "Piotr Zieliński",
    email: "piotr.zielinski@example.com",
    city: "Rzeszów",
    role: "Administrator"
  }
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
```

---

## Uruchomienie backendu

W terminalu wpisz:

```bash
node server.js
```

---

## Test API

Otwórz przeglądarkę:

```txt
http://localhost:3000/users
```

Jeśli wszystko działa poprawnie, pojawią się dane JSON użytkowników.

---

# Frontend — React

## Utworzenie projektu React

Przejdź do folderu głównego projektu:

```bash
cd ..
```

Utwórz projekt React:

```bash
npx create-vite@latest frontend --template react
```

---

## Instalacja zależności

Przejdź do folderu React:

```bash
cd frontend
```

Zainstaluj pakiety:

```bash
npm install
```

---

## Uruchomienie React

```bash
npm run dev
```

---

# Komponent `Users.jsx`

W folderze `src` utwórz plik:

```txt
Users.jsx
```

---

## Kod komponentu

```jsx
import React, { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      ...
      .then(data => {
        setUsers(d...);
      })
      .cat....
        console.error("Błąd pobierania danych:", error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Lista użytkowników</h2>

      <div className="row">
        {users.map(user => (
          ...tutaj karty kóre wyświetlają userów
        ))}
      </div>
    </div>
  );
}
```

---

# Plik `App.jsx`

Wklej kod:

```jsx
import Users from "./Users";

export default function App() {
  return (
    <Users />
  );
}
```

---

# Omów

## useState

```jsx
const [users, setUsers] = useState([]);
```

Przechowuje ......?

---

## useEffect

```jsx
useEffect(() => {

}, []);
```

Kod wykonuje się ......

---

## fetch

```jsx
fetch("http://localhost:3000/users")
```

Pobiera ............

---

## response.json()

```jsx
response.json()
```

Konwertuje odpowiedź do formatu .........

---

## setUsers(data)

```jsx
setUsers(data);
```

Zapisuje dane do ........

---

## map()

```jsx
users.map(user => (
```

???????.

---

# Efekt końcowy

Aplikacja:

- uruchamia backend Node.js,
- wystawia API użytkowników,
- React pobiera dane przez `fetch()`,
- użytkownicy wyświetlają się w kartach Bootstrap.

---

