# Łączenie props, state i zdarzeń – interaktywny komponent React

## Punkt wyjścia i cele lekcji

Rozwijamy istniejący projekt WebTech. Po lekcji 05 mamy dziewięć kart z obrazkami, po lekcji 06 przyciski wypisujące dane w konsoli, a po lekcji 07 niezależne polubienia i status nauki w każdej karcie.

Na tej lekcji uczeń:

- łączy props, lokalny stan i obsługę zdarzeń,
- warunkowo wyświetla fragment JSX,
- zmienia etykietę przycisku zależnie od stanu,
- rozróżnia dane technologii i stan jej interfejsu,
- zachowuje wcześniejsze funkcje podczas rozbudowy komponentu.

Najpierw poznaj mechanizm i wykonaj ćwiczenia ogólne w części A. Następnie zastosuj go w WebTech w części B.

---

# 1. Co już potrafimy?

`App` przechowuje tablicę `technologies`. Metoda `map()` zwraca komponenty `Technology` z kluczem `technology.id` i props: `name`, `category`, `hours`, `image`.

Każdy komponent `Technology` ma własny stan `likes` i `isLearning`. Teraz dodamy trzeci stan: `visible`, określający widoczność szczegółów.

| Rodzaj danych | Przykłady | Rola |
|---|---|---|
| Props | `name`, `category`, `hours`, `image` | Dane przekazane przez rodzica |
| State | `likes`, `isLearning`, `visible` | Dane zmieniane podczas obsługi karty |

Komponent nie modyfikuje props. Stan aktualizuje przez funkcje ustawiające.

---

# 2. Stan widoczności i obsługa kliknięcia

W funkcji komponentu, przed `return`:

```jsx
const [visible, setVisible] = useState(false);

function toggleDetails() {
  setVisible(!visible);
}
```

`false` oznacza początkowo ukryte szczegóły. Operator `!` zmienia `false` na `true` i odwrotnie.

Przekazujemy funkcję do zdarzenia:

```jsx
<button onClick={toggleDetails}>Zmień widoczność</button>
```

Nie zapisujemy `onClick={toggleDetails()}`, ponieważ wywołałoby to funkcję podczas renderowania.

---

# 3. Renderowanie warunkowe z `&&`

```jsx
{visible && <p>Dodatkowe informacje</p>}
```

Gdy `visible` ma wartość `true`, React renderuje akapit. Gdy ma wartość `false`, pomija go. Warunek w tym przykładzie jest wartością logiczną.

Kilka elementów grupujemy np. w `div`:

```jsx
{visible && (
  <div className="technology-details">
    <span className="technology-badge">{category}</span>
    <p>Czas nauki: {hours} godz.</p>
  </div>
)}
```

Ukrywamy tylko wskazany fragment. Przyciski sterujące i pozostałe elementy karty umieszczamy poza nim, aby pozostały dostępne.

---

# 4. Dynamiczna etykieta przycisku

Operator warunkowy wybiera jedną z dwóch wartości:

```jsx
{visible ? "Ukryj szczegóły" : "Pokaż szczegóły"}
```

Połączenie obsługi zdarzenia i tekstu:

```jsx
<button onClick={toggleDetails} aria-expanded={visible}>
  {visible ? "Ukryj szczegóły" : "Pokaż szczegóły"}
</button>
```

`aria-expanded` informuje technologie asystujące, czy szczegóły są rozwinięte.

---

# 5. Przykład mechanizmu – `InfoPanel`

To mały przykład do analizy przed ćwiczeniami; nie zastępuje komponentu WebTech.

```jsx
import { useState } from "react";

function InfoPanel({ title, description }) {
  const [visible, setVisible] = useState(false);

  function toggleDetails() {
    setVisible(!visible);
  }

  return (
    <article>
      <h3>{title}</h3>
      <button onClick={toggleDetails} aria-expanded={visible}>
        {visible ? "Ukryj szczegóły" : "Pokaż szczegóły"}
      </button>
      {visible && <p>{description}</p>}
    </article>
  );
}

export default InfoPanel;
```

Przepływ po kliknięciu:

```text
onClick → toggleDetails → setVisible → kolejny render → nowy tekst i widoczność
```

