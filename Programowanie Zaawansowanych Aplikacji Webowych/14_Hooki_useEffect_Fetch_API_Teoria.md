# Lekcja 14. Jak komponent React pobiera dane z API?

**Klasa 4P · Zaawansowane Programowanie Aplikacji Internetowych · Teoria · 45 minut**  
**Nauczyciel** — Rafał Taraszka  
**Powiązanie z rozkładem** — tematy z godzin 54 i 61 (hooki, Fetch API i async/await).

Po lekcji potrafisz wyjaśnić, co widzi użytkownik przed otrzymaniem odpowiedzi z serwera, jak React zapamiętuje pobrane dane i co powoduje zmianę widoku.

## 1. Od Express do ekranu użytkownika · 5 min

Na poprzedniej lekcji powtarzaliśmy Node.js i Express. Wyobraź sobie, że serwer obsługuje żądanie `GET /api/ksiazki` i zwraca JSON:

```json
[{"id": 1, "tytul": "Lalka"}, {"id": 2, "tytul": "Solaris"}]
```

Uczeń otwiera stronę biblioteki. Serwer odpowie dopiero za dwie sekundy. Co powinno pojawić się na ekranie w tym czasie? Skąd komponent dowie się później, że może już wyświetlić tytuły?

## 2. Hooki i pamięć komponentu · 8 min

Komponent funkcyjny to funkcja opisująca widok za pomocą JSX. Podczas renderowania React wywołuje tę funkcję. Zwykła zmienna lokalna jest tworzona na nowo przy każdym wywołaniu. **Hook** to funkcja, dzięki której komponent korzysta z mechanizmów React, takich jak stan i efekty. Hooki omawiane na tej lekcji wywołujemy na najwyższym poziomie komponentu, przed warunkowymi instrukcjami `return`.

```jsx
const [ksiazki, ustawKsiazki] = useState([]);
```

`[]` oznacza początkową wartość stanu, czyli pustą listę. Podczas renderowania komponent odczytuje bieżącą listę ze zmiennej `ksiazki`. Gdy odpowiedź z serwera jest gotowa, wywołanie `ustawKsiazki(dane)` przekazuje Reactowi nową listę i zleca ponowne renderowanie. W kolejnym renderowaniu JSX ma już dostęp do tytułów.

## 3. Kiedy uruchamia się useEffect? · 8 min

Zadaniem komponentu biblioteki jest opisanie widoku na podstawie aktualnego stanu. Pobranie katalogu wymaga kontaktu z systemem zewnętrznym. Hook **useEffect** pozwala rozpocząć tę operację po zatwierdzeniu widoku przez React. Gdybyśmy wywołali fetch bezpośrednio w ciele komponentu, każde kolejne renderowanie wysyłałoby żądanie ponownie.

| Zapis | Kiedy React uruchamia efekt? |
|---|---|
| `useEffect(funkcja)` | Po każdym zatwierdzonym renderowaniu komponentu. |
| `useEffect(funkcja, [])` | Po zamontowaniu komponentu. Kolejne zmiany jego stanu same nie uruchamiają efektu ponownie. |
| `useEffect(funkcja, [dzial])` | Po zamontowaniu i po zmianie wartości działu, np. z lektur na fantastykę. |

Tablica zawiera wartości reaktywne używane przez efekt, np. dział przekazany do komponentu. Gdy efekt pobiera zawsze ten sam adres i nie odczytuje zmiennych właściwości ani stanu, tablica może być pusta. W trybie deweloperskim Strict Mode React może dodatkowo uruchomić efekt, posprzątać go i uruchomić ponownie.

## 4. Dlaczego zapisujemy await dwa razy? · 8 min

```js
const odpowiedz = await fetch("/api/ksiazki");
if (!odpowiedz.ok) throw new Error("Błąd HTTP " + odpowiedz.status);
const dane = await odpowiedz.json();
```

1. `fetch` rozpoczyna żądanie i zwraca obietnicę. Pierwsze `await` wstrzymuje dalsze wykonywanie funkcji do chwili uzyskania obiektu odpowiedzi. Przeglądarka może w tym czasie reagować na działania użytkownika.
2. Obiekt odpowiedzi zawiera m.in. status HTTP. Nawet przy statusie 404 serwer udzielił odpowiedzi, więc sprawdzamy `odpowiedz.ok`. Wartość jest prawdziwa dla statusów 200–299.
3. `odpowiedz.json()` odczytuje treść odpowiedzi i interpretuje ją jako JSON. Drugie `await` daje nam gotową wartość JavaScript — w naszym przykładzie tablicę książek.

## 5. Wspólna analiza komponentu · 12 min

Przykład zakłada, że pod adresem `/api/ksiazki` działa trasa Express zwracająca tablicę w przedstawionym formacie. Przeczytaj kod w kolejności zdarzeń. Zacznij od ustalenia, który komunikat zwróci komponent przy pierwszym renderowaniu.

```jsx
import { useEffect, useState } from "react";

export default function Biblioteka() {
  const [ksiazki, ustawKsiazki] = useState([]);
  const [status, ustawStatus] = useState("ladowanie");

  useEffect(() => {
    let aktywny = true;

    async function pobierzKsiazki() {
      try {
        const odpowiedz = await fetch("/api/ksiazki");
        if (!odpowiedz.ok) throw new Error("Błąd HTTP " + odpowiedz.status);
        const dane = await odpowiedz.json();
        if (aktywny) {
          ustawKsiazki(dane);
          ustawStatus("gotowe");
        }
      } catch {
        if (aktywny) ustawStatus("blad");
      }
    }

    pobierzKsiazki();
    return () => { aktywny = false; };
  }, []);

  if (status === "ladowanie") return <p>Pobieranie książek…</p>;
  if (status === "blad") return <p>Nie udało się pobrać katalogu.</p>;
  if (ksiazki.length === 0) return <p>Katalog jest pusty.</p>;
  return <ul>{ksiazki.map(k => <li key={k.id}>{k.tytul}</li>)}</ul>;
}
```

**Prześledź odpowiedź 200 z pustą tablicą.** Początkowo lista jest pusta i trwa ładowanie. Po odpowiedzi lista nadal jest pusta, ale status ma już wartość „gotowe”. Dopiero teraz komponent może poinformować użytkownika, że katalog jest pusty.

**Co się stanie, jeśli uczeń opuści widok biblioteki przed odpowiedzią?** Przy odmontowaniu React uruchomi funkcję zwróconą przez efekt. Ustawi ona `aktywny` na `false`, więc spóźniona odpowiedź zostanie pominięta. Samo żądanie może się zakończyć. Funkcja oznaczona `async` zawsze zwraca obietnicę, dlatego umieszczamy ją wewnątrz efektu. W ten sposób sam efekt może zwrócić funkcję sprzątającą.

## 6. Pytania na zakończenie · 4 min

1. Co dokładnie powoduje ponowne renderowanie po pobraniu książek?
2. Jaką wartość otrzymujemy po pierwszym await, a jaką po drugim?
3. Co zobaczy uczeń przy odpowiedzi 404, a co przy odpowiedzi 200 z pustą tablicą?
4. Jeśli adres API zależy od wybranego działu, kiedy katalog powinien zostać pobrany ponownie i jak wyrazisz tę zależność w kodzie?

**Materiały źródłowe:** [Stan komponentu w React](https://react.dev/reference/react/useState), [Efekty i pobieranie danych](https://react.dev/reference/react/useEffect), [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).
