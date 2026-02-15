# Python – pętle `for` i `while` (tutorial + przykłady)

Po tym materiale będziesz umieć:
- rozumieć czym jest pętla
- używać pętli `for`
- używać pętli `while`
- kontrolować pętlę za pomocą `break` i `continue`

---

# 1) Co to jest pętla?

**Pętla** to mechanizm, który pozwala wykonać ten sam fragment kodu wiele razy.

Zamiast pisać:

```python
print("Cześć")
print("Cześć")
print("Cześć")
```

możemy użyć pętli.

---

# 2) Pętla `for`

Pętla `for` służy do przechodzenia po elementach (np. liczbach, liście, tekście).

## Składnia

```python
for zmienna in zakres:
    # kod wykonywany wielokrotnie
```

---

## 2.1 for z range()

`range()` generuje liczby.

### Przykład 1 – od 0 do 4

```python
for i in range(5):
    print(i)
```

Wynik:
```
0
1
2
3
4
```

---

### Przykład 2 – od 1 do 5

```python
for i in range(1, 6):
    print(i)
```

---

### Przykład 3 – co 2

```python
for i in range(0, 11, 2):
    print(i)
```

Parametry `range(start, stop, krok)`:
- start – od czego
- stop – do (nie wlicza tej liczby)
- krok – co ile

---

## 2.2 for – przykład praktyczny

### Program: wypisz 5 razy swoje imię

```python
imie = input("Podaj imie: ")

for i in range(5):
    print(imie)
```

---

### Program: suma liczb od 1 do 10

```python
suma = 0

for i in range(1, 11):
    suma = suma + i

print("Suma wynosi:", suma)
```

---

# 3) Pętla `while`

Pętla `while` działa tak długo, jak długo warunek jest prawdziwy.

## Składnia

```python
while warunek:
    # kod wykonywany dopóki warunek jest True
```

---

## 3.1 while – przykład podstawowy

```python
i = 0

while i < 5:
    print(i)
    i = i + 1
```

UWAGA: jeśli zapomnisz zwiększać zmienną (`i = i + 1`), powstanie **nieskończona pętla**.

---

## 3.2 Program z while – zgadywanie liczby

```python
liczba = 7
odpowiedz = 0

while odpowiedz != liczba:
    odpowiedz = int(input("Zgadnij liczbe: "))

print("Brawo!")
```

Pętla działa dopóki użytkownik nie zgadnie liczby.

---

# 4) break i continue

## break – przerywa pętlę

```python
for i in range(10):
    if i == 5:
        break
    print(i)
```

Pętla zatrzyma się przy 5.

---

## continue – pomija jedną iterację

```python
for i in range(6):
    if i == 3:
        continue
    print(i)
```

Nie wypisze liczby 3.

---

# 5) for vs while – różnica

## Używaj `for`, gdy:
- wiesz ile razy coś ma się wykonać
- przechodzisz po zakresie lub liście

## Używaj `while`, gdy:
- nie wiesz ile razy pętla się wykona
- zależy to od warunku (np. od użytkownika)

---

# 6) Mini‑tutorial – program łączony

## Cel
- program pyta ile liczb chcesz dodać
- następnie pobiera liczby
- oblicza sumę

```python
ile = int(input("Ile liczb chcesz dodac? "))
suma = 0

for i in range(ile):
    liczba = int(input("Podaj liczbe: "))
    suma = suma + liczba

print("Suma wynosi:", suma)
```

---

# 7) Ćwiczenia do samodzielnego wykonania

1. Wypisz liczby od 10 do 1 używając `for`.
2. Wypisz wszystkie liczby parzyste od 0 do 20.
3. Napisz program z `while`, który będzie pytał o hasło, dopóki użytkownik nie wpisze "python".
4. Oblicz silnię liczby podanej przez użytkownika (np. 5! = 120).

---

# 8) Najczęstsze błędy

- brak zwiększania zmiennej w `while`
- złe wcięcia
- użycie `=` zamiast `==` w warunku
- zapomnienie konwersji `int(input())`

---

To jest podstawa pętli w Pythonie. Po opanowaniu tego możesz przejść do:
- list
- pętli zagnieżdżonych
- pracy na danych

