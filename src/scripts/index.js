import './../pages/index.css';
import Section from './Section.js';
import Card from './card.js';
import FormValidator from './formValidator.js';
import PopupWithForm from './popupWithForm.js';
import PopupWithImage from './popupWithImage.js';
import UserInfo from './userInfo.js';
import initialCards from './initialCards.js';

const editButton = document.querySelector('.profile__info-button');
const addButton = document.querySelector('.profile__add-button');
const profileForm = document.querySelector('.popup_type_edit-profile').querySelector('.popup__form');
const addCardForm = document.querySelector('.popup_type_add-card').querySelector('.popup__form');

const options = {
  formSelector: '.popup__form',
  inputSelector: '.popup__form-item',
  submitButtonSelector: '.popup__form-submit',
  inactiveButtonClass: 'popup__form-submit_inactive',
  formFieldSelector: '.popup__form-field',
  errorSpanSelector: '.popup__form-error',
  inputErrorClass: 'popup__form-item_type_error',
  errorActiveClass: 'popup__form-error_active'
}; 

const validateProfileForm = new FormValidator(options, profileForm);
validateProfileForm.enableValidation();
validateProfileForm.resetValidation();

const validateAddCardForm = new FormValidator(options, addCardForm);
validateAddCardForm.enableValidation();
validateAddCardForm.resetValidation();

const userInfo = new UserInfo({titleSelector: '.profile__info-title', subtitleSelector: '.profile__info-subtitle'});

const popupProfile = new PopupWithForm({popupSelector: '.popup_type_edit-profile', 
callback: (data) => {
  userInfo.setUserInfo(data);
  popupProfile.close();
  }
});

popupProfile.setEventListeners();

function handleEditButtonClick() {
 popupProfile.setInputValueList(userInfo.getUserInfo())
 popupProfile.open();
 validateProfileForm.resetValidation();
}

function handleCardClick(item) {
  const largeImagePopup = new PopupWithImage('.popup_type_open-image', item)
  largeImagePopup.open();
  largeImagePopup.setEventListeners();
}

const cardItems = new Section({items: initialCards, renderer: (item) => {
  const card = createNewCard(item);
  cardItems.addItem(card);
  }
}, '.cards__grid');
cardItems.renderCard();

function createNewCard(item) {
  const newCard = new Card('.template__card', item, () => handleCardClick(item));
  const cardElement = newCard.render();
  return cardElement;
}

const popupCard = new PopupWithForm({popupSelector: '.popup_type_add-card', 
callback: (data) => {
  const cardElement = new Section({items: [data], 
    renderer: (item) => {
    const card = createNewCard(item);
    cardElement.addItem(card);
  }}, '.cards__grid');
  cardElement.renderCard();
}});
popupCard.setEventListeners();

function handleAddButtonClick() {
  popupCard.open();
  validateAddCardForm.resetValidation();
}

editButton.addEventListener('click', () => handleEditButtonClick());
addButton.addEventListener('click', () => handleAddButtonClick());
