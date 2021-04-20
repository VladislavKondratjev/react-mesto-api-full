export default function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content">
                <button type="button" className="popup__close-button button" onClick={props.onClose} />
                <h3 className="popup__title">{`${props.title}`}</h3>
                <form
                    onSubmit={props.onSubmit}
                    className="popup__form"
                    method="PATCH"
                    action="#"
                    name={`${props.name}`}>
                    {props.children}
                </form>
            </div>
        </div>
    )
}