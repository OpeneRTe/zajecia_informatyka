# Pytania -- Promise w JavaScript

1.  **Co to jest Promise w JavaScript i do czego służy?**

2.  **Jakie są trzy możliwe stany obiektu Promise?**

3.  **W jaki sposób tworzymy nowy obiekt Promise? Podaj składnię z
    konstruktorem.**

4.  **Czym różnią się funkcje `resolve` i `reject` wewnątrz Promise?**

5.  **Do czego służą metody `.then()`, `.catch()` i `.finally()`?**

6.  **Co zostanie wyświetlone w konsoli w poniższym przykładzie?**

    ``` js
    new Promise((resolve, reject) => {
        setTimeout(() => resolve("Gotowe!"), 1000);
    }).then(value => console.log(value));
    ```

7.  **W jaki sposób można łączyć (chainować) kilka metod `.then()`?
    Podaj przykład.**

8.  **Jaka jest różnica między obsługą błędów przy użyciu `.catch()` a
    umieszczeniem drugiego argumentu w `.then()`?**

9.  **Do czego służy metoda `Promise.all()` i jak działa, gdy jeden z
    Promise zostanie odrzucony?**

10. **W jakich sytuacjach warto używać Promise zamiast klasycznego
    callbacka?**
