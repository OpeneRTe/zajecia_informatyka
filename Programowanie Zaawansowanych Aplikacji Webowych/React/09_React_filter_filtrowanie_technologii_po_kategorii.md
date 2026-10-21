# React – filter(): filtrowanie danych i technologii po kategorii

## Punkt wyjścia i cele lekcji

Kontynuujemy WebTech z lekcji 05–08. Mamy dziewięć kart generowanych przez `map()`, props, obrazki, obsługę kliknięć, polubienia, status nauki oraz rozwijane szczegóły.

Na tej lekcji uczeń:

- wybiera elementy tablicy za pomocą `filter()`,
- zapisuje warunek filtrowania liczb i obiektów,
- łączy `filter()` z `map()`,
- przechowuje wybraną kategorię w `useState`,
- zmienia wyświetlane karty po kliknięciu przycisku.

Najpierw poznaj metodę i wykonaj ćwiczenia z części A. Następnie rozbuduj istniejący WebTech w części B.

---

## 1. Do czego służy filter()?

`filter()` jest metodą tablic w JavaScript. Wybiera elementy spełniające podany warunek i zwraca je w **nowej tablicy**. Możemy jej używać zarówno w zwykłym JavaScript, jak i w komponencie React.

```javascript
const numbers = [3, 8, 12, 5, 20];
const greaterThanTen = numbers.filter((number) => number > 10);

console.log(greaterThanTen); // [12, 20]
console.log(numbers);       // [3, 8, 12, 5, 20]
```

Dla każdego elementu funkcja sprawdza `number > 10`:

| Element | Warunek | Trafia do wyniku? |
|---|---|---|
| 3 | `false` | Nie |
| 8 | `false` | Nie |
| 12 | `true` | Tak |
| 5 | `false` | Nie |
| 20 | `true` | Tak |

W tych przykładach funkcja zwraca `true` albo `false`. `true` oznacza: zachowaj element w wyniku. `false` oznacza: pomiń go. Ogólnie JavaScript ocenia prawdziwość zwróconej wartości.

Samo `filter()` nie usuwa elementów z tablicy źródłowej. Jeśli nic nie pasuje, wynikiem jest pusta tablica `[]`. Kolejność pasujących elementów pozostaje taka sama.

## 2. Jak czytać zapis?

```javascript
const result = numbers.filter((number) => number > 10);
```

- `numbers` – tablica, którą przeglądamy,
- `number` – aktualnie sprawdzany element; nazwę parametru wybieramy sami,
- `number > 10` – warunek wyboru,
- `result` – nowa tablica pasujących elementów.

Możesz również zapisać funkcję z klamrami. Wtedy potrzebujesz `return`:

```javascript
const result = numbers.filter((number) => {
  return number > 10;
});
```

Bez `return` funkcja z klamrami zwróci `undefined`, a element nie trafi do wyniku.

## 3. Filtrowanie tablicy obiektów

W tablicy obiektów sprawdzamy wybrane pole aktualnego obiektu:

```javascript
const products = [
  { id: 1, name: "Laptop", category: "Komputery", price: 3500 },
  { id: 2, name: "Mysz", category: "Akcesoria", price: 80 },
  { id: 3, name: "Klawiatura", category: "Akcesoria", price: 200 },
  { id: 4, name: "Monitor", category: "Monitory", price: 900 }
];

const accessories = products.filter(
  (product) => product.category === "Akcesoria"
);
```

Wynik zawiera dwa całe obiekty: Mysz i Klawiatura. `filter()` nie zamienia obiektów w nazwy. Nowa tablica zawiera odwołania do wybranych obiektów, dlatego nie należy modyfikować ich pól w funkcji filtrującej.

`===` porównuje wartości. Zapis `=` przypisuje wartość i nie służy tutaj do sprawdzania kategorii. Wielkość liter ma znaczenie: `"Akcesoria"` i `"akcesoria"` to różne teksty.

Inny warunek, na tej samej tablicy:

```javascript
const cheapProducts = products.filter((product) => product.price <= 200);
```

## 4. Różnica między filter() i map()

| Metoda | Do czego służy? | Przykład wyniku |
|---|---|---|
| `filter()` | Wybiera elementy spełniające warunek | Tablica produktów z kategorii „Akcesoria” |
| `map()` | Przekształca każdy element | Tablica elementów JSX prezentujących produkty |

