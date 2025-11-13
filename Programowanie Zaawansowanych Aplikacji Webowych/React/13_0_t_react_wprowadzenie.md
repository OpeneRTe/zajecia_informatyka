# 51 — Wprowadzenie do React: podstawowe koncepcje (pełna wersja, styl E)
INF.04.7.2(1), 7.3(1)

---

# 0. Co to jest React?

React jest biblioteką JavaScript przeznaczoną do budowania interfejsów użytkownika w sposób komponentowy i deklaratywny. Umożliwia tworzenie nowoczesnych aplikacji, w których UI aktualizuje się automatycznie w odpowiedzi na zmiany danych, bez ręcznego manipulowania DOM.

React rozwiązuje problem rosnącej złożoności interfejsów poprzez:
- modularny podział kodu na komponenty,
- deklaratywne definiowanie widoku,
- optymalizację aktualizacji poprzez Virtual DOM,
- możliwość budowy aplikacji typu SPA.

Nie jest frameworkiem pełnym — odpowiada wyłącznie za warstwę UI. Pozostałe funkcje (routing, stan globalny, formularze) realizowane są przez oddzielne biblioteki.

**Źródła:**  
W3Schools – https://www.w3schools.com/react/react_intro.asp  
React.dev – https://react.dev/learn

---

# 1. Komponent – definicja i struktura

## 1.1. Definicja komponentu
Komponent jest funkcją (lub klasą, w starszych wersjach), która zwraca strukturę interfejsu użytkownika. Reprezentuje logiczną część aplikacji, odpowiedzialną za fragment widoku.

Komponent:
- posiada nazwę w PascalCase,
- zwraca strukturę UI zapisaną w JSX,
- może zawierać logikę i strukturę,
- może być używany wielokrotnie.

## 1.2. Struktura minimalnego komponentu
```jsx
function Header() {
  return <h1>Panel główny</h1>;
}
```

Elementy struktury:
- nagłówek funkcji,
- ciało komponentu,
- zwracany JSX.

## 1.3. Kategorie komponentów (koncepcyjnie)
- **prezentacyjne** – opis wyglądu,
- **kontenerowe** – zarządzają logiką (gdy wprowadzony stan),
- **layoutowe** – tworzą układ strony.

To wprowadzenie stanowi podstawę do dalszych tematów (propsy, stan, renderowanie list).

---

# 2. Deklaratywny sposób definiowania UI

W podejściu imperatywnym programista określa, *jak* wykonać zadanie — aktualizacja UI wymaga operowania na DOM.

Przykład imperatywnego podejścia (jQuery):
```js
$("#counter").text("Wynik: " + newValue);
```

React stosuje model deklaratywny:
```jsx
<p>Wynik: {value}</p>
```

Różnice:
- programista opisuje „co ma być wyświetlone”, a nie „jak to zaktualizować”,
- React ustala minimalny zakres zmian,
- logika aktualizacji jest odseparowana od kodu aplikacji.

Zalety:
- redukcja błędów,
- większa przewidywalność,
- spójność interfejsu z danymi.

**Źródła:**  
W3Schools – https://www.w3schools.com/react/react_render.asp  
React.dev – https://react.dev/learn/thinking-in-react

---

# 3. JSX – szczegółowe omówienie

JSX jest rozszerzeniem składni JavaScript pozwalającym deklaratywnie definiować UI w formie przypominającej HTML.

Przykład:
```jsx
const title = <h2>Witamy w systemie</h2>;
```

JSX kompiluje się do wywołań:
```
React.createElement(type, props, children)
```

## 3.1. Wstawianie danych
```jsx
const name = "Anna";
<p>Użytkownik: {name}</p>
```

W `{ }` można używać:  
– zmiennych,  
– wyrażeń,  
– funkcji,  
– konkatenacji,  
– operatorów.

## 3.2. camelCase w JSX
Atrybuty JSX są właściwościami obiektów JavaScript, dlatego stosują camelCase.

Przykłady:
```jsx
<div className="panel"></div>
<button onClick={handleSend}>Wyślij</button>
<input maxLength={40} />
```

## 3.3. Różnice HTML → JSX

| HTML     | JSX        |
|----------|------------|
| class    | className  |
| onclick  | onClick    |
| maxlength| maxLength  |
| tabindex | tabIndex   |

