liczba = int(input("Podaj liczbę całkowitą: "))

print("Cyfry liczby " + str(liczba) + " od ostaniej to:")

if liczba == 0:
    print(0)
else:
    while liczba != 0:
        cyfra = liczba % 10
        print(cyfra)
        liczba = (liczba - cyfra) // 10

input("\nNaciśnij Enter, aby zakończyć...")
# Program wyodrębnia i wypisuje cyfry podanej liczby całkowite