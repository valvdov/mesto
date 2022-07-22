const popupNoError = 'popup__text_no-error';

//show error message

const showFieldError = (formElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
    inputElement.classList.remove(popupNoError);
};

// remove error message

const hideFieldError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
    inputElement.classList.add(popupNoError);
};

//check validity

const checkInputValidity = (formElement, inputElement, { inputErrorClass, errorClass }) => {
    if (!inputElement.validity.valid) {
        showFieldError(formElement, inputElement, inputElement.validationMessage, {inputErrorClass, errorClass,});
    } else {
        hideFieldError(formElement, inputElement, {inputErrorClass, errorClass,});
    }
};

//listeners

function setEventListeners(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass,}) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, {inputSelector, inputErrorClass, errorClass,});
            setSubmitButtonState(inputList, buttonElement, { inactiveButtonClass });
        });
    });
}

//validation

function enableValidation({ formSelector, ...rest }) {
    const formList = Array.from(document.querySelectorAll(formSelector));

    formList.forEach((formElement) => {
        setEventListeners(formElement, { ...rest });
    });
}

//if one invalid - false

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

//disable/enable button

function setSubmitButtonState(inputList, buttonElement, { inactiveButtonClass }) {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
}

//call enableValidation

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__text',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_invalid',
    inputErrorClass: 'popup__text_type_error',
    errorClass: 'popup__text-error',
});
