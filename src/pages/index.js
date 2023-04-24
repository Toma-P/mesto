import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import {api} from '../components/Api.js';

const editButton = document.querySelector('.profile__info-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar-button');
const profileForm = document.querySelector('.popup_type_edit-profile').querySelector('.popup__form');
const addCardForm = document.querySelector('.popup_type_add-card').querySelector('.popup__form');
const avatarForm = document.querySelector('.popup_type_edit-avatar').querySelector('.popup__form');

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

const validateAvatarForm = new FormValidator(options, avatarForm);
validateAvatarForm.enableValidation();
validateAvatarForm.resetValidation();

const userInfo = new UserInfo({
  titleSelector: '.profile__info-title', 
  subtitleSelector: '.profile__info-subtitle', 
  avatarSelector: '.profile__avatar-img'
});

api.getUserInfo()
  .then((res) => {
  userInfo.setUserInfo(res);
  userInfo.setUserAvatar(res.avatar);  
  })
  .catch((error) => {console.log(error)});

const popupAvatar = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar', 
  callback: (data => {
    popupAvatar.startSavingData()
    api.editAvatar({link: data.link})
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        popupProfile.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        popupAvatar.endSavingData();
      })
  })
})

popupAvatar.setEventListeners();

const popupProfile = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile', 
  callback: (data) => {
    popupProfile.startSavingData();
    api.editUserInfo(data)
      .then(() => {
        userInfo.setUserInfo(data);
        popupProfile.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        popupAvatar.endSavingData();
      })
  }
});

popupProfile.setEventListeners();

const popupConfirmation = new PopupWithConfirmation('.popup_type_delete');
popupConfirmation.setEventListeners();

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

const cardItems = new Section(
  (item) => {
      const card = createNewCard(item);
      cardItems.addItem(card);
    }, 
  '.cards__grid'
);

api.getInitialCards()
  .then((cards) => cardItems.renderCards(cards))
  .catch((error) => {console.log(error)});

function handleDeleteCard(card) {
  popupConfirmation.open();
  popupConfirmation.submitPopup
  (() => {
      api.deleteCard(card.getId())
      .then(() => {
        card.remove();
      })
      .catch((error) => {
        console.log(error)
      });
    }
  );
}
  
function handleLike(card) {
  api.sendlikeCard(card.getId())
    .then((res) => {
      card.updateLikesCount(res);
    });
}

function handleDeleteLike(card) {
  api.deleteLike(card.getId())
    .then((res) => {
      card.updateLikesCount(res)
  });
}

function createNewCard(item) {
  const newCard = new Card(
    '.template__card',
    item, 
    userInfo._userId, 
    () => handleCardClick(item), 
    (card) => handleDeleteCard(card),
    (card) => handleLike(card),
    (card) => handleDeleteLike(card));
  const cardElement = newCard.render();
  return cardElement;
}

const popupCard = new PopupWithForm({
  popupSelector: '.popup_type_add-card', 
  callback: (data) => {
    popupCard.startSavingData()
    api.postNewCard(data)
      .then((res) => {
        cardItems.renderNewCard(res)
        popupCard.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        popupCard.endSavingData();
      })
  }
});

popupCard.setEventListeners();

function handleAddButtonClick() {
  popupCard.open();
  validateAddCardForm.resetValidation();
}

function handleAvatarButtonClick() {
  popupAvatar.open();
  validateAvatarForm.resetValidation();
}

editButton.addEventListener('click', () => handleEditButtonClick());
addButton.addEventListener('click', () => handleAddButtonClick());
avatarButton.addEventListener('click', () => handleAvatarButtonClick());
