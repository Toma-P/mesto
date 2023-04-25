export default class Card {
    constructor(templateSelector, data, userId, openPopupImage, handleDeleteCard, handleLike, handleDeleteLike) {
      this._template = templateSelector
      this._name = data.name;
      this._alt = data.name;
      this._link = data.link;
      this._ownerId = data.owner._id;
      this._cardId = data._id;
      this._userId = userId;
      this._likes = data.likes;
      this._openPopupImage = openPopupImage;
      this._handleDeleteCard = handleDeleteCard;
      this._handleLike = handleLike;
      this._handleDeleteLike = handleDeleteLike;
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
      this._likeButton.addEventListener('click', () => {
        if(this._isLikedCard()) {
          this._handleDeleteLike(this);
        } else {
          this._handleLike(this);
        }
        
      });

      if(this._isMyCard()) {
        this._deleteButton.addEventListener('click', () => {
          this._handleDeleteCard(this)
        });
      }
      this._cardImage.addEventListener('click', () => this._openPopupImage());
    }

    _isLikedCard() {
      return this._likeButton.classList.contains('card__like-button_active');
    }

    _isMyCard() {
      return this._userId === this._ownerId;
    }

    getId() {
      return this._cardId;
    }

    toggleLikeIcon() {
      this._likeButton.classList.toggle('card__like-button_active');
    }

    removeItem() {
      this._cardElement.remove();
    }
    
    updateLikesCount(data) {
      this._likeCount.textContent = data.likes.length;
    }

    render() {
      this._cardElement = this._getCardElement();
      this._likeButton = this._cardElement.querySelector('.card__like-button');
      this._deleteButton = this._cardElement.querySelector('.card__delete-button');
      if(!this._isMyCard()) {
        this._deleteButton.classList.add('card__delete-button_disabled');
      }
      if(this._likes.some((user) => user._id === this._userId)) {
        this.toggleLikeIcon()
      }
      this._likeCount = this._cardElement.querySelector('.card__like-count');
      this._likeCount.textContent = this._likes.length;
      this._cardImage = this._cardElement.querySelector('.card__image');
      this._cardElement.querySelector('.card__title').textContent = this._name;
      this._cardImage.src = this._link;
      this._cardImage.alt = this._alt;
      this._cardElement.id = this._cardId;
      this._setEventListeners();
      return this._cardElement;
    }
  }