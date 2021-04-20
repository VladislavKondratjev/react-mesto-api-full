import React from 'react';
import PopupWithForm from './PopupWithForm.js'
import CurrentUserContext from '../contexts/CurrentUserContext'

export default function EditProfilePopup(props) {
    const { currentUser } = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('')
    const [about, setDescription] = React.useState('')

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({
            name,
            about
        });
    }

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeAbout(e) {
        setDescription(e.target.value)
    }

    return (
        <PopupWithForm
            title="Редактировать профиль"
            name="edit"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="name"
                name="name"
                autoComplete="off"
                type="text"
                className="popup__input popup__input_type_name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
                onChange={handleChangeName}
                value={name || ''}
            />
            <span id="name-error" className="error"></span>
            <input
                id="description"
                name="about"
                autoComplete="off"
                type="text"
                className="popup__input popup__input_type_description"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required
                onChange={handleChangeAbout}
                value={about || ''}
            />
            <span id="description-error" className="error"></span>
            <button type="submit" className="popup__submit-button">
                Сохранить
            </button>
        </PopupWithForm>
    )
}