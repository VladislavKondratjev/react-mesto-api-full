import success from '../../src/images/popup_type_success.svg';
import fail from '../../src/images/popup_type_fail.svg'
export default function InfoToolTip(props) {
    return (
        <div className={`popup popup_type_success ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__content">
                <button type="button" className="popup__close-button button" onClick={props.onClose} />
                <img className="tooltip__image"
                    src={props.success
                        ? success
                        : fail}
                    alt="success or fail" />
                <h2 className="tooltip__title">
                    {props.success
                        ? "Вы успешно зарегистрировались!"
                        : "Что - то пошло не так!\nПопробуйте ещё раз."}
                </h2>
            </div>
        </div>
    )
}