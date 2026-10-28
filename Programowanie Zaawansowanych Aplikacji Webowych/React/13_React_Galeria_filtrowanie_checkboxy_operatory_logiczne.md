# React — filtrowanie galerii za pomocą checkboxów. Operatory `&&` i `||`

**Czas: 45 minut.** Kontynuacja lekcji o checkboxach, tablicy obiektów w stanie i Bootstrapie.

## 1. Cel lekcji

Tworzymy galerię z trzema przełącznikami: **Kwiaty**, **Zwierzęta** i **Samochody**. Każdy przełącznik niezależnie steruje widocznością swojej kategorii.

Po lekcji uczeń:

- obsługuje trzy checkboxy przez `checked` i `onChange`,
- filtruje tablicę na podstawie kilku stanów logicznych,
- rozróżnia operatory `&&` i `||`,
- wyświetla wynik filtrowania przez `map()`,
- zachowuje liczniki pobrań podczas ukrywania i przywracania zdjęć.

## 2. Dane i zasady działania

Pracuj na galerii z poprzednich zajęć. Zdjęcia są zapisane w tablicy `photos` przechowywanej w `useState`. Każdy obiekt ma pola `id`, `alt`, `filename`, `category` i `downloads`.

Przykładowy obiekt:

```javascript
{ id: 10, alt: "Mak", filename: "obraz1.jpg", category: 1, downloads: 35 }
```

| Wartość `category` | Kategoria |
|---|---|
| `1` | Kwiaty |
| `2` | Zwierzęta |
| `3` | Samochody |

Numery kategorii są liczbami, np. `1`, a nie tekstami `"1"`.

Zaznaczona kategoria ma być widoczna. Można włączyć kilka kategorii jednocześnie. Po wyłączeniu wszystkich galeria ma być pusta.

## 3. Trzy stany checkboxów

W funkcji `App`, przed `return`, dodaj:

```jsx
const [showFlowers, setShowFlowers] = useState(true);
const [showAnimals, setShowAnimals] = useState(true);
const [showCars, setShowCars] = useState(true);
```

Wartość początkowa `true` oznacza, że po uruchomieniu wszystkie przełączniki są włączone.

Każdy checkbox ma swój stan i swój setter. Zmiana `showFlowers` nie zmienia `showAnimals` ani `showCars`.

## 4. Checkboxy z wyglądem przełączników Bootstrap

Nad galerią umieść poniższy JSX. W projekcie powinien być już dołączony CSS Bootstrapa, tak jak na poprzedniej lekcji.

```jsx
<div className="form-check form-switch form-check-inline">
  <input
    className="form-check-input"
    type="checkbox"
    role="switch"
    id="flowers"
    checked={showFlowers}
    onChange={(event) => setShowFlowers(event.target.checked)}
  />
  <label className="form-check-label" htmlFor="flowers">
    Kwiaty
  </label>
</div>

<div className="form-check form-switch form-check-inline">
  <input
    className="form-check-input"
    type="checkbox"
    role="switch"
    id="animals"
    checked={showAnimals}
    onChange={(event) => setShowAnimals(event.target.checked)}
  />
  <label className="form-check-label" htmlFor="animals">
    Zwierzęta
  </label>
</div>

<div className="form-check form-switch form-check-inline">
  <input
    className="form-check-input"
    type="checkbox"
    role="switch"
    id="cars"
    checked={showCars}
    onChange={(event) => setShowCars(event.target.checked)}
  />
  <label className="form-check-label" htmlFor="cars">
    Samochody
  </label>
</div>
```

`checked` ustala zaznaczenie na podstawie stanu. `onChange` zapisuje aktualne zaznaczenie z `event.target.checked` do odpowiedniego stanu. Klasa `form-check-inline` pozwala ustawić grupy obok siebie, jeśli jest dostatecznie dużo miejsca.

## 5. Warunek filtrowania galerii

W funkcji `App`, po deklaracjach stanów i przed `return`, dodaj:

```jsx
const filteredPhotos = photos.filter((photo) => {
  return (
    (photo.category === 1 && showFlowers) ||
    (photo.category === 2 && showAnimals) ||
    (photo.category === 3 && showCars)
  );
});
```

