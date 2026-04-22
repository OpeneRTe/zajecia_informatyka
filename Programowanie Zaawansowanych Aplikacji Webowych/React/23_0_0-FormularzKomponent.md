# Fromularz komponent - powtórzenie

## Nowoczesne formularze w React: form action oraz FormData


Wraz z nowszymi wersjami React (18.x i 19), podejście do obsługi formularzy uległo zmianie na korzyść bardziej natywnych mechanizmów przeglądarkowych. 

## 1. Atrybut action w elemencie <form>
Tradycyjnie w React używaliśmy zdarzenia onSubmit. Nowoczesny React pozwala przypisać funkcję bezpośrednio do atrybutu action.

### Główne zalety:
 - Brak e.preventDefault(): 
 - React automatycznie zatrzymuje domyślne odświeżanie strony.
 - Lepsza wydajność: Nie musisz synchronizować każdego znaku wpisanego w pole tekstowe ze stanem (useState), co ogranicza liczbę zbędnych renderowań komponentu.
 - Prostota: Kod staje się krótszy i bardziej czytelny.
  
## Obiekt FormData
 
   FormData to wbudowany w przeglądarkę obiekt, który zbiera dane ze wszystkich pól formularza. React automatycznie przekazuje ten obiekt jako pierwszy argument do funkcji zdefiniowanej w action.
   Aby dane trafiły do obiektu FormData, każdy element formularza (np. <input>) musi posiadać atrybut name. To właśnie ten atrybut służy jako klucz do pobrania wartości.
   
   Przykład użycia:
   
   ```js
    handleSubmit = (formData) => {
        // Pobieranie wartości po atrybucie 'name'
        const email = formData.get("email"); 
        const password = formData.get("password");
    };

// ... wewnątrz return:
<input type="email" name="email" />
```
## Porównanie podejść

Cecha | Tradycyjne onSubmit | Nowoczesne action | 
|---|---|---|
Zarządzanie danymi | Ręczne przez useState dla każdego pola. | Automatyczne przez obiekt FormData.
Pobieranie wartości | Ze zmiennej stanowej. | Metodą formData.get('name').
Obsługa zdarzenia | Wymaga wywołania e.preventDefault(). | Obsługiwane automatycznie przez React.
Wydajność | Render przy każdym naciśnięciu klawisza. | Render tylko przy wysyłce formularza.

### Przykład kompletnego komponentuJavaScriptimport React from 'react';

```js
export default function Rejestracja() {
  // Funkcja 'action' otrzymuje dane formularza automatycznie
  const procesujFormularz = (formData) => {
    const imie = formData.get("firstName");
    const wiek = formData.get("age");

    console.log(`Zarejestrowano: ${imie}, wiek: ${wiek}`);
  };

  return (
    <form action={procesujFormularz}>
      <label>
        Imię:
        <input type="text" name="firstName" />
      </label>
      <br />
      <label>
        Wiek:
        <input type="number" name="age" />
      </label>
      <br />
      <button type="submit">Wyślij</button>
    </form>
  );
}
```

```html
 return (
        <form action={handleSubmit}>
            <h2>Formularz rejestracyjny</h2>
            <input type="text" name="imie" placeholder="Imię" /> <br />
            ...
            ...

            <input type="submit" value="Submit" />
            <input type="reset" value="Reset" />
            
        </form>
    );
    ```
    