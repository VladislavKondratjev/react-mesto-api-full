export default function ImagePopup(props) {
    return (
        <div className={`popup popup__${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__image-caption">
                <button
                    type="button"
                    className="popup__close-button button popup__close-button_type_modal" onClick={props.onClose}
                />
                <figure className="figure">
                    <img className="popup__image" alt={props.card ? props.card.name : '#'} src={props.card ? props.card.link : '#'} />
                    <figcaption className="popup__caption">{props.card ? props.card.name : '#'}</figcaption>
                </figure>
            </div>
        </div>
    )
}