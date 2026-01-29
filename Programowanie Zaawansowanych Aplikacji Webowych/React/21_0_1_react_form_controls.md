# React – formularze

## Zadanie 1 – Submit formularza (react_forms_submit)
[Submit w3Schools](https://www.w3schools.com/react/react_forms_submit.asp)

### Temat
Formularz „Dodaj użytkownika” z potwierdzeniem wysłania.

### Wymagania
- W komponencie `App` utwórz stan `name` (string).
- Wyświetl formularz z:
  - polem tekstowym `Imię`
  - przyciskiem `Zapisz`
- Po kliknięciu `Zapisz`:
  - zablokuj przeładowanie strony (submit bez odświeżenia),
  - pokaż pod formularzem komunikat: `Zapisano użytkownika: {name}`
- Jeżeli pole jest puste:
  - pokaż komunikat błędu: `Imię jest wymagane`
  - nie wyświetlaj komunikatu „Zapisano…”

### Oczekiwany efekt
Uczeń rozumie: `onSubmit`, `preventDefault`, odczyt stanu w momencie wysłania.

---

## Zadanie 2 – Textarea (react_forms_textarea)
[Textarea w3Schools](https://www.w3schools.com/react/react_forms_textarea.asp)

### Temat
Formularz „Opis produktu” z licznikiem znaków.

### Wymagania
- Utwórz stan `description`.
- Wyświetl:
  - `textarea` z etykietą `Opis produktu`
  - licznik znaków pod polem: `Liczba znaków: X`
- Ustaw ograniczenie: maksimum `120` znaków.
- Jeżeli uczeń przekroczy limit:
  - pokaż komunikat `Przekroczono limit 120 znaków`
  - przycisk `Zapisz` ma być zablokowany (`disabled`)

### Oczekiwany efekt
Uczeń rozumie: `textarea` jako kontrolka kontrolowana, reakcja na długość tekstu.

---

## Zadanie 3 – Select (react_forms_select)
[Select w3Schools](https://www.w3schools.com/react/react_forms_select.asp)

### Temat
Wybór kategorii dla ogłoszenia.

### Wymagania
- Utwórz stan `category`.
- Wyświetl `select` z opcjami:
  - `Wybierz kategorię` (wartość pusta)
  - `Elektronika`
  - `Dom i ogród`
  - `Motoryzacja`
- Pod selectem wyświetl:
  - jeżeli nic nie wybrano: `Nie wybrano kategorii`
  - jeżeli wybrano: `Wybrana kategoria: ...`
- Po wysłaniu formularza (`submit`):
  - pokaż alert albo tekst pod formularzem: `Ogłoszenie zapisane w kategorii: ...`
- Nie pozwalaj wysłać formularza, jeśli kategoria nie jest wybrana.

### Oczekiwany efekt
Uczeń rozumie: `select`, `value`, `onChange`, walidacja wyboru.

---

## Zadanie 4 – Checkbox (react_forms_checkbox)
[Checkbox w3Schools](https://www.w3schools.com/react/react_forms_checkbox.asp)

### Temat
Panel filtrów ofert (2 checkboxy).

### Wymagania
- Utwórz stan obiektu `filters` z polami:
  - `onlyAvailable` (boolean)
  - `freeDelivery` (boolean)
- Wyświetl dwa checkboxy:
  - `Tylko dostępne`
  - `Darmowa dostawa`
- Pod spodem wyświetl listę aktywnych filtrów:
  - jeśli żaden nie jest zaznaczony: `Brak filtrów`
  - jeśli zaznaczone: wypisz nazwy aktywnych filtrów w punktach
- Dodaj przycisk `Wyczyść filtry`, który ustawia oba na `false`.

### Oczekiwany efekt
Uczeń rozumie: `checked`, booleany w stanie, aktualizacja pól obiektu.

---

## Zadanie 5 – Radio (react_forms_radio)
[Radio w3Schools](https://www.w3schools.com/react/react_forms_radio.asp)

### Temat
Wybór sposobu płatności (jedna opcja).

### Wymagania
- Utwórz stan `payment`.
- Wyświetl grupę radio:
  - `Karta`
  - `BLIK`
  - `Przelew`
- Pod grupą pokaż:
  - jeśli nic nie wybrano: `Wybierz sposób płatności`
  - jeśli wybrano: `Wybrano: ...`
- Po kliknięciu `Zamów` (submit):
  - zablokuj wysyłkę, jeśli nie wybrano opcji
  - jeśli wybrano: pokaż komunikat `Zamówienie złożone. Płatność: ...`


