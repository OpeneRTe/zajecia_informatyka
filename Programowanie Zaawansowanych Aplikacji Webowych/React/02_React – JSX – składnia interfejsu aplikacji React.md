# LEKCJA 2

# JSX – składnia interfejsu aplikacji React

## 1. Cele lekcji

Po wykonaniu ćwiczeń uczeń potrafi:

- wyjaśnić, czym jest JSX,
- zapisać podstawową strukturę JSX,
- wstawić dane JavaScript do JSX,
- odczytać dane z obiektu i wyświetlić je w JSX,
- stosować jeden element nadrzędny,
- stosować fragment React,
- poprawnie zapisywać `className`,
- rozpoznać camelCase,
- zamykać znaczniki JSX,
- wyjaśnić deklaratywny sposób tworzenia interfejsu,
- opisać ogólną zasadę działania Virtual DOM,
- rozróżnić SPA i MPA.

---

# 2. Co to jest JSX?

JSX jest składnią wykorzystywaną w React do opisywania interfejsu użytkownika.

Przypomina HTML:

```jsx
<h1>WebTech</h1>
```

ale znajduje się bezpośrednio w kodzie JavaScript.

Przykład komponentu:

```jsx
function App() {
  return (
    <div>
      <h1>WebTech</h1>
      <p>Aplikacja React</p>
    </div>
  );
}

export default App;
```

---

# 3. JavaScript wewnątrz JSX

W JSX możemy umieszczać wartości JavaScript.

Stosujemy do tego:

```text
{ }
```

Przykład:

```jsx
const name = "React";

function App() {
  return (
    <div>
      <h1>{name}</h1>
    </div>
  );
}
```

Na ekranie zobaczymy:

```text
React
```

---

# 4. Kilka zmiennych w JSX

```jsx
function App() {

  const appName = "WebTech";
  const version = "1.0";
  const author = "Jan Kowalski";
  const hours = 30;

  return (
    <div>

      <h1>{appName}</h1>

      <p>Wersja: {version}</p>

      <p>Autor: {author}</p>

      <p>Liczba godzin: {hours}</p>

    </div>
  );
}

export default App;
```

---

# 5. Obiekt w JSX

W poprzedniej lekcji poznaliśmy obiekty.

Możemy wykorzystać taki obiekt:

```javascript
const technology = {
  name: "React",
  category: "frontend",
  hours: 30
};
```

A następnie wyświetlić jego dane:

```jsx
<h2>{technology.name}</h2>

<p>Kategoria: {technology.category}</p>

<p>Liczba godzin: {technology.hours}</p>
```

Zauważ:

```text
technology.name
technology.category
technology.hours
```

to zwykły dostęp do właściwości obiektu JavaScript.

JSX jedynie pozwala wyświetlić wynik za pomocą `{ }`.

---

# 6. Wyrażenia w JSX

W `{ }` możemy umieszczać również proste wyrażenia.

```jsx
<p>{10 + 5}</p>
```

Wynik:

```text
15
```

Przykład:

```jsx
const hours = 20;

<p>Łącznie: {hours + 10}</p>
```

Wynik:

```text
Łącznie: 30
```

---

# 7. Zasada jednego elementu nadrzędnego

Niepoprawnie:

```jsx
return (
  <h1>WebTech</h1>
  <p>Aplikacja React</p>
);
```

Komponent musi zwrócić jedną główną strukturę.

Poprawnie:

```jsx
return (
  <div>
    <h1>WebTech</h1>
    <p>Aplikacja React</p>
  </div>
);
```

---

# 8. Fragment React

Jeżeli nie potrzebujemy dodatkowego elementu `<div>`, możemy zastosować fragment:

```jsx
return (
  <>
    <h1>WebTech</h1>
    <p>Aplikacja React</p>
  </>
);
```

Fragment:

```jsx
<>
</>
```

grupuje elementy bez dodawania kolejnego elementu HTML.

---

# 9. Znaczniki muszą być zamykane

W JSX znaczniki muszą zostać prawidłowo zamknięte.

Poprawnie:

```jsx
<img src="logo.png" />
```

Poprawnie:

```jsx
<input />
```

Nie pozostawiamy niezakończonych znaczników.

---

# 10. `class` a `className`

W HTML:

```html
<div class="panel">
```

W JSX:

```jsx
<div className="panel">
```

Stosujemy:

```text
className
```

---

# 11. camelCase

Wiele właściwości JSX zapisujemy w standardzie camelCase.

HTML:

```text
onclick
maxlength
tabindex
```

JSX:

```text
onClick
maxLength
tabIndex
```

