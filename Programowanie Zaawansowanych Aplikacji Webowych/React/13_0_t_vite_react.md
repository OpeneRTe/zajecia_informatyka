#  Vite oraz struktura projektu React

## 1. Zakres 

Moduł przedstawia:
- charakterystykę narzędzia Vite,
- konfigurację środowiska pracy,
- strukturę projektu React,
- znaczenie plików oraz katalogów w projekcie,
- proces inicjowania aplikacji w przeglądarce,
- powiązania między plikiem HTML a kodem React.

## 2. Vite — opis narzędzia

Vite jest narzędziem służącym do uruchamiania i budowania aplikacji webowych. Charakteryzuje się wysoką wydajnością oraz niewielkim narzutem konfiguracyjnym.

### 2.1. Właściwości
- szybkie uruchamianie serwera deweloperskiego,
- natychmiastowe odświeżanie zmian (HMR),
- obsługa modułów ECMAScript,
- integracja z Rollup,
- minimalna konfiguracja.

## 3. Inicjowanie projektu React

```
npm create vite@latest
npm install
npm run dev
```

## 4. Struktura projektu

```
projekt/
├── node_modules/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 5. Dokumentacja plików i katalogów

### node_modules/
Biblioteki wykorzystywane przez projekt, generowane automatycznie.

### public/
Pliki statyczne dostępne bezpośrednio.

### src/
Kod aplikacji React.

#### App.jsx
Główny komponent aplikacji.

#### App.css
Style komponentu App.

#### index.css
Style globalne.

#### main.jsx
Inicjalizacja aplikacji:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

### index.html
Dokument HTML z elementem `root`.

### package.json
Zależności i skrypty:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

### vite.config.js
Konfiguracja Vite.

### README.md
Opis projektu.

## 6. Przepływ działania aplikacji
1. index.html dostarcza element root,
2. main.jsx inicjuje renderowanie,
3. React montuje komponent App,
4. App.jsx definiuje interfejs,
5. pliki CSS nadają styl,
6. Vite zarządza podglądem.

## 7. Podsumowanie

Struktura projektu generowanego przez Vite zapewnia szybkie rozpoczęcie pracy nad aplikacją React oraz umożliwia dalszy rozwój poprzez komponenty i architekturę aplikacji.
