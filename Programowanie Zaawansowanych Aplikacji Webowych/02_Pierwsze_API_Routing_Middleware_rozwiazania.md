# 02. Rozwiązania do ćwiczeń – Routing i Middleware w Express

## 🔹 Lekcja 1 – Pierwsze API
```js
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Pierwsze API działa');
});

app.listen(PORT, () => console.log(`Serwer działa na http://localhost:${PORT}`));
```

---

## 🔹 Lekcja 2 – API zwracające JSON
```js
app.get('/api/user', (req, res) => {
  res.json({
    imie: "Jan",
    wiek: 18,
    miasto: "Tarnów"
  });
});

app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, nazwa: "Laptop", cena: 3000 },
    { id: 2, nazwa: "Telefon", cena: 2000 }
  ]);
});
```

---

## 🔹 Lekcja 3 – Middleware i POST
```js
// Middleware logujący
app.use((req, res, next) => {
  console.log(`[LOG] ${req.method} -> ${req.url}`);
  next();
});

// Middleware JSON
app.use(express.json());

// Trasa POST
app.post('/api/data', (req, res) => {
  res.json({
    status: "Otrzymano dane",
    dane: req.body
  });
});
```

---

## 🔹 Lekcja 4 – Zadanie projektowe
```js
let cars = [
  { id: 1, marka: "Toyota", model: "Corolla" },
  { id: 2, marka: "BMW", model: "X5" }
];

// Middleware pomiar czasu
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`⏱️ Czas obsługi: ${duration}ms`);
  });
  next();
});

// Middleware blokujący /admin
app.use('/admin', (req, res) => {
  res.status(403).send('Brak dostępu do panelu administracyjnego');
});

// GET – lista samochodów
app.get('/api/cars', (req, res) => {
  res.json(cars);
});

// POST – dodanie samochodu
app.post('/api/cars', (req, res) => {
  const newCar = { id: cars.length + 1, ...req.body };
  cars.push(newCar);
  res.json(newCar);
});

// PUT – edycja samochodu
app.put('/api/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const car = cars.find(c => c.id === id);
  if (!car) return res.status(404).send('Nie znaleziono samochodu');
  Object.assign(car, req.body);
  res.json(car);
});

// DELETE – usunięcie samochodu
app.delete('/api/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  cars = cars.filter(c => c.id !== id);
  res.json({ status: `Samochód o id ${id} został usunięty` });
});
```

---

## ✅ Podsumowanie
- Umiemy tworzyć routing i obsługiwać różne metody HTTP.  
- Potrafimy pisać middleware logujące, analizujące i blokujące dostęp.  
- Stworzyliśmy mini-API samochodów jako przykład REST API.  
