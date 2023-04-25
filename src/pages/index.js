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

const validateAddCardForm = new FormValidator(options, addCardForm);
validateAddCardForm.enableValidation();

const validateAvatarForm = new FormValidator(options, avatarForm);
validateAvatarForm.enableValidation();

const userInfo = new UserInfo({
  titleSelector: '.profile__info-title', 
  subtitleSelector: '.profile__info-subtitle', 
  avatarSelector: '.profile__avatar-img'
});

Promise.all([api.getUserInfo(), api.getInitialCards()]) 
.then(([userInfoData, initialCardsData]) =>
{
   userInfo.setUserInfo(userInfoData);
   userInfo.setUserAvatar(userInfoData.avatar); 
   cardItems.renderCards(initialCardsData.reverse());
}) 
.catch((err) => 
{             
console.log("Ошибка страницы:", err);
}) 

const popupAvatar = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar', 
  callback: (data => {
    popupAvatar.startSavingData()
    api.editAvatar({link: data.link})
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
        popupAvatar.close();
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
      .then((res) => {
        userInfo.setUserInfo(res);
        popupProfile.close();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        popupProfile.endSavingData();
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



function handleDeleteCard(card) {
  popupConfirmation.open();
  popupConfirmation.submitPopup
  (() => {
      api.deleteCard(card.getId())
      .then(() => {
        card.removeItem();
        popupConfirmation.close();
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
      card.toggleLikeIcon();
    });
}

function handleDeleteLike(card) {
  api.deleteLike(card.getId())
    .then((res) => {
      card.updateLikesCount(res);
      card.toggleLikeIcon();
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
