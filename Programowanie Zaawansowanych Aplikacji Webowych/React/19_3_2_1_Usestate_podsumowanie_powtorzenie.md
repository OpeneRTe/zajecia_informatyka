# Zarządzanie stanem i przepływ danych w bibliotece React - Powtórzenie

---

## Quiz z wiedzy o stanie w React

**Instrukcja:** Odpowiedz na poniższe pytania, opierając się na informacjach zawartych w materiałach źródłowych. Każda odpowiedź powinna składać się z 2–3 zdań.

1. Dlaczego operacja aktualizacji stanu w React jest określana jako asynchroniczna?
2. Jaką rolę pełni funkcja strzałkowa (tzw. functional update) przekazywana do `setState`?
3. W jaki sposób mechanizm *batchingu* wpływa na wielokrotne wywołania `setState` w jednym bloku kodu?
4. Czym są *stale closures* i jak funkcja strzałkowa pomaga im zapobiegać?
5. Na czym polega zasada niemutowalności (*immutability*) w kontekście obiektów i tablic?
6. Dlaczego React wykorzystuje *Shallow Comparison* (porównywanie referencji) do wykrywania zmian stanu?
7. Jakie są korzyści z niemutowalności w procesie debugowania aplikacji?
8. Opisz krótko cztery etapy jednokierunkowego przepływu danych w React.
9. Dlaczego metoda `map` jest preferowana przy aktualizacji pojedynczych elementów w tablicy stanu?
10. Jakie jest ryzyko bezpośredniej modyfikacji właściwości obiektu (np. `item.count++`) zamiast użycia operatora spread?

---

## Klucz odpowiedzi do quizu

1. Aktualizacja stanu jest asynchroniczna, ponieważ wywołanie `setState` nie zmienia wartości natychmiast, lecz planuje jej zmianę w przyszłości. Pozwala to Reactowi na optymalizację procesu odświeżania interfejsu użytkownika.
2. Funkcja strzałkowa gwarantuje, że przekazany do niej argument `prevState` jest faktycznie ostatnim, najbardziej aktualnym zatwierdzonym stanem komponentu. Zapewnia to pewność danych nawet przy szybkich, następujących po sobie aktualizacjach.
3. Batching to grupowanie wielu wywołań aktualizacji stanu w jedną operację dla poprawy wydajności. Bez użycia funkcji strzałkowej każde wywołanie może odwoływać się do tej samej, nieaktualnej wartości.
4. *Stale closures* to nieaktualne domknięcia, w których funkcja przechowuje wartość stanu z momentu swojego utworzenia. Funkcja strzałkowa w `setState` zapewnia dostęp do bieżącego stanu w momencie wykonania.
5. Niemutowalność polega na zakazie bezpośredniej modyfikacji obiektów i tablic w stanie. Zmiany realizuje się poprzez tworzenie nowych kopii struktur danych.
6. React porównuje referencje obiektów, ponieważ jest to bardzo szybka operacja. Dzięki temu może efektywnie zdecydować, czy konieczne jest ponowne renderowanie komponentu.
7. Niemutowalność umożliwia tworzenie kolejnych „snapshotów” stanu, co ułatwia analizę zmian i debugowanie. Pozwala także uniknąć trudnych do wykrycia efektów ubocznych.
8. Proces rozpoczyna się od stanu, na podstawie którego generowany jest render UI. Następnie użytkownik wykonuje interakcję, która wywołuje `setState` i inicjuje kolejny render.
9. Metoda `map` zawsze tworzy nową tablicę, co umożliwia Reactowi wykrycie zmiany referencji. Pozwala jednocześnie na selektywną aktualizację pojedynczego elementu.
10. Bezpośrednia modyfikacja nie zmienia referencji obiektu, przez co React może nie wykryć zmiany. Skutkuje to niespójnością pomiędzy stanem danych a widokiem UI.

---

## Tematy wypracowań (do samodzielnego przemyślenia)

1. Analiza porównawcza podejścia niemutowalnego i mutacji stanu oraz ich konsekwencji wydajnościowych.
2. Znaczenie asynchroniczności `setState` w architekturze nowoczesnych aplikacji webowych.
3. Uniwersalność wzorca aktualizacji list: `id → map → warunek → nowy obiekt`.
4. Jednokierunkowy przepływ danych jako fundament przewidywalności i łatwości utrzymania kodu.
5. Rola operatora spread w procesie niemutowalnych aktualizacji stanu.

---

## Słownik kluczowych pojęć

| Termin | Definicja |
|------|----------|
| `setState` | Funkcja do planowania aktualizacji stanu komponentu; działa asynchronicznie. |
| Niemutowalność | Zasada zakazująca bezpośredniej modyfikacji istniejących struktur danych. |
| Shallow Comparison | Porównywanie referencji obiektów zamiast ich zawartości. |
| Batching | Grupowanie wielu aktualizacji stanu w jeden cykl renderowania. |
| Functional Update | Aktualizacja stanu poprzez funkcję `(prevState) => nextState`. |
| Stale Closures | Problem użycia nieaktualnych wartości stanu w domknięciach funkcji. |
| One-Way Data Flow | Jednokierunkowy model przepływu danych w React. |
| `map` | Metoda tablicowa służąca do tworzenia nowych struktur danych. |
| Operator spread (`...`) | Składnia umożliwiająca tworzenie kopii obiektów i tablic. |
| Referencja | Adres obiektu lub tablicy w pamięci, używany do wykrywania zmian. |

