import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Register({ onRegister }) {
    const initialData = {
        email: '',
        password: '',
    };
    const [data, setData] = useState(initialData);
    const history = useHistory();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(data => ({
            ...data,
            [name]: value,
        }));
    }

    const resetForm = () => {
        setData(initialData);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.password || !data.email) {
            return;
        }

        onRegister(data)
            .then(resetForm)
            .then(() => history.push('/sign-in'))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="sign-in">
                <h3 className="sign-in__title">Регистрация</h3>
                <form
                    className="sign-in__form"
                    method="PATCH"
                    action="#"
                    onSubmit={handleSubmit}
                >
                    <input
                        id="email"
                        name="email"
                        autoComplete="off"
                        type="email"
                        className="sign-in__input popup__input_type_email"
                        placeholder="Email"
                        minLength="9"
                        maxLength="40"
                        required
                        onChange={handleChange}
                        value={data.email}
                    />
                    <input
                        id="password"
                        name="password"
                        autoComplete="off"
                        type="password"
                        className="sign-in__input popup__input_type_password"
                        placeholder="Пароль"
                        minLength="8"
                        maxLength="15"
                        required
                        onChange={handleChange}
                        value={data.password}
                    />
                    <button type="submit" className="sign-in__submit-button">
                        Зарегистрироваться
                    </button>
                    <span className="register__link-to-login">Уже зарегистрированы? <Link to="/sign-in" className="register__link-to-login link">Войти</Link></span>
                </form>
            </div>
        </>
    )
}   