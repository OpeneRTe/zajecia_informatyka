# React — checkbox i przełącznik Bootstrap. Obsługa `onChange` i `checked`

## Cele lekcji

Po lekcji uczeń:

- przechowuje zaznaczenie checkboxa w stanie logicznym,
- łączy checkbox ze stanem przez `checked` i `onChange`,
- odczytuje `event.target.checked`,
- zmienia wygląd checkboxa na przełącznik Bootstrap,
- wykorzystuje zaznaczenie do pokazywania treści i filtrowania listy.


## 1. Checkbox — wartość logiczna

Checkbox to pole, które można zaznaczyć lub odznaczyć. W React jego zaznaczenie możemy zapisać w `useState`:

```jsx
const [showDescription, setShowDescription] = useState(false);
```

| Wartość stanu | Zaznaczenie |
|---|---|
| `false` | Pole odznaczone |
| `true` | Pole zaznaczone |

Wartość początkowa określa zaznaczenie po uruchomieniu komponentu. Używamy wartości logicznych `true` i `false`, bez cudzysłowów.

## 2. Pierwszy przykład — „Pokaż opis”

Uruchom przykład w osobnym projekcie ćwiczeniowym w `App.jsx`. Do WebTech wrócimy w części B.

```jsx
import { useState } from "react";

function App() {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div>
      <h1>Kurs React</h1>

      <input
        type="checkbox"
        id="show-description"
        checked={showDescription}
        onChange={(event) => setShowDescription(event.target.checked)}
      />
      <label htmlFor="show-description">Pokaż opis</label>

      <p>Opis: {showDescription ? "włączony" : "wyłączony"}</p>

      {showDescription && <p>Na kursie poznajemy tworzenie aplikacji React.</p>}
    </div>
  );
}

export default App;
```

**Sprawdź:** początkowo opis jest ukryty. Zaznacz pole, odznacz je, a następnie kliknij etykietę „Pokaż opis”. Etykieta również powinna zmieniać zaznaczenie.

## 3. Jak czytać ten kod?

| Fragment | Znaczenie |
|---|---|
| `type="checkbox"` | Tworzy pole zaznaczenia |
| `checked={showDescription}` | Ustala zaznaczenie na podstawie stanu |
| `onChange={(event) => setShowDescription(event.target.checked)}` | Przekazuje funkcję strzałkową, która po zmianie pola aktualizuje stan |
| `event` | Obiekt zdarzenia przekazany przez React do funkcji |
| `event.target` | Element, którego dotyczy zdarzenie — tutaj checkbox |
| `event.target.checked` | Aktualne zaznaczenie: `true` lub `false` |
| `setShowDescription(...)` | Aktualizuje stan |
| `htmlFor="show-description"` | Łączy etykietę z polem o takim samym `id` |

```text
Zmiana zaznaczenia
→ onChange uruchamia przekazaną funkcję strzałkową
→ odczyt event.target.checked
→ aktualizacja stanu przez setShowDescription
→ React ponownie renderuje komponent
→ zaznaczenie i treść odpowiadają stanowi
```

Takie pole nazywamy **kontrolowanym**: jego zaznaczenie wynika ze stanu React, a obsługa zmiany aktualizuje ten stan.


## 4. Przełącznik Bootstrap

Przełącznik nadal jest checkboxem. Klasa `form-switch` zmienia jego wygląd. Powiązanie ze stanem pozostaje takie samo.


W przykładzie „Pokaż opis” zastąp dotychczasowe pole i etykietę poniższą grupą. Zachowaj stan oraz wyświetlanie opisu:

```jsx
<div className="form-check form-switch mb-3">
  <input
    className="form-check-input"
    type="checkbox"
    role="switch"
    id="show-description"
    checked={showDescription}
    onChange={(event) => setShowDescription(event.target.checked)}
  />
  <label className="form-check-label" htmlFor="show-description">
    Pokaż opis
  </label>
</div>
```

