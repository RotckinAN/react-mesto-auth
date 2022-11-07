import React from "react";

// использовалось ранее до добавления валидации форм
export function useForm(inputValues) {
    const [values, setValues] = React.useState(inputValues);

    const handleChange = (evt) => {
        const {value, name} = evt.target;
        setValues({...values, [name]: value});
    };

    return {values, handleChange, setValues};
}