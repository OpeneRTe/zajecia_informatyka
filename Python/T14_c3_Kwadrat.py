import turtle

turtle.shape("turtle")
turtle.pensize(3)
turtle.color("purple", "light green")
turtle.begin_fill()
for i in range(4):
    turtle.left(90)
    turtle.forward(200)
turtle.end_fill()

turtle.mainloop()