`filter()` sprawdza każde zdjęcie. Jeśli warunek zwróci `true`, zdjęcie trafia do nowej tablicy `filteredPhotos`. Jeśli zwróci `false`, zdjęcie jest pomijane w wyniku. Pełna tablica `photos` pozostaje dostępna.

### Operator `&&` — „i”

W warunkach logicznych `&&` wymaga, aby **oba warunki były prawdziwe**.

```jsx
photo.category === 1 && showFlowers
```

Czytamy: **zdjęcie należy do kategorii Kwiaty i checkbox Kwiaty jest zaznaczony**.

| Zdjęcie jest kwiatem | Checkbox Kwiaty zaznaczony | Wynik `&&` |
|---|---|---|
| `true` | `true` | `true` |
| `true` | `false` | `false` |
| `false` | `true` | `false` |
| `false` | `false` | `false` |

Samo zaznaczenie „Kwiaty” nie wystarczy, aby ten warunek przepuścił zdjęcie samochodu. Zdjęcie musi również należeć do właściwej kategorii.

### Operator `||` — „lub”

W warunkach logicznych `||` wymaga, aby **przynajmniej jeden warunek był prawdziwy**. Wynik jest prawdziwy także wtedy, gdy oba warunki są prawdziwe.

| Warunek A | Warunek B | Wynik `||` |
|---|---|---|
| `true` | `true` | `true` |
| `true` | `false` | `true` |
| `false` | `true` | `true` |
| `false` | `false` | `false` |

W galerii `||` łączy trzy możliwości. Pokazujemy zdjęcie, jeżeli:

- jest kwiatem i włączono Kwiaty **lub**
- jest zwierzęciem i włączono Zwierzęta **lub**
- jest samochodem i włączono Samochody.

Nawiasy grupują warunek każdej kategorii i ułatwiają czytanie. Całość wewnątrz `return (...)` jest jednym wyrażeniem logicznym.

**Do zapamiętania:** `&&` łączy wymagania, które muszą być spełnione razem. `||` łączy możliwości, z których wystarczy spełnić jedną.

W tym przykładzie operujemy na wartościach logicznych. Ogólnie w JavaScript `&&` i `||` mogą zwracać także inne wartości — tutaj wynik całego warunku jest `true` albo `false`.

### Prześledź przykład

Włączono Kwiaty i Samochody, a wyłączono Zwierzęta:

```javascript
showFlowers = true
showAnimals = false
showCars = true
```

Powyższy zapis pokazuje wartości do analizy; w aplikacji zmieniamy stan przez settery.

Dla zdjęcia Maka (`category: 1`) warunek wygląda tak:

```javascript
(true && true) || (false && false) || (false && true)
// true || false || false
// true — zdjęcie jest widoczne
```

Dla Dalmatyńczyka (`category: 2`):

```javascript
(false && true) || (true && false) || (false && true)
// false || false || false
// false — zdjęcie jest ukryte
```

### Dlaczego nie zamieniamy operatorów miejscami?

Niepoprawne połączenie:

```jsx
photo.category === 1 || showFlowers
```

Gdy `showFlowers` wynosi `true`, ten warunek przepuści każde zdjęcie, również samochód. Gdy checkbox jest wyłączony, nadal przepuści wszystkie kwiaty, bo pierwszy warunek jest prawdziwy.

Niepoprawne jest także połączenie wszystkich trzech grup przez `&&`. Jedno zdjęcie nie może mieć równocześnie `category` równego `1`, `2` i `3`, więc żadne nie spełni całego warunku.

## 6. Wyświetlenie wyniku przez `map()`

W JSX zamień źródło dotychczasowego `map()` z `photos` na `filteredPhotos`. Przykład dla obrazów umieszczonych w `public/assets`:

```jsx
<div>
  {filteredPhotos.map((photo) => (
    <div key={photo.id} className="d-inline-block">
      <img
        src={"/assets/" + photo.filename}
        alt={photo.alt}
        className="rounded"
        style={{ margin: "5px" }}
      />
      <h4>Pobrań: {photo.downloads}</h4>
      <button
        type="button"
        className="btn btn-success"
        onClick={() => download(photo.id)}
      >
        Pobierz
      </button>
    </div>
  ))}
</div>
```

Zachowaj istniejącą funkcję `download(id)`, która aktualizuje właściwy obiekt w pełnej tablicy stanu przez `setPhotos` i `map()`.

