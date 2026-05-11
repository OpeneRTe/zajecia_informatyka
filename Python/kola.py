import turtle
import colorsys

# Ustawienia ekranu
t = turtle.Turtle()
s = turtle.Screen()
s.bgcolor("black") # Czarne tło, aby kolory były wyraziste
t.speed(0) # Najwyższa prędkość rysowania
t.width(2)

# Liczba kroków
n = 36
# Liczba kolorów
h = 0

# Główna pętla rysująca
for i in range(300):
    # Generowanie koloru w formacie HSV
    color = colorsys.hsv_to_rgb(h, 1, 0.8)
    h += 1/n
    t.pencolor(color)
    
    # Ruch żółwia
    t.forward(i * 2)
    t.right(121) # Skręt pod kątem zbliżonym do złotego kąta
    
    # Dodanie drobnej zmiany szerokości linii dla efektu 3D
    if i > 100:
        t.width(i/100 + 1)

# Ukryj żółwia po zakończeniu
t.hideturtle()
turtle.done()
