# KARTA PRACY
## React + Bootstrap – Filtrowanie danych (filter)

**Przedmiot:** INF.04 – Zaawansowane aplikacje webowe  
**Technologie:** React, Bootstrap  
**Temat:** Filtrowanie danych w React przy użyciu `filter()`  

---

# 1. Schemat pamięciowy filtrowania w React

W aplikacji React często musimy wyświetlić tylko część danych.

Przykłady:
- tylko konkursy
- tylko warsztaty
- tylko wycieczki

Do tego używamy metody tablicowej:

```
filter()
```

Schemat filtrowania:

```
const visibleEvents = events.filter(event => {

  if (WARUNEK_1) return false
  if (WARUNEK_2) return false
  if (WARUNEK_3) return false

  return true
})
```

Następnie renderujemy elementy:

```
visibleEvents.map(event => ...)
```

### Zapamiętaj schemat

```
events
 → filter()
 → visibleEvents
 → map()
 → JSX
```

---

# 2. Analiza kodu

Przeanalizuj kod:

```javascript
const visibleEvents = events.filter(event => {

  if (event.type === 1 && showContest === false) return false
  if (event.type === 2 && showWorkshop === false) return false
  if (event.type === 3 && showTrip === false) return false

  return true
})
```

Odpowiedz na pytania:

**1. Jak nazywa się metoda używana do filtrowania tablicy?**

.............................................................................

**2. Co oznacza `return false` w funkcji `filter()`?**

.............................................................................

**3. Co oznacza `return true`?**

.............................................................................

**4. Co reprezentuje zmienna `event`?**

.............................................................................

**5. Dlaczego na końcu funkcji znajduje się `return true`?**

.............................................................................

---

# 3. Uzupełnianie kodu – checkbox

Checkbox steruje filtrowaniem.

Uzupełnij brakujący fragment:

```jsx
<input
  type="checkbox"
  checked={showContest}
  onChange={(e) => __________________________}
/>
```

---

# 4. Uzupełnianie kodu – filtrowanie

Uzupełnij brakujące fragmenty kodu:

```javascript
const visibleEvents = events.filter(event => {

  if (event.type === 1 && __________________) return false

  if (event.type === 2 && __________________) return false

  if (event.type === 3 && __________________) return false

  return ______
})
```

---

# 5. Zadanie logiczne

Dane:

| id | name | type |
|----|------|------|
| 1 | Konkurs HTML | 1 |
| 2 | Warsztaty React | 2 |
| 3 | Wycieczka IT | 3 |
| 4 | Konkurs CSS | 1 |
| 5 | Warsztaty JS | 2 |

Legenda:

```
1 → konkurs
2 → warsztaty
3 → wycieczka
```

Ustawienia filtrów:

```
showContest = true
showWorkshop = false
showTrip = true
```

### Które elementy zostaną wyświetlone?

.............................................................................

.............................................................................

---

# 6. Zadanie – zapis kodu z pamięci

Zapisz z pamięci schemat filtrowania:

```
const visibleEvents = ______________________________________

____________________________________________________________

____________________________________________________________

____________________________________________________________
```

Następnie wyświetl elementy:

```jsx
_____________________________________.map(event => (
  <div>
    {event.name}
  </div>
))
```

---

# 7. Zadanie dodatkowe (dla chętnych)

Dlaczego lepiej najpierw użyć `filter()` a dopiero potem `map()`?

.............................................................................

.............................................................................

.............................................................................


---

# 8. Ćwiczenie pamięciowe – struktura Bootstrap

W aplikacji React często używamy siatki **Bootstrap**.

Zapamiętaj podstawowy schemat:

```
container
  row
    col
```

Uzupełnij kod HTML:

```html
<div class="____________">
  <div class="____________">
    <div class="____________">
      Treść wydarzenia
    </div>
  </div>
</div>
```

Pytania:

**1. Która klasa Bootstrapa odpowiada za główny kontener strony?**

.............................................................................

**2. Do czego służy klasa `row`?**

.............................................................................

**3. Do czego służy klasa `col`?**

.............................................................................

---

# 9. Bootstrap Switch jako checkbox

Bootstrap umożliwia wyświetlanie checkboxa jako przełącznika (switch).

Przykładowy kod:

```html
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" id="showContest">
  <label class="form-check-label" for="showContest">Pokaż konkursy</label>
</div>
```

Uzupełnij brakujące fragmenty:

```html
<div class="____________________________">

  <input
    class="____________________________"
    type="checkbox"
    id="showWorkshop"
  >

  <label
    class="____________________________"
    for="showWorkshop"
  >
    Pokaż warsztaty
  </label>

</div>
```

---

# 10. React – switch sterujący filtrem

Checkbox zapisujemy w React w następujący sposób:

```jsx
<input
  type="checkbox"
  checked={showContest}
  onChange={(e) => setShowContest(e.target.checked)}
/>
```

Uzupełnij kod:

```jsx
<input
  type="checkbox"
  checked={showTrip}
  onChange={(e) => _________________________________}
/>
```

Pytanie:

**Dlaczego używamy `e.target.checked`, a nie `e.target.value`?**

.............................................................................

.............................................................................


