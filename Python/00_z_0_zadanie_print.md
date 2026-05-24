### **ZADANIE PRAKTYCZNE: Przedstawianie danych w Pythonie**

#### **Polecenie:**
Napisz program, który:
1.  Stworzy zmienną o nazwie `imie` i przypisze do niej tekstową wartość (np. "Jan").
2.  Stworzy zmienną o nazwie `wiek` i przypisze do niej wartość liczbową (np. 14).
3.  Wypisze na ekranie gotowe zdanie w formacie: **„[Imię] ma [Wiek] lat”**.

---

### **Wskazówki i wyjaśnienia dla ucznia**

#### **1. Zmienna jako „pudełko”**
Pamiętaj, że zmienna to takie **„pudełko” na dane**. Musisz nadać mu nazwę (np. `imie`) i włożyć do środka jakąś informację za pomocą znaku równości `=`. 

#### **2. Jak nazywać zmienne?**
Zgodnie z zasadami Pythona:
*   Używaj małych liter (np. `imie`, a nie `IMIE`).
*   **Nie używaj polskich znaków** (zamiast „imię” napisz `imie`) – dzięki temu Twój kod będzie bezpieczniejszy i zadziała na każdym komputerze.

#### **3. Tekst kontra Liczba (Typy danych)**
To bardzo ważne rozróżnienie:
*   **Tekst (string/str):** Musi być zawsze zapisany w **cudzysłowie** (np. `"Jan"`). Jeśli zapomnisz o cudzysłowie, Python pomyśli, że szukasz innej zmiennej o nazwie Jan.
*   **Liczba (int):** Liczby całkowite zapisujemy bez cudzysłowu (np. `14`).

#### **4. Wyświetlanie wyniku (f-string)**
Aby najwygodniej połączyć tekst ze zmiennymi w funkcji `print()`, użyj tzw. **f-stringu**. Pozwala on „wstrzyknąć” wartość zmiennej prosto do zdania za pomocą nawiasów klamrowych `{}`.