| Klasa / atrybut | Zastosowanie |
|---|---|
| `form-check` | Układ pola i etykiety |
| `form-switch` | Wygląd przełącznika |
| `form-check-input` | Styl pola |
| `form-check-label` | Styl etykiety |
| `mb-3` | Odstęp pod grupą |
| `role="switch"` | Informacja dla technologii asystujących, że pole pełni rolę przełącznika |

Do tego przykładu wystarcza CSS Bootstrapa. Logikę zmiany stanu realizuje React.

W JSX zapisujemy `className` zamiast `class` i `htmlFor` zamiast `for`. Każde pole powinno mieć unikalne `id`.

## 5. Część A — ćwiczenia

### Zadanie 1. Zmiana wartości początkowej

Zmień przykład tak, aby po uruchomieniu opis był widoczny, a checkbox zaznaczony. Zmień tylko wartość początkową w `useState`. Sprawdź efekt po odświeżeniu strony.

### Zadanie 2. Ten sam stan, dwa sposoby zmiany

Pod przełącznikiem dodaj przycisk „Ukryj opis”, który wywołuje `setShowDescription(false)`.

Sprawdź: po kliknięciu przycisku opis znika, komunikat wskazuje „wyłączony”, a przełącznik jest odznaczony. Wszystkie trzy elementy korzystają z tego samego stanu.

### Zadanie 3. Drugi niezależny przełącznik

Dodaj przełącznik „Pokaż cenę”, drugi stan `showPrice` z wartością początkową `false` oraz warunkowo wyświetlany akapit „Cena: 150 zł”.

Nadaj nowemu polu inne `id`, połącz z nim etykietę i użyj właściwego settera. Sprawdź wszystkie cztery kombinacje zaznaczeń: oba wyłączone, tylko opis, tylko cena, oba włączone.

## 6. Część B — WebTech: „Tylko Frontend”

**Cel:** zastosuj przełącznik do filtrowania znanej tablicy technologii. Na tej lekcji używamy jednego filtra; kilka kategorii jednocześnie będzie kolejnym etapem.

Pracuj w istniejącym WebTech. Zachowaj tablicę dziewięciu technologii, komponenty, obrazy, style i funkcje kart. Zmiany dotyczą `App`, ponieważ filtr steruje całą kolekcją.

### Krok 1. Stan przełącznika

W `App.jsx` wykorzystaj istniejący import `useState` lub dodaj go, jeśli go brakuje. W funkcji `App`, przed `return`, dodaj:

```jsx
const [onlyFrontend, setOnlyFrontend] = useState(false);
```

### Krok 2. Pole nad kolekcją kart

Dodaj przełącznik Bootstrap z etykietą „Tylko Frontend”. Wzoruj się na części 4, ale zastosuj:

- `id="only-frontend"` i takie samo `htmlFor` etykiety,
- `checked={onlyFrontend}`,
- `onChange={(event) => setOnlyFrontend(event.target.checked)}`.

Na czas tego ćwiczenia zastąp dotychczasowe przyciski wyboru kategorii tym przełącznikiem i zastąp ich warunek filtrowania poniższym. Jeśli `selectedCategory` i jego setter nie są już używane, usuń ich deklarację.

### Krok 3. Wybór danych

W funkcji `App`, przed `return`, oblicz widoczne technologie:

```jsx
const filteredTechnologies = technologies.filter((technology) => {
  return !onlyFrontend || technology.category === "Frontend";
});
```

Jeśli masz już zmienną `filteredTechnologies`, zmień jej definicję zamiast deklarować ją drugi raz.

| Zaznaczenie | `!onlyFrontend` | Wynik filtrowania |
|---|---|---|
| Odznaczone (`false`) | `true` | Wszystkie technologie |
| Zaznaczone (`true`) | `false` | Tylko obiekty z kategorią `"Frontend"` |

`!` oznacza zaprzeczenie, a `||` — „lub”. Gdy filtr jest wyłączony, pierwszy warunek przepuszcza każdy obiekt. Gdy jest włączony, obiekt musi mieć kategorię `"Frontend"`.

