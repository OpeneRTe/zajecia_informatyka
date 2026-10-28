# React – obiekt i tablica obiektów w useState

**Cel:** zmienić jedno pole obiektu, a następnie wybrany obiekt w tablicy.

Pracuj po kolei: uruchom przykład, sprawdź wynik i wykonaj zadanie. Części A i D to osobne przykłady do wklejenia do `App.jsx`. Część E jest przeróbką części D.

## A. Jeden obiekt w stanie

Wklej do `App.jsx` i uruchom:

```jsx
import { useState } from "react";

function App() {
  const [photo, setPhoto] = useState({
    id: 1,
    alt: "Mak",
    downloads: 35
  });

  function download() {
    setPhoto((previousPhoto) => ({
      ...previousPhoto,
      downloads: previousPhoto.downloads + 1
    }));
  }

  return (
    <div>
      <h2>{photo.alt}</h2>
      <p>Pobrania: {photo.downloads}</p>
      <button onClick={download}>Pobierz</button>
    </div>
  );
}

export default App;
```

**Sprawdź:** po dwóch kliknięciach licznik wynosi 37, a nazwa nadal brzmi „Mak”. Przycisk ćwiczy licznik — nie pobiera pliku na dysk.

### Jak czytać aktualizację?

```jsx
setPhoto((previousPhoto) => ({
  ...previousPhoto,
  downloads: previousPhoto.downloads + 1
}));
```

1. `previousPhoto` to poprzedni obiekt stanu przekazany przez React.
2. `...previousPhoto` kopiuje jego pola do nowego obiektu.
3. `downloads:` nadpisuje tylko liczbę pobrań.
4. `setPhoto` zapisuje nowy stan, a React odświeża widok.

Nawiasy `({ ... })` po strzałce oznaczają zwrócenie obiektu. Nazwę parametru `previousPhoto` wybieramy sami.

## B. Trzy zasady aktualizacji obiektu

**1. Nie zmieniaj stanu bezpośrednio.**

```jsx
// BŁĘDNIE
photo.downloads++;
```

Użyj settera i zwróć nowy obiekt, tak jak w części A.

**2. Kopiuj pozostałe pola. Setter zastępuje cały obiekt.**

```jsx
// Zostanie tylko downloads – zabraknie id i alt:
setPhoto({ downloads: 0 });

// Poprawnie – zachowujemy id i alt:
setPhoto((previousPhoto) => ({ ...previousPhoto, downloads: 0 }));
```

**3. Zmieniane pole wpisuj po `...`. Ostatnia wartość wygrywa.**

```javascript
const photo = { alt: "Mak", downloads: 35 };

const good = { ...photo, downloads: 0 }; // downloads: 0
const bad = { downloads: 0, ...photo };  // downloads: 35
```

Te przykłady dotyczą płaskich obiektów. Spread nie kopiuje automatycznie wszystkich poziomów zagnieżdżenia.

## C. Zrób sam – pojedynczy obiekt

Rozbuduj przykład z części A:

1. Dodaj przycisk „Wyzeruj pobrania”. Ma ustawić `downloads` na 0 i zachować nazwę oraz `id`.
2. Dodaj przycisk „Zmień nazwę”. Ma ustawić `alt` na `"Czerwony mak"` i zachować liczbę pobrań.
3. Dodaj pole `favorite: false` do początkowego obiektu. Przycisk „Zmień ulubione” ma przełączać to pole. Wyświetl „Ulubione: tak” albo „Ulubione: nie”.
4. Dodaj osobny stan `likes` z wartością 0 oraz przycisk „Polub”. Polubienia mają być niezależne od obiektu zdjęcia.

**Sprawdź:** zwiększ pobrania, zmień nazwę, oznacz ulubione i polub zdjęcie. Każda czynność powinna zmieniać tylko wskazaną wartość.

**Zastosowanie w WebTech:** w komponencie `Technology` dodaj obiekt `progress` z polami `completedHours: 0` i `isLearning: false`. Przycisk „Dodaj godzinę” ma jednym wywołaniem settera zwiększyć godziny o 1 i ustawić status na `true`. Jeśli masz już osobny stan `isLearning`, zastąp go polem `progress.isLearning`. Zachowaj osobne `likes` i `visible`.

## D. Tablica obiektów – wszystko w App.jsx

Teraz każde zdjęcie ma własny licznik. Cała tablica znajduje się w stanie `App`. Nie tworzymy osobnego komponentu karty.

Zastąp zawartość `App.jsx` poniższym kodem:

```jsx
import { useState } from "react";

function App() {
  const [photos, setPhotos] = useState([
    { id: 10, alt: "Mak", downloads: 35 },
    { id: 20, alt: "Bukiet", downloads: 43 },
    { id: 30, alt: "Dalmatyńczyk", downloads: 2 }
  ]);

  function download(id) {
    setPhotos((previousPhotos) =>
      previousPhotos.map((photo) => {
        if (photo.id === id) {
          return { ...photo, downloads: photo.downloads + 1 };
        }
        return photo;
      })
    );
  }

  return (
    <div>
      <h1>Galeria</h1>
      {photos.map((photo) => (
        <div key={photo.id}>
          <h2>{photo.alt}</h2>
          <p>Pobrania: {photo.downloads}</p>
          <button onClick={() => download(photo.id)}>Pobierz</button>
        </div>
      ))}
    </div>
  );
}

export default App;
```

