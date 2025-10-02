# Pytania – Async / Await w JavaScript

1. **Do czego służy słowo kluczowe `async` w JavaScript?**  

2. **Co zwraca funkcja oznaczona jako `async`?**  

3. **Jakie słowo kluczowe używamy wewnątrz funkcji `async`, aby poczekać na wynik Promise?**  

4. **Dlaczego `await` można stosować tylko wewnątrz funkcji oznaczonej jako `async`?**  

5. **Co zostanie wypisane w konsoli w tym przykładzie?**  

   ```js
   async function przyklad() {
       return "Hello!";
   }
   przyklad().then(value => console.log(value));
   ```  

6. **Jak można obsłużyć błędy w funkcji `async`? Podaj dwie metody.**  

7. **Czym różni się użycie `.then()` i `.catch()` od `async/await` z blokiem `try...catch`?**  

8. **Co się stanie, jeśli w funkcji `async` wywołamy `await` na Promise, który zostanie odrzucony (`reject`)?**  

9. **Jak działa `Promise.all()` w połączeniu z `async/await`? Podaj przykład użycia.**  

10. **Dlaczego `async/await` uznaje się za bardziej czytelną alternatywę dla łańcuchów `.then()`?**  
