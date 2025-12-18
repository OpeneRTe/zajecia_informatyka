# Zadanie egzaminacyjne – krok 2 (siatka)

## Cel kroku 2

Poprawne użycie siatki Bootstrap w React.

## Najważniejsze zasady

- w React używamy `className`
- jeden wspólny `row`
- `key` na elemencie zwracanym przez `map()`

## `App.jsx`

```jsx
import Header from './Header.jsx'
import 'bootstrap/dist/css/bootstrap.css'
import { photos } from './data/photos.js'

function App() {
  return (
    <>
      <Header />

      <div className="container">
        <div className="row">
          {photos.map(photo => (
            <div className="col-12 col-md-4 col-lg-3 mb-4" key={photo.id}>
              <img
                className="img-fluid"
                src={new URL(`./assets/images/${photo.filename}`, import.meta.url).href}
                alt={photo.alt}
              />
              <p className="mt-2 text-center">{photo.alt}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
```

