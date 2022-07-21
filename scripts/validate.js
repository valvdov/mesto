//selectors for Edit form

const formEdit = {
    form: '#popup-edit__form',
    button: '#popup-edit__submit-button',
    buttonInvalid: 'popup__submit-button_invalid',
    firstText: '#popup-edit__name',
    secondText: '#popup-edit__job',
    borderTextError: 'popup__text_error'
}

//selectors for Add form

const formAdd = {
    form: '#popup-add__form',
    button: '#popup-add__submit-button',
    buttonInvalid: 'popup__submit-button_invalid',
    firstText: '#popup-add__place',
    secondText: '#popup-add__link',
    borderTextError: 'popup__text_error'
}


//function

function enableValidation (config) {
    const form = document.querySelector(config.form);
    form.addEventListener('input',(event) => handleFormInput(event, config));
}

function handleFormInput(event, config) {
    const input = event.target;
    const form = event.currentTarget;

    showFieldError(input, config);
    showBorder(form, config);
    setSubmitButtonState(form, config);
}

function showFieldError (input) {
    const span = input.nextElementSibling;
    span.textContent = input.validationMessage;
}
function showBorder(form, config) {
    const firstText = form.querySelector(config.firstText);
    const secondText = form.querySelector(config.secondText);
    const firstTextIsValid = firstText.checkValidity();
    const secondTextIsValid = secondText.checkValidity();
    if (firstTextIsValid) {
        firstText.classList.remove(config.borderTextError);
    } else  firstText.classList.add(config.borderTextError);
    if (secondTextIsValid) {
        secondText.classList.remove(config.borderTextError);
    } else
        secondText.classList.add(config.borderTextError);
}

function setSubmitButtonState(form, config) {
    const button = form.querySelector(config.button);
    const isValid = form.checkValidity();

    if (isValid) {
        button.removeAttribute('disabled');
        button.classList.remove(config.buttonInvalid);

    } else {
        button.setAttribute('disabled', true);
        button.classList.add(config.buttonInvalid);
    }
}

