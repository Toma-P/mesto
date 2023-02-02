const editButton = document.querySelector('.profile__info-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const profileForm = popup.querySelector('.popup__form');
let username = profileForm.querySelector('.popup__form-item_type_username');
let about = profileForm.querySelector('.popup__form-item_type_about');
let profileName = document.querySelector('.profile__info-title');
let profileAbout = document.querySelector('.profile__info-subtitle');

function toggleOpenPopup() {
  popup.classList.toggle('popup_opened');
}

function handleEditButtonClick() {
  toggleOpenPopup();
  username.value = profileName.textContent;
  about.value = profileAbout.textContent;
}

//function handleOverlayClick(event) {
//  if(event.target === event.currentTarget) {
//    toggleOpenPopup();
//  }
//}

function handleEditProfile(event) {
  event.preventDefault();
  profileName.textContent = username.value;
  profileAbout.textContent = about.value;
  toggleOpenPopup();
}

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', toggleOpenPopup);
profileForm.addEventListener('submit', handleEditProfile);
//popup.addEventListener('click', handleOverlayClick);