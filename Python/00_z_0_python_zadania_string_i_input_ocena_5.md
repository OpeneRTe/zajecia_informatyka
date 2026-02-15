# Python – Zadania: Ciągi tekstowe (string) i parsowanie liczb po input()

---

# CZĘŚĆ A – Rozumienie typów danych

## Zadanie 1 – Jaki to typ?

Dla każdego przykładu napisz, jaki to typ danych (`str`, `int`, `float`, `bool`):

```python
a = "15"
b = 15
c = 15.0
d = "Python"
e = True
```

---

## Zadanie 2 – Co zostanie wypisane?

Przewidź wynik programu:

```python
print("5" + "5")
```

---

```python
print(5 + 5)
```

---

```python
x = "10"
print(x + "5")
```

---

```python
x = 10
print(x + 5)
```

---

# CZĘŚĆ B – input() i parsowanie

## Zadanie 3 – Co tu jest nie tak?

Znajdź błąd i popraw kod:

```python
liczba = input("Podaj liczbe: ")
print(liczba + 10)
```

---

## Zadanie 4 – Popraw program

Program ma obliczyć pole kwadratu.

```python
bok = input("Podaj dlugosc boku: ")
pole = bok * bok
print("Pole wynosi:", pole)
```

Dlaczego program nie działa poprawnie?
Popraw go.

---

## Zadanie 5 – Dwie liczby

Napisz program, który:
- pobiera dwie liczby
- wypisuje ich sumę

(Uwaga: pamiętaj o konwersji typu.)

---

# CZĘŚĆ C – Myślenie logiczne

## Zadanie 6 – Tekst czy liczba?

Co wypisze program?

```python
liczba = input("Podaj liczbe: ")
print(type(liczba))
```

Wyjaśnij dlaczego.

---

## Zadanie 7 – Imię i wiek

Napisz program, który:
- pobiera imię
- pobiera wiek
- wypisuje:

```
Czesc Jan, masz 18 lat.
```

(Uwaga: wiek ma być liczbą w programie.)

---

# CZĘŚĆ D – Zadania rozszerzające

## Zadanie 8 – Zaliczone / Niezaliczone

Program ma:
- pobrać liczbę punktów
- wypisać "Zaliczone", jeśli liczba punktów ≥ 50
- wypisać "Niezaliczone", jeśli liczba punktów < 50

---

## Zadanie 9 – Co tu się stanie?

```python
x = input("Podaj liczbe: ")
y = int(x)
print(x + y)
```

Czy program zadziała? Wyjaśnij.

---

## Zadanie 10 – Bonus

Użytkownik wpisuje dwie liczby oddzielone spacją, np.:

```
10 20
```

Program ma:
- pobrać tekst
- rozdzielić go
- zamienić na liczby
- wypisać ich sumę

---

# Instrukcja dla ucznia

- Zwracaj uwagę na typ danych.
- Pamiętaj: `input()` zawsze zwraca tekst.
- Jeśli wykonujesz działania matematyczne – użyj `int()` lub `float()`.
- Czytaj komunikaty błędów – one wskazują problem z typem danych.

