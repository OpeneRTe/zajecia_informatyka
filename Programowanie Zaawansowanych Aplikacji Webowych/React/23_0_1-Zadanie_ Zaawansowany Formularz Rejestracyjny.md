# **Zadanie: Zaawansowany Formularz Rejestracyjny w React**

**Cel zadania:** Stworzenie funkcjonalnego formularza rejestracyjnego z walidacją danych po stronie klienta oraz symulacją wysyłki danych do API przy użyciu nowoczesnego podejścia (atrybut action oraz obiekt FormData).

### **Krok 1: Przygotowanie struktury komponentu**

Stwórz komponent o nazwie FormularzKomponent. Wykorzystaj hook useState do zarządzania:

1. **Obiektem inputs**: przechowującym wszystkie dane z formularza (imię, nazwisko, email, telefon, data urodzenia, kraj, płeć, zgoda, komentarz, hasło).  
2. **Obiektem errors**: przechowującym komunikaty o błędach walidacji (np. errors.email).

### **Krok 2: Interfejs Użytkownika (JSX)**

Zaimplementuj formularz wewnątrz bloku return, zawierający następujące pola:

* **Pola tekstowe:** Imię, Nazwisko.  
* **Pola specjalne:** Email (type="email"), Telefon (type="tel"), Data urodzenia (type="date").  
* **Wybór:** Lista rozwijana (select) z krajami oraz przyciski radio (radio) dla płci.  
* **Zgoda:** Checkbox dla akceptacji regulaminu.  
* **Bezpieczeństwo:** Dwa pola typu password (Hasło i Potwierdź hasło).  
* **Przyciski:** Submit (Wyślij) oraz Reset.

### **Krok 3: Walidacja i Obsługa Logiki**

Wewnątrz funkcji handleSubmit(formData) (podpiętej pod atrybut action formularza) zaimplementuj następujące reguły walidacji:

1. **Imię:** Minimum 3 znaki.  
2. **Email:** Musi zawierać znak @.  
3. **Telefon:** Musi składać się z dokładnie 9 cyfr (użyj wyrażenia regularnego: /^\\d{9}$/).  
4. **Zgoda:** Checkbox musi być zaznaczony.  
5. **Hasło:** Oba pola haseł muszą być identyczne, a hasło musi mieć co najmniej 6 znaków.

*Pamiętaj o wyświetlaniu komunikatów o błędach pod odpowiednimi polami w przypadku ich wystąpienia.*

### **Krok 4: Komunikacja z API**

Jeśli dane przejdą pomyślnie walidację:

1. Wyświetl kompletny obiekt danych w konsoli przeglądarki.  
2. Wyślij dane metodą **POST** na adres /api/rejestracja przy użyciu fetch.  
3. Skonfiguruj nagłówek Content-Type: application/json oraz zamień obiekt inputs na format tekstowy przy użyciu JSON.stringify().  
4. Po pomyślnej odpowiedzi z serwera, wyczyść pola formularza i zresetuj błędy.

### **Kryteria oceny:**

* **Poprawność techniczna:** Czy kod React kompiluje się bez błędów i ostrzeżeń?  
* **Skuteczność walidacji:** Czy błędy pojawiają się natychmiast po próbie wysłania błędnych danych?  
* **Nowoczesność:** Czy użyto atrybutu action i obiektu FormData zamiast wielu hooków onChange?  
* **Estetyka i UX:** Czy formularz jest czytelny i posiada funkcję resetowania stanu?