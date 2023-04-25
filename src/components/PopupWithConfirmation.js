import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupButton = this._popup.querySelector('.popup__form-submit');
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupButton.addEventListener('click', (event) => {
          event.preventDefault();
          this.submitPopup(this._functionConfirm());
        });
      }
    submitPopup(functionConf) {
      this._functionConfirm = functionConf;
    }
}