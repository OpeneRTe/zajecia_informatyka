# React – obiekt i tablica obiektów w useState - uproszony przykład

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


W tym przykładzie `useState` przechowuje **tablicę obiektów**. Każdy obiekt opisuje jedno zdjęcie i zawiera jego `id`, opis `alt` oraz liczbę pobrań `downloads`.

```jsx
const [photos, setPhotos] = useState([...]);
```

- `photos` — aktualny stan, czyli tablica zdjęć.
- `setPhotos` — funkcja służąca do aktualizacji stanu.

**Jak zmienić właściwość jednego obiektu?**

Nie zmieniamy stanu bezpośrednio. Tworzymy nową tablicę, a w niej nowy obiekt dla wybranego zdjęcia:

```jsx
setPhotos((previousPhotos) =>
  previousPhotos.map((photo) =>
    photo.id === id
      ? { ...photo, downloads: photo.downloads + 1 }
      : photo
  )
);
```

1. `previousPhotos` daje dostęp do poprzedniego stanu.
2. `map()` tworzy nową tablicę.
3. `photo.id === id` wyszukuje zdjęcie, którego przycisk kliknięto.
4. `{ ...photo, downloads: photo.downloads + 1 }` kopiuje właściwości obiektu i zwiększa liczbę pobrań.
5. Pozostałe obiekty zwracamy bez zmian.

Po aktualizacji stanu React ponownie renderuje komponent i pokazuje nową liczbę pobrań.

**Do zapamiętania:** aktualizując obiekt w tablicy stanu, tworzymy nową tablicę oraz kopię zmienianego obiektu.