### Co robi map() w funkcji download?

Dla klikniętego Bukietu do `download` trafia `id` równe 20:

| Obiekt | Pasuje id? | Co zwracamy? |
|---|---|---|
| Mak, id 10 | Nie | Ten sam obiekt |
| Bukiet, id 20 | Tak | Nowy obiekt z 44 pobraniami |
| Dalmatyńczyk, id 30 | Nie | Ten sam obiekt |

`map()` tworzy nową tablicę. `...photo` tworzy nowy obiekt tylko dla zmienianego zdjęcia. `return photo` zachowuje pozostałe elementy.

**Dwa zastosowania `map()`:**

- w `download` zwraca obiekty — aktualizuje dane,
- w `return` komponentu zwraca JSX — wyświetla dane.

`id` to identyfikator, a nie pozycja w tablicy. Bukiet ma `id: 20`, ale znajduje się pod indeksem 1.

`onClick={() => download(photo.id)}` uruchamia funkcję dopiero po kliknięciu i przekazuje identyfikator wybranego zdjęcia.

### Zrób sam

1. Kliknij „Pobierz” przy Bukiecie dwa razy. Ma mieć 45 pobrań; pozostałe liczniki nie mogą się zmienić.
2. Dodaj funkcję `reset(id)` oraz przycisk „Wyzeruj” przy każdym zdjęciu. Użyj tego samego schematu z `map()`, ale dla pasującego `id` ustaw `downloads: 0`.
3. Dodaj czwarte zdjęcie z unikalnym `id`. Oba przyciski mają działać również dla niego.
4. Dodaj do obiektów `filename` i wyświetl obrazy z folderu `public`, np. przez `src={"/" + photo.filename}`.

## E. Ten sam przykład z osobnym komponentem

Dopiero teraz podziel działający przykład z części D na dwa pliki. **Tablica i funkcja `download` zostają w `App`.** Karta otrzymuje dane i funkcję przez props.

### 1. Utwórz PhotoCard.jsx

```jsx
function PhotoCard({ photo, onDownload }) {
  return (
    <div>
      <h2>{photo.alt}</h2>
      <p>Pobrania: {photo.downloads}</p>
      <button onClick={() => onDownload(photo.id)}>Pobierz</button>
    </div>
  );
}

export default PhotoCard;
```

Nie dodawaj w karcie `useState` dla zdjęcia. Aktualne dane otrzymuje ona z `App`.

### 2. W App.jsx dodaj import

```jsx
import PhotoCard from "./PhotoCard";
```

### 3. Zmień tylko JSX zwracany przez App

Zachowaj tablicę w stanie i funkcję `download` z części D. Zastąp dotychczasowy `return` tym fragmentem:

```jsx
return (
  <div>
    <h1>Galeria</h1>
    {photos.map((photo) => (
      <PhotoCard
        key={photo.id}
        photo={photo}
        onDownload={download}
      />
    ))}
  </div>
);
```

`photo` przekazuje obiekt, a `onDownload` przekazuje funkcję. Kliknięcie w karcie wywołuje funkcję z `App` z odpowiednim `id`.

```text
Kliknięcie → onDownload(photo.id) → download(id) w App
→ zmiana obiektu przez map() → nowe dane w karcie
```

### Zrób sam

1. Sprawdź, że „Pobierz” nadal zmienia tylko kliknięte zdjęcie.
2. Przenieś do karty przycisk „Wyzeruj” z części D. Przekaż funkcję `reset` przez prop `onReset`.
3. Dodaj w `PhotoCard` osobny lokalny stan `likes` i przycisk „Polub”. Pobrania nadal mają być w tablicy w `App`.
4. Zastosuj ten układ do swojej galerii 12 zdjęć. Zachowaj obrazy i pozostałe elementy kart.

**Dla osób, które skończą wcześniej:** dodaj filtrowanie po kategorii z lekcji 09. Filtruj aktualną tablicę `photos`, a w setterze aktualizuj pełną `previousPhotos`. Po zmianie filtra pobrania pozostaną w `App`; lokalne polubienia karty usuniętej z widoku zresetują się po jej powrocie.

## Szybka kontrola

- Zmieniam stan przez setter, a nie przez `photo.downloads++`.
- Kopiuję pola obiektu przez `...`, a potem wpisuję zmieniane pole.
- W `map()` sprawdzam `id` i zwracam także niezmieniane obiekty.
- Do `onClick` przekazuję funkcję, nie wynik jej wywołania.
- W części E dane pobrań przechowuję tylko w `App`.

Po odświeżeniu strony stan wraca do wartości początkowych.

Materiały uzupełniające: [obiekty w stanie](https://react.dev/learn/updating-objects-in-state), [tablice w stanie](https://react.dev/learn/updating-arrays-in-state).
