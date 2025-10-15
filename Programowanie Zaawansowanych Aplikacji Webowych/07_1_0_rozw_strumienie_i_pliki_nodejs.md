# Strumienie i pliki w Node.js – rozwiązania
### INF.04.7.1(8,31), INF.04.7.3(1)

---

## 🎯 Cele lekcji
Uczeń:
- rozumie pojęcie **strumienia (stream)** i jego zastosowanie,  
- potrafi odczytywać i zapisywać **pliki** w Node.js,  
- zna różnice między metodami synchronicznymi i asynchronicznymi,  
- wykorzystuje **strumienie do przetwarzania danych** (np. kopiowania plików, przesyłania danych HTTP).


## 👩‍🏫 Dla nauczyciela – rozwiązania i wskazówki

**Zadanie 1 – odczyt:**
```js
fs.readFile('tekst.txt', 'utf8', (err, data) => {
  if (err) console.error('Błąd odczytu');
  else console.log(data);
});
```

**Zadanie 2 – dopisanie daty:**
```js
fs.appendFile('log.txt', new Date().toLocaleString() + '\n', err => {
  if (err) throw err;
});
```

**Zadanie 3 – serwer HTTP:**
```js
const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  fs.createReadStream('index.html').pipe(res);
}).listen(3000);
```

**Zadanie 4 – kopiowanie:**
```js
fs.createReadStream('plik.txt').pipe(fs.createWriteStream('kopia.txt'));
```

**Zadanie 5 – obsługa błędów:**
```js
try {
  fs.createReadStream('nieistnieje.txt')
    .on('error', () => console.error('Plik nie istnieje'))
    .pipe(fs.createWriteStream('kopia.txt'));
} catch (e) {
  console.error('Błąd krytyczny:', e);
}
```

