# Metody i właściwości sesji oraz ciasteczek (Express.js)

## 🍪 Ciasteczka (`cookie-parser`)

### `res.cookie(name, value, options)`
Ustawia ciasteczko w przeglądarce.
```js
res.cookie('language', 'pl', {
  maxAge: 3600000,
  httpOnly: true,
  sameSite: 'lax',
});
```

**Najczęstsze opcje:**
| Opcja | Znaczenie | Przykład |
|--------|------------|----------|
| `maxAge` | czas życia (ms) | `maxAge: 3600000` |
| `httpOnly` | niedostępne w JS | `httpOnly: true` |
| `secure` | tylko przez HTTPS | `secure: true` |
| `sameSite` | ochrona CSRF | `'lax'` |
| `path` | ścieżka działania | `'/'` |

---

### `req.cookies`
Zawiera obiekt wszystkich ciasteczek przesłanych przez klienta.  
```js
const lang = req.cookies.language || 'brak';
```

---

### `res.clearCookie(name, options)`
Usuwa ciasteczko (np. przy wylogowaniu).  
```js
res.clearCookie('connect.sid', { path: '/' });
```

---

## 🟢 Sesje (`express-session`)

### `req.session`
Obiekt sesji użytkownika (dane po stronie serwera).
```js
req.session.user = { login: 'admin', role: 'admin' };
```

---

### `req.session.destroy(callback)`
Usuwa sesję i wylogowuje użytkownika.
```js
req.session.destroy(err => {
  res.clearCookie('connect.sid');
  res.send('Wylogowano');
});
```

---

### `req.session.regenerate(callback)`
Tworzy nowy identyfikator sesji (np. po zalogowaniu).
```js
req.session.regenerate(err => {
  req.session.user = { login: 'admin' };
});
```

---

### `req.sessionID`
Zwraca ID sesji (`connect.sid`).
```js
console.log(req.sessionID);
```

---

### Opcje w `session()`
```js
app.use(session({
  secret: 'tajny_klucz',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 600000
  }
}));
```
| Opcja | Znaczenie |
|--------|------------|
| `resave` | nie zapisuje sesji bez zmian |
| `saveUninitialized` | nie tworzy pustych sesji |
| `cookie` | ustawia parametry ciasteczka sesyjnego |
