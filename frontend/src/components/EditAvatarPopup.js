import React from 'react';
import PopupWithForm from './PopupWithForm.js'

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update-avavtar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}>
      <input
        id="link"
        autoComplete="off"
        className="popup__input popup__input_type_avatar popup__input_type_modal"
        placeholder="Ссылка на картинку"
        name="link"
        type="url"
        required
        ref={avatarRef} />
      <span id="link-error" className="error"></span>
      <button type="submit" className="popup__submit-button">Сохранить</button>
    </PopupWithForm>)
}