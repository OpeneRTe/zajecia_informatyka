# Python – Ciągi tekstowe (string) i parsowanie liczb po input()

Ten moduł jest bardzo ważny dla początkujących.
Najwięcej błędów w Pythonie wynika właśnie z niezrozumienia różnicy między tekstem a liczbą.

---

# 1) Ciągi tekstowe (string)

## 1.1 Jak zapisujemy tekst?

Tekst w Pythonie zapisujemy w cudzysłowie:

```python
imie = "Rafal"
miasto = "Tarnow"
```

Można używać:

- podwójnych cudzysłowów `" "`
- pojedynczych `' '`

```python
tekst1 = "Python"
tekst2 = 'Python'
```

To jest typ danych: `str` (string).

---

## 1.2 Tekst to nie liczba

Jeśli coś jest w cudzysłowie – to jest tekst, nawet jeśli wygląda jak liczba.

```python
x = "5"
y = 5

print(type(x))  # str
print(type(y))  # int
```

To są dwa różne typy danych.

---

## 1.3 Zachowanie tekstu

Teksty się łączą (konkatenacja):

```python
print("5" + "5")
```

Wynik:
```
55
```

To NIE jest dodawanie matematyczne, tylko łączenie tekstu.

---

# 2) input() – bardzo ważne

Funkcja `input()` ZAWSZE zwraca tekst (`str`).

```python
wiek = input("Podaj wiek: ")
print(type(wiek))
```

Nawet jeśli wpiszesz 18 – Python widzi to jako tekst.

---

# 3) Dlaczego trzeba parsować liczby?

Jeśli chcesz wykonywać działania matematyczne, musisz zamienić tekst na liczbę.

## 3.1 Zamiana na liczbę całkowitą

```python
wiek = int(input("Podaj wiek: "))
print(wiek + 1)
```

## 3.2 Zamiana na liczbę z kropką

```python
waga = float(input("Podaj wage: "))
print(waga * 2)
```

To nazywa się **parsowanie** albo **konwersja typu**.

---

# 4) Najczęstszy błąd uczniów

```python
liczba = input("Podaj liczbe: ")
print(liczba + 10)
```

To spowoduje błąd, ponieważ próbujesz dodać tekst do liczby.

Poprawnie:

```python
liczba = int(input("Podaj liczbe: "))
print(liczba + 10)
```

---

# 5) Szybkie porównanie

| Wpis użytkownika | Bez int() | Z int() |
|------------------|-----------|---------|
| 5                | "5"      | 5       |
| "5" + "5"     | 55        | -       |
| 5 + 5            | -         | 10      |

---

# 6) Podsumowanie – zapamiętaj

- Tekst piszemy w cudzysłowie.
- Jeśli coś jest w cudzysłowie – to jest `str`.
- `input()` zawsze zwraca `str`.
- Do działań matematycznych używamy `int()` lub `float()`.
- Brak konwersji = błąd programu.

---

Ten moduł powinien być opanowany przed pracą z:
- pętlami
- warunkami
- listami
- obliczeniami

