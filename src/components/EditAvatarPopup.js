import PopupWithForm from "./PopupWithForm";
import React, {useEffect} from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar, isLoading}) {
    const inputRef = React.useRef();
    const [avatarUrl, setAvatarUrl] = React.useState('');
    const [urlDirty, setUrlDirty] = React.useState(false);
    const [urlError, setUrlError] = React.useState('');
    const [formValid, setFormValid] = React.useState(false);
    const buttonText = isLoading ? 'Сохранение...' : 'Сохранить';
    const avatarInputClassName = (`popup__item popup__item_input_avatarPicture ${urlDirty ? 'popup__item_type_error' : ''}`)
    const avatarMessageErrorClassName = (`popup__input-error inputPictureAvatar-error ${urlDirty ? 'popup__input-error_active' : ''}`);

    useEffect(() => {
        if (urlError) {
        setFormValid(false)
        } else {
        setFormValid(true)
        }
    }, [urlError])

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value // ref применяется по заданию
        });
    }

    function handleAvatarUrlChange(evt) {
        const input = evt.target;
        setAvatarUrl(input.value);

        if (!input.validity.valid) {
            setUrlDirty(true);
            setUrlError(input.validationMessage)
        } else {
            setUrlDirty(false);
            setUrlError('');
            setFormValid(true);
        }
    }

    React.useEffect(() => {
        setFormValid(false);
        inputRef.current.value = "";
        setUrlDirty(false);
        setUrlError('');
        setAvatarUrl('')
    }, [isOpen]);

    return (
        <PopupWithForm name='avatarUpdate' title='Обновить аватар' additionalClassName='popup__content-title_type_avatarCreate' buttonText={buttonText} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isFormValid={formValid}> {/* попап обновления аватара */}
            <label htmlFor="inputPictureAvatar">
                <input onChange={handleAvatarUrlChange} ref={inputRef} type="url" className={avatarInputClassName} name="avatar" autoComplete="off"
                       id="inputPictureAvatar" value={avatarUrl} placeholder="Ссылка на картинку" required/>
                <span className={avatarMessageErrorClassName}>{urlError}</span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup