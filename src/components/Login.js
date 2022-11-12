import AuthorizationUserForm from "./AuthorizationUserForm";
import Header from "./Header";
import React from "react";
import {useHistory} from "react-router-dom";

function Login({onLogin, isLoggedIn}) {
    let history = useHistory();

    return (
        <>
            <Header buttonPath={() => history.push('/sign-up')} loginText='' buttonText='Регистрация' additionalClassName='' loggedIn={isLoggedIn}/>
            <AuthorizationUserForm onSubmit={onLogin} isLoggedIn={isLoggedIn} name='login' title='Вход' buttonText='Войти' additionalClassName='popup__additionalInfo_type_hidden'/>
        </>
    )
}

export default Login