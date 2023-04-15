export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    _handleEscClose(event) {
        if(event.key === "Escape") {
            this.close(this._popup);
          }
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);

    }

    setEventListeners() {
        this._closeButton.addEventListener('click', () => this.close());
        this._popup.addEventListener('click', (event) => {
            if(event.target === event.currentTarget) { 
            this.close();
            }
        });
    }
}