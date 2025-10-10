# Nagłówki HTTP przy sesjach i ciasteczkach

## 1️⃣ Ustawienie ciasteczka
| Nagłówek | Znaczenie | Przykład |
|-----------|------------|-----------|
| `Set-Cookie` | serwer wysyła cookie | `Set-Cookie: language=pl; Max-Age=3600; HttpOnly; SameSite=Lax` |

---

## 2️⃣ Wysyłanie ciasteczka
| Nagłówek | Znaczenie | Przykład |
|-----------|------------|-----------|
| `Cookie` | przeglądarka wysyła cookie z żądaniem | `Cookie: language=pl; connect.sid=s%3Aabcdef` |

---

## 3️⃣ Ciasteczko sesyjne
```
Set-Cookie: connect.sid=s%3Aabcdef12345.XYZtoken; Path=/; HttpOnly; SameSite=Lax; Max-Age=600
```
Przeglądarka odsyła je w kolejnych żądaniach:
```
Cookie: connect.sid=s%3Aabcdef12345.XYZtoken
```

---

## 4️⃣ Usuwanie ciasteczka
```
Set-Cookie: connect.sid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT
```

---

## 5️⃣ Nagłówki bezpieczeństwa (CSRF)
| Nagłówek | Funkcja | Przykład |
|-----------|----------|-----------|
| `X-CSRF-Token` | token ochronny | `X-CSRF-Token: 8f5a9d...` |
| `Origin` | domena źródłowa | `Origin: https://mojastrona.pl` |
| `Referer` | pełny adres źródła | `Referer: https://mojastrona.pl/formularz` |

---

## 6️⃣ Przykład wymiany (logowanie)
**Odpowiedź serwera po zalogowaniu:**
```
HTTP/1.1 200 OK
Set-Cookie: connect.sid=s%3Aabcdef12345.XYZtoken; Path=/; HttpOnly; SameSite=Lax; Max-Age=600
```

**Kolejne żądanie:**
```
GET /me HTTP/1.1
Cookie: connect.sid=s%3Aabcdef12345.XYZtoken
```

---

## 🔒 Podsumowanie
| Cel | Nagłówek | Kierunek | Opis |
|------|-----------|-----------|------|
| Ustawienie ciasteczka | `Set-Cookie` | Serwer → Klient | Wysyła nowe cookie |
| Przesyłanie ciasteczka | `Cookie` | Klient → Serwer | Dołącza cookie do żądania |
| Ochrona CSRF | `X-CSRF-Token` | Klient → Serwer | Token autoryzacyjny |
| Usuwanie ciasteczka | `Set-Cookie` (data w przeszłości) | Serwer → Klient | Kasuje cookie |
