import React, { useState, useEffect } from 'react';

export default function Fetch() {
  const [uzytkownicy, setUzytkownicy] = useState([]);
  const [czyLaduje, setCzyLaduje] = useState(true);

  // Dodanie Bootstrapa przez CDN
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    document.head.appendChild(link);
  }, []);

  const pobierzDane = () => {
    setCzyLaduje(true);
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(dane => {
        setUzytkownicy(dane);
        setCzyLaduje(false);
      })
      .catch(err => {
        console.error(err);
        setCzyLaduje(false);
      });
  };

  useEffect(() => {
    pobierzDane();
  }, []);

  // W React 19 funkcje przekazywane do 'action' otrzymują FormData automatycznie
  const dodajUzytkownika = (formData) => {
    const nowyUser = {
      name: formData.get("imie"),
      email: formData.get("email")
    };

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(nowyUser),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(res => res.json())
      .then(dane => {
        alert("Sukces! Dodano: " + dane.name);
        setUzytkownicy([dane, ...uzytkownicy]);
        // Formularz w React 19 przy użyciu 'action' czyści się automatycznie
        // lub możemy nim sterować poprzez stany.
      })
      .catch(err => console.error("Błąd POST:", err));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '800px' }}>
      <div className="row">
        <div className="col-12 text-center mb-4">
          <h1 className="display-5 fw-bold text-primary">React & Bootstrap</h1>
          <p className="lead text-muted">Testowanie operacji GET oraz POST (React 19 Actions)</p>
        </div>
      </div>

      <div className="row g-4">
        {/* Formularz */}
        <div className="col-md-5">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title mb-0 text-center">Dodaj Użytkownika</h5>
            </div>
            <div className="card-body">
              {/* Używamy action zamiast onSubmit */}
              <form action={dodajUzytkownika}>
                <div className="mb-3">
                  <label className="form-label">Imię i nazwisko</label>
                  <input name="imie" className="form-control" placeholder="np. Jan Kowalski" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input name="email" type="email" className="form-control" placeholder="jan@example.com" required />
                </div>
                <button type="submit" className="btn btn-primary w-100 shadow-sm">
                  Wyślij (POST)
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Lista Wyników */}
        <div className="col-md-7">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Lista z API</h4>
            <button onClick={pobierzDane} className="btn btn-outline-secondary btn-sm">
              Odśwież
            </button>
          </div>

          <div className="card shadow-sm overflow-hidden">
            <div className="list-group list-group-flush">
              {czyLaduje ? (
                <div className="p-4 text-center text-muted italic">Ładowanie danych...</div>
              ) : (
                uzytkownicy.map((user, index) => (
                  <div key={user.id || index} className="list-group-item p-3 hover-bg-light">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1 fw-bold">{user.name}</h6>
                      <small className="text-primary">#{user.id || 'nowy'}</small>
                    </div>
                    <p className="mb-1 text-muted small">{user.email}</p>
                  </div>
                ))
              )}
            </div>
          </div>
          
          <div className="mt-3 text-end">
            <a 
              href="https://jsonplaceholder.typicode.com/users" 
              target="_blank" 
              className="text-decoration-none small text-muted"
            >
              Otwórz surowy JSON →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}