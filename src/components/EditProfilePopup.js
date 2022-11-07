import PopupWithForm from "./PopupWithForm";
import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading}) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [inputNameDirty, setInputNameDirty] = React.useState(false);
    const [inputDescriptionDirty, setInputDescriptionDirty] = React.useState(false);
    const [inputNameError, setInputNameError] = React.useState('');
    const [inputDescriptionError, setInputDescriptionError] = React.useState('');
    const [formValid, setFormValid] = React.useState(false);
    const currentUser = React.useContext(CurrentUserContext);
    const buttonText = isLoading ? 'Сохранение...' : 'Сохранить';
    const inputNameClassName = (`popup__item popup__item_input_name ${inputNameDirty ? 'popup__item_type_error' : ''}`);
    const inputDescriptionClassName = (`popup__item popup__item_input_job ${inputDescriptionDirty ? 'popup__item_type_error' : ''}`);
    const inputNameMessageErrorClassName = (`popup__input-error inputName-error ${inputNameDirty ? 'popup__input-error_active' : ''}`);
    const inputDescriptionMessageErrorClassName = (`popup__input-error inputJob-error ${inputDescriptionDirty ? 'popup__input-error_active' : ''}`);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
        setInputNameDirty(false);
        setInputNameError('');
        setInputDescriptionDirty(false);
        setInputDescriptionError('');
    }, [currentUser, isOpen]);

    React.useEffect(() => {
        if (inputNameError || inputDescriptionError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [inputNameError, inputDescriptionError])

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

    function handleDescriptionChange(evt) {
        const descriptionInput = evt.target;
        setDescription(descriptionInput.value);

        if (!descriptionInput.validity.valid) {
            setInputDescriptionDirty(true);
            setInputDescriptionError(descriptionInput.validationMessage)
        } else {
            setInputDescriptionDirty(false);
            setInputDescriptionError('');
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name: name,
            about: description})
    }

    return (
        <PopupWithForm name='editProfile' title='Редактировать профиль' buttonText={buttonText} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isFormValid={formValid}> {/* попап редактирования профиля */}
            <label htmlFor="inputName">
                <input onChange={handleNameChange} value={name || ''} type="text" name="name" className={inputNameClassName} autoComplete="off"
                       id="inputName" placeholder="Имя" minLength="2" maxLength="40" required/>
                <span className={inputNameMessageErrorClassName}>{inputNameError}</span>
            </label>
            <label htmlFor="inputJob">
                <input onChange={handleDescriptionChange} value={description || ''} type="text" name="about" className={inputDescriptionClassName} autoComplete="off"
                       id="inputJob" placeholder="О себе" minLength="2" maxLength="200" required/>
                <span className={inputDescriptionMessageErrorClassName}>{inputDescriptionError}</span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup