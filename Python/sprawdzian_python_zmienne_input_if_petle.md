# 🧪 SPRAWDZIAN – PYTHON
**Temat:** zmienne, input, typy danych, instrukcje warunkowe, pętle  
**Czas:** 45 min  

---

# 📘 CZĘŚĆ A – TEST WIEDZY

## Zadanie 1 – Typy danych  
Podaj typ danych (`str`, `int`, `float`, `bool`):

```python
a = "10"
b = 10
c = 10.5
d = False
e = "Python"
```

---

## Zadanie 2 – Co wypisze program?

```python
print("5" + "5")
```

```python
print(5 + 5)
```

```python
x = "10"
print(x + "5")
```

```python
x = 10
print(x + 5)
```

---

## Zadanie 3 – input()

Co zwróci funkcja `input()` i dlaczego?

```python
wiek = input("Podaj wiek: ")
print(type(wiek))
```

---

## Zadanie 4 – Błąd w programie

Znajdź błąd i popraw kod:

```python
liczba = input("Podaj liczbe: ")
print(liczba + 10)
```

---

## Zadanie 5 – if / else

Co zrobi ten program?

```python
wiek = 17

if wiek >= 18:
    print("Pelnoletni")
else:
    print("Niepelnoletni")
```

---

## Zadanie 6 – Pętla for

Co wypisze program?

```python
for i in range(1, 5):
    print(i)
```

---

## Zadanie 7 – Pętla while

Co jest błędem w tym kodzie?

```python
i = 0
while i < 5:
    print(i)
```

---

## Zadanie 8 – Logika

Co wypisze program?

```python
x = input("Podaj liczbe: ")
y = int(x)
print(x + y)
```

Wyjaśnij.

---

# 💻 CZĘŚĆ B – ZADANIE PRAKTYCZNE

## 🟢 Zadanie główne (ocena dostateczna – dobra)

Napisz program w Pythonie, który:

- pobiera od użytkownika:
  - imię  
  - wiek  
  - liczbę punktów  

- wypisuje:

```
Czesc Jan, masz 17 lat.
```

- następnie:

- jeśli wiek ≥ 18 → wypisz:  
  `Mozesz wejsc na wydarzenie`

- jeśli wiek < 18 → wypisz:  
  `Nie mozesz wejsc`

- oraz:

- jeśli punkty ≥ 50 → wypisz:  
  `Zaliczone`

- jeśli punkty < 50 → wypisz:  
  `Niezaliczone`

---

## 🟡 Rozszerzenie (ocena bardzo dobra)

Dodaj pętlę `for`, która:

- wypisze liczby od 1 do podanej liczby punktów

---

## 🔴 Rozszerzenie (ocena celująca)

Dodaj program:

- pyta użytkownika o liczbę prób  
- w pętli `while` pobiera liczby  
- oblicza sumę wszystkich liczb  
- na końcu wypisuje wynik

---

# ✅ Wskazówki dla ucznia

- `input()` zawsze zwraca tekst  
- użyj `int()` do liczb  
- pamiętaj o wcięciach w `if` i `while`  
- uważaj na `"5" + "5"` vs `5 + 5`  

