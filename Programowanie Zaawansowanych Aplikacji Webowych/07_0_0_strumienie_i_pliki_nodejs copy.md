# Strumienie i pliki w Node.js – teoria, zadania
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

Rodzaje strumieni:
- **Readable** – strumień do odczytu,
- **Writable** – strumień do zapisu,
- **Duplex** – do odczytu i zapisu,
- **Transform** – przekształca dane w locie (np. kompresja).

### 📘 Przykład: Odczyt pliku strumieniowo

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

### 📗 Przykład: Zapis pliku strumieniowo

```js
const writeStream = fs.createWriteStream('kopiowany.txt');
writeStream.write('Pierwsza linia\n');
writeStream.end('Ostatnia linia');
```

---

## ⚙️ 3. Łączenie strumieni (pipe)

Metoda `pipe()` pozwala połączyć strumień odczytu z zapisem — np. do kopiowania plików:

```js
const fs = require('fs');
fs.createReadStream('plik.txt').pipe(fs.createWriteStream('kopia.txt'));
```

Lub do przesyłania danych HTTP:

```js
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  const strumien = fs.createReadStream('index.html');
  res.writeHead(200, {'Content-Type': 'text/html'});
  strumien.pipe(res);
}).listen(3000);

console.log('Serwer działa na http://localhost:3000');
```

---

## 💡 4. Bufory

Strumienie w Node.js działają na bazie **buforów**, które przechowują fragmenty danych binarnych w pamięci.

```js
const buf = Buffer.from('Hello Node');
console.log(buf.toString()); // Hello Node
```

Bufory są szybkie i używane przy transmisji danych binarnych (np. obrazów, plików audio).

---

## 🧠 5. Przykład praktyczny: kopiowanie dużego pliku

```js
const fs = require('fs');

const source = fs.createReadStream('duzy_plik.mp4');
const destination = fs.createWriteStream('kopia_duzy_plik.mp4');

source.pipe(destination);

source.on('end', () => console.log('Kopiowanie zakończone!'));
source.on('error', err => console.error('Błąd:', err));
```

---

## 🧪 Zadania dla ucznia

1. Utwórz plik `tekst.txt` i napisz skrypt, który odczyta jego zawartość i wyświetli w konsoli.  
2. Napisz program, który dopisze bieżącą datę do pliku `log.txt`.  
3. Stwórz prosty serwer HTTP, który odczyta plik `index.html` i wyśle go jako odpowiedź (użyj `pipe`).  
4. Napisz program kopiujący dowolny plik za pomocą strumieni.  
5. (Dla chętnych) Dodaj obsługę błędów i komunikat w przypadku braku pliku.

---

## 📚 Podsumowanie

| Pojęcie | Opis |
|----------|------|
| `fs` | Moduł do pracy z systemem plików |
| `readFile / writeFile` | Metody do odczytu i zapisu plików |
| Strumienie | Odczyt/zapis danych w częściach (chunkach) |
| `pipe()` | Łączenie strumieni – przekazywanie danych |
| Bufory | Pamięć pośrednia dla danych binarnych |

---
