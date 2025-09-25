# Pytania – Callback w JavaScript

1. **Co to jest funkcja callback w JavaScript i do czego służy?**  

2. **Podaj prosty przykład użycia callbacka w funkcji.**  

3. **Dlaczego callbacki są często wykorzystywane w programowaniu asynchronicznym?**  

4. **W jaki sposób można przekazać funkcję jako argument do innej funkcji?**  

5. **Co zostanie wyświetlone w konsoli w poniższym przykładzie?**  

   ```js
   function wykonaj(akcja) {
       console.log("Start");
       akcja();
       console.log("Koniec");
   }

   wykonaj(() => console.log("Środek"));
   ```  

6. **Na czym polega problem tzw. „callback hell”?**  

7. **Jak można ograniczyć lub uniknąć „callback hell”?**  

8. **Czym różni się podejście z callbackami od użycia Promise?**  

9. **Podaj przykład zastosowania callbacka przy obsłudze zdarzeń w JavaScript.**  

10. **Dlaczego callbacki są ważnym elementem w programowaniu funkcyjnym w JavaScript?**  
