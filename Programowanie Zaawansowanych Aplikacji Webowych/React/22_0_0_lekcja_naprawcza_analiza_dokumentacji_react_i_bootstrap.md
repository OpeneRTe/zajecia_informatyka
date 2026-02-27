# Lekcja naprawcza
## Jak analizować dokumentację i rozumieć kod (React + Bootstrap)


Cel: rozwinięcie umiejętności samodzielnej analizy dokumentacji technicznej i rozumienia mechanizmów kodu.

---

# CZĘŚĆ I – Zasady pracy

Podczas zajęć:
- korzystamy wyłącznie z oficjalnej dokumentacji:
  - React (react.dev) - ewentualnie w3schools.com
  - Bootstrap (getbootstrap.com)
- każda odpowiedź musi zawierać:
  - link do źródła wklejony do zadania z classroom,
  - cytat z dokumentacji napisany na kartce,
  - własne wyjaśnienie.

---

# CZĘŚĆ II – Zadanie 1
## React – Renderowanie warunkowe

Dany fragment kodu:

```jsx
{checked ? "Aktywne" : "Nieaktywne"}
```

### Wykonaj:

1. Znajdź w oficjalnej dokumentacji React/w3schools sekcję dotyczącą conditional rendering.
2. Wklej link do strony.
3. Napisz wyjaśnienie działanie operatora warunkowego.
4. Wyjaśnij własnymi słowami:
   - co oznacza znak `?`
   - co oznacza znak `:`
   - kiedy wyświetli się pierwszy element.
5. Zmień przykład tak, aby zamiast tekstu wyświetlał:

```jsx
<span className="text-success">OK</span>
<span className="text-danger">Błąd</span>
```

6. Przepisz powyższy warunek bez użycia operatora trójargumentowego (użyj `if` poza JSX).

---

# CZĘŚĆ III – Zadanie 2
## React – useState

Dany kod:

```jsx
const [count, setCount] = useState(0);
```

### Wykonaj:

1. Znajdź w dokumentacji React/w3schools opis hooka `useState`.
2. Wklej link do źródła.
3. Odpowiedz:
   - co zwraca funkcja `useState`?
   - czym jest `count`?
   - czym jest `setCount`?
4. Zmień wartość początkową na 10.
5. Wyjaśnij, dlaczego poniższy zapis jest błędny:

```jsx
count = count + 1;
```

Odpowiedź musi zawierać uzasadnienie oparte na dokumentacji.

---

# CZĘŚĆ IV – Zadanie 3
## Analiza błędu

Dany kod:

```jsx
<button onClick={setCount(count + 1)}>+</button>
```

### Wykonaj:

1. Znajdź w dokumentacji React informację dotyczącą przekazywania funkcji do `onClick`.
2. Wyjaśnij, dlaczego powyższy kod jest niepoprawny.
3. Popraw kod.
4. Wskaż fragment dokumentacji, który potwierdza poprawne rozwiązanie.

---

# CZĘŚĆ V – Zadanie 4
## Bootstrap – Komponent Card

### Wykonaj:

1. Znajdź w dokumentacji Bootstrap sekcję dotyczącą komponentu `Card`.
2. Wypisz:
   - klasę tworzącą kartę,
   - klasę dla nagłówka,
   - klasę dla treści,
   - klasę dla przycisku.
3. Zbuduj minimalną kartę zawierającą:
   - tytuł,
   - tekst,
   - przycisk.
4. Wklej link do przykładu, na którym się wzorowałeś.

---

# CZĘŚĆ VI – Zadanie refleksyjne

Odpowiedz pisemnie:

1. Czym różni się kopiowanie kodu od rozumienia kodu?
2. Jakie kroki należy wykonać, gdy nie rozumiesz fragmentu kodu?
3. Dlaczego dokumentacja jest ważniejsza niż gotowa odpowiedź wygenerowana przez AI?

---

# Kryteria zaliczenia

Uczeń:
- potrafi wskazać właściwe źródło w dokumentacji,
- potrafi wyjaśnić mechanizm własnymi słowami,
- potrafi przekształcić przykład,
- potrafi poprawić błędny kod i uzasadnić poprawkę.

Celem jest nauczenie się samodzielnego analizowania i rozumienia problemu.

---

# CZĘŚĆ VII – Dlaczego w JSX nie stosujemy klasycznego if?

## Problem

Błęny zapis w JSX:

```jsx
if (checked) {
  return "Aktywne";
} else {
  return "Nieaktywne";
}
```

lub próba`if` bezpośrednio wewnątrz JSX.

## Wyjaśnienie techniczne

W JSX można umieszczać wyrażenia (expressions), ale nie instrukcje (statements).

Instrukcja `if` jest instrukcją sterującą (statement), a nie wyrażeniem.
Operator trójargumentowy jest wyrażeniem — dlatego może być używany w JSX.

### Zadanie analityczne

1. Znajdź w dokumentacji React informację o tym, że JSX przyjmuje wyrażenia.
2. Wskaż fragment dokumentacji mówiący o conditional rendering.
3. Odpowiedz:
   - czym różni się expression od statement?
   - dlaczego `if` nie może zostać użyty bezpośrednio w JSX?

---

## Kiedy stosujemy if?

`if` stosujemy:

- poza JSX,
- przed instrukcją `return`,
- gdy logika jest bardziej rozbudowana.

Przykład poprawny:

```jsx
let status;

if (checked) {
  status = "Aktywne";
} else {
  status = "Nieaktywne";
}

return <div>{status}</div>;
```

### Zadanie

Przepisz warunek trójargumentowy na wersję z `if` poza JSX.
Wyjaśnij, która wersja jest bardziej czytelna i dlaczego.

---

# CZĘŚĆ VIII – Wykorzystanie warunku w Bootstrap Switch

Rozważ kod przełącznika (Bootstrap switch):

```jsx
<input
  type="checkbox"
  className="form-check-input"
  checked={checked}
  onChange={() => setChecked(!checked)}
/>
```

oraz fragment wyświetlania:

```jsx
{checked ? (
  <span className="text-success">Włączone</span>
) : (
  <span className="text-danger">Wyłączone</span>
)}
```

## Zadanie analityczne

1. Znajdź w dokumentacji React informację o controlled components.
2. Wyjaśnij:
   - dlaczego używamy `checked={checked}`?
   - co robi `onChange`?
3. Znajdź w dokumentacji Bootstrap sekcję dotyczącą switch (`form-switch`) - wklej screen do ClassRoom.
4. Wskaż klasy odpowiedzialne za styl przełącznika.
5. Wyjaśnij, dlaczego zmiana stanu powoduje ponowne renderowanie komponentu.

---

# Zadanie końcowe – Dowód z dokumentacji

Uczeń ma przygotować krótką analizę:

- link do dokumentacji React (conditional rendering),
- link do dokumentacji React (useState),
- link do dokumentacji Bootstrap (switch),
- po jednym cytacie z każdego źródła,
- własne wyjaśnienie mechanizmu.

Bez linków i cytatów odpowiedź nie jest zaliczona.

---



