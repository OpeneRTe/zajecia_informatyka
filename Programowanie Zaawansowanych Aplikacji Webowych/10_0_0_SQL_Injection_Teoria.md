# SQL Injection — teoria (pełna wersja)

## Definicja
**SQL Injection (SQLi)** to technika ataku, w której napastnik wprowadza złośliwe fragmenty języka SQL do pól wejściowych aplikacji webowej (formularze, parametry URL, nagłówki itp.), aby zmienić logikę zapytania wykonywanego w bazie danych. Celem może być ujawnienie danych, ich modyfikacja, eskalacja uprawnień lub przejęcie kontroli nad systemem.

---

## Najpopularniejsze typy ataków (dokładniej)

- ### In-band SQLi  
  Atak i odpowiedź przebiegają tą samą drogą — czyli napastnik od razu otrzymuje zwrotne dane w odpowiedzi aplikacji. Do in-band zaliczają się m.in. techniki **error-based** i **union-based**.

- ### Error-based SQLi  
  Napastnik wykorzystuje komunikaty błędów bazy danych (lub fragmenty stacktrace aplikacji) do poznania struktury bazy (nazwy tabel, kolumn, typy danych). Poprzez wstrzyknięcie odpowiednio skonstruowanego zapytania wywołuje błąd, z którego odczytuje interesujące informacje.

- ### Union-based SQLi  
  Polega na użyciu klauzuli `UNION` w celu dołączenia wyników dodatkowego zapytania do oryginalnego wyniku. Jeśli liczba i typ kolumn pasują, napastnik może „dokleić” dane z innej tabeli i zobaczyć je bezpośrednio w odpowiedzi. Jest to podtyp in-band (wyniki widoczne bezpośrednio).

  **Ilustracja:**  
  `SELECT col1, col2 FROM products WHERE id = <WARTOSC_UZYTKOWNIKA>`  
  jeśli użytkownik wstrzyknie:  
  `1 UNION SELECT username, password FROM users --`  
  to wynik może zawierać wiersze z tabeli `users` (jeśli liczba i typy kolumn pasują).

- ### Blind SQLi  
  Baza nie ujawnia bezpośrednio wyników ani szczegółowych błędów; napastnik wydobywa informacje pośrednio, obserwując zachowanie aplikacji.

  - **Boolean-based (content-based) Blind SQLi** — atakujący wysyła zapytania, które powodują inną treść / strukturę odpowiedzi w zależności od prawdziwości warunku. Na podstawie różnic w treści odpowiedzi (lub jej długości) odczytuje pojedyncze bity informacji.
  - **Time-based Blind SQLi** — napastnik obserwuje opóźnienia w odpowiedzi. Zapytanie zawiera funkcję opóźniającą (np. `SLEEP()`), która zostanie wykonana tylko wtedy, gdy testowany warunek jest prawdziwy; długi czas odpowiedzi informuje o wartości logicznej warunku.

  **Przykład koncepcyjny time-based:**  
  `IF((SELECT SUBSTRING(password,1,1) FROM users WHERE username='admin')='a', SLEEP(5), 0)`  
  — opóźnienie ~5s wskazuje, że pierwsza litera hasła to 'a'.

---

## Skutki i zagrożenia
- ujawnienie poufnych danych (loginy, hasła, dane osobowe),  
- modyfikacja lub trwałe usunięcie danych,  
- eskalacja uprawnień i przejęcie kontroli nad aplikacją/serwerem,  
- uruchomienie złośliwego kodu na serwerze,  
- wykorzystanie serwera do dalszych ataków (np. pivoting), rozsyłania spamu lub malware,  
- utrata zaufania użytkowników, koszty reputacyjne, prawne i finansowe.

---

## Podstawowe metody zabezpieczeń

- **Parametryzowane zapytania / Prepared statements**  
  Oddzielają kod SQL od danych użytkownika — to podstawowy i najskuteczniejszy mechanizm ochrony przed SQLi.

- **Walidacja danych i whitelisty**  
  Sprawdzaj typy, długości, formaty i dopuszczalne wartości wejścia. Tam, gdzie to możliwe, używaj whitelist (lista dozwolonych wartości) zamiast prób „czyszczenia” (blacklist).

- **Ograniczanie uprawnień (principle of least privilege)**  
  Konto bazy danych używane przez aplikację powinno mieć minimalne prawa (np. tylko `SELECT`/`INSERT`/`UPDATE` na potrzebnych tabelach). Oddziel konta administracyjne od kont aplikacyjnych.

- **Nie ujawniać szczegółowych błędów w UI**  
  Szczegółowe informacje o błędach (stacktrace, treść zapytania) loguj po stronie serwera; użytkownikowi zwracaj ogólny komunikat („Błąd wewnętrzny”).

