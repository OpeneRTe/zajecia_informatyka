# React — hooki i pobieranie danych galerii. Fetch API, async/await i useEffect

**Czas: 45 minut.** Lekcja teoretyczna dla klasy 4P. Kontynuacja galerii z checkboxami z lekcji 13.

## 1. Cel lekcji

W poprzedniej galerii tablica zdjęć była dostępna od razu. Dziś prześledzimy, co dzieje się na ekranie, gdy przeglądarka musi najpierw pobrać tę tablicę.

Po lekcji uczeń:

- wyjaśnia na przykładzie galerii, do czego służą hooki `useState` i `useEffect`,
- rozróżnia obiekt odpowiedzi HTTP i dane odczytane z jej treści,
- wyjaśnia, dlaczego w przykładzie występują dwa wyrażenia `await`,
- przewiduje widok galerii podczas ładowania, po sukcesie i po błędzie.

## 2. Dane i zasady działania

Na lekcji 13 każdy element tablicy `photos` opisywał jedno zdjęcie. Zachowujemy te same pola i numery kategorii. W przykładzie serwer udostępnia pod adresem `/photos.json` plik o takiej treści:

```json
[
  { "id": 10, "alt": "Mak", "filename": "obraz1.jpg", "category": 1, "downloads": 35 }
]
```

Przeglądarka użyje Fetch API do pobrania **opisów zdjęć**. Dopiero gdy React wyświetli elementy `<img>`, przeglądarka użyje ich atrybutów `src` do wczytania obrazów. W projekcie Vite taki przykładowy plik danych można umieścić w `public/photos.json`.

## 3. Czym jest hook?

Hook to funkcja, dzięki której komponent korzysta z mechanizmów React. Znasz już jeden hook z galerii:

```jsx
const [showFlowers, setShowFlowers] = useState(true);
```

`useState` pozwala Reactowi zachować wartość między renderowaniami. Kiedy uczeń wyłącza checkbox, `setShowFlowers(false)` zleca kolejne renderowanie. React ponownie wywołuje funkcję komponentu, tym razem z wartością `false`, a znany warunek w `filter()` ukrywa kwiaty.

Drugi hook, **useEffect**, pozwala komponentowi wykonać operację związaną z systemem zewnętrznym, np. wysłać żądanie do serwera po umieszczeniu galerii na stronie. Oba hooki wywołujemy na najwyższym poziomie funkcji komponentu, przed warunkowymi instrukcjami `return`. Dzięki temu React napotyka wywołania hooków w tej samej kolejności przy każdym renderowaniu.

## 4. Jak pobrać dane galerii?

Przed analizą kodu przeczytaj [osobną teorię o async i await](14_0_JavaScript_async_await_teoria.md). W galerii czekamy kolejno na odpowiedź HTTP i na odczytanie danych z jej treści.

```javascript
async function loadPhotos() {
  const response = await fetch("/photos.json");
  if (!response.ok) throw new Error("Błąd HTTP " + response.status);
  const data = await response.json();
  return data;
}
```

1. **Żądanie.** Wywołanie `fetch()` wysyła żądanie GET i zwraca obietnicę (`Promise`). Pierwsze `await` czeka w tej funkcji na obiekt `Response`. W czasie oczekiwania użytkownik może nadal korzystać ze strony.
2. **Status.** Gdy serwer odpowie, znamy już status HTTP. Właściwość `response.ok` ma wartość `true` dla statusów 200–299. Przy odpowiedzi 404 instrukcja `throw` zgłasza błąd.
3. **Treść.** Metoda `response.json()` odczytuje treść odpowiedzi i przetwarza JSON na wartość JavaScript. Ta operacja także zwraca obietnicę. Dopiero po drugim `await` zmienna `data` zawiera tablicę, na której można wykonać `filter()` lub `map()`.

Funkcja komponentu może odebrać gotową tablicę przez `await loadPhotos()`. Jeśli obietnica zostanie odrzucona, np. po utracie połączenia, `await` zgłosi błąd. W punkcie 6 zobaczysz, jak `catch` pozwala wtedy wyświetlić komunikat w galerii.

## 5. Kiedy uruchamia się useEffect?

