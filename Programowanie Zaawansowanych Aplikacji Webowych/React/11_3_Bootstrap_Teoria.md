# Bootstrap od podstaw — materiał dla ucznia

**Programowanie aplikacji webowych · Przygotowanie do INF.04 · Bootstrap 5.3**

## 1. Co to jest Bootstrap?

Bootstrap to framework do tworzenia interfejsów stron internetowych. Framework jest gotowym zestawem narzędzi i zasad, które pomagają budować własny projekt. Bootstrap dostarcza style CSS i opcjonalne komponenty JavaScript.

Załóżmy, że tworzymy katalog kursów. Potrzebujemy tytułu, opisów, przycisków i formularza. HTML określa ich strukturę. CSS odpowiada za wygląd. Bootstrap pozwala wykorzystać przygotowane wcześniej reguły CSS zamiast pisać każdą z nich samodzielnie.

**Dlaczego stosujemy Bootstrap?**

- Przyspiesza tworzenie typowych elementów strony.
- Pomaga zachować spójny wygląd przycisków, pól i komunikatów.
- Ułatwia tworzenie układu dostosowującego się do szerokości ekranu.
- Udostępnia dokumentację z przykładami, które można dostosować do projektu.

Bootstrap nie zastępuje znajomości HTML i CSS. Nie zapisuje automatycznie danych formularza ani nie realizuje całej logiki aplikacji. Możemy uzupełniać go własnym CSS.

| Część Bootstrapa | Zastosowanie |
|---|---|
| Układ strony | Rozmieszczenie treści w kontenerach i kolumnach |
| Klasy pomocnicze | Odstępy, kolory, wyrównanie tekstu |
| Komponenty | Przyciski, karty, alerty, nawigacja |
| Formularze | Wygląd pól, list wyboru i checkboxów |

## 2. Jak dołączyć Bootstrap?

### Zwykła strona HTML

Najpierw pobieramy arkusz CSS i umieszczamy go w projekcie, np. w folderze `assets`. W sekcji `head` dodajemy:

```html
<link rel="stylesheet" href="assets/bootstrap.min.css">
```

Można także podać adres pliku z CDN, czyli serwera udostępniającego zasoby biblioteki. Wtedy potrzebny jest dostęp do tego zasobu w sieci.

W `head` umieszczamy również ustawienie prawidłowego skalowania na urządzeniach mobilnych:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

### Projekt React

W terminalu, w katalogu istniejącego projektu, instalujemy serię 5.3:

```bash
npm install bootstrap@5.3
```

W pliku wejściowym, np. `src/main.jsx`, importujemy style:

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

**Instalacja udostępnia pliki pakietu. Import dołącza CSS do aplikacji.** Samo zainstalowanie pakietu nie wystarczy do uzyskania stylów w widoku.

## 3. Jak używać klas?

Klasa jest nazwą pozwalającą zastosować określone reguły CSS. Bootstrap ma własny zestaw takich nazw.

```html
<button type="button" class="btn btn-primary">Zobacz kurs</button>
```

Ten przycisk ma dwie klasy rozdzielone spacją:

- `btn` — podstawowy styl przycisku;
- `btn-primary` — wariant główny.

W JSX używamy `className`:

```jsx
<button type="button" className="btn btn-primary">Zobacz kurs</button>
```

Nazwy klas pozostają takie same. Kilka klas na jednym elemencie może łączyć np. wygląd przycisku i jego margines: `btn btn-primary mt-3`.

**Bootstrap a React:** Bootstrap pomaga w stylowaniu i układzie. React pozwala tworzyć komponenty aplikacji i aktualizować widok na podstawie stanu. Klasa `btn-success` nie zwiększy licznika — potrzebna jest funkcja obsługi zdarzenia.

## 4. Siatka: container → row → col

Siatka służy do rozmieszczania elementów obok siebie. Jej podstawowa struktura to:

```text
container — obszar treści
└── row — wiersz
    ├── kolumna
    └── kolumna
```

`container` ma maksymalną szerokość zależną od progu. `container-fluid` zajmuje pełną dostępną szerokość rodzica. `row` grupuje kolumny, a treść umieszczamy wewnątrz kolumn.

```html
<div class="container">
  <div class="row">
    <div class="col">Pierwszy kurs</div>
    <div class="col">Drugi kurs</div>
  </div>
</div>
```

W tym przykładzie dwie klasy `col` tworzą równe kolumny.

### Podział na 12 jednostek

Domyślnie szerokość wiersza dzielimy na 12 jednostek. `col-6` oznacza jedną kolumnę zajmującą 6/12 szerokości, czyli połowę. Nie oznacza sześciu kolumn.

| Podział | Klasy kolejnych kolumn | Efekt |
|---|---|---|
| 6 + 6 | `col-6`, `col-6` | Dwie połowy |
| 8 + 4 | `col-8`, `col-4` | Szersza treść i węższy panel |
| 4 + 4 + 4 | Trzy razy `col-4` | Trzy równe części |
| 3 + 3 + 3 + 3 | Cztery razy `col-3` | Cztery równe części |
| 12 | `col-12` | Cała szerokość |

Przykład szerszej treści i węższego panelu:

```html
<div class="container">
  <div class="row">
    <div class="col-8">Opis kursu</div>
    <div class="col-4">Informacje dodatkowe</div>
  </div>
</div>
```

Jeżeli kolumny o ustalonych szerokościach nie mieszczą się w 12 jednostkach, następuje zawijanie do kolejnej linii. Na przykład trzy elementy `col-6` utworzą dwie kolumny w pierwszej linii i jedną w drugiej. Suma nie musi wynosić dokładnie 12 — mniejsza suma może pozostawić wolne miejsce.

Klasy bez progu, np. `col-4`, zachowują swój udział w szerokości także na wąskim ekranie. Aby zmieniać układ zależnie od szerokości, używamy wariantów responsywnych.

## 5. Responsywność i progi

**Responsywność** to dostosowanie układu strony do dostępnej szerokości. Trzy kursy mogą stać obok siebie na szerokim ekranie, a na wąskim jeden pod drugim.

Bootstrap stosuje podejście **mobile-first**: najpierw określamy układ podstawowy, a następnie warianty dla większych szerokości.

| Próg | Działa od szerokości | Przykład |
|---|---:|---|
| Podstawowy, tzw. xs | 0 px | `col-12` |
| sm | 576 px | `col-sm-6` |
| md | 768 px | `col-md-6` |
| lg | 992 px | `col-lg-4` |
| xl | 1200 px | `col-xl-3` |
| xxl | 1400 px | `col-xxl-2` |

Są to szerokości obszaru przeglądarki w pikselach CSS. Nie oznaczają konkretnych modeli urządzeń. Nie używamy klasy `col-xs-12` — poprawna nazwa to `col-12`.

```html
<div class="col-12 col-md-6 col-lg-4">Kurs</div>
```

Czytamy ten zapis tak:

| Szerokość | Szerokość jednego bloku | Ile takich bloków mieści się w linii? |
|---|---|---:|
| Poniżej 768 px | 12/12 | 1 |
| Od 768 do poniżej 992 px | 6/12 | 2 |
| Od 992 px | 4/12 | 3 |

`col-md-6` działa od 768 px wzwyż, nie tylko w jednym przedziale. W przykładzie od 992 px szerokość zmienia `col-lg-4`. Kolejność nazw klas w atrybucie nie ustala ich pierwszeństwa; decydują reguły CSS.

## 6. Klasy pomocnicze — odstępy, tekst i kolory

Klasa pomocnicza zmienia konkretną cechę wyglądu.

