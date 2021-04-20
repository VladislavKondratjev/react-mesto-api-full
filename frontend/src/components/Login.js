import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Login({ onLogin }) {
    const initialData = {
        email: '',
        password: '',
    }
    const history = useHistory();
    const [data, setData] = useState(initialData);

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
        if (!data.email || !data.password) {
            return;
        }

        onLogin(data)
            .then(resetForm)
            .then(() => history.push('/'))
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className="sign-in" onSubmit={handleSubmit}>
                <h3 className="sign-in__title">Вход</h3>
                <form
                    className="sign-in__form"
                    method="POST"
                    action="#">
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
                        Войти
                    </button>
                </form>
                <span className="register__link-to-login">Ещё не зарегистрированы? <Link to="/sign-up" className="register__link-to-login link">Зарегистрироваться</Link></span>
            </div>
        </>
    )
}