Najpierw wybieramy dane, potem tworzymy ich widok:

```jsx
const accessories = products.filter(
  (product) => product.category === "Akcesoria"
);

// Fragment wewnątrz JSX zwracanego przez komponent:
<div>
  {accessories.map((product) => (
    <p key={product.id}>{product.name}: {product.price} zł</p>
  ))}
</div>
```

Można połączyć metody w jednym wyrażeniu, ale osobna zmienna ułatwia prześledzenie wyniku:

```jsx
{products
  .filter((product) => product.category === "Akcesoria")
  .map((product) => <p key={product.id}>{product.name}</p>)}
```

## 5. Jak kliknięcie zmienia filtr w React?

Zamiast wpisywać kategorię na stałe, przechowujemy jej nazwę w stanie. Poniższy komponent jest przykładem ćwiczeniowym. Umieść poznaną tablicę `products` przed funkcją komponentu w tym samym pliku.

```jsx
import { useState } from "react";

function ProductFilter() {
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");

  const filteredProducts = products.filter((product) => {
    return selectedCategory === "Wszystkie" ||
      product.category === selectedCategory;
  });

  return (
    <section>
      <h2>Produkty</h2>
      <button onClick={() => setSelectedCategory("Wszystkie")}>
        Wszystkie
      </button>
      <button onClick={() => setSelectedCategory("Akcesoria")}>
        Akcesoria
      </button>
      <p>Wybrana kategoria: {selectedCategory}</p>
      <p>Liczba wyników: {filteredProducts.length}</p>
      <div>
        {filteredProducts.map((product) => (
          <p key={product.id}>{product.name}: {product.price} zł</p>
        ))}
      </div>
      {filteredProducts.length === 0 && <p>Brak produktów.</p>}
    </section>
  );
}

export default ProductFilter;
```

Operator `||` oznacza „lub”. Element zostaje wybrany, gdy aktywna jest opcja „Wszystkie” **lub** jego kategoria zgadza się z wybraną kategorią. „Wszystkie” jest specjalną opcją interfejsu, a nie kategorią zapisaną w produktach.

```text
Kliknięcie „Akcesoria”
→ setSelectedCategory("Akcesoria")
→ React ponownie renderuje komponent
→ filter() wybiera pasujące produkty
→ map() tworzy ich widok
```

Stan zapisuje wybór użytkownika. `filteredProducts` obliczamy na nowo w funkcji komponentu, przed `return`. Nie potrzebujemy osobnego stanu na wyniki ani `useEffect`.

Zapis `onClick={() => setSelectedCategory("Akcesoria")}` przekazuje funkcję do wykonania po kliknięciu. Nie zapisujemy `onClick={setSelectedCategory("Akcesoria")}`, bo wykonałoby to aktualizację podczas renderowania.

---

## 6. Część A. Ćwiczenia

### Zadanie 1. Wybieranie liczb

Wykorzystaj tablicę:

```javascript
const numbers = [4, 11, 18, 7, 25, 10];
```

Za pomocą trzech osobnych wywołań `filter()` wybierz:

1. Liczby większe od 10.
2. Liczby mniejsze lub równe 10.
3. Liczby parzyste – resztę z dzielenia obliczysz operatorem `%`.

Wypisz wyniki i tablicę źródłową w konsoli. Przed uruchomieniem zapisz przewidywane wyniki.

### Zadanie 2. Produkty według ceny i kategorii

Na tablicy `products` z punktu 3 wykonaj niezależne filtrowania:

1. Wybierz produkty z kategorii „Komputery”.
2. Wybierz produkty o cenie najwyżej 200 zł.
3. Wybierz produkty z kategorii „Telefony”. Sprawdź wynik i jego `length`.

### Zadanie 3. Wyświetlanie wybranych produktów

Utwórz komponent ćwiczeniowy, który za pomocą `filter()` wybierze produkty o cenie poniżej 1000 zł, a następnie wyświetli ich nazwy i ceny przez `map()`. Użyj `key={product.id}` oraz elementów `div` i `p`.

### Zadanie 4. Przyciski kategorii

Rozbuduj `ProductFilter` z punktu 5:

