# Sprawdza, czy liczby od 1 do podanej liczby są parzyste czy nieparzyste
# i wypisuje odpowiedni komunikat.

liczba = 10

for i in range(1, liczba + 1):
    if i % 2 == 0:
        print(f"{i} jest parzysta")
    else:
        print(f"{i} jest nieparzysta")

while liczba > 0:
    if liczba % 2 == 0:
        print(f"{liczba} jest parzysta")
    else:
        print(f"{liczba} jest nieparzysta")
    liczba -= 1


# Koniec programu