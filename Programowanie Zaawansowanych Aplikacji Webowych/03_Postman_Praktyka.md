# INF.04 – Postman w praktyce (testowanie API)

---

## 1. Co to jest Postman?
**Postman** to darmowe narzędzie, które pozwala **testować API** – czyli wysyłać zapytania HTTP (GET, POST, PUT, DELETE) do serwera i analizować odpowiedzi.  
Na egzaminie INF.04 Postman jest dostępny i często wykorzystywany do testowania napisanych aplikacji backendowych.

🔗 Oficjalna strona: [https://www.postman.com/](https://www.postman.com/)

---

## 2. Podstawowe funkcje Postmana
- Wysyłanie zapytań HTTP (GET, POST, PUT, DELETE)  
- Dodawanie nagłówków (np. `Content-Type: application/json`)  
- Wysyłanie danych w formacie JSON lub z formularza  
- Analizowanie odpowiedzi serwera (status, treść, nagłówki)  
- Tworzenie i zapisywanie **kolekcji zapytań** (przydatne przy większych projektach)  

---

## 3. Pierwsze uruchomienie Postmana
1. Otwórz Postmana.  
2. Kliknij **New Request** (Nowe zapytanie).  
3. Wybierz metodę (np. GET).  
4. Wpisz adres swojego API (np. `http://localhost:3000/`).  
5. Kliknij **Send** – zobaczysz odpowiedź serwera w dolnym oknie.  

---

## 4. Wysyłanie danych metodą POST
Załóżmy, że w Expressie masz taki endpoint:
```js
app.use(express.json());

app.post('/user', (req, res) => {
  const { name, age } = req.body;
  res.json({ message: `Witaj ${name}, masz ${age} lat!` });
});
```

### Jak przetestować w Postmanie?
1. Wybierz metodę **POST**.  
2. Wpisz adres: `http://localhost:3000/user`.  
3. Przejdź do zakładki **Body**.  
4. Wybierz **raw** i **JSON**.  
5. Wpisz dane:
```json
{
  "name": "Anna",
  "age": 21
}
```
6. Kliknij **Send**.  
7. W odpowiedzi powinno pojawić się:
```json
{
  "message": "Witaj Anna, masz 21 lat!"
}
```

---

## 5. Dodawanie nagłówków (Headers)
Czasami trzeba dodać nagłówki, np. `Content-Type: application/json` albo `Authorization: Bearer <token>`.  
W Postmanie robimy to w zakładce **Headers**.

Przykład nagłówka:
```
Key: Content-Type
Value: application/json
```

---

## 6. Testowanie różnych metod HTTP
- **GET** – pobranie danych z API (np. `GET http://localhost:3000/api/users`)  
- **POST** – wysłanie nowych danych (np. rejestracja użytkownika)  
- **PUT/PATCH** – aktualizacja danych (np. edycja profilu)  
- **DELETE** – usuwanie danych (np. usunięcie rekordu)  

Każdą z metod można łatwo sprawdzić w Postmanie wybierając odpowiednią opcję z listy obok adresu URL.

---

## 7. Zapisywanie zapytań w kolekcjach
- Kliknij **Save** aby zapisać zapytanie.  
- Możesz stworzyć **kolekcję** (Collection) np. „Moja aplikacja Express” i dodać tam wszystkie endpointy (GET, POST, PUT, DELETE).  
- Dzięki temu uczniowie i programiści mogą szybko powtarzać testy bez ponownego wpisywania danych.  

---

## 8. Postman a egzamin INF.04
- Na egzaminie praktycznym często trzeba napisać API i **udowodnić, że działa** – do tego służy właśnie Postman.  
- Wystarczy wysłać poprawne zapytanie (np. POST z JSON-em), pokazać odpowiedź i zrobić zrzut ekranu.  
- Postman ułatwia sprawdzenie poprawności żądań i odpowiedzi serwera.  

---

# ✅ Podsumowanie
- **Postman** to narzędzie do testowania API.  
- Możesz wysyłać różne zapytania (GET, POST, PUT, DELETE) i analizować odpowiedzi.  
- Umożliwia dodawanie nagłówków, wysyłanie JSON, tworzenie kolekcji zapytań.  
- Na egzaminie INF.04 Postman jest **niezastąpiony** do testowania aplikacji backendowych.  