1. Dodaj przyciski „Komputery”, „Monitory” i „Telefony”.
2. Każdy przycisk ma zmieniać `selectedCategory`.
3. Sprawdź licznik wyników oraz komunikat dla pustej kategorii.
4. Po kliknięciu „Wszystkie” mają wrócić wszystkie cztery produkty.

### Zadanie 5. Znajdź błąd

Wyjaśnij, dlaczego ten zapis daje pustą tablicę. Popraw go na dwa sposoby: z `return` oraz ze skróconym zapisem funkcji strzałkowej.

```javascript
const result = products.filter((product) => {
  product.price < 1000;
});
```

---

## 7. Część B. Projekt WebTech – etap 8: filtrowanie po kategorii

### Cel zadania

Po kliknięciu przycisku kategorii aplikacja ma wyświetlać tylko należące do niej technologie. Przycisk „Wszystkie” przywraca pełną kolekcję.

Pracuj na istniejącym WebTech. Zachowaj dziewięć obiektów `technologies` z lekcji 05, komponenty `Header`, `Footer`, `Technology`, style i obrazki. Nie przepisuj projektu od początku.

### Zadanie 1. Stan wybranej kategorii

W `App.jsx` dodaj import `useState`, jeśli jeszcze go nie ma. W funkcji `App`, przed `return`, utwórz stan `selectedCategory` i funkcję `setSelectedCategory`. Wartość początkowa to `"Wszystkie"`.

Stan znajduje się w `App`, ponieważ wybór dotyczy całej kolekcji kart. Nie umieszczaj tego stanu osobno w każdej karcie ani wewnątrz `map()`.

### Zadanie 2. Cztery przyciski

Nad siatką kart, wewnątrz istniejącego `main`, dodaj przyciski:

- Wszystkie,
- Frontend,
- Backend,
- Baza danych.

Każdy ma po kliknięciu ustawiać odpowiednią wartość `selectedCategory`. Użyj dokładnie takich nazw kategorii jak w danych.

Wzór dla jednego przycisku:

```jsx
<button onClick={() => setSelectedCategory("Frontend")}>
  Frontend
</button>
```

### Zadanie 3. Wybór technologii przez filter()

W funkcji `App`, pod deklaracją stanu i przed `return`, utwórz `filteredTechnologies` przez wywołanie `technologies.filter(...)`.

Warunek ma przepuszczać obiekt, gdy:

- wybrano „Wszystkie” lub
- `technology.category` jest równe `selectedCategory`.

Użyj `===` oraz `||`, tak jak w przykładzie z produktami. Zawsze filtruj pełną tablicę `technologies`. Dzięki temu przejście z „Frontend” do „Backend” wybierze dane z całej kolekcji.

### Zadanie 4. Wyświetlanie wyniku

W istniejącej siatce zmień źródło dla `map()` z `technologies` na `filteredTechnologies`. Nadal przekazuj wszystkie props:

```jsx
<div className="technology-grid">
  {filteredTechnologies.map((technology) => (
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

Zachowaj strukturę kart bez `ul`, `ol` i `li`. Nie zmieniaj klucza na indeks tablicy: po filtrowaniu pozycje elementów mogą się zmieniać.

### Zadanie 5. Informacja o wyniku

Nad siatką wyświetl:

```text
Wybrana kategoria: Frontend
Liczba technologii: 4
```

Wartości pobierz ze stanu oraz z `filteredTechnologies.length`. Dodaj komunikat „Brak technologii w wybranej kategorii”, widoczny tylko wtedy, gdy długość wyniku wynosi 0.

### Zadanie 6. Oznaczenie aktywnego przycisku

Nadaj aktywnemu przyciskowi klasę `active`, korzystając z operatora `? :`. Ustaw również `aria-pressed`, aby informacja o wyborze była dostępna dla technologii asystujących.

```jsx
<button
  className={selectedCategory === "Frontend" ? "active" : ""}
  aria-pressed={selectedCategory === "Frontend"}
  onClick={() => setSelectedCategory("Frontend")}
>
  Frontend
