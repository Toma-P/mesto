import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import initialCards from '../components/initialCards.js';

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

const largeImagePopup = new PopupWithImage('.popup_type_open-image');
largeImagePopup.setEventListeners();

function handleEditButtonClick() {
 popupProfile.setInputValueList(userInfo.getUserInfo())
 popupProfile.open();
 validateProfileForm.resetValidation();
}

function handleCardClick(item) {
  largeImagePopup.open(item);
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
 cardItems.renderNewCard(data);  
}});
popupCard.setEventListeners();

function handleAddButtonClick() {
  popupCard.open();
  validateAddCardForm.resetValidation();
}

editButton.addEventListener('click', () => handleEditButtonClick());
addButton.addEventListener('click', () => handleAddButtonClick());