Props dostarczają treść, stan określa jej widoczność, a zdarzenie uruchamia zmianę stanu.

---

# 6. Część A. Ćwiczenia utrwalające

Ćwiczenia wykonaj w osobnym komponencie ćwiczeniowym.

## Zadanie 1. Karty produktów

Wykorzystaj dane:

```javascript
const products = [
  { id: 1, name: "Laptop", category: "Komputery", price: 3500 },
  { id: 2, name: "Monitor", category: "Monitory", price: 1200 },
  { id: 3, name: "Klawiatura", category: "Akcesoria", price: 300 }
];
```

Utwórz `ProductCard`, przyjmujący `name`, `category` i `price`. Wygeneruj trzy karty przez `map()`, ustawiając `key={product.id}` na zwracanym komponencie.

Początkowo karta pokazuje nazwę i przycisk „Pokaż szczegóły”. Po kliknięciu pojawiają się kategoria i cena, a napis zmienia się na „Ukryj szczegóły”. Każda karta ma niezależny stan.

## Zadanie 2. Informacja zależna od props

Dodaj do obiektów pole `available`: dla części produktów `true`, dla pozostałych `false`. Przekaż je przez props i w rozwiniętych szczegółach wyświetl „Dostępny” lub „Niedostępny” za pomocą `? :`.

Odpowiedz: dlaczego `available` jest tutaj props, a `visible` stanem?

## Zadanie 3. Dwa niezależne stany

Dodaj licznik polubień, przycisk „Lubię” i „Resetuj polubienia”. Umieść je poza warunkowo wyświetlanymi szczegółami.

Sprawdź: po zwiększeniu licznika do 2, ukryciu i ponownym pokazaniu szczegółów licznik nadal wynosi 2. Reset polubień nie zmienia widoczności.

---

# 7. Część B. Projekt WebTech – etap 7: rozwijane szczegóły

## Zadanie 1. Rozbuduj istniejącą kartę

Pracuj na dziewięciu technologiach z lekcji 05. Nie wprowadzaj ponownie tablicy ani nie zastępuj jej krótszą wersją. Zachowaj przekazywanie wszystkich czterech props, w tym `image`, oraz `key={technology.id}`.

W istniejącym `Technology` dodaj stan `visible` z wartością początkową `false` i funkcję `toggleDetails`.

## Zadanie 2. Ustal zawartość szczegółów

Na lekcji 05 wszystkie dane były widoczne. Teraz świadomie zmieniamy sposób ich prezentowania:

- obrazek i nazwa pozostają zawsze widoczne,
- badge kategorii i czas nauki trafiają do warunkowo renderowanego `div`,
- polubienia, status nauki i wszystkie przyciski pozostają zawsze widoczne.

Dodaj przycisk „Pokaż szczegóły” / „Ukryj szczegóły”. Zachowaj strukturę bez `ul`, `ol` i `li`.

## Zadanie 3. Zachowaj wcześniejsze funkcje

Polubienia, reset, status nauki oraz przyciski konsoli z lekcji 06 muszą działać po rozbudowie. Ukrycie szczegółów nie resetuje żadnego stanu.

Poniższy kod stanowi punkt odniesienia do sprawdzenia integracji po samodzielnym wykonaniu zadań. Zachowaj również własne style i pozostałe elementy swojej karty.

### `Technology.jsx` — po połączeniu etapów

