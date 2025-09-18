
# Ściągawka: curl w Bash vs PowerShell

Na lekcjach i egzaminach często korzystamy z **curl** do testowania API.  
Warto wiedzieć, że w **PowerShell** `curl` to alias dla `Invoke-WebRequest`, więc składnia jest inna niż w Bashu/Linuxie.

---

## 1. Bash / Linux / Git Bash (klasyczny curl)

```bash
curl -i -X POST http://localhost:3000/echo   -H "Content-Type: application/json"   -d '{"message":"Hello"}'
```

- `-i` → pokaż nagłówki odpowiedzi  
- `-X POST` → metoda żądania  
- `-H` → nagłówek HTTP  
- `-d` → body żądania (JSON, formularz, itd.)  

---

## 2. PowerShell – oryginalny curl.exe

W Windows 10+ jest dostępny prawdziwy `curl.exe`.  
Użyj pełnej nazwy programu, aby uniknąć konfliktu z aliasem `Invoke-WebRequest`:

```powershell
curl.exe -i -X POST http://localhost:3000/echo ^
  -H "Content-Type: application/json" ^
  -d "{\"message\":\"Hello\"}"
```

- `^` → znak kontynuacji linii w PowerShell  
- JSON musi mieć poprawnie ucieczone cudzysłowy `\"`  

---

## 3. PowerShell – Invoke-WebRequest

Alias `curl` = `Invoke-WebRequest`. Nagłówki trzeba podać jako hash table `@{}`:

```powershell
Invoke-WebRequest -Uri "http://localhost:3000/echo" `
  -Method POST `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"message":"Hello"}'
```

- `-Uri` → adres endpointu  
- `-Method` → metoda HTTP  
- `-Headers` → nagłówki jako hash table  
- `-Body` → dane wysyłane do serwera  

---

## 4. PowerShell – Invoke-RestMethod

Podobne do `Invoke-WebRequest`, ale automatycznie parsuje JSON odpowiedzi:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/echo" `
  -Method POST `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"message":"Hello"}'
```

Zwróci bezpośrednio obiekt JSON, np.:

```powershell
echo : Hello
```

---

## Podsumowanie

- **Na egzaminie/serwerach Linuxowych** → używaj klasycznego `curl`.  
- **Na Windows/PowerShell** → lepiej pisać jawnie `curl.exe`, albo korzystać z `Invoke-WebRequest`/`Invoke-RestMethod`.  
- Dla ćwiczeń w szkole: zalecane **Git Bash** (działa identycznie jak w Linuxie).