**Dwa różne zadania:** `filter()` wybiera zdjęcia do pokazania, a `map()` tworzy ich widok. Filtrowanie nie zwiększa liczników i nie zmienia obiektów zdjęć.

Nie wykonujemy `setPhotos(filteredPhotos)`. Usunęłoby to ukryte zdjęcia z aktualnej tablicy stanu i samo ponowne zaznaczenie kategorii nie przywróciłoby ich.

`filteredPhotos` obliczamy przy każdym renderowaniu. Nie potrzebujemy dla niego dodatkowego `useState` ani `useEffect`.

```text
Zmiana checkboxa → onChange → aktualizacja jego stanu
→ ponowne renderowanie → filter() wybiera zdjęcia → map() tworzy widok
```

## 7. Ćwiczenia

### Zadanie 1. Przewidź wynik

Przed uruchomieniem zapisz, jakie kategorie będą widoczne:

| Kwiaty | Zwierzęta | Samochody | Widoczne kategorie |
|---|---|---|---|
| `true` | `true` | `true` | ................................ |
| `true` | `false` | `true` | ................................ |
| `false` | `true` | `false` | ................................ |
| `false` | `false` | `false` | ................................ |

Następnie sprawdź przewidywania w aplikacji.

### Zadanie 2. Informacja o galerii

Nad zdjęciami wyświetl „Liczba widocznych zdjęć: …”, korzystając z `filteredPhotos.length`.

Gdy wynik jest pusty, pokaż komunikat „Brak zdjęć do wyświetlenia”. Wykorzystaj warunkowe renderowanie:

```jsx
{filteredPhotos.length === 0 && <p>Brak zdjęć do wyświetlenia.</p>}
```

To inne zastosowanie `&&`: gdy warunek po lewej jest prawdziwy, wyrażenie zwraca JSX po prawej i React go wyświetla. Gdy warunek jest fałszywy, akapit nie jest renderowany.

### Zadanie 3. Czy licznik pozostaje zapisany?

1. Włącz wszystkie kategorie.
2. Zwiększ liczbę pobrań wybranego kwiatu o dwa. Zapisz wynik.
3. Wyłącz Kwiaty, a następnie ponownie je włącz.
4. Sprawdź, czy zdjęcie nadal ma zwiększoną liczbę pobrań.

Wyjaśnij, dlaczego licznik jest zachowany. Wskaż, gdzie znajdują się pełne dane zdjęć, a gdzie obliczany jest tylko ich widoczny podzbiór.

### Zadanie 4. Prześledź warunek samodzielnie

Przy ustawieniach `showFlowers = false`, `showAnimals = true` i `showCars = true` rozpisz warunek z części 5 dla zdjęcia o `category: 3`, podstawiając `true` i `false`.

### Dla osób, które skończą wcześniej

Dodaj przyciski „Pokaż wszystkie” i „Ukryj wszystkie”. Każdy przycisk powinien ustawiać wszystkie trzy stany na odpowiednio `true` albo `false`. Sprawdź, czy zmieniają się zarówno zdjęcia, jak i zaznaczenia przełączników.

## 8. Kontrola działania

- Wszystkie trzy przełączniki są początkowo włączone.
- Każdy przełącznik steruje wyłącznie swoją kategorią.
- Można jednocześnie wyświetlić dowolne dwie kategorie.
- Po wyłączeniu wszystkich przełączników pojawia się komunikat o braku zdjęć.
- Kliknięcie etykiety również zmienia zaznaczenie.
- Ponowne włączenie kategorii przywraca zdjęcia z zachowanymi licznikami pobrań.
- Dodanie kolejnego obiektu z istniejącą kategorią działa bez dopisywania kolejnego bloku JSX.

## 9. Notatka do zeszytu

Zaznaczenia checkboxów przechowujemy w stanach logicznych. `checked` określa zaznaczenie, a `onChange` aktualizuje stan na podstawie `event.target.checked`. Metoda `filter()` wybiera zdjęcia należące do włączonych kategorii, a `map()` tworzy ich widok. Operator `&&` oznacza „i” — oba warunki muszą być prawdziwe. Operator `||` oznacza „lub” — wystarczy jeden prawdziwy warunek. Filtrowanie widoku nie zmienia pełnej tablicy zdjęć w stanie.
