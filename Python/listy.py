
# Listy w jezyku Python to wbudowany typ danych, który reprezentuje uporządkowaną kolekcję elementów. Listy są mutowalne, co oznacza, że można je modyfikować po ich utworzeniu. Oto kilka podstawowych operacji na listach w Pythonie:

# Tworzenie listy

# dostęp do pojedynczego elementu listy
# print(my_list[6])

#długość listy
# print(len(my_list))  # Output: 10



my_list = [1, 2, 3, 4, 5, 23, 45, 67, 89, 90]

my_list[9] = 67

def print_list(lst):
    for i in range(len(lst)):
        print(lst[i])

print_list(my_list)
