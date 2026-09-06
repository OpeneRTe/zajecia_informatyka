# Lekcja 1. Od zmiennej JavaScript do komponentu React

Materiał do nauki i przygotowania do odpowiedzi ustnej lub kartkówki.

Po tej lekcji potrafisz wyjaśnić, czym jest zmienna, odróżnić jej nazwę od wartości, odczytać prosty kod JSX i rozpoznać definicję oraz użycie komponentu. Pytania na końcu dotyczą wyłącznie zagadnień wyjaśnionych w tym materiale.

## 1. Zmienna — nazwa powiązana z wartością

Program korzysta z danych, na przykład nazwy kursu i liczby lekcji. Aby odwoływać się do danych w kodzie, nadajemy im nazwy.

**Zmienna to nazwana informacja w programie, której możemy przypisać wartość i później tę wartość odczytać.**

```js
const nazwaKursu = "Podstawy Reacta";
```

Znaczenie elementów zapisu:

| Element | Znaczenie |
|---|---|
| `const` | Deklaruje nazwę, do której nie można później przypisać innej wartości. |
| `nazwaKursu` | Nazwa pozwalająca odczytać wartość. |
| `=` | Przypisuje wartość; nie jest sprawdzeniem równości. |
| `"Podstawy Reacta"` | Wartość tekstowa. |
| `;` | Kończy instrukcję w przyjętym tutaj stylu zapisu. |

Utworzenie zmiennej nazywamy **deklaracją**, a nadanie jej wartości początkowej — **inicjalizacją**. W przykładzie robimy obie rzeczy jednocześnie.

### Nazwa a tekst

```js
const nazwaKursu = "Podstawy Reacta";

console.log(nazwaKursu);
console.log("nazwaKursu");
```

Wynik w konsoli:

```text
Podstawy Reacta
nazwaKursu
```

Bez cudzysłowu odczytujemy zmienną. W cudzysłowie zapisujemy dosłowny tekst. `console.log()` wypisuje wynik w konsoli — samo nie tworzy treści strony.

### Nazwy zmiennych

Nazwy powinny wyjaśniać znaczenie danych, np. `nazwaKursu` lub `liczbaLekcji`. Nie mogą zawierać spacji ani zaczynać się cyfrą. JavaScript rozróżnia wielkie i małe litery: `nazwaKursu` i `NazwaKursu` to różne nazwy.

Zapis `liczbaLekcji` nazywamy **camelCase**: pierwsze słowo zaczynamy małą literą, następne wielką.

## 2. `const` i `let`

Używamy `const`, gdy nie planujemy ponownego przypisania wartości do danej nazwy.

```js
const nazwaKursu = "Podstawy Reacta";
```

Próba wykonania później instrukcji `nazwaKursu = "Node.js";` spowoduje błąd.

Używamy `let`, gdy wartość ma zostać ponownie przypisana:

```js
let liczbaLekcji = 10;
liczbaLekcji = 12;

console.log(liczbaLekcji);
```

Wynik to `12`. Przy ponownym przypisaniu nie zapisujemy jeszcze raz `let`.

**W naszych przykładach wybieramy `const`, dopóki nie potrzebujemy ponownego przypisania.** `const` nie oznacza, że każda wartość jest całkowicie niezmienna: szczegóły dotyczące obiektów i tablic poznamy później. W starszym kodzie występuje również `var`; na tej lekcji używamy `const` i `let`.

