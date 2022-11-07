import React from "react";

function UserForm({onSubmit, name, title, buttonText}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const inputEmailClassName = (`popup__item popup__item_input_email `); // ${inputNameDirty ? 'popup__item_type_error' : ''}
    const inputPasswordClassName = (`popup__item popup__item_input_password `); // ${inputNameDirty ? 'popup__item_type_error' : ''}
    const inputEmailMessageErrorClassName = (`popup__input-error inputEmail-error `);
    const inputPasswordMessageErrorClassName = (`popup__input-error inputPassword-error `);
    const buttonClassName = (`popup__save-button popup__save-button_type_userForm`) //  ${isFormValid ? '' : 'popup__save-button_invalid'}

    function handleEmailChange() {
        console.log('handleEmailChange')
    }

    function handlePasswordChange() {
        console.log('handlePasswordChange')
    }


    return (
        <div className="popup__container popup__container_type_userForm">
            <form onSubmit={onSubmit} name={`${name}Form`} className="popup__content" noValidate={true}>
                <h2 className="popup__content-title popup__content-title_type_userForm">{title}</h2>
                <label htmlFor={`${name}Input`}>
                    <input onChange={handleEmailChange} type="text" name="name" className={inputEmailClassName} autoComplete="off"
                           id={`${name}Input`} value={email} placeholder='Email' minLength="2" maxLength="30" required/>
                    <span className={inputEmailMessageErrorClassName}>Span</span>
                </label>
                <label htmlFor={`${name}Input`}>
                    <input onChange={handlePasswordChange} type="url" name="link" className={inputPasswordClassName} autoComplete="off"
                           id={`${name}Input`} value={password} placeholder='Пароль' required/>
                    <span className={inputPasswordMessageErrorClassName}>Span</span>
                </label>
                <button type="submit" value={buttonText} className={buttonClassName} id="save-button" disabled={false}>{buttonText}</button>
                <p className="popup__additionalInfo">Уже зарегистрированы? Войти</p>
            </form>
        </div>
    )
}

export default UserForm