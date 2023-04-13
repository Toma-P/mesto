import Popup from "./popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, data) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupCaption = this._popup.querySelector('.popup__caption');
        this._name = data.name;
        this._link = data.link;

    }
    open() {
        this._popupImage.src = this._link;
        this._popupImage.alt = this._name;
        this._popupCaption.textContent = this._name;
        super.open();
    }
}