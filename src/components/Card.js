export default class Card {
    constructor(templateSelector, data, func) {
      this._template = templateSelector
      this._name = data.name;
      this._alt = data.name;
      this._link = data.link;
      this._openPopupImage = func;
      this._cardElement;
    }

    _getCardElement() {
      this._cardTemplate = document
      .querySelector(this._template)
      .content
      .querySelector('.card')
      .cloneNode(true);
      return this._cardTemplate;
    }
  
    _setEventListeners() {
      this._likeButton.addEventListener('click', () => this._handleLikeButtonClick());
      this._deleteButton.addEventListener('click', () => this._handleDeleteButtonClick());
      this._cardImage.addEventListener('click', () => this._handleImageClick());
    }

    _handleLikeButtonClick() {
      this._likeButton.classList.toggle('card__like-button_active');
    }

    _handleDeleteButtonClick() {
      this._cardElement.remove();
   }
   
   _handleImageClick() {
      this._openPopupImage();
   }
  
    render() {
      this._cardElement = this._getCardElement();
      this._likeButton = this._cardElement.querySelector('.card__like-button');
      this._deleteButton = this._cardElement.querySelector('.card__delete-button');
      this._cardImage = this._cardElement.querySelector('.card__image');
      this._cardElement.querySelector('.card__title').textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._alt;
      this._setEventListeners();
      console.log(this._cardElement);
      return this._cardElement;
    }
  }