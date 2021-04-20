import React from 'react';
import Card from './Card.js';
import CurrentUserContext from '../contexts/CurrentUserContext'

export default function Main(props) {
    const { currentUser } = React.useContext(CurrentUserContext)

    return (
        <main>
            <section className="profile">
                <div className="profile__overlay">
                    <img
                        className="profile__avatar"
                        src={currentUser.avatar}
                        alt="Аватар"
                        onClick={props.onEditAvatar}
                    />
                </div>
                <div className="profile__info">
                    <div className="profile__editor">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            type="button"
                            className="profile__edit-button button"
                            onClick={props.onEditProfile}
                        />
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button
                    type="button"
                    className="profile__add-button button"
                    onClick={props.onAddPlace}
                />
            </section>
            <section className="elements">
                {props.cards.map((card) => {
                    return (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={props.onCardClick}
                            onCardLike={props.onCardLike}
                            onCardDelete={props.onCardDelete}
                        />)
                })}
            </section>
        </main>
    )
}