**Margin** to odstęp zewnętrzny, oddzielający element od sąsiadów. **Padding** to odstęp wewnętrzny, między treścią a krawędzią elementu.

| Klasa | Znaczenie |
|---|---|
| `m-3` | Margines ze wszystkich stron |
| `mt-3` / `mb-3` | Margines u góry / u dołu |
| `p-3` | Padding ze wszystkich stron |
| `px-3` | Padding z lewej i prawej |
| `py-3` | Padding u góry i u dołu |
| `g-3` na `row` | Odstępy siatki w obu kierunkach |
| `text-center` | Wyśrodkowanie tekstu |
| `fw-bold` | Pogrubienie tekstu |
| `text-primary` | Kolor główny motywu dla tekstu |
| `bg-light` | Jasne tło |

Liczba w klasie odstępu jest pozycją skali, nie liczbą pikseli. Domyślnie `3` oznacza `1rem`, a `5` oznacza `3rem`. Przy bazowym rozmiarze 16 px odpowiada to 16 px i 48 px. Jeśli wymaganie podaje dokładnie 5 px marginesu, zastosuj własną deklarację `margin: 5px;`, a nie `m-5`.

```html
<div class="p-3 mb-3 bg-light">
  <h2 class="text-center">Kursy dla Ciebie</h2>
  <p class="fw-bold">Wybierz temat.</p>
</div>
```

Można też spotkać `d-flex`, które włącza układ flex, oraz `justify-content-between`, które rozkłada jego elementy z wolną przestrzenią między nimi.

## 7. Komponenty: przyciski, karty, alerty

Komponent Bootstrapa to gotowy wzorzec elementu interfejsu. Często składa się z kilku znaczników i klas. Nie jest automatycznie komponentem React.

### Przyciski

| Klasy | Przeznaczenie |
|---|---|
| `btn btn-primary` | Główna akcja |
| `btn btn-success` | Akcja kojarzona z powodzeniem |
| `btn btn-danger` | Akcja wymagająca uwagi, np. usuwanie |
| `btn btn-outline-primary` | Wariant z obramowaniem |

Wariant określa wygląd. Działanie przycisku wymaga osobnego kodu. `type="button"` zapobiega przypadkowemu wysłaniu formularza; `type="submit"` służy do jego wysyłania.

### Karta

Karta grupuje informacje o jednym kursie, produkcie lub zdjęciu:

```html
<div class="card">
  <div class="card-body">
    <h2 class="card-title">Podstawy HTML</h2>
    <p class="card-text">Poznaj strukturę strony internetowej.</p>
    <button type="button" class="btn btn-primary">Zobacz kurs</button>
  </div>
</div>
```

`card` jest blokiem zewnętrznym, `card-body` obszarem treści, a `card-title` i `card-text` oznaczają tytuł i opis. Kartę można umieścić wewnątrz kolumny siatki. **Siatka rozmieszcza karty, a karta porządkuje swoją treść.**

### Alert

Alert to komunikat widoczny na stronie:

```html
<div class="alert alert-info" role="alert">
  Wybierz kurs, aby poznać jego opis.
</div>
```

Klasa `alert` daje styl podstawowy, a `alert-info` określa wariant informacyjny. Inne warianty to np. `alert-success` i `alert-danger`. Komunikat powinien zawierać zrozumiały tekst — sam kolor nie wystarcza. Alert Bootstrapa nie jest okienkiem JavaScript `alert()`.

## 8. Formularze

Formularz zbiera dane. Bootstrap ujednolica wygląd kontrolek, ale nie implementuje automatycznie zapisu danych.

### Pole tekstowe i etykieta

```html
<div class="mb-3">
  <label for="imie" class="form-label">Imię</label>
  <input type="text" id="imie" class="form-control">
</div>
```

`form-control` styluje pole, `form-label` etykietę, a `mb-3` dodaje odstęp pod grupą. Identyczne wartości `for` i `id` wiążą etykietę z polem. Identyfikator powinien być unikalny na stronie. Kliknięcie etykiety pola tekstowego przenosi do niego fokus.

