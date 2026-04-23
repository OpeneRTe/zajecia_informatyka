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
<form action={handleSubmit}>
    <input type="email" name="email" />
    <input type="submit" value="Submit">
</form>
```
## Porównanie podejść

Cecha | Tradycyjne onSubmit | Nowoczesne action | 
|---|---|---|
Zarządzanie danymi | Ręczne przez useState dla każdego pola. | Automatyczne przez obiekt FormData.
Pobieranie wartości | Ze zmiennej stanowej. | Metodą formData.get('name').
Obsługa zdarzenia | Wymaga wywołania e.preventDefault(). | Obsługiwane automatycznie przez React.
Wydajność | Render przy każdym naciśnięciu klawisza. | Render tylko przy wysyłce formularza.

### Przykład formularza React from 'react';

```js
import React, { useState } from 'react';

export default function FormularzKomponent1() {
    const [errors, setErrors] = useState({});

    const [inputs, setInputs] = useState({
        imie: '',
        ...
    });

    const resetForm = () => {
        setInputs({
            imie: '',
            nazwisko: '',
           ...
        });

        setErrors({});
    };

    const handleSubmit = (formData) => {
        const przechwyconeBledy = {};

        const dane = {
            imie: formData.get('imie') || '',
            nazwisko: formData.get('nazwisko') || '',
            // Pobierz pozostałe dane z formData

        if (dane.imie.length < 3) {
            przechwyconeBledy.imie = 'Imię musi mieć co najmniej 3 znaki';
        }

        // Sprawdź czy nazwisko ma co najmniej 2 znaki
        
        // Sprawdź czy email zawiera '@'
        
        // Sprawdź czy telefon ma co najmniej 9 znaków
        
        // Sprawdź czy data urodzenia została podana !dane.dataUrodzenia
        
        // Sprawdź czy kraj został wybrany !dane.kraj

        // Sprawdź czy płeć została wybrana !dane.plec
        
        // Sprawdź czy zgoda została zaakceptowana !dane.zgoda
        // Sprawdź czy hasło ma co najmniej 6 znaków
        
        // Sprawdź czy hasło i potwierdzenie hasła są takie same

        setErrors(przechwyconeBledy);

        if (przechwyconeBledy.imie ||
          przechwyconeBledy.nazwisko ||
          ... // Sprawdź pozostałe błędy
        
        ) return;


        setInputs(dane);
    };

    return (
        <form action={handleSubmit}>
           
            <h2>Formularz rejestracyjny</h2>

            <input
                type="text"
                name="imie"
                placeholder="Imię"
                defaultValue={inputs.imie}
            />
            <br />
            {errors.imie && <span>{errors.imie}</span>}
            <br />

            // Uzupełnij pozostałe pola formularza wraz z wyświetlaniem błędów

            <input type="submit" value="Submit" />
            <input type="reset" value="Reset" onClick={resetForm} />
        </form>
    );
}
    