Zaimplementuj mechanizm aktualizacji stanu tablicy obiektów w komponencie React przy użyciu hooka `useState`, na przykładzie systemu reakcji emoji.

W stanie komponentu znajduje się tablica obiektów reprezentujących różne reakcje emoji (np. 🙂 😂 😡 ❤️ 🚀). Każda reakcja posiada unikalny identyfikator `id`, symbol emoji oraz licznik `count`, który określa, ile razy dana reakcja została użyta.

Należy zaimplementować funkcję obsługującą interakcję użytkownika, która:
- przyjmuje `id` wybranego emoji jako parametr,
- aktualizuje stan w sposób niemutowalny,
- zwiększa wartość `count` wyłącznie dla emoji, które zostało kliknięte,
- pozostawia pozostałe emoji w tablicy bez zmian.

Następnie należy przygotować widok aplikacji, w którym:
- wyświetlana jest lista wszystkich emoji,
- przy każdym emoji prezentowana jest aktualna liczba reakcji,
- dostępny jest przycisk umożliwiający dodanie reakcji do wybranego emoji,
- każda interakcja użytkownika wpływa tylko na jedno, właściwe emoji.

W kolejnym etapie należy rozszerzyć funkcjonalność tak, aby:
- możliwe było dodawanie różnej liczby reakcji emoji w jednej akcji,
- funkcja aktualizująca stan przyjmowała dodatkowy parametr określający liczbę dodawanych reakcji.

Na końcu należy dodać funkcję moderacyjną, która:
- przyjmuje `id` emoji,
- resetuje licznik reakcji tego emoji do zera,
- wykorzystuje ten sam schemat aktualizacji stanu oparty na mapowaniu tablicy i warunku sprawdzającym `id`.

