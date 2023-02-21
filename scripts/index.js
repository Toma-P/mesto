const editButton = document.querySelector('.profile__info-button');
const addButton = document.querySelector('.profile__add-button');
const popupProfile = document.querySelector('.popup_type_edit-profile');
const popupAddCard = document.querySelector('.popup_type_add-card');
const popupImage = document.querySelector('.popup_type_open-image');
const closeButtons = document.querySelectorAll('.popup__close-button');
const profileForm = popupProfile.querySelector('.popup__form');
const addCardForm = popupAddCard.querySelector('.popup__form');
let username = profileForm.querySelector('.popup__form-item_type_username');
let about = profileForm.querySelector('.popup__form-item_type_about');
let profileName = document.querySelector('.profile__info-title');
let profileAbout = document.querySelector('.profile__info-subtitle');
let cardName = addCardForm.querySelector('.popup__form-item_type_name');
let cardLink = addCardForm.querySelector('.popup__form-item_type_link');
let largeImage = popupImage.querySelector('.popup__image');
let imageCaption = popupImage.querySelector('.popup__caption');


const initialCars = [
  {
    name: 'Териберка',
    link: './images/card-teriberka.jpg'
  },
  {
    name: 'Калининград',
    link: './images/card-kaliningrad.jpg'
  },
  {
    name: 'Светлогорск',
    link: './images/card-svetlogorsk1.jpg'
  },
  {
    name: 'Мержаново',
    link: './images/card-merjanovo.jpg'
  },
  {
    name: 'Архыз',
    link: './images/card-arkhiz.jpg'
  },
  {
    name: 'Красная Поляна',
    link: './images/card-polyana.jpg'
  }
];
const cardsList = document.querySelector('.cards__grid');
const template = document.querySelector('.template__card');
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
    imageCaption.textContent = item.name;
    popupImage.classList.add('popup_opened');
  });
  return newCard;
}

const addCard = (list, item) => {
  list.prepend(getNewCard(item));
}

initialCars.forEach((item) => {
  addCard(cardsList, item);
})


function toggleOpenPopup(popup) {
  popup.classList.toggle('popup_opened');
}

function handleEditButtonClick(popup) {
  toggleOpenPopup(popup);
  username.value = profileName.textContent;
  about.value = profileAbout.textContent;
}


function handleEditProfile(event, popup) {
  event.preventDefault();
  profileName.textContent = username.value;
  profileAbout.textContent = about.value;
  toggleOpenPopup(popup);
}
function handleAddCard(event, popup) {
  event.preventDefault();
  const newGridItem = {
    name: cardName.value,
    link: cardLink.value
  }
  addCard(cardsList, newGridItem);
  toggleOpenPopup(popup);
}

closeButtons.forEach((item) => {
  item.addEventListener('click', () => toggleOpenPopup(item.closest('.popup')));
})

editButton.addEventListener('click', () => handleEditButtonClick(popupProfile));
profileForm.addEventListener('submit', (event) => handleEditProfile(event, popupProfile));
addButton.addEventListener('click', () => toggleOpenPopup(popupAddCard));
addCardForm.addEventListener('submit', (event) => handleAddCard(event, popupAddCard));