</button>
```

Zastosuj ten sam mechanizm do pozostałych przycisków. Jeżeli przyciski mają już własną klasę, zachowaj ją i dodawaj `active` obok niej.

Przyciski umieść w `div` z klasą `technology-filters`. Przykładowe style do dopisania w istniejącym arkuszu:

```css
.technology-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.technology-filters button.active {
  background-color: #1d4ed8;
  color: #fff;
  border-color: #1d4ed8;
  font-weight: bold;
}
```

## 8. Sprawdzenie WebTech

Dla danych z lekcji 05 sprawdź:

| Wybrany przycisk | Widoczne technologie, w kolejności z tablicy | Liczba |
|---|---|---|
| Wszystkie | React, Node.js, MySQL, Express, MongoDB, Bootstrap, CSS, HTML, PHP | 9 |
| Frontend | React, Bootstrap, CSS, HTML | 4 |
| Backend | Node.js, Express, PHP | 3 |
| Baza danych | MySQL, MongoDB | 2 |

1. Uruchom aplikację: widzisz dziewięć kart, a „Wszystkie” jest aktywne.
2. Kliknij kolejno „Frontend”, „Backend” i „Baza danych”. Porównaj wyniki z tabelą.
3. Kliknij „Wszystkie”: wraca dziewięć kart.
4. Sprawdź etykietę kategorii, licznik wyników i oznaczenie aktywnego przycisku.
5. Kliknij ten sam filtr kilka razy. Wynik nie powinien się zmieniać.
6. Sprawdź obrazki, rozwijanie szczegółów, polubienia, reset, status nauki i przyciski konsoli w widocznej karcie.
7. Tymczasowo dodaj przycisk kategorii „Inne”. Ponieważ nie ma takich danych, sprawdź komunikat o braku technologii. Następnie usuń przycisk testowy.
8. Sprawdź, czy konsola nie zgłasza błędów ani ostrzeżeń o `key`.

### Co dzieje się ze stanem usuniętej z widoku karty?

`filter()` z `map()` powoduje, że karty spoza wybranej kategorii nie są renderowane. Jeśli karta znika, React usuwa jej instancję i lokalny stan. Gdy wraca, `likes`, `isLearning` i `visible` zaczynają od wartości początkowych. Stabilny `key` nie przechowuje stanu usuniętej karty.

Sprawdź to: polub React dwa razy, wybierz „Frontend” – React pozostaje w kolekcji i zachowuje polubienia. Następnie wybierz „Backend” i wróć do „Frontend” – React pojawia się z licznikiem 0. To oczekiwany efekt na tym etapie. Zachowanie danych kart mimo ich usuwania z widoku wymagałoby późniejszego przeniesienia stanu wyżej.

## 9. Najczęstsze błędy

| Objaw | Co sprawdzić? |
|---|---|
| Pusta kolekcja mimo pasujących danych | Brak `return` w funkcji z klamrami; błędna nazwa kategorii |
| Kliknięcie nie zmienia kart | Czy zmieniasz stan i renderujesz `filteredTechnologies`? |
| Nie można przywrócić wszystkich kart | Czy zawsze filtrujesz pełną tablicę źródłową? |
| Błąd zbyt wielu renderowań | Czy `onClick` otrzymuje funkcję, zamiast wyniku jej wywołania? |
| Stan trafia do niewłaściwej karty | Czy `key` to stabilne `technology.id`, a nie indeks? |

## 10. Pytania kontrolne

1. Co zwraca `filter()` i czy zmienia tablicę źródłową?
2. Co oznacza `true` zwrócone przez funkcję filtrującą?
3. Co otrzymamy, gdy żaden element nie spełnia warunku?
4. Czym różnią się `filter()` i `map()`?
5. Kiedy funkcja strzałkowa wymaga jawnego `return`?
6. Dlaczego kategorię przechowujemy w stanie `App`?
7. Jak działa warunek z `||` obsługujący „Wszystkie”?
8. Dlaczego wynik filtrowania nie potrzebuje osobnego `useState`?
9. Dlaczego do `onClick` przekazujemy funkcję?
10. Dlaczego karta po usunięciu z widoku i ponownym dodaniu traci lokalne polubienia?

Materiały uzupełniające: [React – filtrowanie i renderowanie kolekcji](https://react.dev/learn/rendering-lists) oraz [React – zachowanie i resetowanie stanu](https://react.dev/learn/preserving-and-resetting-state).