Powtórzenie: [W3Schools — JavaScript Variables](https://www.w3schools.com/js/js_variables.asp).

## 3. Tekst, liczby i wyrażenia

W tej lekcji pracujemy z dwoma rodzajami wartości:

```js
const nazwaKursu = "Podstawy Reacta"; // tekst, czyli string
const liczbaLekcji = 12;             // liczba, czyli number
```

Tekst zapisujemy w cudzysłowie lub apostrofach. Liczbę przeznaczoną do obliczeń zapisujemy bez nich.

**Wyrażenie to fragment kodu, który daje wartość.** Wyrażeniami są na przykład `liczbaLekcji`, `2 + 3` oraz `liczbaLekcji * 45`.

```js
const liczbaLekcji = 12;
const czasLekcji = 45;
const liczbaMinut = liczbaLekcji * czasLekcji;
```

Zmienna `liczbaMinut` otrzyma wartość `540`.

Zwróć uwagę na operator `+`:

| Wyrażenie | Wynik | Wyjaśnienie |
|---|---|---|
| `12 + 2` | `14` | Dodawanie liczb. |
| `"12" + 2` | `"122"` | Połączenie tekstu z liczbą zamienioną na tekst. |
| `"Kurs: " + "React"` | `"Kurs: React"` | Łączenie tekstów. |

## 4. Od JavaScript do Reacta

**React jest biblioteką JavaScript służącą do budowania interfejsów użytkownika.** Interfejs to widoczna część aplikacji, np. nagłówek, karta kursu, menu i przyciski.

React korzysta ze zwykłego JavaScript. Zmienne deklarujemy tak samo jak wcześniej:

```js
const nazwaKursu = "Podstawy Reacta";
```

**Nie istnieje osobny rodzaj „zmiennej React z klamrami”.** Klamry, które za chwilę zobaczysz, służą do użycia wyrażenia JavaScript w opisie widoku.

## 5. JSX — opis widoku w kodzie

**JSX to rozszerzenie składni JavaScript pozwalające zapisywać strukturę interfejsu w sposób podobny do HTML.**

```jsx
<h1>Nasze kursy</h1>
```

Ten fragment opisuje nagłówek. JSX nie jest zwykłym tekstem ani oddzielnym językiem zastępującym JavaScript. W naszym projekcie narzędzia przekształcają go do JavaScript.

Na początku możesz czytać JSX podobnie do HTML: `<h1>` oznacza nagłówek, `<p>` akapit, a `<article>` fragment treści, np. kartę kursu.

Źródło: [React — Writing Markup with JSX](https://react.dev/learn/writing-markup-with-jsx).

## 6. Klamry `{}` — użycie wartości w JSX

Załóżmy, że wcześniej zadeklarowano:

```js
const nazwaKursu = "Podstawy Reacta";
```

Porównaj dwa fragmenty JSX:

| JSX | Treść widoczna na stronie |
|---|---|
| `<h2>nazwaKursu</h2>` | nazwaKursu |
| `<h2>{nazwaKursu}</h2>` | Podstawy Reacta |

**Między znacznikami tekst zapisujemy bez klamer. Gdy chcemy odczytać wartość zmiennej, umieszczamy jej nazwę w klamrach.**

Możemy połączyć tekst z wartością:

```jsx
<p>Kurs: {nazwaKursu}</p>
```

Wynik: `Kurs: Podstawy Reacta`.

W klamrach mogą znajdować się również obliczenia:

```jsx
<p>Suma: {2 + 3}</p>
```

Wynik: `Suma: 5`. React oblicza wyrażenie podczas renderowania, czyli ustalania, co ma być wyświetlone.

Deklarację zmiennej umieszczamy w części JavaScript, a jej odczyt w JSX. Zapis `<p>{const wynik = 5}</p>` jest niepoprawny: deklaracja nie jest wyrażeniem.

### Wartość atrybutu

Atrybut opisuje dodatkową właściwość elementu. Na przykład `title` może dostarczyć tekst podpowiedzi:

```jsx
<p title="Opis kursu">React</p>
<p title={nazwaKursu}>React</p>
```

W pierwszym przykładzie przekazujemy stały tekst, w drugim wartość zmiennej. `title="{nazwaKursu}"` przekazałoby dosłowny tekst `{nazwaKursu}`.

Źródło: [React — JavaScript in JSX with Curly Braces](https://react.dev/learn/javascript-in-jsx-with-curly-braces).

## 7. Funkcja i komponent

**Funkcja to nazwany fragment kodu, który można wywołać.** Instrukcja `return` zwraca wynik działania funkcji.

```js
function podajNazwe() {
  return "Podstawy Reacta";
}

console.log(podajNazwe());
```

Wywołanie `podajNazwe()` daje tekst `Podstawy Reacta`.

**Komponent to wydzielona część interfejsu. W tej lekcji zapisujemy go jako funkcję zwracającą JSX.**

```jsx
function CourseCard() {
  const nazwaKursu = "Podstawy Reacta";

  return (
    <article>
      <h2>{nazwaKursu}</h2>
      <p>Poznajemy podstawy tworzenia interfejsów.</p>
    </article>
  );
}
```

Czytaj kod po kolei: definiujemy komponent `CourseCard`, deklarujemy zmienną, a następnie zwracamy opis karty z nagłówkiem i akapitem. Zmienna zadeklarowana wewnątrz tej funkcji jest dostępna w jej wnętrzu.

Nazwa własnego komponentu zaczyna się wielką literą. Stosujemy **PascalCase**, np. `CourseCard`. Pozwala to odróżnić `<CourseCard />` od elementów takich jak `<article>`.

Klamry mają tu dwa zastosowania: w `function CourseCard() { ... }` obejmują ciało funkcji, a w `<h2>{nazwaKursu}</h2>` umożliwiają odczyt wyrażenia wewnątrz JSX. Znaczenie zależy od miejsca zapisu.

Źródło: [React — Your First Component](https://react.dev/learn/your-first-component).

## 8. Podstawowe zasady JSX

### Jeden wspólny element w zwracanym fragmencie

Jeśli zwracamy kilka sąsiadujących elementów, obejmujemy je wspólnym elementem:

```jsx
return (
  <article>
    <h2>Kurs React</h2>
    <p>Liczba lekcji: 12</p>
  </article>
);
```

Można też użyć **fragmentu** `<>...</>`, który grupuje elementy bez dodawania dodatkowego elementu do DOM strony:

```jsx
return (
  <>
    <h2>Kurs React</h2>
    <p>Liczba lekcji: 12</p>
  </>
);
```

### Domykanie znaczników

Domykamy także elementy takie jak `<br />` i `<img src="/logo.png" alt="Logo" />`.

### `className` zamiast `class`

Klasę CSS przypisujemy przez `className`:

```jsx
<article className="course">Treść karty</article>
```

Sama nazwa klasy nie tworzy stylów — odpowiednie reguły CSS trzeba zdefiniować osobno.

Źródła: [React — reguły JSX](https://react.dev/learn/writing-markup-with-jsx), [W3Schools — React JSX](https://www.w3schools.com/react/react_jsx.asp).

## 9. Cały przykład — dwie karty kursu

Poniższy kod stanowi kompletną zawartość pliku `src/App.jsx` w przygotowanym projekcie React. Wcześniejsze fragmenty służyły analizie poszczególnych pojęć.

```jsx
function CourseCard() {
  const nazwaKursu = "Podstawy Reacta";
  const liczbaLekcji = 12;
  const czasLekcji = 45;

  return (
    <article className="course">
      <h2>{nazwaKursu}</h2>
      <p>Liczba lekcji: {liczbaLekcji}</p>
      <p>Czas nauki: {liczbaLekcji * czasLekcji} minut</p>
    </article>
  );
}

export default function App() {
  return (
    <main>
      <h1>Nasze kursy</h1>
      <CourseCard />
      <CourseCard />
    </main>
  );
}
```

`App` jest tutaj głównym komponentem. `export default` udostępnia go do zaimportowania w innym pliku projektu.

Zapis `function CourseCard() { ... }` to **definicja komponentu**. Zapis `<CourseCard />` to **użycie komponentu w JSX** — React zajmuje się jego wywołaniem.

Na stronie zobaczymy nagłówek „Nasze kursy” i dwie jednakowe karty. Każda pokaże nazwę „Podstawy Reacta”, liczbę lekcji `12` i czas `540 minut`.

Definicję karty zapisaliśmy raz, ale użyliśmy jej dwa razy. Dzięki temu strukturę i treść obu kart możemy poprawić w jednym miejscu. Przekazywanie różnych danych do poszczególnych kart będzie tematem kolejnej lekcji.

**Klamry nie sprawiają, że zwykła zmienna staje się automatycznie reaktywna.** Samo przypisanie nowej wartości do zmiennej `let` nie zleca Reactowi odświeżenia widoku. Mechanizm stanu, używany do obsługi takich zmian, poznamy później.

## 10. Co trzeba umieć wyjaśnić?

Przygotowując się do odpowiedzi, sprawdź, czy potrafisz:

1. Wskazać nazwę i wartość w deklaracji zmiennej.
2. Wyjaśnić różnicę między `const` a `let`.
3. Odróżnić tekst od liczby oraz nazwę zmiennej od tekstu w cudzysłowie.
4. Obliczyć wynik prostego wyrażenia JavaScript.
5. Wyjaśnić, czym są React, JSX i komponent.
6. Przewidzieć treść wyświetloną przez JSX z klamrami i bez klamer.
7. Rozpoznać deklarację zmiennej, `return`, definicję i użycie komponentu.
8. Wskazać trzy podstawowe reguły JSX opisane w rozdziale 8.

## 11. Pytania do odpowiedzi ustnej lub kartkówki

1. Czym jest zmienna? Podaj przykład deklaracji z wartością początkową.
2. Co oznacza znak `=` w instrukcji `const liczbaLekcji = 12;`?
3. Kiedy użyjemy `let`, a kiedy `const`?
4. Czym różnią się `console.log(nazwaKursu)` i `console.log("nazwaKursu")`?
5. Czym różnią się wartości `12` i `"12"`? Jakie będą wyniki `12 + 2` i `"12" + 2`?
6. Co to jest wyrażenie? Podaj przykład.
7. Do czego służy React, a do czego JSX?
8. Czy w React tworzymy inny rodzaj zmiennych niż w JavaScript? Wyjaśnij.
9. Do czego służą klamry w `<h2>{nazwaKursu}</h2>`?
10. Dlaczego `<p>{const liczba = 12}</p>` jest niepoprawne?
11. Czym jest funkcja i do czego służy `return`?
12. Czym jest komponent? Jak rozpoznać jego nazwę w JSX?
13. Czym różni się definicja `CourseCard` od użycia `<CourseCard />`?
14. Po co wielokrotnie używać jednego komponentu?
15. Co daje fragment `<>...</>`? Jak przypisujemy klasę CSS w JSX?
16. Czy samo przypisanie nowej wartości do `let` odświeża widok Reacta?

## 12. Sprawdź, czy rozumiesz kod

### A. Przewidź wynik

Wewnątrz komponentu zadeklarowano:

```js
const nazwa = "React";
const liczba = 8;
```

Podaj treść wyświetloną przez każdy fragment:

```jsx
<p>nazwa</p>
<p>{nazwa}</p>
<p>Lekcje: {liczba + 2}</p>
<p>{"liczba"}</p>
```

### B. Wyjaśnij błąd

```js
const liczbaLekcji = 8;
liczbaLekcji = 10;
```

Dlaczego drugiej instrukcji nie można wykonać poprawnie? Jak zmienić deklarację, jeśli potrzebujemy ponownego przypisania?

### C. Rozpoznaj komponent

```jsx
function Header() {
  return <h1>Moje kursy</h1>;
}

function App() {
  return (
    <main>
      <Header />
      <Header />
    </main>
  );
}
```

Ile definicji komponentu `Header` zapisano? Ile razy użyto go w `App`? Ile nagłówków wyświetli `App`?

### Odpowiedzi do samodzielnego sprawdzenia

**A:** Kolejno: `nazwa`, `React`, `Lekcje: 10`, `liczba`. W ostatnim przykładzie klamry zawierają wyrażenie tekstowe `"liczba"`, a nie odczyt zmiennej.

**B:** Nie można ponownie przypisać wartości do nazwy zadeklarowanej przez `const`. Jeśli przypisanie ma być możliwe, należy użyć `let liczbaLekcji = 8;`.

**C:** Jedna definicja `Header`, dwa użycia i dwa nagłówki „Moje kursy”.

## 13. Materiały do powtórzenia

- [W3Schools — zmienne JavaScript](https://www.w3schools.com/js/js_variables.asp): deklarowanie i odczytywanie danych.
- [W3Schools — JSX](https://www.w3schools.com/react/react_jsx.asp): krótkie przykłady składni.
- [React — JavaScript w klamrach JSX](https://react.dev/learn/javascript-in-jsx-with-curly-braces): użycie danych w widoku.
- [React — pierwszy komponent](https://react.dev/learn/your-first-component): definiowanie i używanie komponentów.
- [React — reguły JSX](https://react.dev/learn/writing-markup-with-jsx): poprawny zapis struktury widoku.

Zakres wymagany do odpowiedzi określają rozdziały 1–12 tego materiału. Strony źródłowe zawierają również zagadnienia wykraczające poza pierwszą lekcję.
