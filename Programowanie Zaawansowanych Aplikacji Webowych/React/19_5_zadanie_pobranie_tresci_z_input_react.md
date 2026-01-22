# Zadanie praktyczne – pobranie treści z pola tekstowego (input)

## Cel

- Pobranie aktualnej treści wpisywanej przez użytkownika w polu tekstowym.
- Zapisanie tej treści w stanie komponentu.
- Wyświetlenie tej treści pod polem tekstowym.
- Wykonanie akcji po kliknięciu przycisku „Zapisz”, która kopiuje bieżącą treść do osobnej wartości „zatwierdzonej”.

## Wymagania funkcjonalne

- Na stronie ma być pole tekstowe `input` typu `text`.
- Pod polem ma być widoczny napis: **Podgląd:** oraz aktualna wartość wpisywana w `input`.
- Ma być przycisk **Zapisz**.
- Po kliknięciu **Zapisz**:
  - aktualna treść z `input` ma zostać zapisana jako „zatwierdzona”
  - pod podglądem ma się pojawić napis: **Zatwierdzone:** oraz ostatnia zatwierdzona treść
- Ma być przycisk **Wyczyść**.
- Po kliknięciu **Wyczyść**:
  - pole `input` ma zostać ustawione na pusty tekst
  - „zatwierdzona” treść ma zostać ustawiona na pusty tekst

## Wymagania techniczne

- Projekt w React.
- Dane mają być przechowywane w `useState`.
- Pole `input` ma być kontrolowane (wartość pola pochodzi ze stanu).
- Zmiana w polu ma być obsłużona zdarzeniem `onChange`.

## Krótka wskazówka (dla pierwszego zadania z tekstem)

- Pole `input` reaguje na zdarzenie `onChange`.
- Przy każdej zmianie tekstu React wywołuje funkcję obsługującą to zdarzenie.
- Z obiektu zdarzenia można pobrać aktualny tekst wpisany przez użytkownika.
- Ten tekst należy zapisać do stanu komponentu.
- Wartość zapisana w stanie można wyświetlić w JSX.

---

## Wskazówki implementacyjne

- Utwórz dwie zmienne stanu:
  - `text` – aktualna treść wpisywana w polu
  - `savedText` – ostatnio zatwierdzona treść

- W obsłudze `onChange`:
  - pobierz obiekt zdarzenia
  - odczytaj `e.target.value`
  - ustaw `text` na tę wartość

- W obsłudze przycisku **Zapisz**:
  - ustaw `savedText` na aktualne `text`

- W obsłudze przycisku **Wyczyść**:
  - ustaw `text` na pusty tekst
  - ustaw `savedText` na pusty tekst

## Przykładowy fragment kodu (do analizy, nie do przepisywania na pamięć)

```jsx
import { useState } from 'react'

function App() {
  const [text, setText] = useState('')

  const handleChange = (e) => {
    setText(e.target.value)
  }

  return (
    <div className="container mt-4">
      <input
        type="text"
        className="form-control"
        value={text}
        onChange={handleChange}
        placeholder="Wpisz tekst"
      />

      <p className="mt-3">
        <strong>Podgląd:</strong> {text}
      </p>
    </div>
  )
}

export default App
```

---

## Warunki zaliczenia

- Podgląd aktualnej treści działa podczas pisania (bez odświeżania strony).
- Przycisk **Zapisz** zapisuje treść do „zatwierdzonej” wartości.
- Przycisk **Wyczyść** czyści oba stany i pole input.
- Nie ma błędów w konsoli przeglądarki.

