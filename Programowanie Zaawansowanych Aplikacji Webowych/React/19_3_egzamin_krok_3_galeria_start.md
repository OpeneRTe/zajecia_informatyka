# React + Bootstrap – krok 3 (karty + pobrania)

## Cel kroku 3

- użycie komponentów `card` z Bootstrap
- dodanie przycisku „Pobierz”
- zwiększanie liczby pobrań (`downloads`)

## Kluczowa idea

Dane, które się zmieniają, muszą być przechowywane w `useState`.

## `App.jsx`

```jsx
import { useState } from 'react'
import Header from './Header.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import { photos as initialPhotos } from './data/photos.js'

function App() {
  const [photos, setPhotos] = useState(initialPhotos)

  const handleDownload = (id) => {
    setPhotos(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, downloads: p.downloads + 1 }
          : p
      )
    )
  }

  return (
    <>
      <Header />

      <div className="container py-4">
        <div className="row g-4">
          {photos.map(photo => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={photo.id}>
              <div className="card h-100 shadow-sm">
                <img
                  className="card-img-top img-fluid"
                  src={new URL(`./assets/images/${photo.filename}`, import.meta.url).href}
                  alt={photo.alt}
                />

                <div className="card-body d-flex flex-column">
                  <h6 className="card-title">{photo.alt}</h6>

                  <span className="badge text-bg-primary mb-3">
                    Pobrania: {photo.downloads}
                  </span>

                  <button
                    className="btn btn-outline-primary mt-auto"
                    onClick={() => handleDownload(photo.id)}
                  >
                    Pobierz
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
```

