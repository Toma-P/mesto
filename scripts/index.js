const editButton = document.querySelector('.profile__info-button');
const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');
const profileForm = popup.querySelector('.popup__form');
let username = profileForm.querySelector('.popup__form-item_type_username');
let about = profileForm.querySelector('.popup__form-item_type_about');

function toggleOpenPopup() {
  popup.classList.toggle('popup_opened');
}

function handleEditButtonClick() {
  toggleOpenPopup();
  username.value = document.querySelector('.profile__info-title').textContent;
  about.value = document.querySelector('.profile__info-subtitle').textContent;
  username.setAttribute('value', username.value);
  about.setAttribute('value', about.value); 
}

function handleOverlayClick(event) {
  if(event.target === event.currentTarget) {
    toggleOpenPopup();
  }
}

function handleEditProfile(event) {
  event.preventDefault();
  if(!username.value || !about.value) {
    toggleOpenPopup();
  }
  else {
    let editName = username.value;
    let editAbout = about.value;
    console.log(editName);
    username.setAttribute('value', editName);
    about.setAttribute('value', editAbout);
    document.querySelector('.profile__info-title').textContent = username.value;
    document.querySelector('.profile__info-subtitle').textContent = about.value;
    toggleOpenPopup();
  }
}

editButton.addEventListener('click', handleEditButtonClick);
closeButton.addEventListener('click', toggleOpenPopup);
popup.addEventListener('click', handleOverlayClick);
profileForm.addEventListener('submit', handleEditProfile);