React najpierw umieszcza widok galerii na stronie. Następnie uruchamia funkcję przekazaną do efektu. Drugi argument hooka określa zależności efektu.

| Zapis | Kiedy efekt się uruchamia? |
|---|---|
| `useEffect(fn)` | Po każdym zatwierdzonym renderowaniu komponentu. |
| `useEffect(fn, [])` | Po zamontowaniu komponentu. Zmiana checkboxa nie powoduje powtórzenia efektu. |
| `useEffect(fn, [url])` | Po zamontowaniu oraz po zmianie wartości `url`, jeśli efekt pobiera dane z tego adresu. |

Galeria pobiera całą tablicę ze stałego adresu, więc w przykładzie użyjemy `[]`. Zaznaczenie kategorii zmienia tylko wynik filtrowania danych już zapisanych w stanie. Dzięki temu przełączenie checkboxa nie pobiera ponownie początkowych liczników zdjęć.

## 6. Prześledź przykład galerii

Poniższe fragmenty pokazują część komponentu odpowiedzialną za dane. Funkcję `loadPhotos` z punktu 4 umieszczamy **poza komponentem**. Z pakietu `react` importujemy `useState` i `useEffect`. W funkcji `App` odczytujemy stan i definiujemy efekt:

```jsx
const [photos, setPhotos] = useState([]);
const [status, setStatus] = useState("loading");

useEffect(() => {
  let active = true;

  async function updateGallery() {
    try {
      const data = await loadPhotos();
      if (active) {
        setPhotos(data);
        setStatus("ready");
      }
    } catch {
      if (active) setStatus("error");
    }
  }

  updateGallery();
  return () => { active = false; };
}, []);
```

Funkcja efektu zwraca funkcję sprzątającą. Gdy galeria zniknie ze strony, React wywoła ją i zmieni `active` na `false`. Jeśli wcześniejsze żądanie zakończy się później, jego wynik zostanie pominięty. Dlatego operację asynchroniczną umieszczamy wewnątrz efektu w osobnej funkcji. W trybie deweloperskim Strict Mode React może dodatkowo uruchomić efekt, wykonać sprzątanie i uruchomić efekt ponownie.

Po wywołaniu wszystkich hooków komponent może wybrać widok:

```jsx
if (status === "loading") return <p>Ładowanie galerii…</p>;
if (status === "error") return <p>Nie udało się pobrać galerii.</p>;
if (photos.length === 0) return <p>Galeria jest pusta.</p>;
// Dla niepustej tablicy wyświetlamy checkboxy i galerię z lekcji 13.
```

**Przykład z makiem.** Początkowo użytkownik widzi „Ładowanie galerii…”. Serwer odpowiada tablicą z punktu 2. Po zapisaniu danych React ponownie renderuje komponent. Przy włączonej kategorii Kwiaty znane już `filter()` i `map()` pozwalają wyświetlić mak z licznikiem 35. Po wyłączeniu tej kategorii mak znika z widoku, ale nadal znajduje się w `photos`.

## 7. Pytania do analizy

1. Przy pierwszym renderowaniu `photos.length` wynosi 0. Dlaczego komunikat „Galeria jest pusta” byłby w tym momencie przedwczesny?
2. Serwer zwrócił status 200 oraz treść `[]`. Który komunikat zobaczy użytkownik po zakończeniu pobierania? Co zobaczy przy statusie 404?
3. Po wczytaniu zdjęć uczeń dwukrotnie przełącza checkbox Kwiaty. Który stan się zmienia? Czy efekt powinien ponownie wysłać żądanie?
4. Co stałoby się z liczbą żądań, gdybyśmy pominęli tablicę zależności, a każde pobranie zapisywało w stanie nową tablicę zdjęć?

## 8. Notatka do zeszytu

**useState** przechowuje dane komponentu między renderowaniami. **useEffect** pozwala rozpocząć pobieranie po zamontowaniu galerii. **await fetch()** daje obiekt odpowiedzi HTTP, a **await response.json()** odczytuje dane z jej treści. Po zapisaniu tablicy w stanie React ponownie renderuje galerię. Osobny stan ładowania pozwala odróżnić oczekiwanie na dane od poprawnie pobranej, pustej galerii.
