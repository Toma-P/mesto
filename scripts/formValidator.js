class FormValidator {
  constructor(options, formElement) {
    this._formSelector = options._formSelector;
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._formFieldSelector = options.formFieldSelector;
    this._errorSpanSelector = options.errorSpanSelector;
    this._inputErrorClass = options.inputErrorClass;
    this._errorActiveClass = options.errorActiveClass;
    this._formElement = formElement;
    this._submitButton = formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
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
  
  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }
  
  _disableButton = () => {
    this._submitButton.disabled = 'true';
    this._submitButton.classList.add(this._inactiveButtonClass);
  }
  _enableButton = () => {
    this._submitButton.disabled = '';
    this._submitButton.classList.remove(this._inactiveButtonClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton();
    } else {
      this._enableButton();
    }
  }
    
  _formListeners() {
      
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }
    
  resetValidation = () => {
    this._toggleButtonState();
    this._inputList.forEach(input => this._hideError(input));
  }
  
  enableValidation = () => {
    this._formListeners(); 
  }
}

export default FormValidator;