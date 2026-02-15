# Python – zmienne, input, print, if-else (teoria + mini‑tutorial)

Ten materiał jest dla początkujących. Po przerobieniu będziesz umieć:
- zapisywać dane w zmiennych
- wczytywać dane od użytkownika (`input`)
- wypisywać wyniki (`print`)
- podejmować decyzje w programie (`if`, `else`, opcjonalnie `elif`)

---

## 1) Zmienne

**Zmienna** to „pudełko” na dane. Nadajesz jej nazwę i przypisujesz wartość.

### Przykłady

```python
imie = "Jan"
wiek = 17
wzrost = 1.76
czy_uczen = True
```

### Zasady nazw
- używaj małych liter i podkreśleń: `liczba_punktow`
- nie zaczynaj od cyfry: ❌ `1abc`
- bez polskich znaków (najbezpieczniej): `imie`, `nazwisko`

### Typy danych (najczęstsze)
- `str` – tekst, np. `"Ala"`
- `int` – liczba całkowita, np. `12`
- `float` – liczba z kropką, np. `3.14`
- `bool` – prawda/fałsz, czyli `True` albo `False`

Możesz sprawdzić typ:

```python
x = 10
print(type(x))
```

---

## 2) print – wypisywanie na ekran

`print()` pokazuje tekst lub wyniki w konsoli.

### Przykłady

```python
print("Czesc!")
print(123)
```

### Łączenie tekstu z liczbą – najprościej

Najwygodniej używać **f-string**:

```python
imie = "Rafal"
wiek = 17
print(f"Mam na imie {imie} i mam {wiek} lat.")
```

---

## 3) input – wczytywanie danych od użytkownika

`input()` **zawsze zwraca tekst** (`str`), nawet jeśli wpiszesz liczbę.

### Przykład (tekst)

```python
imie = input("Podaj imie: ")
print(f"Hej, {imie}!")
```

### Przykład (liczba)

Jeśli chcesz liczbę, musisz zamienić tekst na `int` lub `float`:

```python
wiek = int(input("Podaj wiek: "))
print(f"Za rok bedziesz miec {wiek + 1} lat.")
```

Uwaga:
- `int(...)` działa dla liczb całkowitych, np. `12`
- `float(...)` działa dla liczb z kropką, np. `12.5`

---

## 4) if-else – decyzje w programie

Instrukcja warunkowa pozwala programowi „zdecydować”, co zrobić.

### Składnia

```python
if warunek:
    # kod, gdy warunek jest True
else:
    # kod, gdy warunek jest False
```

**Ważne:** w Pythonie liczą się wcięcia (zwykle 4 spacje).

### Przykład 1 – pełnoletność

```python
wiek = int(input("Podaj wiek: "))

if wiek >= 18:
    print("Jestes pelnoletni.")
else:
    print("Nie jestes pelnoletni.")
```

### Operatory porównań
- `==` równe
- `!=` różne
- `>` większe
- `<` mniejsze
- `>=` większe lub równe
- `<=` mniejsze lub równe

### Operatory logiczne
- `and` – i
- `or` – lub
- `not` – nie

Przykład:

```python
temp = float(input("Podaj temperature: "))

if temp >= 36.6 and temp <= 37.5:
    print("Temperatura w normie.")
else:
    print("Poza norma (orientacyjnie).")
```

### elif (opcjonalnie) – więcej niż 2 możliwości

```python
ocena = int(input("Podaj ocene 1-6: "))

if ocena == 6:
    print("Celujacy")
elif ocena == 5:
    print("Bardzo dobry")
elif ocena == 4:
    print("Dobry")
elif ocena == 3:
    print("Dostateczny")
elif ocena == 2:
    print("Dopuszczajacy")
elif ocena == 1:
    print("Niedostateczny")
else:
    print("To nie jest ocena 1-6.")
```

---

## 5) Mini‑tutorial: zrób swój pierwszy program krok po kroku

### Cel programu
- zapyta o imię
- zapyta o wiek
- powie, czy możesz wejść na seans 18+

### Krok 1 – imię i powitanie

```python
imie = input("Podaj imie: ")
print(f"Witaj, {imie}!")
```

### Krok 2 – wiek jako liczba

```python
wiek = int(input("Podaj wiek: "))
print(f"Masz {wiek} lat.")
```

### Krok 3 – decyzja if-else

```python
if wiek >= 18:
    print("Mozesz wejsc na seans 18+.")
else:
    print("Nie mozesz wejsc na seans 18+.")
```

### Finalna wersja (całość)

```python
imie = input("Podaj imie: ")
wiek = int(input("Podaj wiek: "))

print(f"Witaj, {imie}!")

if wiek >= 18:
    print("Mozesz wejsc na seans 18+.")
else:
    print("Nie mozesz wejsc na seans 18+.")
```

---

## 6) Najczęstsze błędy i szybkie naprawy

- **Błąd:** porównujesz tekst z liczbą
  - `wiek = input(...)` i potem `if wiek >= 18` → to się wywali
  - **Naprawa:** `wiek = int(input(...))`

- **Błąd:** użycie `=` zamiast `==`
  - ❌ `if x = 10:`
  - ✅ `if x == 10:`

- **Błąd:** brak wcięć
  - Python wymaga wcięć w `if/else`

---

## 7) Krótkie ćwiczenia (do samodzielnej praktyki)

- Napisz program, który pobiera dwie liczby i wypisuje większą.
- Napisz program, który pyta o liczbę punktów i wypisuje:
  - `"Zaliczone"`, jeśli punktów jest co najmniej 50
  - `"Niezaliczone"`, jeśli mniej niż 50
- Napisz program, który pyta o temperaturę i wypisuje:
  - `"Zimno"` gdy < 10
  - `"OK"` gdy 10–24
  - `"Goraco"` gdy >= 25

