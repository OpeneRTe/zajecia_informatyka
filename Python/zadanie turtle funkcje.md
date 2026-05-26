# Treść zadania: Rysowanie wielokątów z Python Turtle

Twoim zadaniem jest napisanie programu w języku Python z wykorzystaniem modułu turtle, który narysuje na ekranie kilka różnych wielokątów.

## Podziel swój kod na dwie główne funkcje:

### 1. Funkcja wielokat(kolor, ilosc_bokow)

Napisz funkcję, która:Przyjmuje dwa parametry: kolor (określający kolor wypełnienia figury oraz jej obrysu) oraz ilosc_bokow.Rysuje wielokąt foremny o podanej liczbie boków.Wskazówka: Aby żółw narysował odpowiednią figurę, kąt o jaki musi się obracać w każdym wierzchołku wynosi \(360^\circ \div \text{ilość boków}\). Oblicz długość boku tak, aby figury były wyraźne (np. o długości 50 lub 100 pikseli).Użyj funkcji begin_fill() przed rysowaniem i end_fill() po narysowaniu, aby wielokąt był wypełniony kolorem.

### 2. Funkcja rysuj_scene()

Napisz drugą funkcję, która:Nie przyjmuje żadnych argumentów.Używa funkcji wielokat stworzonej w poprzednim kroku, aby narysować na ekranie co najmniej 3-4 różne wielokąty (np. trójkąt, kwadrat, pięciokąt i sześciokąt).Zadbaj o to, aby figury nie nachodziły na siebie bezpośrednio – przesuń żółwia (używając penup() i forward() lub goto()) przed narysowaniem kolejnej.

### Wymagania dodatkowe (dla chętnych):

Ukryj kursor żółwia po zakończeniu rysowania (hideturtle()).Upewnij się, że okno programu nie zamyka się od razu po narysowaniu (użyj turtle.done()).