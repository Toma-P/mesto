import Card from './card.js';
import FormValidator from './formValidator.js';
const editButton = document.querySelector('.profile__info-button');
const addButton = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_open-image');
const closeButtons = document.querySelectorAll('.popup__close-button');
const setPopups = document.querySelectorAll('.popup');
const profileForm = popupProfile.querySelector('.popup__form');
const addCardForm = popupAddCard.querySelector('.popup__form');
const submitButton = addCardForm.querySelector('.popup__form-submit');
const username = profileForm.querySelector('.popup__form-item_type_username');
const about = profileForm.querySelector('.popup__form-item_type_about');
const profileName = document.querySelector('.profile__info-title');
const profileAbout = document.querySelector('.profile__info-subtitle');
const cardName = addCardForm.querySelector('.popup__form-item_type_name');
const cardLink = addCardForm.querySelector('.popup__form-item_type_link');
const largeImage = popupImage.querySelector('.popup__image');
const imageCaption = popupImage.querySelector('.popup__caption');
const cardsList = document.querySelector('.cards__grid');

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

const disabledButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.disabled = 'true';
  buttonElement.classList.add(inactiveButtonClass);
}
const enabledButton = (buttonElement, inactiveButtonClass) => {
  buttonElement.disabled = '';
  buttonElement.classList.remove(inactiveButtonClass);
}

const validateProfileForm = new FormValidator(options, profileForm, disabledButton, enabledButton);
validateProfileForm.enableValidation();

const validateAddCardForm = new FormValidator(options, addCardForm, disabledButton, enabledButton);
validateAddCardForm.enableValidation();

const openLargeImage = (item) => {
  largeImage.src = item.link;
  largeImage.alt = item.name;
  imageCaption.textContent = item.name;
  openPopup(popupImage);
}

function handleEscapeClick(event) {
  if(event.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

const resetForm = (popup) => {
  const formElement = popup.querySelector('.popup__form');
  formElement.reset();
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handleEscapeClick);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handleEscapeClick);
}

initialCards.forEach((item) => {
  const newCard = new Card(item, cardsList, openLargeImage);
  newCard.render();
})

function handleEditButtonClick(popup) {
  openPopup(popup);
  validateProfileForm.resetErrorInputs()
  resetForm(popup);
  username.value = profileName.textContent;
  about.value = profileAbout.textContent;
}

function handleEditProfile(event, popup) {
  event.preventDefault();
  profileName.textContent = username.value;
  profileAbout.textContent = about.value;
  closePopup(popup);
}

function handleAddButtonClick(popup, submitButton, options) {
  openPopup(popup);
  validateAddCardForm.resetErrorInputs();
  disabledButton(submitButton, options.inactiveButtonClass);
  resetForm(popup);
}

function handleAddCard(event, popup) {
  event.preventDefault();
  const newGridItem = {
    name: cardName.value,
    link: cardLink.value
  }
  const addCardElement = new Card(newGridItem, cardsList, openPopup);
  addCardElement.render();
  closePopup(popup);
}

function handleOverlayClick(event, popup) { 
  if(event.target === event.currentTarget) { 
    closePopup(popup);
  } 
} 

closeButtons.forEach((item) => {
  item.addEventListener('click', () => closePopup(item.closest('.popup')));
});

setPopups.forEach((popup) => {
  popup.addEventListener('click', (event) => handleOverlayClick(event, popup));
});

editButton.addEventListener('click', () => handleEditButtonClick(popupProfile));
profileForm.addEventListener('submit', (event) => handleEditProfile(event, popupProfile));
addButton.addEventListener('click', () => handleAddButtonClick(popupAddCard, submitButton, options));
addCardForm.addEventListener('submit', (event) => handleAddCard(event, popupAddCard));