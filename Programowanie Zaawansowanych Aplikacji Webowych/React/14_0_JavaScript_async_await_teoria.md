# JavaScript — jak działają async i await?

**Klasa 4P · Teoria przygotowująca do lekcji 14 · 45 minut**

## 1. Cel lekcji

Galeria ma wyświetlić podpis zdjęcia. Jeśli podpis jest już zapisany w zmiennej, program może użyć go od razu. Jeśli ma go pobrać z serwera, wynik będzie dostępny później. Jak zapisać instrukcję, która wykona się dopiero po otrzymaniu podpisu?

Po lekcji potrafisz przewidzieć kolejność komunikatów, odróżnić obietnicę od jej wyniku i wyjaśnić, gdzie program przechodzi po błędzie. Przykłady można prześledzić w konsoli przeglądarki.


Przeglądarka może wysłać żądanie o zdjęcia i obsługiwać kliknięcia, zanim serwer odpowie. Takie pobieranie jest **asynchroniczne**. W JavaScript rozpoczęta operacja może zwrócić **obietnicę** (`Promise`). Obietnica początkowo może być w trakcie oczekiwania. Po zakończeniu operacji udostępnia wynik albo informację o błędzie.

**`async`** zapisujemy przed słowem `function`. Wywołanie tak oznaczonej funkcji zawsze zwraca obietnicę. Nawet jeśli w środku napiszemy `return "Mak"`, wywołujący otrzyma obietnicę, której wynikiem jest tekst `"Mak"`.

**`await`** zapisujemy przed wyrażeniem, z którego chcemy odebrać wynik. Wewnątrz funkcji `async` słowo to wstrzymuje dalsze wykonywanie tej funkcji. Kiedy obietnica się spełni, funkcja wznawia pracę i może użyć otrzymanej wartości. W tym czasie kod poza funkcją może działać dalej.

## 2. Co zmienia dopisanie async przed funkcją?

Porównaj dwie funkcje. Obie wykonują prostą instrukcję `return`. Przewidź, co zostanie zapisane w każdej zmiennej.

```javascript
function readTitle() {
  return "Mak";
}

async function readTitleAsync() {
  return "Mak";
}

const title = readTitle();              // tekst "Mak"
const titlePromise = readTitleAsync();  // obietnica spełniona wartością "Mak"
```

Pierwsza funkcja przekazuje tekst bezpośrednio do zmiennej `title`. W drugiej `async` zmienia sposób przekazania wyniku. JavaScript tworzy obietnicę dla tego wywołania funkcji, a instrukcja `return "Mak"` określa jej wynik. Tutaj wynik jest gotowy od razu. W galerii ustalimy go dopiero po odczytaniu odpowiedzi z serwera. W obu przypadkach kod wywołujący otrzymuje obietnicę.

Obietnica może mieć jeden z trzech stanów:

| Stan obietnicy | Przykład z galerii |
|---|---|
| `pending` — oczekująca | Przeglądarka wysłała żądanie i czeka na odpowiedź. |
| `fulfilled` — spełniona | Operacja się udała. Funkcja pobierająca opisy zdjęć udostępnia gotową tablicę. |
| `rejected` — odrzucona | Operacja zakończyła się błędem, np. przerwano połączenie podczas pobierania danych. |

## 3. Co dokładnie robi await?

Instrukcję `const name = await getPhotoName();` przeczytaj od prawej strony:

1. **Wywołaj funkcję.** JavaScript wykonuje `getPhotoName()` i otrzymuje obietnicę. To wywołanie rozpoczyna pracę. 
2. **Zawieś bieżącą funkcję.** W miejscu `await` JavaScript zapamiętuje, gdzie ma wrócić. Przypisanie do `name` i późniejsze instrukcje tej funkcji czekają. Kod, który ją wywołał, może wykonywać się dalej.
3. **Wznów funkcję z wynikiem.** Po spełnieniu obietnicy JavaScript planuje dalsze wykonanie funkcji. Gdy skończy się aktualnie wykonywany kod synchroniczny, funkcja może wrócić do miejsca zawieszenia. Wynik trafia do `name`. Dzieje się tak również wtedy, gdy obietnica była już spełniona przy napotkaniu `await`.
4. **W razie błędu przejdź do obsługi wyjątku.** Jeśli obietnica zostanie odrzucona, w miejscu `await` pojawi się wyjątek. Gdy ta instrukcja znajduje się w bloku `try`, sterowanie przejdzie do odpowiadającego mu `catch`. W galerii właśnie tam ustawimy komunikat o błędzie.

## 4. Prześledź kolejność komunikatów

```javascript
async function getPhotoName() {
  return "Mak";
}

async function showPhotoName() {
  console.log("1. Odczytuję nazwę zdjęcia");
  const name = await getPhotoName();
  console.log("3. Nazwa zdjęcia:", name);
}

showPhotoName();
console.log("2. Kod poza funkcją działa dalej");
```

Najpierw `showPhotoName()` wypisuje komunikat **1**. Przy `await` oddaje sterowanie, więc wykonuje się instrukcja poniżej wywołania funkcji i widzimy **2**. Następnie funkcja wznawia pracę, przypisuje tekst `"Mak"` do zmiennej `name` i wypisuje **3**. Gdybyśmy usunęli `await`, do `name` trafiłaby sama obietnica.

## 5. Co się dzieje, gdy zdjęcia brakuje?

W tym przykładzie pusta nazwa oznacza brak podpisu. Przed odczytaniem wyjaśnienia przewidź, który komunikat trafi do konsoli.

```javascript
async function readCaption(photo) {
  if (!photo.alt) throw new Error("Brak podpisu zdjęcia");
  return photo.alt;
}

async function displayCaption(photo) {
  try {
    const caption = await readCaption(photo);
    console.log("Podpis:", caption);
  } catch (error) {
    console.log(error.message);
  }
}

displayCaption({ alt: "" });
```

Instrukcja `throw` wewnątrz funkcji `async` powoduje odrzucenie jej obietnicy. Przy `await` błąd trafia do bloku `catch`, więc w konsoli pojawia się „Brak podpisu zdjęcia”. Gdy argumentem jest `{ alt: "Mak" }`, obietnica zostaje spełniona, a program wypisuje „Podpis: Mak”.

## 6. Pytania do analizy

1. Co otrzymasz po wywołaniu `readCaption({ alt: "Mak" })`, a co po użyciu `await` przed tym samym wywołaniem wewnątrz funkcji asynchronicznej?
2. W przykładzie z trzema komunikatami wynik jest gotowy od razu. Dlaczego komunikat 2 nadal pojawia się przed komunikatem 3?
3. Którą instrukcję w bloku `try` program pominie po odrzuceniu obietnicy? Gdzie wznowi wykonanie?

## 7. Notatka do zeszytu

Funkcja oznaczona `async` zwraca obietnicę. Przy `await` funkcja oddaje sterowanie, a po spełnieniu obietnicy wznawia pracę z jej wynikiem. Odrzucenie obietnicy można obsłużyć przez `try/catch`.

W [lekcji 14 o galerii](14_React_Hooki_useEffect_Fetch_API_async_await.md) te same zasady służą do pobrania odpowiedzi serwera i odczytania tablicy zdjęć.