W React zapis wygląda tak:

```jsx
<label htmlFor="imie" className="form-label">Imię</label>
<input type="text" id="imie" className="form-control" />
```

### Lista wyboru

```html
<label for="kurs" class="form-label">Kurs</label>
<select id="kurs" class="form-select">
  <option>Podstawy HTML</option>
  <option>Style CSS</option>
</select>
```

W Bootstrapie 5 lista używa `form-select`. Pole tekstowe i `textarea` używają `form-control`.

### Checkbox i przełącznik

```html
<div class="form-check form-switch">
  <input type="checkbox" id="przypomnienie" class="form-check-input">
  <label for="przypomnienie" class="form-check-label">
    Przypomnienie o kursie
  </label>
</div>
```

`form-check` grupuje kontrolkę i etykietę. `form-check-input` styluje checkbox, a `form-check-label` etykietę. Dodatkowa klasa `form-switch` zmienia wygląd checkboxa na przełącznik. Po jej usunięciu otrzymamy zwykły checkbox.

Sam przełącznik nie filtruje tablicy zdjęć. W React należy powiązać go ze stanem i wykorzystać stan w warunku wyświetlania lub filtrowaniu.

**Walidacja:** `is-valid` i `is-invalid` pokazują wynik sprawdzenia pola. Nie określają samodzielnie, jakie dane są poprawne. Sprawdzanie realizuje kod lub mechanizm walidacji HTML.

## 9. CSS a JavaScript Bootstrapa

Siatka, wygląd przycisków, kart, alertów i formularzy korzystają z CSS. Zwykły checkbox może zmieniać zaznaczenie dzięki działaniu HTML.

Bootstrap oferuje też m.in. navbar (nawigację), modal (okno dialogowe) i carousel (karuzelę). Zachowania takie jak otwieranie modala lub zwijanie menu wymagają także JavaScript Bootstrapa albo innej implementacji tych zachowań. Własna logika aplikacji, np. licznik pobrań, nadal należy do naszego kodu.

## 10. Najważniejsze zasady przed zadaniami INF.04

- Najpierw dołącz CSS, potem używaj klas.
- W JSX stosuj `className` i `htmlFor`.
- Rozróżniaj szerokość kolumny od liczby elementów w wierszu.
- Próg oznacza minimalną szerokość działania wariantu.
- Nie zamieniaj dokładnych wymiarów w pikselach na przybliżone klasy odstępów.
- Oddzielaj wygląd interfejsu od logiki aplikacji.
- Sprawdzaj wersję pomocy. Starsze przykłady Bootstrap 4 mogą zawierać inne klasy, np. `form-group` oraz `form-control` dla listy wyboru.

## Dokumentacja i pokaz

W dokumentacji szukaj działów **Layout** (układ), **Utilities** (klasy pomocnicze), **Components** (komponenty) oraz **Forms** (formularze).

- [Wprowadzenie](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Siatka](https://getbootstrap.com/docs/5.3/layout/grid/) i [progi](https://getbootstrap.com/docs/5.3/layout/breakpoints/)
- [Odstępy](https://getbootstrap.com/docs/5.3/utilities/spacing/) i [tekst](https://getbootstrap.com/docs/5.3/utilities/text/)
- [Karty](https://getbootstrap.com/docs/5.3/components/card/) i [alerty](https://getbootstrap.com/docs/5.3/components/alerts/)
- [Formularze](https://getbootstrap.com/docs/5.3/forms/overview/)

Pokaz do lekcji znajduje się w folderze `11_Bootstrap_pokaz`. Otwórz `index.html`. W etapie „3. Siatka” porównaj pięć stałych podziałów i wariant responsywny. Przełącznik CSS pozwala obejrzeć ten sam HTML bez stylów i ze stylami.
