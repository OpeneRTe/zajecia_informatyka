# Analiza Hooków React: Przewodnik Krok po Kroku po useState i useEffect

Ten dokument jest przewodnikiem po dwóch fundamentalnych hookach w React: useState i useEffect. Stanowią one podstawę budowania interaktywnych i dynamicznych komponentów. Celem tego przewodnika jest dogłębne, ale przystępne omówienie każdego przykładu kodu, linijka po linijce, aby ułatwić zrozumienie ich działania osobom rozpoczynającym swoją przygodę z Reactem.


--------------------------------------------------------------------------------


## 1. useState – Zarządzanie Pamięcią Komponentu

### 1.1. Czym jest Stan (State)?

Stan (ang. state) to wewnętrzne dane komponentu React, które mogą zmieniać się w czasie, na przykład w odpowiedzi na interakcję użytkownika. React wykorzystuje aktualną wartość stanu do renderowania interfejsu. Kiedy stan się zmienia, React automatycznie renderuje komponent na nowo, aby odzwierciedlić tę zmianę na ekranie.

Stan posiada trzy kluczowe cechy:

* Prywatny: Jest w pełni kontrolowany przez komponent i niedostępny z zewnątrz.
* Niemutowalny: Nie można go modyfikować bezpośrednio. Zawsze należy używać specjalnej funkcji do jego aktualizacji, która tworzy nową wersję stanu.
* Asynchroniczny: React nie aktualizuje stanu natychmiast. Zamiast tego, grupuje kilka aktualizacji w jedną, aby uniknąć niepotrzebnych, wielokrotnych renderowań i poprawić wydajność aplikacji. To ważny koncept, o którym należy pamiętać podczas debugowania.

### 1.2. Wprowadzenie do useState

useState to hook, który pozwala komponentom funkcyjnym "pamiętać" informacje, czyli zarządzać własnym, lokalnym stanem. Umożliwia przechowywanie danych pomiędzy kolejnymi renderowaniami komponentu.

Ogólna składnia useState wygląda następująco:

```js
const [value, setValue] = useState(initialValue);
```

Wyjaśnienie poszczególnych elementów:

1. value To zmienna przechowująca aktualną wartość stanu. React dba o to, by zawsze zawierała najnowszą wersję danych.
2. setValue To specjalna funkcja, której musimy użyć, aby zaktualizować stan. Wywołanie tej funkcji informuje React, że stan uległ zmianie i komponent powinien zostać ponownie wyrenderowany. Bezpośrednia zmiana zmiennej stanu (np. value = ...) nie zadziała, ponieważ React nie zostanie poinformowany o zmianie i nie uruchomi ponowego renderowania.
3. initialValue To wartość początkowa stanu, która jest ustawiana tylko przy pierwszym renderowaniu komponentu. W kolejnych renderowaniach jest ignorowana.

Dlaczego używamy składni [value, setValue]? Jest to tak zwana destrukturyzacja tablicy. Hook useState zwraca tablicę z dwoma elementami: aktualną wartością stanu i funkcją do jego zmiany. Użycie [...] pozwala nam od razu przypisać te elementy do zmiennych o dowolnie wybranych przez nas nazwach (np. count i setCount lub isOpen i setIsOpen), co sprawia, że kod jest bardziej czytelny.

### 1.3. Analiza Przykładu: Prosty Licznik (Counter)

```js
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p>Wartość: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +
      </button>
    </>
  );
}
```

Analiza linijka po linijce:

1. const [count, setCount] = useState(0); W tej linii tworzymy nową "komórkę pamięci" dla naszego komponentu. Inicjujemy stan o nazwie count wartością początkową 0. Otrzymujemy również funkcję setCount, która będzie służyła do modyfikacji tej wartości.
2. Wartość: {count} W tym miejscu wewnątrz kodu JSX React wyświetla aktualną wartość zmiennej count. Przy pierwszym renderowaniu będzie to 0.
3. setCount(count + 1) Wywołanie setCount nie zmienia count natychmiast. Jest to prośba do Reacta o zaplanowanie aktualizacji. React przyjmuje nową wartość, a następnie ponownie uruchamia cały komponent Counter z nową wartością count, odświeżając interfejs.

1.4. Analiza Przykładu: Przełącznik (Toggle)

```js
function Toggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        Przełącz
      </button>
      {isOpen && (
        <div>
          <p>Widoczna sekcja</p>
        </div>
      )}
    </>
  );
}
```

Analiza krok po kroku:

1. const [isOpen, setIsOpen] = useState(false); Inicjujemy stan o nazwie isOpen wartością logiczną false. Ta zmienna będzie kontrolować widoczność dodatkowej sekcji.
2. setIsOpen(!isOpen) Przy każdym kliknięciu przycisku aktualizujemy stan, odwracając jego wartość. Operator ! w JavaScript zamienia true na false i odwrotnie. Jeśli isOpen było false, stanie się true.
3. {isOpen && ...} To jest przykład renderowania warunkowego. Wyrażenie po prawej stronie operatora && zostanie wyrenderowane tylko wtedy, gdy warunek po lewej stronie (isOpen) jest prawdziwy (true). Dzięki temu sekcja <div> pojawia się i znika w zależności od stanu.

### 1.5. Analiza Przykładu: Obiekt w Stanie (UserCard)

```js
function UserCard() {
  const [user, setUser] = useState({ name: "Jan", age: 25 });

  return (
    <>
      <p>{user.name} — {user.age} lat</p>
      <button
        onClick={() =>
          setUser(prev => ({ ...prev, age: prev.age + 1 }))
        }
      >
        Urodziny 🎉
      </button>
    </>
  );
}
```


Analiza kodu:

1. const [user, setUser] = useState({ name: "Jan", age: 25 }); Ten przykład pokazuje, że stan może przechowywać nie tylko proste wartości (liczby, boolean), ale również złożone struktury danych, takie jak obiekty.
2. setUser(prev => ({ ...prev, age: prev.age + 1 })) Ta linia jest kluczowa dla zrozumienia pracy z obiektami w stanie:
  * Używamy formy funkcyjnej (prev => ...), ponieważ nowy stan zależy od poprzedniego. prev to gwarantowana przez React, aktualna wartość stanu user w momencie aktualizacji.
  * ...prev to tzw. spread syntax. Tworzy on płytką kopię całego obiektu user.
  * age: prev.age + 1 nadpisuje tylko właściwość age w nowo utworzonej kopii, pozostawiając resztę pól (np. name) bez zmian.

Wskazówka: Zawsze, gdy nowa wartość stanu zależy od poprzedniej (np. inkrementacja licznika, dodawanie elementu do tablicy), używaj formy funkcyjnej z prev. Daje to Reactowi gwarancję, że operujesz na najświeższej wersji stanu, co zapobiega trudnym do wyśledzenia błędom, zwłaszcza w złożonych komponentach.

Pamiętasz, jak w punkcie 1.1 zdefiniowaliśmy stan jako niemutowalny? Ta linijka jest tego idealnym przykładem. Zamiast modyfikować istniejący obiekt (prev.age++), co jest błędem, tworzymy jego nową kopię ze zmienioną wartością. Składnia ...prev jest kluczowym narzędziem do przestrzegania tej zasady.

Po zrozumieniu, jak useState pozwala komponentom "pamiętać" i reagować na interakcje, przejdźmy do useEffect, który pozwala im wykonywać akcje w odpowiedzi na zmiany w cyklu życia komponentu.


--------------------------------------------------------------------------------


## 2. useEffect – Wykonywanie Akcji Dodatkowych

### 2.1. Czym są Efekty Uboczne (Side Effects)?

Efekty uboczne to wszystkie interakcje komponentu ze światem zewnętrznym – czyli wszystko, co wykracza poza proste obliczenie i wyświetlenie JSX. Jeśli Twój komponent musi "porozmawiać" z serwerem, przeglądarką (np. ustawić timer) lub innym API, robisz to właśnie w useEffect.

Przykłady efektów ubocznych:

* Pobieranie danych z zewnętrznego API.
* Ustawianie i czyszczenie timerów (np. setInterval).
* Subskrypcje zdarzeń (np. nasłuchiwanie na zmiany rozmiaru okna).

### 2.2. Składnia i Działanie useEffect

useEffect to hook, który pozwala na wykonywanie efektów ubocznych w komponentach funkcyjnych.

Ogólna składnia useEffect:

```js
useEffect(() => {
  // kod efektu
}, [dependencies]);
```

Hook ten przyjmuje dwa argumenty:

* Funkcja (callback): Kod, który ma zostać wykonany jako efekt uboczny.
* Tablica zależności (dependencies): Opcjonalna tablica, która "pilnuje" Reacta. Efekt zostanie uruchomiony ponownie tylko wtedy, gdy którakolwiek ze zmiennych w tej tablicy zmieni swoją wartość pomiędzy renderowaniami.

Działanie hooka zależy od zawartości tablicy zależności:

