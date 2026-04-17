import React, { useState } from 'react';

export default function FormularzKomponent1() {
    const [errors, setErrors] = useState({});

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
        hasloPotwierdzenie: '',
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
            hasloPotwierdzenie: '',
        });

        setErrors({});
    };

    const handleSubmit = (formData) => {
        const przechwyconeBledy = {};

        const dane = {
            imie: formData.get('imie') || '',
            nazwisko: formData.get('nazwisko') || '',
            email: formData.get('email') || '',
            telefon: formData.get('telefon') || '',
            dataUrodzenia: formData.get('dataUrodzenia') || '',
            kraj: formData.get('kraj') || '',
            plec: formData.get('plec') || '',
            zgoda: formData.get('zgoda') !== null,
            komentarz: formData.get('komentarz') || '',
            haslo: formData.get('haslo') || '',
            hasloPotwierdzenie: formData.get('hasloPotwierdzenie') || '',
        };

        if (dane.imie.length < 3) {
            przechwyconeBledy.imie = 'Imię musi mieć co najmniej 3 znaki';
        }

        if (dane.nazwisko.length < 2) {
            przechwyconeBledy.nazwisko = 'Nazwisko musi mieć co najmniej 2 znaki';
        }

        if (!dane.email.includes('@')) {
            przechwyconeBledy.email = 'Podaj poprawny adres e-mail';
        }

        if (dane.telefon.length < 9) {
            przechwyconeBledy.telefon = 'Telefon musi mieć co najmniej 9 znaków';
        }

        if (!dane.dataUrodzenia) {
            przechwyconeBledy.dataUrodzenia = 'Podaj datę urodzenia';
        }

        if (!dane.kraj) {
            przechwyconeBledy.kraj = 'Wybierz kraj';
        }

        if (!dane.plec) {
            przechwyconeBledy.plec = 'Wybierz płeć';
        }

        if (!dane.zgoda) {
            przechwyconeBledy.zgoda = 'Musisz zaakceptować regulamin';
        }

        if (dane.haslo.length < 6) {
            przechwyconeBledy.haslo = 'Hasło musi mieć co najmniej 6 znaków';
        }

        if (dane.haslo !== dane.hasloPotwierdzenie) {
            przechwyconeBledy.hasloPotwierdzenie = 'Hasła nie są takie same';
        }

        setErrors(przechwyconeBledy);
        setInputs(dane);
    };

    return (
        <form action={handleSubmit}>
            {console.log(inputs)}

            <h2>Formularz rejestracyjny</h2>

            <input
                type="text"
                name="imie"
                placeholder="Imię"
                defaultValue={inputs.imie}
            />
            <br />
            {errors.imie && <span>{errors.imie}</span>}
            <br />

            <input
                type="text"
                name="nazwisko"
                placeholder="Nazwisko"
                defaultValue={inputs.nazwisko}
            />
            <br />
            {errors.nazwisko && <span>{errors.nazwisko}</span>}
            <br />

            <input
                type="email"
                name="email"
                placeholder="Email"
                defaultValue={inputs.email}
            />
            <br />
            {errors.email && <span>{errors.email}</span>}
            <br />

            <input
                type="tel"
                name="telefon"
                placeholder="Telefon"
                defaultValue={inputs.telefon}
            />
            <br />
            {errors.telefon && <span>{errors.telefon}</span>}
            <br />

            <input
                type="date"
                name="dataUrodzenia"
                defaultValue={inputs.dataUrodzenia}
            />
            <br />
            {errors.dataUrodzenia && <span>{errors.dataUrodzenia}</span>}
            <br />

            <select name="kraj" defaultValue={inputs.kraj}>
                <option value="">Wybierz kraj</option>
                <option value="polska">Polska</option>
                <option value="niemcy">Niemcy</option>
                <option value="francja">Francja</option>
            </select>
            <br />
            {errors.kraj && <span>{errors.kraj}</span>}
            <br />

            <input
                type="radio"
                name="plec"
                value="mezczyzna"
                defaultChecked={inputs.plec === 'mezczyzna'}
            />{' '}
            Mężczyzna

            <input
                type="radio"
                name="plec"
                value="kobieta"
                defaultChecked={inputs.plec === 'kobieta'}
            />{' '}
            Kobieta
            <br />
            {errors.plec && <span>{errors.plec}</span>}
            <br />

            <input
                type="checkbox"
                name="zgoda"
                defaultChecked={inputs.zgoda}
            />{' '}
            Akceptuję regulamin
            <br />
            {errors.zgoda && <span>{errors.zgoda}</span>}
            <br />

            <textarea
                name="komentarz"
                placeholder="Komentarz"
                defaultValue={inputs.komentarz}
            ></textarea>
            <br />

            <input
                type="password"
                name="haslo"
                placeholder="Hasło"
                defaultValue={inputs.haslo}
            />
            <br />
            {errors.haslo && <span>{errors.haslo}</span>}
            <br />

            <input
                type="password"
                name="hasloPotwierdzenie"
                placeholder="Potwierdź hasło"
                defaultValue={inputs.hasloPotwierdzenie}
            />
            <br />
            {errors.hasloPotwierdzenie && <span>{errors.hasloPotwierdzenie}</span>}
            <br />

            <input type="submit" value="Submit" />
            <input type="reset" value="Reset" onClick={resetForm} />
        </form>
    );
}