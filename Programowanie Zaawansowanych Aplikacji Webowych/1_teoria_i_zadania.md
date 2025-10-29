# Obsługa błędów w Express i logger (INF.04.7.3(1))

## Cele
- zrozumienie przepływu błędów w Express i roli `next(err)`
- utworzenie globalnego middleware błędów
- konfiguracja loggera requestów i błędów z zapisem do plików
- testowanie poprawności – ścieżki sukcesu, 404 i 500

## Kontekst podstawy programowej
- INF.04.7.3(1) – programuje zaawansowane aplikacje webowe; język JavaScript/Node.js; obsługa błędów, testowanie i dokumentowanie

## Rdzeń pojęciowy
- middleware w Express przyjmuje `req, res, next`
- middleware błędu przyjmuje **cztery** argumenty: `err, req, res, next`
- `throw` lub `next(err)` przekazuje błąd do najbliższego middleware błędu
- błędy asynchroniczne wymagają `try/catch` i `next(err)` (albo wrapperów)
- logger rejestruje zdarzenia; osobno logi dostępu (requesty) i logi aplikacyjne/błędów

## Minimalny handler błędów
```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (!res.headersSent) {
    res.status(err.status || 500).json({ error: 'Wewnętrzny błąd serwera' });
  }
});
```

## Logger requestów do pliku
- `morgan('combined', { stream })` z `fs.createWriteStream('logs/access.log', { flags: 'a' })`
- w dev przydatny też `morgan('dev')` do konsoli

## Logger błędów do pliku
- `winston` z `transports.File` do `logs/error.log` oraz `logs/app.log`
- format: `timestamp + json` i `errors({ stack: true })`

---

## Zadania praktyczne (student)
- uruchom projekt z folderu `projekt_demo` i sprawdź logi w `logs/`
- dodaj endpoint `/boom` który `throw new Error('BOOM')` i zwróci 500 w JSON
- utwórz własną klasę `HttpError extends Error` z polem `status`, użyj w `/forbidden` do zwrócenia 403
- w `/async` zasymuluj błąd Promise i upewnij się, że trafi do handlera
- dodaj middleware 404, który tworzy `HttpError(404, 'Nie znaleziono')`
- upewnij się, że logi zapisują: metodę, ścieżkę, status, IP, user-agent, `message` i `stack`

## Jak uruchomić projekt (skrót)
- `npm install`
- `cp .env.example .env` i opcjonalna zmiana `PORT`
- `npm run dev` lub `npm start`
- przeglądarka: `http://localhost:3000/ok`, `http://localhost:3000/error`, `http://localhost:3000/async`
- sprawdź pliki: `logs/access.log`, `logs/error.log`, `logs/app.log`

## Kryteria oceny
- konfiguracja loggerów zapisujących do pliku działa
- globalny handler błędów obsługuje 500 i 404
- błędy asynchroniczne trafiają do handlera
- kod i komentarze są czytelne; repo ma `.gitignore` i `.env.example`
