# Ćwiczenia: JWT i autoryzacja  
## INF.04.7.3(3,5)

---

### 🧠 Ćwiczenie 1 – „Hello JWT”

Celem tego ćwiczenia jest poznanie podstawowego działania tokenu JWT i autoryzacji.

1. Utwórz nowy projekt Node.js `jwt-basics`.
2. Zainstaluj paczki:  
   ```bash
   npm install express jsonwebtoken bcrypt dotenv
   ```
3. Stwórz endpoint `POST /auth/login`, który:
   - przyjmuje login i hasło (np. `admin@zst.edu`, `Zaq1@WSX`),
   - po poprawnym logowaniu generuje token JWT z roszczeniami `sub`, `role`, `iat`, `exp`.
4. Utwórz middleware `auth()`, który sprawdza nagłówek `Authorization: Bearer ...`.
5. Utwórz endpoint `GET /api/secret`, który zwraca dane tylko dla roli `admin`.

💬 **Pytanie kontrolne:**  
Co oznacza roszczenie `exp` w tokenie JWT?

---

### 🔁 Ćwiczenie 2 – Odświeżanie tokenu (Refresh Token)

Celem ćwiczenia jest poznanie mechanizmu odnawiania tokenu JWT po jego wygaśnięciu.

1. Dodaj paczkę `cookie-parser`.
2. Po zalogowaniu serwer powinien zwracać:
   - access token (krótki czas życia, np. 10 minut),
   - refresh token (dłuższy, np. 7 dni) w ciasteczku httpOnly.
3. Dodaj endpoint `POST /auth/refresh`, który wydaje nowy access token na podstawie refresh tokenu.
4. Dodaj endpoint `POST /auth/logout`, który usuwa refresh cookie.

💬 **Pytanie kontrolne:**  
Dlaczego refresh token powinien być zapisany w ciasteczku httpOnly, a nie w LocalStorage?

---

### 🧩 Ćwiczenie 3 – Testowanie API przy pomocy cURL

1. Zaloguj się do API:
   ```bash
   curl -X POST http://localhost:3000/auth/login      -H "Content-Type: application/json"      -d '{"email":"admin@zst.edu","password":"Zaq1@WSX"}'
   ```
2. Skopiuj otrzymany token i wykonaj żądanie do chronionego zasobu:
   ```bash
   curl -i http://localhost:3000/api/secret      -H "Authorization: Bearer <TWÓJ_TOKEN>"
   ```
3. Spróbuj wykonać to samo żądanie bez tokenu.  
   Co zwraca serwer? (Jaki kod HTTP?)

💬 **Pytanie kontrolne:**  
Jaką odpowiedź powinien zwrócić serwer, jeśli token JWT jest nieprawidłowy lub wygasł?

---

### ⚙️ Ćwiczenie 4 – Porównanie JWT z sesją Express

1. Utwórz prosty projekt Express z pakietem `express-session`.
2. Zaimplementuj logowanie użytkownika i zapis sesji w pamięci.
3. Utwórz identyczny projekt, ale z JWT zamiast sesji.
4. Porównaj oba rozwiązania i zapisz wnioski:

| Aspekt | Sesja | JWT |
|---------|--------|-----|
| Gdzie przechowywane dane |  |  |
| Co się dzieje po restarcie serwera |  |  |
| Jak wygląda wylogowanie |  |  |
| Kiedy sesja/token wygasa |  |  |

💬 **Pytanie kontrolne:**  
W jakich typach aplikacji lepiej sprawdzi się JWT, a w jakich sesje?

---

### ⭐ Dodatkowe zadanie dla chętnych

Dodaj do swojego projektu prostą aplikację frontendową (HTML + JS), która:
- ma formularz logowania,
- zapisuje token w pamięci przeglądarki,
- przyciskiem „Profil” pobiera dane z `/api/secret` i wyświetla wynik w przeglądarce.
