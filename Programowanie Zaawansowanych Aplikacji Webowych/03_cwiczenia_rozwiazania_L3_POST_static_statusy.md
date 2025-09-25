
# Rozwiązania – POST, pliki statyczne i statusy HTTP (L3)

Poniżej przykładowe wdrożenie rozwiązań zadań w jednym `server.js`.  
Kod jest podzielony komentarzami na sekcje. Możesz implementować etapami.

```js
const express = require('express');
const crypto = require('crypto');
const app = express();

// ====== MIDDLEWARE OGÓLNE ======
app.use(express.json()); // parser JSON
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ====== ZADANIE 3: STATYKI + CACHE ======
app.use((req, res, next) => {
  // ustaw cache-control dla statyków (zostanie użyte przez express.static)
  res.set('Cache-Control', 'public, max-age=300');
  next();
});
app.use(express.static('public')); // pamiętaj o folderze public/

// ====== PAMIĘCI "BAZY" ======
const users = []; // Z2
const tasks = []; // Z6

// ====== ZADANIE 1: POST /echo ======
app.post('/echo', (req, res) => {
  const { message } = req.body || {};
  if (typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ error: 'message_required_string' });
  }
  res
    .status(201)
    .set('Location', '/echo')
    .json({ echo: message });
});

// ====== ZADANIE 2: POST /users (walidacja + 409) ======
app.post('/users', (req, res) => {
  const { email, name } = req.body || {};
  if (typeof email !== 'string' || typeof name !== 'string') {
    return res.status(400).json({ error: 'invalid_payload' });
  }
  const normalizedEmail = email.toLowerCase();
  if (users.find(u => u.email === normalizedEmail)) {
    return res.status(409).json({ error: 'email_conflict' });
  }
  const user = { id: Date.now(), email: normalizedEmail, name };
  users.push(user);
  return res.status(201).json(user);
});

// ====== ZADANIE 4: FRONT -> fetch POST (statyczny index.html) ======
// W public/index.html umieść prosty fetch do /echo i wyświetlenie wyniku.
// (Plik przykładowy w komentarzu poniżej)

/*
<!doctype html>
<html lang="pl">
  <meta charset="utf-8" />
  <title>Echo demo</title>
  <button id="btn">Wyślij</button>
  <pre id="out"></pre>
  <script>
    document.getElementById('btn').addEventListener('click', async () => {
      const res = await fetch('/echo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: 'Hello' })
      });
      const text = res.status + ' ' + res.statusText + '\n' + JSON.stringify(await res.json(), null, 2);
      document.getElementById('out').textContent = text;
    });
  </script>
</html>
*/

// ====== ZADANIE 5: /boom + middleware błędu (500) ======
app.get('/boom', (req, res) => {
  throw new Error('boom');
});

app.use((err, req, res, next) => {
  const id = crypto.randomBytes(8).toString('hex');
  console.error(`[${id}]`, err);
  res.status(500).json({ error: 'internal_error', id });
});

// ====== ZADANIE 6: /tasks i /tasks/:id (200/204/404) ======
app.get('/tasks', (req, res) => {
  if (tasks.length === 0) return res.status(204).end();
  res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'not_found' });
  res.json(task);
});

// ====== ZADANIE 7: 304 Not Modified (ETag) ======
const VERSION = '1.0.0';
const VERSION_ETAG = '"' + crypto.createHash('sha1').update(VERSION).digest('hex') + '"';

app.get('/version', (req, res) => {
  const inm = req.headers['if-none-match'];
  if (inm && inm === VERSION_ETAG) {
    return res.status(304).end(); // brak treści
  }
  res.set('ETag', VERSION_ETAG).json({ version: VERSION });
});

// ====== 404 (po wszystkich trasach) ======
app.use((req, res) => {
  res.status(404).json({ error: 'route_not_found' });
});

// ====== START ======
app.listen(3000, () => {
  console.log('Serwer działa na http://localhost:3000');
});
```

---

## Szybkie testy (przykładowe)

```bash
# Echo (201)
curl -i -X POST http://localhost:3000/echo   -H "Content-Type: application/json"   -d '{"message":"Hello"}'

# Users (400, 409, 201)
curl -i -X POST http://localhost:3000/users   -H "Content-Type: application/json" -d '{}'

curl -i -X POST http://localhost:3000/users   -H "Content-Type: application/json"   -d '{"email":"a@a.pl","name":"Ala"}'

curl -i -X POST http://localhost:3000/users   -H "Content-Type: application/json"   -d '{"email":"a@a.pl","name":"Ala"}'  # -> 409

# Tasks (204/200/404)
curl -i http://localhost:3000/tasks
curl -i http://localhost:3000/tasks/123

# Boom (500)
curl -i http://localhost:3000/boom

# Version (200/304)
curl -i http://localhost:3000/version
# Skopiuj wartość ETag i użyj:
curl -i http://localhost:3000/version -H 'If-None-Match: "<etag_z_poprzedniego>"'
```