Tablica Zależności	Kiedy efekt jest uruchamiany?
[zmienna1, zmienna2]	Przy pierwszym renderowaniu ORAZ gdy zmienna1 lub zmienna2 się zmieni.
[] (pusta tablica)	Tylko raz, po pierwszym renderowaniu komponentu (zamontowaniu).
Brak tablicy	Po każdym renderowaniu komponentu. (Używane rzadko).

Opcji bez tablicy zależności należy unikać. Uruchamianie efektu po każdym renderowaniu często prowadzi do pętli nieskończonych (np. gdy efekt pobiera dane i aktualizuje stan, co powoduje kolejny render i kolejne pobranie danych) i problemów z wydajnością.

### 2.3. Analiza Przykładu: Pobieranie Danych z API (Users)

```js
function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <ul>
      {users.map(u => (
        <li key={u.id}>- {u.name}</li>
      ))}
    </ul>
  );
}
```

Analiza krok po kroku:

1. const [users, setUsers] = useState([]); Tworzymy stan o nazwie users, który będzie przechowywał listę użytkowników pobraną z API. Zaczynamy od pustej tablicy [], ponieważ na początku nie mamy żadnych danych.
2. useEffect(() => { ... }, []); Używamy useEffect z pustą tablicą zależności []. Jest to bardzo ważny szczegół! Oznacza to, że funkcja wewnątrz useEffect zostanie wykonana tylko jeden raz – zaraz po tym, jak komponent po raz pierwszy pojawi się na ekranie. Zapobiega to wysyłaniu zapytania do API przy każdym kolejnym renderowaniu.
3. fetch(...) Wewnątrz efektu wykonujemy standardowe zapytanie sieciowe, aby pobrać dane użytkowników.
4. setUsers(data) Gdy dane zostaną pomyślnie pobrane i przekonwertowane do formatu JSON, wywołujemy funkcję setUsers, przekazując jej otrzymaną tablicę użytkowników. To powoduje aktualizację stanu, ponowne renderowanie komponentu i wreszcie wyświetlenie listy użytkowników na ekranie.

### 2.4. Funkcja Czyszcząca (Cleanup) i Jej Znaczenie

Funkcja czyszcząca (ang. cleanup function) to opcjonalna funkcja, którą można zwrócić z useEffect. Jej głównym celem jest "posprzątanie" po efekcie, gdy komponent jest usuwany z ekranu (odmontowywany) lub gdy efekt ma zostać uruchomiony ponownie.

Jest to kluczowe, aby zapobiegać wyciekom pamięci – sytuacjom, w których niepotrzebne operacje (np. aktywne timery, subskrypcje czy nasłuchiwanie zdarzeń) działają w tle, zużywając zasoby, mimo że komponent, który je uruchomił, już nie istnieje.

2.5. Analiza Przykładu: Timer z Czyszczeniem (Clock)
```js
function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <p>{time.toLocaleTimeString()}</p>;
}
```

Analiza krok po kroku:

1. const timer = setInterval(...) Ten kod uruchamia timer, który co sekundę (1000ms) wykonuje funkcję setTime(new Date()). Powoduje to regularną aktualizację stanu time, co skutkuje ponownym renderowaniem komponentu i odświeżaniem wyświetlanego zegara.
2. return () => clearInterval(timer); To jest właśnie funkcja czyszcząca. React wywoła ją automatycznie, gdy komponent Clock zniknie z ekranu (np. przy przejściu na inną podstronę). Jej zadaniem jest zatrzymanie timera za pomocą clearInterval. Zapobiega to sytuacji, w której timer działałby w nieskończoność w tle, nawet gdy zegar nie jest już widoczny.

Analiza tych dwóch przykładów pokazuje, jak useState i useEffect współpracują, tworząc dynamiczne i interaktywne komponenty. Zobaczmy teraz krótkie podsumowanie.


--------------------------------------------------------------------------------


3. Podsumowanie Kluczowych Koncepcji

* useState służy do przechowywania danych i reagowania na interakcje użytkownika. To "pamięć" komponentu, która pozwala mu pamiętać informacje między renderowaniami.
* useEffect służy do wykonywania akcji dodatkowych w odpowiedzi na zmiany w cyklu życia komponentu, takie jak renderowanie lub zmiana stanu zarządzanego przez useState. To "działania" komponentu, które często zależą od "pamięci" zapewnianej przez useState.

Opanowanie tych dwóch hooków jest fundamentem, który otwiera drzwi do budowania niemal każdej, nawet najbardziej zaawansowanej aplikacji w ekosystemie React.
