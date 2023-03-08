const removeValidationErrors = (popup) => {
  const setInputs = Array.from(popup.querySelectorAll(options.inputSelector));
  setInputs.forEach(input => hideError(input, options));
}

const hideError = (input, options) => {
  const errorField = input.closest(options.formFieldSelector);
  const inputError = errorField.querySelector(options.errorSpanSelector);
  input.classList.remove(options.inputErrorClass);
  inputError.classList.remove(options.errorActiveClass);
  inputError.textContent = '';
}

const showError = (input, errorMessage, options) => {
  const errorField = input.closest(options.formFieldSelector);
  const inputError = errorField.querySelector(options.errorSpanSelector);
  input.classList.add(options.inputErrorClass);
  inputError.textContent = errorMessage;
  inputError.classList.add(options.errorActiveClass);
}

const checkInputValidity = (inputElement, options) => {
  if (!inputElement.validity.valid) {
    showError(inputElement, inputElement.validationMessage, options);
  } else {
    hideError(inputElement, options);
  }
};
  
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}
  
const disabledButton = (buttonElement, options) => {
  buttonElement.disabled = 'true';
  buttonElement.classList.add(options.inactiveButtonClass);
}
const enabledButton = (buttonElement, options) => {
  buttonElement.disabled = '';
  buttonElement.classList.remove(options.inactiveButtonClass);
}
  
const toggleButtonState = (inputList, buttonElement, options) => {
  if (hasInvalidInput(inputList)) {
    disabledButton(buttonElement, options);
  } else {
    enabledButton(buttonElement, options);
  }
};

const formListeners = (formElement, options) => {
  const inputList = Array.from(formElement.querySelectorAll(options.inputSelector));
  const buttonElement = formElement.querySelector(options.submitButtonSelector);  
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(inputElement, options);
        toggleButtonState(inputList, buttonElement, options);
      })
  });
}

const enableValidation = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector));
  formList.forEach((formElement) => {
    formListeners(formElement, options);
  });
}