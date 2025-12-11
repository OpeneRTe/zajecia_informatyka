# Ściąga: Break-pointy w Bootstrap (kolejność i zasady)

## 1. Kolejność break-pointów (Bootstrap 5)

1. **xs** — `0px` (bez media query)
2. **sm** — `≥576px`
3. **md** — `≥768px`
4. **lg** — `≥992px`
5. **xl** — `≥1200px`
6. **xxl** — `≥1400px`

## 2. Reguła deklarowania

- Bootstrap stosuje model **mobile-first**.
- Style podstawowe dotyczą najmniejszych ekranów.
- Kolejne break-pointy należy deklarować w **porządku rosnącym**.
- Każde następne zapytanie `@media (min-width: X)` **nadpisuje wartości z poprzednich**.

## 3. Schemat użycia w SCSS/CSS

```css
.element {
    property: value;            /* xs */
}

@media (min-width: 576px) {     /* sm */
    .element { property: value-sm; }
}

@media (min-width: 768px) {     /* md */
    .element { property: value-md; }
}

@media (min-width: 992px) {     /* lg */
    .element { property: value-lg; }
}

@media (min-width: 1200px) {    /* xl */
    .element { property: value-xl; }
}

@media (min-width: 1400px) {    /* xxl */
    .element { property: value-xxl; }
}
```

## 4. Schemat użycia klas Bootstrapa

- `col-12` — zakres xs  
- `col-sm-6` — od sm wzwyż  
- `col-md-4` — od md wzwyż  
- `col-lg-3` — od lg wzwyż  

Przykład:

```html
<div class="col-12 col-sm-6 col-md-4 col-lg-3"></div>
```

---

# Zadania ćwiczeniowe — Break-pointy w Bootstrap

## Zadanie 1 — break-pointy w CSS

Utwórz element `.box` o następujących właściwościach:

- dla najmniejszych ekranów (xs)  
  - szerokość: 100%  
  - wysokość: 80px  
  - kolor tła: `#999999`

- od szerokości **sm** (`≥576px`)  
  - kolor tła: `#6666FF`

- od szerokości **md** (`≥768px`)  
  - wysokość: `120px`  
  - kolor tła: `#4444FF`

- od szerokości **lg** (`≥992px`)  
  - szerokość: `50%`

Zaimplementuj style z uwzględnieniem poprawnej kolejności break-pointów Bootstrap.

---

## Zadanie 2 — break-pointy w klasach Bootstrapa

Przygotuj układ siatki:

- na ekranach **xs**: jeden element w wierszu (pełna szerokość),  
- na **sm**: dwa elementy w wierszu,  
- na **md**: trzy elementy,  
- na **lg**: cztery elementy.

Użyj wyłącznie klas Bootstrapa.

Oczekiwany efekt to cztery elementy w jednym wierszu dla największego z wymienionych break-pointów.

---

## Zadanie 3 — analiza

Wyjaśnij, dlaczego deklaracja break-pointu `@media (min-width: 768px)` nie zadziała poprawnie, jeśli w tym samym pliku później znajduje się `@media (min-width: 576px)`.

W odpowiedzi odwołaj się do:

- zasady **mobile-first**,
- kolejności przetwarzania reguł CSS,
- nadpisywania właściwości przez późniejsze reguły.