Przykład:

```jsx
<input maxLength={40} />
```

---

# 12. JSX – najważniejsze zasady

Zapamiętaj:

```text
1. JSX przypomina HTML, ale jest używany w JavaScript.

2. JavaScript umieszczamy w { }.

3. Komponent zwraca jeden element nadrzędny.

4. Możemy stosować fragment <> </>.

5. class zapisujemy jako className.

6. Właściwości zapisujemy często w camelCase.

7. Znaczniki muszą być zamknięte.
```

---

# 13. React – podejście deklaratywne

W tradycyjnym podejściu możemy ręcznie zmieniać element strony.

Przykład jQuery:

```javascript
$("#result").text("Wynik: " + value);
```

Programista opisuje tutaj, **jak zmienić element DOM**.

W React:

```jsx
<p>Wynik: {value}</p>
```

Programista opisuje przede wszystkim:

**co ma zostać wyświetlone dla aktualnych danych**.

Takie podejście nazywamy deklaratywnym.

---

# 14. Virtual DOM

React nie wymaga od programisty ręcznego wykonywania każdej aktualizacji elementów strony.

W dużym uproszczeniu:

```text
zmiana danych
↓
nowa reprezentacja interfejsu
↓
porównanie zmian
↓
aktualizacja potrzebnych elementów
```

Mechanizm ten jest związany z procesem renderowania React.

Na tym etapie wystarczy rozumieć zasadę:

**zmieniają się dane → React aktualizuje odpowiedni interfejs.**

---

# 15. SPA i MPA

## MPA – Multi Page Application

W klasycznej aplikacji wielostronicowej przejście pomiędzy stronami może powodować załadowanie nowego dokumentu.

```text
strona 1
↓
nowe żądanie
↓
strona 2
```

## SPA – Single Page Application

W aplikacji typu SPA aplikacja zostaje uruchomiona, a następnie może zmieniać wybrane fragmenty interfejsu bez klasycznego przeładowania całej strony.

React jest często wykorzystywany do tworzenia takich aplikacji.

---

# 16. Projekt WebTech – etap 1

Otwórz:

```text
src/App.jsx
```

Zastąp kod aplikacji:

```jsx
function App() {

  const app = {
    name: "WebTech",
    version: "1.0",
    author: "Twoje imię i nazwisko",
    technologiesCount: 3
  };

  return (
    <div>

      <h1>{app.name}</h1>

      <p>Wersja: {app.version}</p>

      <p>Autor: {app.author}</p>

      <p>
        Liczba technologii: {app.technologiesCount}
      </p>

    </div>
  );
}

export default App;
```

Zwróć uwagę:

```jsx
{app.name}
```

oznacza:

1. pobierz właściwość `name` z obiektu `app`,
2. wyświetl ją w JSX.

---

# 17. Rozbudowa projektu

Dodaj:

```javascript
const technology = {
  name: "React",
  category: "Frontend",
  hours: 30,
  active: true
};
```

Następnie wyświetl:

```text
React
Kategoria: Frontend
Liczba godzin: 30
```

Wartości mają pochodzić z obiektu.

---

# 18. Zadanie samodzielne

Utwórz obiekt:

```javascript
const student = {
  name: "...",
  surname: "...",
  className: "4P",
  specialization: "technik programista"
};
```

Za pomocą JSX wyświetl:

```text
Uczeń: ...
Klasa: ...
Kierunek: ...
```

Nie wolno ponownie wpisywać wartości bezpośrednio w JSX.

Dane mają zostać pobrane z obiektu `student`.

---

# 19. Zadanie dodatkowe

Utwórz obiekt:

```javascript
const course = {
  name: "...",
  teacher: "...",
  hours: ...,
  completed: ...
};
```

Wyświetl wszystkie informacje w sekcji:

```jsx
<section>
...
</section>
```

Zastosuj:

- `<h2>`,
- `<p>`,
- `className`,
- przynajmniej jedno wyrażenie JavaScript w `{ }`.

---

# 20. Pytania kontrolne

1. Czym jest JSX?
2. Jak umieszczamy JavaScript w JSX?
3. Co oznacza `{student.name}`?
4. Dlaczego JSX musi posiadać jeden element nadrzędny?
5. Do czego służy fragment `<> </>`?
6. Dlaczego w JSX stosujemy `className`?
7. Co oznacza camelCase?
8. Czym różni się podejście deklaratywne od ręcznej modyfikacji DOM?
9. Jaka jest ogólna rola Virtual DOM?
10. Jaka jest różnica pomiędzy SPA i MPA?

---