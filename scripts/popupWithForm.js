import Popup from "./popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, callback}) {
    super(popupSelector);
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__form-item');
    this._handleSubmitForm = callback;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
        });
    return this._formValues;
  }

  setInputValueList(item) {
    this._inputList.forEach((input) =>  {
      input.value = item[input.name];
    }) 
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}