### Scenariusz: „Pierwszy uśmiech robota” (Programowanie przez USB)

**Cel:** Zapoznanie uczniów z połączeniem przewodowym i sterowaniem matrycą LED oraz diodami RGB.

#### 1. Przygotowanie sprzętu i połączenie
*   **Połączenie:** Zamiast Bluetooth, użyjemy **kabla USB** dołączonego do zestawu.
*   **Oprogramowanie:** Uruchom program **MyQode** na komputerze PC lub Mac.
*   **Sterowniki:** Przy pierwszym połączeniu w MyQode wybierz *Help -> Install Serial Driver*, aby umożliwić komunikację z płytą główną Qmind Plus. Status robota powinien zmienić się na „Online”.

#### 2. Krok po kroku: Kodowanie powitania
Programowanie odbywa się w środowisku graficznym (blokowym).

*   **Zdarzenie:** Wybierz żółty blok **„Kiedy program się zaczyna”**.
*   **Obraz na matrycy LED:** W kategorii „Światło” (Light) znajdź blok **„Wyświetl obraz na matrycy LED”**. Kliknij w edytor matrycy i narysuj lub wybierz gotową **uśmiechniętą buźkę**. Pamiętaj o ustawieniu poprawnego numeru portu (zazwyczaj port 2 w Qoopers).
*   **Mruganie światłami (Pętla):**
    1.  Wstaw blok **„Ustaw światło pokładowe na kolor...”** (np. czerwony).
    2.  Z kategorii „Kontrola” (Control) dodaj blok **„Czekaj 1 sekundę”**.
    3.  Dodaj kolejny blok światła zmieniający kolor na zielony lub wyłączający diody.
    4.  Aby robot mrugał cały czas, zamknij te bloki w pętli **„Zawsze”** (Forever).

#### 3. Przesłanie programu
Kliknij przycisk **„Play”** lub ikonę przesyłania w MyQode, aby wgrać kod bezpośrednio do pamięci robota przez kabel USB. Robot natychmiast pokaże buźkę i zacznie mrugać diodami bez ruszania się z miejsca.v

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

# Video

[Video - powitanie robota](https://notebooklm.google.com/notebook/b34811bf-e33b-4418-9c3b-75dab757c1d4/artifact/af1ebc56-9578-42ff-97e4-ed97cda7ba2a?utm_source=nlm_web_share&utm_medium=google_oo&utm_campaign=art_share_2&utm_content=&utm_smc=nlm_web_share_google_oo_art_share_2_)

---