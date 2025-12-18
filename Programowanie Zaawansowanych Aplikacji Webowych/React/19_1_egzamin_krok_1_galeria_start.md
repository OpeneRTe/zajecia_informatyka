# Zadanie egzaminacyjne – Aplikacja webowa (React)

## Opis zadania całościowego

Celem zadania jest wykonanie prostej aplikacji webowej w technologii React, której zadaniem jest wyświetlanie galerii zdjęć na podstawie danych zapisanych w tablicy obiektów.

Aplikacja będzie rozwijana **etapami**, w czterech kolejnych krokach. Każdy krok rozszerza funkcjonalność aplikacji i przybliża ją do pełnej wersji wymaganej w zadaniu egzaminacyjnym.

W ramach całego zadania uczeń:

- utworzy projekt aplikacji React i poprawnie skonfiguruje jego strukturę,
- zaimportuje dane zdjęć z pliku JavaScript w postaci tablicy obiektów,
- wyświetli galerię zdjęć w układzie siatki z użyciem biblioteki Bootstrap,
- doda możliwość filtrowania zdjęć według kategorii przy użyciu przełączników,
- zaimplementuje licznik pobrań aktualizowany po kliknięciu przycisku,
- zastosuje podstawowe elementy interakcji użytkownika oraz poprawne renderowanie danych.

Realizacja zadania została podzielona na cztery kroki:


Każdy krok stanowi logiczną całość i może być realizowany jako osobne zadanie etapowe.

---

# Zadanie 1 (Krok 1) – Projekt startowy i wyświetlenie wszystkich zdjęć

## A. Specyfikacja

### Temat
Aplikacja React – wyświetlenie galerii zdjęć z tablicy danych (bez kategorii).

---

### Cel zadania
Utworzenie projektu aplikacji webowej w technologii React, przygotowanie podstawowej struktury projektu oraz wyświetlenie danych pochodzących z tablicy obiektów w postaci galerii zdjęć, z wykorzystaniem biblioteki Bootstrap do budowy układu strony.

---

### Wymagania funkcjonalne

- Aplikacja składa się z jednego komponentu głównego (np. `App`).
- Komponent pobiera dane zdjęć z osobnego modułu (np. `src/data/photos.js`).
- Wszystkie zdjęcia są wyświetlane w układzie siatki (np. Bootstrap `container`, `row`, `col-*`).
- Pod każdym zdjęciem wyświetlany jest tekst alternatywny (`alt`) lub krótki opis zdjęcia.

---

### Wymagania techniczne

- Utwórz nowy projekt React:
  - Vite + React **lub** Create React App.

- Dodaj bibliotekę Bootstrap:
  - w pliku komponentu głównego zaimportuj styl:
    ```js
    import 'bootstrap/dist/css/bootstrap.css';
    ```

- Pliki graficzne umieść w jednym z katalogów:
  - `src/assets` **lub** `public/assets`.

- Otrzymasz plik `dane.txt` zawierający definicję obiektów zdjęć.
  - Przepisz jego zawartość do pliku `src/data/photos.js` jako **tablicę obiektów**.

- Każdy obiekt w tablicy musi zawierać pola:
  - `id` – unikalny identyfikator liczbowy,
  - `alt` – tekst alternatywny (opis zdjęcia),
  - `filename` – nazwa pliku graficznego,
  - `category` – pole na razie niewykorzystywane,
  - `downloads` – pole na razie niewykorzystywane.

---

### Wymagania dotyczące komponentu głównego

W komponencie głównym aplikacji:

- zaimportuj tablicę danych, np.:
  ```js
  import { photos } from './data/photos';
  ```

- wyrenderuj wszystkie zdjęcia przy użyciu metody `.map()` w JSX,

- ustaw poprawne źródło obrazka, na przykład:
  ```jsx
  src={"assets/" + photo.filename}
  ```
  lub odpowiednią ścieżkę dla katalogu `public/assets`,

- użyj klas Bootstrapa (`container`, `row`, `col-*`) do rozmieszczenia zdjęć w kilku kolumnach.

---

### Pliki do oddania (co najmniej)

- `src/App.jsx` lub `src/App.js` – komponent główny aplikacji,
- `src/data/photos.js` – tablica obiektów ze zdjęciami,
- wszystkie pliki graficzne umieszczone w katalogu `assets/`.

