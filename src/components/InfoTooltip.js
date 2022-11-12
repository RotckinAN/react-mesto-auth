function InfoTooltip({loggedIn, isOpen, name, onClose, infoText}) {
    const popupConfirmImage = (`popup__image ${loggedIn ? 'popup__image_type_successImage' : 'popup__image_type_failImage'}`);
    const title = (`${loggedIn ? infoText : 'Что-то пошло не так!\n' +
        'Попробуйте ещё раз.'}`)

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="popup__close" type="button" onClick={onClose}></button>
                <form name={`${name}Form`} className={`popup__content popup__content_type_${name}`} noValidate={true}>
                    <div className={popupConfirmImage}></div>
                    <h2 className='popup__content-title popup__content-title_type_confirmPopup'>{title}</h2>
                </form>
            </div>
        </div>
    )
}

export default InfoTooltip