import logo from '../../src/images/logo.svg';
import React from 'react';
import { Route, Switch, Link } from "react-router-dom";

export default function Header({ loggedIn, email, onSignOut, onBurgerOpen, isBurgerMenuOpened }) {
    const navigationClassName = (
        `${loggedIn ? 'header__nav' : 'header__nav_disabled'}`
    );
    const burgerMenuClassName = (
        `${isBurgerMenuOpened ? 'header__burger-menu_close' : 'header__burger-menu'}`
    );
    const headerClassName = (
        `${loggedIn ? 'header' : 'header_unauthtorized'}`
    );
    return (
        <header className={headerClassName}>
            <img
                className="header__logo"
                src={logo}
                alt="Место Россия"
            />
            <ul className="header__links">
                <Switch>
                    <Route path="/sign-up">
                        <li className="header__link"><Link className="header__link link" to="/sign-in">Войти</Link></li>
                    </Route>
                    <Route path="/sign-in">
                        <li className="header__link"><Link className="header__link link" to="/sign-up">Регистрация</Link></li>
                    </Route>
                </Switch>
            </ul>
            {loggedIn
                ?
                <>
                    <div className={`${burgerMenuClassName} button`} onClick={onBurgerOpen} />
                </>
                : ''}
            <ul className={navigationClassName}>
                {loggedIn
                    ?
                    <>
                        <li className="header__email">{email}</li>
                        <li onClick={onSignOut}><Link className="header__nav_exit-link" to="/sign-in">Выйти</Link></li>
                    </>
                    : ''}
            </ul>
        </header>
    )
}