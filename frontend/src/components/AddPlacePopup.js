import React from 'react';
import PopupWithForm from './PopupWithForm.js'

export default function AddPlacePopup(props) {
    const [name, setName] = React.useState('')
    const [link, setLink] = React.useState('')

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name,
            link
        })
    }

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeLink(e) {
        setLink(e.target.value)
    }

    return (
        <PopupWithForm
            title="Новое место"
            name="add-card"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleAddPlaceSubmit}>
            <input
                id="place"
                type="text"
                autoComplete="off"
                className="popup__input popup__input_type_place popup__input_type_modal"
                placeholder="Название"
                name="name"
                minLength="2"
                maxLength="30"
                required
                onChange={handleChangeName}
                value={name}
            />
            <span id="place-error" className="error"></span>
            <input
                id="url"
                autoComplete="off"
                className="popup__input popup__input_type_photo popup__input_type_modal"
                placeholder="Ссылка на картинку"
                name="link"
                type="url"
                required
                onChange={handleChangeLink}
                value={link}
            />
            <span id="url-error" className="error"></span>
            <button type="submit" className="popup__submit-button">Создать</button>
        </PopupWithForm>
    )
}