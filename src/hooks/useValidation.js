import React from "react";

function useValidation() {
    const [isDirty, setIsDirty] = React.useState(false);
    const [inputError, setInputError] = React.useState('');
    const [inputValid, setInputValid] = React.useState(false);

    function validation(value) {
        if (!value.validity.valid) {
            setInputValid(false)
            setIsDirty(true);
            setInputError(value.validationMessage);
        } else {
            setInputValid(true)
            setIsDirty(false);
            setInputError('');
        }
    }

    return {isDirty, inputError, inputValid, validation, setIsDirty, setInputValid, setInputError}
}

export default useValidation