- **Haszowanie haseł**  
  Przechowuj hasła wyłącznie jako bezpieczne skróty (bcrypt, Argon2). Nigdy nie przechowuj haseł w postaci plaintext.

- **Używanie ORM / Query builderów**  
  Większość nowoczesnych ORM/Query builderów automatycznie stosuje parametryzację zapytań. Trzeba jednak unikać ręcznego wstrzykiwania niezweryfikowanych fragmentów SQL do zapytań ORM.

- **Defence in depth (wielowarstwowa ochrona)**  
  Dodatkowe mechanizmy: Web Application Firewall (WAF), rate limiting (ograniczanie liczby żądań z jednego źródła), CAPTCHA dla formularzy krytycznych, TLS, restrykcyjne CORS/CSP, monitoring i alerty.

---

## Dobre praktyki programistyczne
- Nigdy nie buduj zapytań przez bezpośrednią konkatenację stringów z danymi użytkownika.  
- Używaj parametrów (`?` lub `:param`) albo prepared statements oferowanych przez sterownik/ORM.  
- Waliduj dane po stronie serwera — klient nie jest zaufany.  
- Przechowuj sekrety (hesła do DB, klucze API) w zmiennych środowiskowych lub w managerze sekretów.  
- Regularnie aktualizuj biblioteki, sterowniki i zależności aplikacji.  
- Ogranicz ilość informacji ujawnianych w błędach zwracanych do klienta.  
- Stosuj mechanizmy monitoringu i alertowania (nietypowe zapytania, wiele błędów z jednego IP itp.).

---

## Testowanie i wykrywanie podatności — DAST i SAST

- ### DAST — Dynamic Application Security Testing  
  Testowanie aplikacji „w ruchu” (black-box). DAST wysyła zestaw zautomatyzowanych lub ręcznych żądań HTTP do działającej aplikacji, symulując ataki (SQLi, XSS itp.) i analizuje odpowiedzi/behawior. Narzędzia: OWASP ZAP, w3af, burp suite, sqlmap (w kontekście dynamicznych testów). DAST wykrywa podatności ujawnione w czasie działania aplikacji, ale nie analizuje kodu źródłowego.

- ### SAST — Static Application Security Testing  
  Analiza statyczna kodu źródłowego (white-box). SAST skanuje kod w poszukiwaniu wzorców podatnych na ataki (np. konkatenacja w zapytaniach, brak walidacji). Działa bez uruchamiania aplikacji i jest przydatna we wczesnych etapach rozwoju (CI). Może jednak generować false positives (fałszywe alarmy).

**Rekomendacja:** stosować oba podejścia — SAST w procesie CI/CD (wcześnie wykrywa problemy), oraz DAST na środowiskach testowych (symuluje rzeczywiste ataki).

---

## Reakcja na incydent i ciągłość działania
- Miej regularne, przetestowane kopie zapasowe danych i procedury przywracania.  
- Przygotuj plan reagowania na incydent: identyfikacja, izolacja, odzyskiwanie, komunikacja (wewnętrzna i zewnętrzna), analiza przyczyn.  
- Po incydencie: dokładna analiza logów, załatanie podatności, testy regresji, audyt i aktualizacja procedur bezpieczeństwa.  
- Powiadamianie zainteresowanych stron zgodnie z obowiązującymi przepisami (jeśli dotyczy wycieku danych osobowych).

---

## Przykłady — krótka ilustracja różnicy

**Niebezpieczne (konkatenacja):**
```js
const sql = "SELECT * FROM users WHERE username = '" + user + "' AND password = '" + pass + "'";
```

**Bezpieczne (parametryzacja):**
```js
const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
connection.execute(sql, [user, pass]);
```

> Uwaga: w przykładzie dla prostoty użyto porównania hasła wprost — w praktyce hasła powinny być haszowane i porównywane ze skrótem.

---

## Kluczowe zasady do zapamiętania
- **Parametryzacja** — zawsze oddzielaj kod SQL od danych.  
- **Walidacja** — sprawdzaj poprawność i format wejścia; stosuj whitelisty tam, gdzie to możliwe.  
- **Uprawnienia** — stosuj zasadę najmniejszych uprawnień dla kont DB.  
- **Bezpieczne błędy** — nie ujawniaj szczegółów we frontendzie.  
- **Haszowanie haseł** — nigdy nie przechowuj haseł w czystej postaci.  
- **Wielowarstwowa ochrona** — łączenie technik daje najlepszą ochronę.


---

## Podsumowanie
SQL Injection to wciąż jedna z najgroźniejszych i najczęstszych podatności aplikacji webowych. Najskuteczniejszą podstawową obroną są **parametryzowane zapytania (prepared statements)**, uzupełnione przez walidację wejść, ograniczenie uprawnień oraz mechanizmy monitoringu i backupów. Stosowanie SAST i DAST w cyklu rozwoju zwiększa szansę wykrycia problemów na wczesnym etapie.