```jsx
import { useState } from "react";

function Technology({ name, category, hours, image }) {
  const [likes, setLikes] = useState(0);
  const [isLearning, setIsLearning] = useState(false);
  const [visible, setVisible] = useState(false);

  function toggleDetails() {
    setVisible(!visible);
  }

  function showTechnology() {
    console.log("Technologia: " + name);
    console.log("Kategoria: " + category);
    console.log("Czas nauki: " + hours + " godz.");
  }

  function showName(technologyName) {
    console.log(technologyName);
  }

  return (
    <article className="technology-card">
      <img
        src={`${import.meta.env.BASE_URL}images/${image}`}
        alt={`Logo technologii ${name}`}
      />
      <h3>{name}</h3>

      <button onClick={toggleDetails} aria-expanded={visible}>
        {visible ? "Ukryj szczegóły" : "Pokaż szczegóły"}
      </button>

      {visible && (
        <div className="technology-details">
          <span className="technology-badge">{category}</span>
          <p>Czas nauki: {hours} godz.</p>
        </div>
      )}

      <p>Polubienia: {likes}</p>
      <button onClick={() => setLikes(likes + 1)}>
        Lubię
      </button>
      <button onClick={() => setLikes(0)}>Resetuj polubienia</button>

      <p>{isLearning ? "Uczę się" : "Jeszcze nie uczę się"}</p>
      <button onClick={() => setIsLearning(!isLearning)}>
        Zmień status nauki
      </button>

      <button onClick={showTechnology}>Pokaż informacje w konsoli</button>
      <button onClick={() => showName(name)}>Wypisz nazwę</button>
    </article>
  );
}

export default Technology;
```

### Kontrola połączenia w `App.jsx`

W istniejącym `main`, pod nagłówkiem sekcji, nadal działa:

```jsx
<div className="technology-grid">
  {technologies.map((technology) => (
    <Technology
      key={technology.id}
      name={technology.name}
      category={technology.category}
      hours={technology.hours}
      image={technology.image}
    />
  ))}
</div>
```

Pozostaw import `Technology`, tablicę dziewięciu obiektów, `Header`, `Footer` i import stylów. Obrazy nadal znajdują się w `public/images`.

## Zadanie 4. Sprawdź scenariusz użytkownika

1. Otwórz aplikację: widzisz dziewięć nazw i obrazków; szczegóły są ukryte.
2. Rozwiń React: pojawiają się badge „Frontend” i „Czas nauki: 30 godz.”. Inne karty pozostają zwinięte.
3. Polub React dwa razy i zmień jego status na „Uczę się”.
4. Ukryj i ponownie pokaż szczegóły React: polubienia nadal wynoszą 2, a status się nie zmienia.
5. Rozwiń Node.js: ma własny licznik 0 i własny status początkowy.
6. Zresetuj polubienia React: licznik wraca do 0; jego szczegóły i status pozostają bez zmian.
7. Sprawdź przyciski konsoli oraz brak ostrzeżeń o `key` i błędów pobierania obrazków.
8. Odśwież stronę: lokalny stan wraca do wartości początkowych.

Stan pozostaje zachowany podczas ukrywania szczegółów, ponieważ komponent `Technology` nadal jest zamontowany. Warunek usuwa tylko wewnętrzny fragment z kategorią i godzinami. Usunięcie całej karty i jej ponowne zamontowanie zainicjalizowałoby stan od nowa.

---

# 8. Pytania kontrolne

1. Skąd pochodzą `name`, `category`, `hours` i `image`?
2. Dlaczego `likes`, `isLearning` i `visible` są stanem?
3. Na którym elemencie ustawiamy `key` w `map()`?
4. Co oznacza `useState(false)`?
5. Dlaczego do `onClick` przekazujemy funkcję?
6. Co oznacza zapis `{visible && (...)}`?
7. Czym różni się zastosowanie `&&` od `? :` w tej karcie?
8. Dlaczego przycisk rozwijania musi pozostać poza ukrywanym fragmentem?
9. Czy otwarcie szczegółów React zmienia stan Node.js?
10. Dlaczego zwinięcie szczegółów nie resetuje polubień?
11. Dlaczego nie umieszczamy `useState` w funkcji przekazanej do `map()`?
12. Jak z nazwy `react.webp` powstaje adres obrazka?

---

# 9. Kolejność rozwoju WebTech i następne lekcje

| Lekcja | Nowy element projektu | Co zachowujemy |
|---|---|---|
| 05 — `map()` i `key` | Dziewięć kart, obrazki, badge i godziny | Komponenty i props |
| 06 — zdarzenia | Przyciski wypisujące informacje w konsoli | Karty z obrazkami |
| 07 — `useState` | Polubienia, reset i status nauki | Kolekcję, dane i obsługę kliknięć |
| 08 — integracja | Rozwijane szczegóły i dynamiczny napis przycisku | Obrazy i wszystkie wcześniejsze funkcje |
