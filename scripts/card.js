class Card {

    static _template = document.querySelector('.template__card').content;
  
    constructor(data, container, openPopupImage) {
      this._name = data.name;
      this._alt = data.name;
      this._link = data.link;
      this._container = container;
      this._openPopupImage = openPopupImage;
    }
    _getCardElement() {
      this._cardTemplate = Card._template.cloneNode(true);
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
      this._deleteButton.closest('.card').remove();
   }
   _handleImageClick() {
      this._openPopupImage({name: this._name, link: this._link});
   }
  
    render = () => {
      this._cardElement = this._getCardElement();
      this._likeButton = this._cardElement.querySelector('.card__like-button');
      this._deleteButton = this._cardElement.querySelector('.card__delete-button');
      this._cardImage = this._cardElement.querySelector('.card__image');
      this._cardElement.querySelector('.card__title').textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._alt;
      this._container.prepend(this._cardElement);
      this._setEventListeners();
    }
  }
  export default Card;