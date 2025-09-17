
# Ćwiczenia – POST, pliki statyczne i statusy HTTP (L3)

Poniższy zestaw pozwoli przećwiczyć obsługę **POST**, **serwowania plików statycznych** oraz **statusów HTTP/REST**. Każde zadanie ma krótki *cel* i *wskazówki/wyjaśnienia*. Rozwiązania są w osobnym pliku.

> Wymagania wstępne (dla całego zestawu): `npm init -y`, `npm install express` oraz plik `server.js`.

---

## Zadanie 1 — Echo JSON (POST /echo)

**Cel:** Odczytać i odesłać dane JSON z żądania POST oraz zwrócić poprawny *status*.

**Opis:**  
Zaimplementuj `POST /echo`, które:
- przyjmie JSON w body (**wymagany** klucz `message` – string),
- zwróci `201 Created` oraz JSON `{ "echo": "<wartość message>" }`,
- ustawi nagłówek `Location: /echo` (dla ćwiczeń z 201).

**Wskazówki/wyjaśnienia:**  
- Użyj `app.use(express.json())` do parsowania JSON.  
- `201` stosujemy, gdy „coś utworzyliśmy” – w naszym przypadku *umownie* potwierdzamy utworzenie „zasobu odpowiedzi”.  
- Gdy `message` brakuje lub nie jest stringiem → **`400 Bad Request`** z krótkim opisem błędu.

---

## Zadanie 2 — Walidacja i statusy (POST /users)

**Cel:** Ćwiczenie walidacji i różnic między 201/400/409.

**Opis:**  
Utwórz `POST /users` z walidacją:
- `email` (string, wymagany), `name` (string, wymagany).
- Jeśli format niepoprawny/braki → **`400 Bad Request`**.
- Jeśli użytkownik o `email` już istnieje (symulacja: prosta tablica in-memory) → **`409 Conflict`**.
- Jeśli poprawnie „utworzono” → **`201 Created`** i JSON z nowym użytkownikiem (bez haseł).

**Wskazówki/wyjaśnienia:**  
- `409` sygnalizuje konflikt stanu (np. duplikat klucza).  
- W praktyce ID zwykle generujemy (np. `Date.now()`), a email normalizujemy (lowercase).

---

## Zadanie 3 — Pliki statyczne i nagłówki

**Cel:** Serwować pliki z `public/` i zrozumieć cache oraz 404.

**Opis:**  
- Skonfiguruj `express.static('public')` (utwórz folder `public/`).
- Dodaj plik `public/index.html` z prostym interfejsem (przycisk, paragraf).
- Ustaw dla statyków header `Cache-Control: public, max-age=300` (5 min).  
- Zaimplementuj **własne 404** dla brakujących tras (po statykach i trasach).

**Wskazówki/wyjaśnienia:**  
- Kolejność `app.use(express.static(...))` ma znaczenie.  
- Własne 404 to *middleware końcowy* po wszystkich `app.get/post/...`.

---

## Zadanie 4 — Formularz → fetch POST (integracja statyków z API)

**Cel:** Połączyć front (statyk) z endpointem POST.

**Opis:**  
- W `public/index.html` dodaj prosty formularz lub przycisk, który wykona `fetch('/echo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'Hello' }) })`.
- Wyświetl odpowiedź w elemencie `<pre>` lub `<div>`.

**Wskazówki/wyjaśnienia:**  
- Pamiętaj o `Content-Type: application/json`.  
- Jeśli zobaczysz w konsoli przeglądarki błąd 4xx/5xx – sprawdź walidację i logi serwera.

---

## Zadanie 5 — Middleware logujący i obsługa błędów

**Cel:** Zrozumieć przepływ middlewarów oraz `500`.

**Opis:**  
- Dodaj globalny logger: `METHOD PATH` dla każdego żądania (przed trasami/statykami).
- Dodaj **middleware błędu** (4 argumenty: `err, req, res, next`) zwracający `500` w JSON: `{ "error": "internal_error", "id": "<losowe_id>" }`.
- Zasymuluj błąd: specjalna trasa `GET /boom` rzuca błąd (np. `throw new Error('boom')`).

**Wskazówki/wyjaśnienia:**  
- Middleware błędu musi być na końcu łańcucha.  
- Unikalny `id` ułatwia debugowanie w logach/monitoringu.

---

## Zadanie 6 — Statusy: 200 vs 204 vs 404

**Cel:** Dobrać status do treści odpowiedzi.

**Opis:**  
Zaimplementuj `GET /tasks/:id` na bazie prostej tablicy zadań:
- Gdy zadanie istnieje → `200 OK` + JSON.  
- Gdy nie istnieje → `404 Not Found`.  
Dodatkowo endpoint `GET /tasks`:
- Gdy lista pusta → `204 No Content` (bez body).  
- Gdy niepusta → `200 OK` + JSON.

**Wskazówki/wyjaśnienia:**  
- `204` oznacza brak treści – upewnij się, że **nie** wysyłasz body.  
- `404` dla nieznanego zasobu jest bardziej precyzyjne niż `400`.

---

## Zadanie 7 — 304 Not Modified (bonus, opcjonalnie)

**Cel:** Dotknąć *warunkowych żądań* i oszczędzać transfer.

**Opis:**  
- Dodaj `GET /version`, które zwraca JSON `{ "version": "1.0.0" }` i nagłówek `ETag`.  
- Gdy przychodzi `If-None-Match` z takim samym ETag → odpowiedz `304 Not Modified` bez body.

**Wskazówki/wyjaśnienia:**  
- 304 służy do cache po stronie klienta; bez zmian – brak body, przeglądarka używa cache.
