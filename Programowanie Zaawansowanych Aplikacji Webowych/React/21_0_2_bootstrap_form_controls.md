# Bootstrap 4 – formularze – instrukcja wdrożenia do zadań React (INF.04)

Dokument opisuje standard wdrożenia i stosowania **Bootstrap 4** w zadaniach React opartych o formularze (input, textarea, select, checkbox, radio, submit). Celem jest spójny wygląd, poprawna struktura HTML i zastosowanie właściwych klas.

## 1) Wdrożenie Bootstrap 4 w projekcie React

### Wariant A: import w `main.jsx` / `index.js`
- Zainstaluj bibliotekę:
  - `npm install bootstrap`
- Zaimportuj CSS w pliku wejściowym aplikacji:
  - `import 'bootstrap/dist/css/bootstrap.min.css'`

---

## 2) Standard układu formularza

### Kontener strony
- Cały formularz umieszczaj w kontenerze:
  - `container`
- Dodaj czytelne odstępy:
  - `py-4`

Minimalna rama:
- `div.container.py-4`
- nagłówek `h1` / `h2`
- `form`

---

## 3) Standard budowy pojedynczego pola

### Pole tekstowe / e-mail / hasło
Każde pole opakuj w:
- `form-group`

Etykieta:
- `label` + `htmlFor`

Pole:
- `input` z klasą `form-control`

Wymagany minimalny wzorzec:
- `div.form-group`
  - `label.form-label`
  - `input.form-control`

Zasady:
- dla `input` zawsze ustaw `id`
- `label` zawsze łącz z polem przez `htmlFor`

---

## 4) Textarea

### Klasy
- `textarea` zawsze z klasą `form-control`
- całość w `form-group`

Minimalny wzorzec:
- `div.form-group`
  - `label.form-label`
  - `textarea.form-control`

---

## 5) Select

### Klasy
- `select` zawsze z klasą `form-control`
- całość w `form-group`

Minimalny wzorzec:
- `div.form-group`
  - `label.form-label`
  - `select.form-control`

---

## 6) Checkbox

### Klasy
- kontener: `form-check`
- input: `form-check-input`
- label: `form-check-label`

Minimalny wzorzec:
- `div.form-check`
  - `input.form-check-input`
  - `label.form-check-label`

Uwagi:
- checkbox nie używa `form-control`
- jeśli checkboxów jest kilka, każdy ma osobny `form-check`

---

## 7) Radio

### Klasy
- kontener: `form-check`
- input: `form-check-input`
- label: `form-check-label`

Minimalny wzorzec:
- `div.form-check`
  - `input.form-check-input`
  - `label.form-check-label`

Uwagi:
- grupa radio ma wspólne `name`
- wartość wybrana jest trzymana w stanie React

---

## 8) Przyciski

### Klasy
- zawsze `btn`
- warianty (dobierz do akcji):
  - `btn-primary` (główna akcja: Zapisz / Wyślij)
  - `btn-success` (potwierdzenie / OK)
  - `btn-danger` (Usuń / Reset)
  - `btn-secondary` (akcje poboczne)

Odstępy:
- najczęściej `mt-3` lub `mt-4`

Opcjonalnie:
- `btn-block` (pełna szerokość)

---

## 9) Komunikaty i walidacja (wizualnie)

### Komunikaty tekstowe
- błąd: `text-danger`
- sukces: `text-success`
- informacja neutralna: `text-muted`

### Walidacja pól `form-control`
- błąd pola: dodaj klasę `is-invalid`
- poprawne pole: dodaj klasę `is-valid`

Zasada:
- klasy walidacyjne dodawaj warunkowo w React (na podstawie stanu błędów).

---

## 10) Wymagania Bootstrap do każdego zadania formularzowego (checklista)

Uczeń ma obowiązkowo zastosować:
- `container py-4` jako wrapper całej strony
- dla każdego `input`, `textarea`, `select`:
  - `form-group`
  - `label` połączony z polem przez `htmlFor`/`id`
  - `form-control` na kontrolce
- dla `checkbox` i `radio`:
  - `form-check`
  - `form-check-input`
  - `form-check-label`
- przycisk akcji:
  - `btn` + wariant (`btn-primary` lub inny właściwy)
  - sensowne odstępy (`mt-3`/`mt-4`)
- komunikaty walidacji:
  - `text-danger` (gdy błąd)
  - opcjonalnie `is-invalid` na polu

---

## 11) Minimalny układ referencyjny (do kopiowania struktury)

Poniższa struktura ma być odwzorowana w każdym zadaniu z formularzem (bez narzucania logiki React):

- `div.container.py-4`
  - `h1` / `h2`
  - `form`
    - `div.form-group` (dla input/textarea/select)
    - `div.form-check` (dla checkbox/radio)
    - `button.btn.btn-primary.mt-3`



