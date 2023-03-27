class FormValidator {
  constructor(options, formElement, disabledButton, enabledButton) {
    this._formSelector = options._formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._formFieldSelector = options.formFieldSelector;
    this._errorSpanSelector = options.errorSpanSelector;
    this._inputErrorClass = options.inputErrorClass;
    this._errorActiveClass = options.errorActiveClass;
    this._formElement = formElement;
    this._disabledButton = disabledButton;
    this._enabledButton = enabledButton;
  }
    
  _hideError = (input) => {
    const errorField = input.closest(this._formFieldSelector);
    const inputError = errorField.querySelector(this._errorSpanSelector);
    input.classList.remove(this._inputErrorClass);
    inputError.classList.remove(this._errorActiveClass);
    inputError.textContent = '';
  }

  _showError = (input, errorMessage) => {
    const errorField = input.closest(this._formFieldSelector);
    const inputError = errorField.querySelector(this._errorSpanSelector);
    input.classList.add(this._inputErrorClass);
    inputError.textContent = errorMessage;
    inputError.classList.add(this._errorActiveClass);
  }
    
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement, inputElement.validationMessage);
    } else {
      this._hideError(inputElement);
    }
  }
  
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disabledButton(buttonElement, this._inactiveButtonClass);
    } else {
      this._enabledButton(buttonElement, this._inactiveButtonClass);
    }
  }
    
  _formListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);  
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      })
    })
  }
    
  resetErrorInputs = () => {
    const setInputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    setInputs.forEach(input => this._hideError(input));
  }
  
  enableValidation = () => {
    this._formListeners(this._formElement);
    this.resetErrorInputs(this._formElement); 
  }
}

export default FormValidator;