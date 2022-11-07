import PopupWithForm from "./PopupWithForm";
import React from "react";

function AddPlacePopup({isOpen, onClose, onAddPlaceSubmit, isLoading}) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');
    const [inputNameDirty, setInputNameDirty] = React.useState(false);
    const [inputLinkDirty, setInputLinkDirty] = React.useState(false);
    const [inputNameError, setInputNameError] = React.useState('');
    const [inputLinkError, setInputLinkError] = React.useState('');
    const [formValid, setFormValid] = React.useState(false);
    const buttonText = isLoading ? 'Создание...' : 'Создать';
    const inputNameClassName = (`popup__item popup__item_input_pictureName ${inputNameDirty ? 'popup__item_type_error' : ''}`);
    const inputLinkClassName = (`popup__item popup__item_input_picture ${inputLinkDirty ? 'popup__item_type_error' : ''}`);
    const inputNameMessageErrorClassName = (`popup__input-error inputPicturePopup-error ${inputNameDirty ? 'popup__input-error_active' : ''}`);
    const inputLinkMessageErrorClassName = (`popup__input-error inputPictureLink-error ${inputLinkDirty ? 'popup__input-error_active' : ''}`);

    React.useEffect(() => {
        setName('');
        setLink('');
        setInputNameDirty(false);
        setInputNameError('');
        setInputLinkDirty(false);
        setInputLinkError('');
        setFormValid(false)
    }, [isOpen])

    React.useEffect(() => {
        if (inputNameError || inputLinkError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [inputNameError, inputLinkError])

    function handleNameChange(evt) {
        const nameInput = evt.target;
        setName(nameInput.value);

        if (!nameInput.validity.valid) {
            setInputNameDirty(true);
            setInputNameError(nameInput.validationMessage)
        } else {
            setInputNameDirty(false);
            setInputNameError('');
        }
    }

    function handleLinkChange(evt) {
        const linkInput = evt.target;
        setLink(linkInput.value);

        if (!linkInput.validity.valid) {
            setInputLinkDirty(true);
            setInputLinkError(linkInput.validationMessage)
        } else {
            setInputLinkDirty(false);
            setInputLinkError('');
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlaceSubmit({
            name: name,
            link: link
        });
    }

    return(
        <PopupWithForm name='addPicture' title='Новое место' buttonText={buttonText} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isFormValid={formValid}> {/* попап добавления новых фото */}
            <label htmlFor="inputPicturePopup">
                <input onChange={handleNameChange} type="text" name="name" className={inputNameClassName} autoComplete="off"
                       id="inputPicturePopup" value={name} placeholder='Название' minLength="2" maxLength="30" required/>
                <span className={inputNameMessageErrorClassName}>{inputNameError}</span>
            </label>
            <label htmlFor="inputPictureLink">
                <input onChange={handleLinkChange} type="url" name="link" className={inputLinkClassName} autoComplete="off"
                       id="inputPictureLink" value={link} placeholder='Ссылка на картинку' required/>
                <span className={inputLinkMessageErrorClassName}>{inputLinkError}</span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup