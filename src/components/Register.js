import React from "react";
import UserForm from "./UserForm";

function Register() {
    function handleSubmit() {
        console.log('handleSubmit')
    }

    return (
        <UserForm onSubmit={handleSubmit} name='register' title='Регистрация' buttonText='Зарегистрироваться' />
    )

}

export default Register