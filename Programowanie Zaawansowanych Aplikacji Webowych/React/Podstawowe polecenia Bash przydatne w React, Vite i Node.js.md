# Podstawowe polecenia Bash

Terminal Bash pozwala wykonywać operacje na katalogach i plikach oraz uruchamiać polecenia związane z Node.js, npm, React i Vite.

## 1. `pwd` – wyświetlenie aktualnego katalogu

Polecenie:

```bash
pwd
```

wyświetla pełną ścieżkę katalogu, w którym aktualnie znajduje się użytkownik.

Przykład:

```bash
pwd
```

Wynik:

```text
/c/Users/uczen/projekty/react
```

Polecenie jest szczególnie przydatne, gdy chcemy sprawdzić, czy terminal znajduje się w odpowiednim katalogu projektu.

---

# Poruszanie się po katalogach

## 2. `cd` – zmiana katalogu

`cd` oznacza **change directory**.

Przejście do katalogu:

```bash
cd projekt
```

Przykład:

```bash
cd aplikacja-react
```

Po wykonaniu polecenia terminal znajduje się wewnątrz katalogu `aplikacja-react`.

Można również podać pełną ścieżkę:

```bash
cd /c/Users/uczen/projekty
```

---

## 3. `cd ..` – przejście katalog wyżej

```bash
cd ..
```

Powoduje przejście do katalogu nadrzędnego.

Przykład:

Jeżeli znajdujemy się w:

```text
projekty/react/aplikacja
```

po wykonaniu:

```bash
cd ..
```

znajdziemy się w:

```text
projekty/react
```

---

## 4. `cd ~` – przejście do katalogu domowego

```bash
cd ~
```

Powoduje przejście do katalogu domowego aktualnego użytkownika.

---

# Wyświetlanie zawartości katalogu

## 5. `ls` – lista plików i katalogów

```bash
ls
```

Wyświetla zawartość aktualnego katalogu.

Przykład:

```bash
ls
```

Wynik może wyglądać następująco:

```text
index.html
package.json
src
public
node_modules
```

---

## 6. `ls -la` – szczegółowa lista plików

```bash
ls -la
```

Opcje:

- `-l` – wyświetla szczegółowe informacje,
- `-a` – pokazuje również pliki ukryte.

Przykład:

```bash
ls -la
```

Pozwala zobaczyć między innymi pliki:

```text
.gitignore
.env
```

które przy zwykłym `ls` mogą nie być widoczne.

### Uwaga dotycząca `la`

Polecenie:

```bash
la
```

nie jest standardowym poleceniem Bash.

Na niektórych komputerach może działać jako alias dla:

```bash
ls -la
```

Nie należy jednak zakładać, że będzie dostępne na każdym komputerze.

---

# Tworzenie katalogów i plików

## 7. `mkdir` – tworzenie katalogu

`mkdir` oznacza **make directory**.

```bash
mkdir components
```

Tworzy katalog:

```text
components
```

Można utworzyć kilka katalogów jednocześnie:

```bash
mkdir components pages services
```

---

## 8. `touch` – tworzenie pustego pliku

```bash
touch App.jsx
```

Tworzy pusty plik:

```text
App.jsx
```

Przykład:

```bash
touch Header.jsx
```

Można również utworzyć kilka plików:

```bash
touch Header.jsx Footer.jsx Menu.jsx
```

Polecenie `touch` jest standardowo dostępne w Bash, na przykład w Git Bash.

---

# Usuwanie

## 9. `rm` – usunięcie pliku

```bash
rm nazwa_pliku
```

Przykład:

```bash
rm test.txt
```

Usuwa plik `test.txt`.

### Uwaga

Polecenie `rm` usuwa plik bez przenoszenia go do kosza.

---

## 10. `rm -r` – usunięcie katalogu wraz z zawartością

```bash
rm -r katalog
```

Przykład:

```bash
rm -r stary-projekt
```

Opcja `-r` oznacza **recursive**, czyli rekurencyjne usuwanie zawartości katalogu.

---

## 11. `rm -rf` – wymuszone usunięcie katalogu

```bash
rm -rf katalog
```

Opcje:

- `-r` – usuwa katalog razem z całą zawartością,
- `-f` – wymusza wykonanie operacji bez dodatkowych pytań.

Przykład:

```bash
rm -rf node_modules
```

To polecenie może być przydatne, jeżeli chcemy usunąć katalog `node_modules`.

### UWAGA

```bash
rm -rf
```

należy stosować bardzo ostrożnie.

Błędnie podana ścieżka może spowodować bezpowrotne usunięcie dużej liczby plików.

---

# Kopiowanie i przenoszenie

## 12. `cp` – kopiowanie pliku

`cp` oznacza **copy**.

```bash
cp plik_zrodlowy plik_docelowy
```

Przykład:

```bash
cp App.jsx App-kopia.jsx
```

Tworzy kopię:

```text
App-kopia.jsx
```

### Kopiowanie katalogu

Do kopiowania całego katalogu należy zastosować opcję `-r`:

```bash
cp -r components components-kopia
```

---

## 13. `mv` – przenoszenie plików

`mv` oznacza **move**.

Przykład:

```bash
mv App.jsx src/
```

Przenosi plik `App.jsx` do katalogu `src`.

---

## 14. `mv` – zmiana nazwy pliku

To samo polecenie może służyć do zmiany nazwy.

```bash
mv stara.jsx nowa.jsx
```

Przykład:

```bash
mv Menu.jsx Navigation.jsx
```

Zmienia nazwę pliku:

```text
Menu.jsx
```

na:

```text
Navigation.jsx
```

---

# Node.js i npm

## 15. `node -v` – sprawdzenie wersji Node.js

```bash
node -v
```

Przykładowy wynik:

```text
v22.18.0
```

Polecenie pozwala sprawdzić, czy Node.js jest zainstalowany.

---

## 16. `npm -v` – sprawdzenie wersji npm

```bash
npm -v
```

Pozwala sprawdzić, czy menedżer pakietów `npm` jest dostępny.

---

## 17. `npm install` – instalacja zależności projektu

```bash
npm install
```

lub krócej:

```bash
npm i
```

Polecenie odczytuje plik:

```text
package.json
```

i instaluje potrzebne biblioteki w katalogu:

```text
node_modules
```

Typowe zastosowanie:

```bash
cd projekt
npm install
npm run dev
```

---

## 18. `npm install nazwa-pakietu` – instalacja biblioteki

Przykład:

```bash
npm install bootstrap
```

Instalacja Express:

```bash
npm install express
```

Instalacja React Router:

```bash
npm install react-router-dom
```

Pakiet zostanie również zapisany jako zależność w `package.json`.

---

## 19. `npm uninstall` – usunięcie biblioteki

```bash
npm uninstall nazwa-pakietu
```

Przykład:

```bash
npm uninstall bootstrap
```

---

# Tworzenie projektu

## 20. `npm create vite@latest` – utworzenie projektu Vite

Do tworzenia naszych projektów React wykorzystujemy Vite.

```bash
npm create vite@latest
```

Następnie wybieramy:

```text
Project name: nazwa-projektu
Framework: React
Variant: JavaScript
```

Po utworzeniu projektu:

```bash
cd nazwa-projektu
npm install
npm run dev
```

---

# Uruchamianie projektu

## 21. `npm run dev` – uruchomienie projektu Vite

```bash
npm run dev
```

Uruchamia serwer developerski Vite.

Terminal wyświetli adres aplikacji, na przykład:

```text
http://localhost:5173/
```

### Ważne

Po uruchomieniu:

```bash
npm run dev
```

terminal jest zajęty przez działający serwer.

---

## 22. `Ctrl + C` – zatrzymanie działającego programu

Jeżeli uruchomiliśmy:

```bash
npm run dev
```

lub:

```bash
node server.js
```

program można zatrzymać kombinacją:

```text
Ctrl + C
```

Nie jest to polecenie Bash, ale bardzo ważny skrót podczas pracy w terminalu.

---

# Node.js

## 23. `node nazwa_pliku.js` – uruchomienie pliku JavaScript

Przykład:

```bash
node app.js
```

lub:

```bash
node server.js
```

Node.js wykonuje wskazany plik JavaScript.

Będzie to szczególnie ważne podczas pracy z backendem.

---

# Dodatkowe przydatne polecenia

## 24. `clear` – wyczyszczenie terminala

```bash
clear
```

Usuwa wcześniejsze komunikaty z widoku terminala.

Nie usuwa żadnych plików ani danych.

---

## 25. `cat` – wyświetlenie zawartości pliku

```bash
cat package.json
```

Wyświetla zawartość pliku bez jego otwierania w edytorze.

Przykład:

```bash
cat package.json
```

---

## 26. `code .` – otwarcie bieżącego katalogu w Visual Studio Code

```bash
code .
```

Kropka:

```text
.
```

oznacza **aktualny katalog**.

Dlatego:

```bash
code .
```

oznacza:

> Otwórz aktualny katalog w Visual Studio Code.

Przykładowy sposób rozpoczęcia pracy:

```bash
cd projekty
cd sklep-react
code .
npm run dev
```

---

# Znaczenie `.` i `..`

W Bash symbole te mają specjalne znaczenie:

```text
.
```

oznacza aktualny katalog.

```text
..
```

oznacza katalog nadrzędny.

Dlatego:

```bash
cd ..
```

oznacza przejście poziom wyżej.

Natomiast:

```bash
code .
```

oznacza otwarcie aktualnego katalogu.

---

# Najważniejszy zestaw poleceń dla naszych aplikacji

Do pracy z React, Vite, Node.js i Express należy znać przede wszystkim:

```bash
pwd
ls
ls -la

cd katalog
cd ..
cd ~

mkdir katalog
touch plik.jsx

cp plik1 plik2
cp -r katalog1 katalog2
mv plik nowe_miejsce

rm plik
rm -r katalog
rm -rf katalog

node -v
npm -v

npm install
npm install nazwa-pakietu
npm uninstall nazwa-pakietu

npm create vite@latest
npm run dev

node server.js

code .
clear
```

# Typowy przebieg tworzenia projektu React

```bash
pwd
```

Sprawdzenie aktualnego katalogu.

```bash
cd projekty
```

Przejście do katalogu z projektami.

```bash
npm create vite@latest
```

Utworzenie projektu.

```bash
cd moj-projekt
```

Przejście do utworzonego projektu.

```bash
npm install
```

Instalacja zależności.

```bash
code .
```

Otwarcie projektu w Visual Studio Code.

```bash
npm run dev
```

Uruchomienie aplikacji.

---

# Typowy przebieg pracy z istniejącym projektem

Jeżeli projekt został pobrany lub skopiowany na komputer:

```bash
cd moj-projekt
npm install
npm run dev
```

`npm install` instaluje zależności zapisane w `package.json`, a `npm run dev` uruchamia aplikację.