Filtrujemy aktualną pełną tablicę `technologies`. Nie zapisujemy odfiltrowanego wyniku przez `setTechnologies`, ponieważ po wyłączeniu przełącznika potrzebujemy ponownie całej kolekcji. Wynik obliczamy podczas renderowania; osobny stan ani `useEffect` nie są tutaj potrzebne.

### Krok 4. Wyświetlanie

W istniejącym `map()` użyj `filteredTechnologies` jako źródła. Zachowaj wszystkie dotychczasowe props i klucz oparty na `technology.id`.

Nad kartami dodaj informację:

```jsx
<p>Liczba technologii: {filteredTechnologies.length}</p>
```

### Krok 5. Sprawdzenie działania

1. Po uruchomieniu przełącznik jest wyłączony i widzisz dziewięć kart.
2. Włącz „Tylko Frontend”: widzisz React, Bootstrap, CSS i HTML — cztery karty.
3. Wyłącz przełącznik: wraca dziewięć kart.
4. Kliknij etykietę: ona również zmienia zaznaczenie i wynik filtrowania.
5. Ustaw fokus na przełączniku klawiszem Tab, a następnie naciśnij spację: filtr powinien się zmienić.
6. Sprawdź, czy licznik widocznych technologii odpowiada kolekcji i czy konsola nie zgłasza błędów.

Jeśli Twoja tablica ma inne dane, porównaj wynik z zapisanymi kategoriami. Wielkość liter w `"Frontend"` ma znaczenie.

**Przypomnienie:** jeśli cała karta znika z widoku, jej lokalny stan może zostać utracony — po ponownym zamontowaniu zaczyna od wartości początkowych. Dane zapisane w tablicy stanu w `App` pozostają dostępne, ponieważ filtr zmienia tylko wyświetlany podzbiór.

### Dla osób, które skończą wcześniej

Dodaj przycisk „Pokaż wszystkie”, który ustawia `onlyFrontend` na `false`. Sprawdź, czy jednocześnie wracają wszystkie karty i wyłącza się przełącznik.

## 7. Najczęstsze błędy

| Objaw | Co sprawdzić? |
|---|---|
| Pole nie reaguje na kliknięcie | Czy `onChange` aktualizuje stan wskazany w `checked`? |
| Stan ma tekst zamiast wartości logicznej | Czy odczytujesz `event.target.checked`, a nie `event.target.value`? |
| Etykieta nie przełącza pola | Czy `htmlFor` odpowiada `id` i czy `id` jest unikalne? |
| Zamiast przełącznika widać zwykłe pole | Czy dołączono CSS Bootstrapa i klasę `form-switch` na grupie? |
| Checkbox działa, ale lista się nie zmienia | Czy `map()` korzysta z `filteredTechnologies`? |
| Po wyłączeniu filtra brakuje kart | Czy filtrujesz pełną kolekcję bez nadpisywania jej wynikiem? |

## 8. Pytania kontrolne

1. Co określa `checked` i jaki typ wartości przyjmuje?
2. Kiedy uruchamia się funkcja przekazana do `onChange`?
3. Co zwraca `event.target.checked` po odznaczeniu pola?
4. Dlaczego do odczytania zaznaczenia nie używamy `event.target.value`?
5. Co zmienia `form-switch`, a za co odpowiada React?
6. Dlaczego przycisk „Pokaż wszystkie” może również odznaczyć przełącznik?

**Notatka do zeszytu:** Checkbox kontrolowany łączymy ze stanem logicznym przez `checked`. W `onChange` odczytujemy `event.target.checked` i aktualizujemy stan setterem. Stan może sterować widocznością treści lub filtrowaniem danych. Klasa Bootstrapa `form-switch` nadaje checkboxowi wygląd przełącznika.

## Dokumentacja

- [React — input, kontrolowanie checkboxa i obsługa onChange](https://react.dev/reference/react-dom/components/input)
- [Bootstrap 5.3 — checkboxy i przełączniki](https://getbootstrap.com/docs/5.3/forms/checks-radios/)
