# React + Bootstrap – krok 4 (filtrowanie + pobrania)

## Cel kroku 4

- filtrowanie zdjęć po kategorii
- zachowanie poprawnego zwiększania `downloads`
- interakcja bez przeładowania strony (SPA)

## `App.jsx`

```jsx
import { useState } from 'react'
import Header from './Header.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import { photos as initialPhotos } from './data/photos.js'

function App() {
  const [photos, setPhotos] = useState(initialPhotos)
  const [category, setCategory] = useState(0)

  const handleDownload = (id) => {
    setPhotos(prev =>
      prev.map(p =>
        p.id === id
          ? { ...p, downloads: p.downloads + 1 }
          : p
      )
    )
  }

  const filteredPhotos = category === 0
    ? photos
    : photos.filter(photo => photo.category === category)

  return (
    <>
      <Header />

      <div className="container py-4">
        <div className="btn-group mb-4" role="group">
          <button className="btn btn-secondary" onClick={() => setCategory(0)}>Wszystkie</button>
          <button className="btn btn-secondary" onClick={() => setCategory(1)}>Natura</button>
          <button className="btn btn-secondary" onClick={() => setCategory(2)}>Zwierzęta</button>
          <button className="btn btn-secondary" onClick={() => setCategory(3)}>Motoryzacja</button>
        </div>

        <div className="row g-4">
          {filteredPhotos.map(photo => (
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

