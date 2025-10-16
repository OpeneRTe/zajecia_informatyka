# Strumienie i pliki w Node.js – teoria i zadania
### INF.04.7.1(8,31), INF.04.7.3(1)

---

## 🎯 Cele lekcji
Uczeń:
- rozumie pojęcie **strumienia (stream)** i jego zastosowanie,  
- potrafi odczytywać i zapisywać **pliki** w Node.js,  
- zna różnice między metodami synchronicznymi i asynchronicznymi,  
- wykorzystuje **strumienie do przetwarzania danych** (np. kopiowania plików, przesyłania danych HTTP).

---

## 🧩 1. Podstawy pracy z plikami w Node.js

Do obsługi plików służy **moduł `fs` (File System)**.  
Wymaga on importu:

```js
const fs = require('fs');
```

### 📄 Odczyt pliku
**Sposób synchroniczny (blokujący):**
```js
const dane = fs.readFileSync('tekst.txt', 'utf8');
console.log(dane);
```

**Sposób asynchroniczny (nieblokujący):**
```js
fs.readFile('tekst.txt', 'utf8', (err, dane) => {
  if (err) throw err;
  console.log(dane);
});
```

### ✍️ Zapis do pliku
```js
fs.writeFile('nowy.txt', 'To jest nowy plik', err => {
  if (err) throw err;
  console.log('Zapisano plik!');
});
```

### ➕ Dopisywanie do pliku
```js
fs.appendFile('log.txt', 'Nowa linia\n', err => {
  if (err) throw err;
  console.log('Dopisano do pliku!');
});
```

---

## 🔄 2. Strumienie (Streams)

Strumienie służą do **przetwarzania dużych danych w częściach (chunkach)**, zamiast ładowania wszystkiego do pamięci naraz.

### 💧 Co oznaczają rodzaje strumieni w Node.js

W Node.js **strumień (stream)** to specjalny obiekt, który pozwala **czytać lub zapisywać dane kawałek po kawałku**, a nie wszystko naraz.  
Dzięki temu Node.js może obsługiwać duże pliki lub dane sieciowe bez przeciążania pamięci.

#### **1. Readable – strumień do odczytu**
Służy do **czytania danych ze źródła**, np. z pliku, bazy danych lub żądania HTTP.
```js
const fs = require('fs');
const strumienOdczytu = fs.createReadStream('plik.txt', 'utf8');

strumienOdczytu.on('data', dane => {
  console.log('Odczytano fragment:', dane);
});
```

#### **2. Writable – strumień do zapisu**
Służy do **zapisania danych do celu**, np. do pliku, konsoli lub odpowiedzi HTTP.
```js
const fs = require('fs');
const strumienZapisu = fs.createWriteStream('wynik.txt');

strumienZapisu.write('Pierwsza linia\n');
strumienZapisu.end('Zakończono zapis');
```

#### **3. Duplex – strumień do odczytu i zapisu**
Łączy oba kierunki — **można z niego czytać i do niego pisać jednocześnie**.  
Przykładem są gniazda sieciowe (`net.Socket`), które mogą jednocześnie odbierać i wysyłać dane.

#### **4. Transform – strumień przekształcający**
To szczególny typ `Duplex`, który **modyfikuje dane w locie** — np. kompresuje, szyfruje, filtruje albo zmienia format.
```js
const fs = require('fs');
const zlib = require('zlib');

fs.createReadStream('plik.txt')
  .pipe(zlib.createGzip())        // transform – kompresja
  .pipe(fs.createWriteStream('plik.txt.gz'));
```

---

### 🔗 Na czym polega `pipe()`

Metoda **`pipe()`** służy do bezpośredniego połączenia dwóch strumieni — źródłowego (**Readable**) i docelowego (**Writable**).  
Umożliwia automatyczne przesyłanie danych w małych porcjach (tzw. *chunkach*) bez konieczności ręcznego obsługiwania zdarzeń.  
Dzięki temu można w prosty sposób np. skopiować plik lub przesłać dane z pliku do odpowiedzi HTTP.

```js
const fs = require('fs');
fs.createReadStream('plik.txt').pipe(fs.createWriteStream('kopia.txt'));
```

Schemat działania:
```
Readable → pipe() → Writable
```

---

### 🧭 Nasłuchiwanie zdarzeń `data` i `end`

Strumienie w Node.js emitują zdarzenia, które można „nasłuchiwać” za pomocą metody `.on()`.

Najważniejsze z nich:
- **`data`** – wywoływane za każdym razem, gdy strumień dostarczy nową porcję danych (chunk),
- **`end`** – informuje, że wszystkie dane zostały odczytane i strumień się zakończył.
```js
const fs = require('fs');
const readStream = fs.createReadStream('tekst.txt', 'utf8');

readStream.on('data', chunk => {
  console.log('Otrzymano część danych:', chunk);
});

readStream.on('end', () => {
  console.log('Odczyt zakończony.');
});
```

---

## 🧪 Zadania dla ucznia
1. Utwórz plik `tekst.txt` i napisz skrypt, który odczyta jego zawartość i wyświetli w konsoli.  
2. Napisz program, który dopisze bieżącą datę do pliku `log.txt`.  
3. Stwórz prosty serwer HTTP, który odczyta plik `index.html` i wyśle go jako odpowiedź (użyj `pipe`).  
4. Napisz program kopiujący dowolny plik za pomocą strumieni.  
5. (Dla chętnych) Dodaj obsługę błędów i komunikat w przypadku braku pliku.
