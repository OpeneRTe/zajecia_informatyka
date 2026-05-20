# Temat : Robot wita klasę! 🤖👋

## Cel zadania

Zaprogramuj swojego robota Qoopers, aby wykonał radosną sekwencję powitalną, łączącą ruch, światła, grafikę oraz dźwięk.

---

# Czego potrzebujesz?

- Złożony model robota Qoopers (np. Cavalier)
- Tablet lub smartfon z aplikacją Robobloq (lub komputer z programem MyQode)
- Upewnij się, że robot jest włączony i połączony przez Bluetooth

---

# Instrukcja krok po kroku

## 1. Rozpoczęcie (Zdarzenie)

Wybierz kategorię **Zdarzenia** i przeciągnij na środek bloczek:

```txt
Kiedy program się zaczyna
(When program begin)
```

To będzie sygnał dla mózgu robota (płyty Qmind Plus), aby zaczął działać.

---

## 2. Ruch (Jedziemy!)

W kategorii **Ruch** znajdź bloczek odpowiedzialny za silniki.

Ustaw parametry:

```txt
Jedź do przodu
Prędkość: 50
Czas: 2 sekundy (podp. należy wykorzystąc blok "Wait")
```

Pamiętaj, że prędkość w Qoopersie mieści się w zakresie od **-90 do 90**.

---

## 3. Światło i Obraz (Pokaż emocje)

Teraz sprawimy, by robot wyglądał przyjaźnie.

Przejdź do kategorii **Światło**:

- Dodaj bloczek:

```txt
Ustaw światło pokładowe na kolor...
```

(np. zielony lub Twój ulubiony)

- Dodaj bloczek:

```txt
Wyświetl obraz na matrycy LED
```

Kliknij w niego i narysuj uśmiechniętą minę 😊

---

## 4. Dźwięk (Powiedz „Cześć!”)

Na koniec dodaj efekt dźwiękowy z kategorii **Dźwięk**.

Wybierz bloczek:

```txt
Odegraj dźwięk buzzera
```

lub zaprogramuj krótką melodię.

---

# 💡 Zadanie dodatkowe (Dla Mistrzów Kodu)

Czy potrafisz sprawić, aby po przywitaniu robot:

- zmienił kolor świateł na czerwony,
- wykonał obrót o 360 stopni w miejscu?

## Podpowiedź

Użyj bloczka ruchu ustawionego na:

```txt
Skręcanie w lewo
lub
Skręcanie w prawo
```

---

# Wskazówki przed startem

- Jeśli Twój robot nie reaguje, sprawdź w aplikacji, czy ikona Bluetooth w prawym górnym rogu jest niebieska.
- Jeśli robot jedzie do tyłu zamiast do przodu, sprawdź, czy kable silników są poprawnie podłączone do portów.

---

# Video

[Video - powitanie robota](https://notebooklm.google.com/notebook/b34811bf-e33b-4418-9c3b-75dab757c1d4/artifact/af1ebc56-9578-42ff-97e4-ed97cda7ba2a?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_2&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_2_)


# Powodzenia! 🚀

