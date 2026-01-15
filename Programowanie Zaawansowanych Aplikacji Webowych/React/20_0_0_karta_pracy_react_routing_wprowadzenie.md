# KARTA PRACY – React (teoria)

**Temat:** Wprowadzenie do routingu w aplikacji React (SPA)

**Instrukcja dla ucznia:**  
Korzystając z dokumentacji React Router na stronie **W3Schools**, przeczytaj opis routingu w React i odpowiedz pisemnie na pytania. Odpowiedzi powinny być krótkie, rzeczowe i techniczne. Dopuszczalne jest przepisywanie fragmentów kodu oraz ich opis słowny.

---

## 1. Krótka teoria – routing w React

Routing w React to mechanizm umożliwiający wyświetlanie różnych widoków aplikacji w zależności od adresu URL **bez przeładowywania strony**.  
Aplikacje React działają jako **SPA (Single Page Application)** – jedna strona HTML, wiele widoków.

Do obsługi routingu stosuje się bibliotekę **react-router-dom**.

Najczęściej używane elementy:
- `BrowserRouter` – obejmuje całą aplikację i obsługuje historię przeglądarki,
- `Routes` – kontener na definicje tras,
- `Route` – pojedyncza trasa (adres URL + komponent),
- `Link` – nawigacja między widokami bez przeładowania strony.

---

## 2. Przykład kodu (do analizy)

```jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## 3. Zadanie 1 – analiza kodu

Odpowiedz pełnym zdaniem:

1. Do czego służy komponent `BrowserRouter`?
2. Jaką funkcję pełni komponent `Routes`?
3. Co oznacza zapis `path="/"`?
4. Co zostanie wyświetlone po wejściu na adres `/about`?
5. Dlaczego do nawigacji użyto komponentu `Link`, a nie znacznika HTML `<a>`?

---

## 4. Zadanie 2 – routing i SPA

1. Wyjaśnij, co oznacza skrót **SPA**.
2. Dlaczego zmiana trasy w aplikacji React nie powoduje przeładowania strony?
3. Podaj jedną zaletę stosowania routingu w aplikacjach SPA.

---

## 5. Zadanie 3 – zadanie opisowe

Opisz (bez kodu), jak mógłby wyglądać routing w aplikacji galerii zdjęć zawierającej:
- galerię zdjęć,
- stronę statystyk pobrań,
- stronę „O aplikacji”.

Podaj przykładowe adresy URL dla każdej podstrony.

---


