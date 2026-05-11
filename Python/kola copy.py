import turtle
import random

t = turtle.Turtle()
# t.speed(0)
# turtle.bgcolor("black")

# kolory = ["red", "yellow", "cyan", "lime", "orange", "magenta", "white"]

# def gwiazdka(rozmiar):
#     for i in range(5):
#         t.forward(rozmiar)
#         t.right(144)

# for i in range(120):
#     t.color(random.choice(kolory))
#     gwiazdka(i * 2)
#     t.right(20)
#     t.forward(5)

t.clear()
turtle.title("rainbow spiral")
t.speed(15)
turtle.bgcolor("black")
r,g,b=255,0,0

while True:
    turtle.delay(0)
    t.goto(0,0)
    t.clear()
    t.speed(200)
    for i in range(255*2):
        turtle.colormode(255)
        if i<255//3:
            g+=3
        elif i<255*2//3:
            r-=3
        elif i<255:
            b+=3
        elif i<255*4//3:
            g-=3
        elif i<255*5//3:
            r+=3
        else:
            b-=3
        t.forward(50+i)
        t.right(91)
        t.pencolor(r,g,b)
        # turtle.mainloop()
    #  wait for a 3s before starting the next spiral
    turtle.delay(3000)
    # t.clear()