Zasady:
- JSX musi zwrócić jeden element główny,
- atrybuty są traktowane jak propsy,
- wyrażenia są zapisywane w `{ }`.

**Źródła:**  
W3Schools – https://www.w3schools.com/react/react_jsx.asp  
React.dev – https://react.dev/learn/writing-markup-with-jsx

---

# 4. Komponenty bezstanowe i stanowe – ujęcie koncepcyjne

## 4.1. Komponenty bezstanowe (stateless)
- nie przechowują danych wewnętrznych,
- opisują wyłącznie wygląd,
- zawsze zwracają ten sam wynik.

```jsx
function Logo() {
  return <img src="/logo.png" alt="Logo" />;
}
```

## 4.2. Komponenty stanowe (stateful)
Komponent stanowy utrzymuje dane, które mogą zmieniać się w czasie, np.:
- zmienny licznik,
- otwierany panel,
- formularz,
- lista wiadomości.

Zmiana stanu powoduje ponowne zbudowanie UI.

**Bez implementacji (useState będzie później).**

**Źródła:**  
W3Schools – https://www.w3schools.com/react/react_components.asp  
React.dev – https://react.dev/learn/your-first-component

---

# 5. Virtual DOM – mechanizm aktualizacji UI

DOM przeglądarki jest strukturą kosztowną w modyfikacji.  
React minimalizuje operacje na DOM poprzez wykorzystanie Virtual DOM.

Proces:
1. React tworzy Virtual DOM — kopię struktury interfejsu.
2. Po zmianie danych generuje nową wersję Virtual DOM.
3. Porównuje różnice między wersjami (diffing).
4. Aktualizuje tylko zmienione fragmenty prawdziwego DOM.

Zalety:
- znaczne ograniczenie operacji na DOM,
- zwiększona wydajność aplikacji,
- większa płynność w interfejsach o wysokiej dynamice zmian.

**Źródła:**  
W3Schools – https://www.w3schools.com/react/react_render.asp  
React.dev – https://react.dev/learn/render-and-commit

---

# 6. SPA – Single Page Application

W modelu MPA (Multi Page Application):
- każda podstrona to nowe żądanie,
- interfejs jest przeładowywany za każdym razem.

W SPA:
- aplikacja ładuje się raz,
- nawigacja wykonuje się po stronie klienta,
- zmienia się tylko część interfejsu,
- brak przeładowania strony.

Zalety:
- wysoka szybkość działania,
- płynne przełączanie widoków,
- aplikacyjne zachowanie UI.

Przykłady:
- Gmail,
- Trello,
- panele administracyjne,
- systemy CRM.

**Źródła:**  
W3Schools – https://www.w3schools.com/react/react_router.asp  
React.dev – https://react.dev/learn/start-a-new-react-project#using-a-router

---

# 7. Struktura projektu React (Vite)

Przykładowa struktura:

```
my-react-app/
  index.html
  package.json
  src/
    App.jsx
    main.jsx
  public/
```

Wyjaśnienie plików:
- **index.html** – zawiera element `#root`,
- **main.jsx** – punkt startowy, montowanie aplikacji,
- **App.jsx** – główny komponent,
- **package.json** – zależności i skrypty.

---

# 8. Pierwszy projekt React — proces tworzenia i uruchomienia

## 8.1. Inicjalizacja projektu
```bash
npm create vite@latest my-react-app --template react
```

## 8.2. Instalacja zależności
```bash
cd my-react-app
npm install
```

## 8.3. Uruchomienie
```bash
npm run dev
```

Aplikacja działa pod adresem:
```
http://localhost:5173/
```

Przykładowy komponent startowy:
```jsx
function App() {
  return (
    <div>
      <h1>Aplikacja React</h1>
      <p>Pierwszy komponent w środowisku React.</p>
    </div>
  );
}

export default App;
```

---

# 9. Podsumowanie

Materiał obejmuje:
- definicję React i jego rolę,
- pełną analizę komponentów,
- szczegółowe omówienie JSX,
- różnicę między podejściem deklaratywnym a imperatywnym,
- komponenty stateless i stateful (koncepcyjnie),
- mechanizm Virtual DOM,
- architekturę SPA,
- strukturę projektu React,
- proces uruchamiania aplikacji.

Zakres stanowi spójne wprowadzenie do kolejnych tematów: propsów, useState, obsługi zdarzeń i renderowania list.

