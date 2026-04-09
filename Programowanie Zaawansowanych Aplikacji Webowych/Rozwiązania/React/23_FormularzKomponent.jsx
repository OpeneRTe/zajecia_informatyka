import React, { useState } from 'react';

export default function FormularzKomponent() {
    const [errors, setErrors] = useState({});
    const przechwyconeBledy = {};

    const [inputs, setInputs] = useState({
        imie: '',
        nazwisko: '',
        email: '',
        telefon: '',
        dataUrodzenia: '',
        kraj: '',
        plec: '', 
        zgoda: false,   
        komentarz: '',
        haslo: '',
    });

    const resetForm = () => {
        setInputs({
            imie: '',
            nazwisko: '',
            email: '',  
            telefon: '',
            dataUrodzenia: '',
            kraj: '',   
            plec: '',
            zgoda: false,   
            komentarz: '',  
            haslo: '',
        });
        setErrors({});
    }

    const handleSubmit = (FormData) =>{
        inputs.imie = FormData.get("imie")
        if(inputs.imie.length < 3){
            przechwyconeBledy.imie = "Imię musi mieć co najmniej 3 znaki"
        }
        inputs.nazwisko = FormData.get("nazwisko")
        inputs.email = FormData.get("email")
        if (!inputs.email.includes("@")){
            przechwyconeBledy.email = "Email musi zawierać @"
        }
        inputs.telefon = FormData.get("telefon")
        if (!/^\d{9}$/.test(inputs.telefon)){
            przechwyconeBledy.telefon = "Telefon musi składać się z 9 cyfr"
        }
        inputs.dataUrodzenia = FormData.get("dataUrodzenia")
        if (!inputs.dataUrodzenia){
            przechwyconeBledy.dataUrodzenia = "Data urodzenia jest wymagana"
        }
        inputs.kraj = FormData.get("kraj")
        inputs.plec = FormData.get("plec")
        inputs.zgoda = FormData.get("zgoda")
        if (!inputs.zgoda){
            przechwyconeBledy.zgoda = "Musisz zaakceptować regulamin"
        }
        inputs.komentarz = FormData.get("komentarz")
        inputs.haslo = FormData.get("haslo")
        inputs.hasloPotwierdzenie = FormData.get("hasloPotwierdzenie")
        if ( inputs.haslo !== inputs.hasloPotwierdzenie || inputs.haslo.length < 6){
            przechwyconeBledy.hasloPotwierdzenie = "Hasła muszą być takie same i mieć co najmniej 6 znaków"
        }
        setErrors(przechwyconeBledy)
        console.log(inputs);

        fetch("/api/rejestracja", {
            method: "POST",
            headers: {  "Content-Type": "application/json" },
            body: JSON.stringify(inputs)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Odpowiedź z serwera:", data);
            resetForm();
        })
        .catch(err => {
            console.error("Błąd podczas wysyłania danych:", err);
        });
    }

    return (
        <form action={handleSubmit}>
            <h2>Formularz rejestracyjny</h2>
            <input type="text" name="imie" placeholder="Imię" /> <br />
            {errors.imie && <span>{errors.imie}</span>}<br />
            <input type="text" name="nazwisko" placeholder="Nazwisko" /> <br />
            {errors.nazwisko && <span>{errors.nazwisko}</span>}<br />
            <input type="email" name="email" placeholder="Email" /> <br />
            {errors.email && <span>{errors.email}</span>}<br />
            <input type="tel" name="telefon" placeholder="Telefon" /> <br />
            {errors.telefon && <span>{errors.telefon}</span>}<br />
            <input type="date" name="dataUrodzenia" placeholder="Data urodzenia" /> <br />
            {errors.dataUrodzenia && <span>{errors.dataUrodzenia}</span>}<br />
            <select name="kraj">
                <option value="">Wybierz kraj</option>
                <option value="polska">Polska</option>
                <option value="niemcy">Niemcy</option>
                <option value="francja">Francja</option>
            </select> <br />
            <input type="radio" name="plec" value="mezczyzna" /> Mężczyzna
            <input type="radio" name="plec" value="kobieta" /> Kobieta
            <br />

            <input type="checkbox" name="zgoda" /> Akceptuję regulamin <br />
            {errors.zgoda && <span>{errors.zgoda}</span>} <br />

            <textarea name="komentarz" placeholder="Komentarz"></textarea> <br />
            <input type="password" name="haslo" placeholder="Hasło" /> <br />
            <input type="password" name="hasloPotwierdzenie" placeholder="Potwierdź hasło" /> <br />
            {errors.hasloPotwierdzenie && <span>{errors.hasloPotwierdzenie}</span>}

            <input type="submit" value="Submit" />
            <input type="reset" value="Reset" onClick={() => resetForm()} />
            
        </form>
    );
}
