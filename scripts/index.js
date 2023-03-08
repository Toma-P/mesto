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
const template = document.querySelector('.template__card');

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

const getNewCard = (item) => {
  const newCard = template.content.cloneNode(true);
  const newCardTitle = newCard.querySelector('.card__title');
  const newCardImage = newCard.querySelector('.card__image');
  const likeButton = newCard.querySelector('.card__like-button');
  const deleteButton = newCard.querySelector('.card__delete-button'); 
  newCardTitle.textContent = item.name;
  newCardImage.src = item.link;
  newCardImage.alt = item.name;
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_active');
  });
  deleteButton.addEventListener('click', () => {
    deleteButton.closest('.card').remove();
  });
  newCardImage.addEventListener('click', () => {
    largeImage.src = item.link;
    largeImage.alt = item.name;
    imageCaption.textContent = item.name;
    openPopup(popupImage);
  });
  return newCard;
}

const addCard = (list, item) => {
  list.prepend(getNewCard(item));
}

initialCards.forEach((item) => {
  addCard(cardsList, item);
})

function handleEditButtonClick(popup) {
  openPopup(popup);
  removeValidationErrors(popup);
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
  removeValidationErrors(popup);
  disabledButton(submitButton, options);
  resetForm(popup);
}
function handleAddCard(event, popup) {
  event.preventDefault();
  const newGridItem = {
    name: cardName.value,
    link: cardLink.value
  }
  addCard(cardsList, newGridItem);
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

enableValidation(options);

editButton.addEventListener('click', () => handleEditButtonClick(popupProfile));
profileForm.addEventListener('submit', (event) => handleEditProfile(event, popupProfile));
addButton.addEventListener('click', () => handleAddButtonClick(popupAddCard, submitButton, options));
addCardForm.addEventListener('submit', (event) => handleAddCard(event, popupAddCard));