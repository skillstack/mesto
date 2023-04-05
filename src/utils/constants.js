export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

export const profileInfo = {
  avatarSelector: '.profile__photo',
  nameSelector: '.profile__title',
  infoSelector: '.profile__subtitle'
};

export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-62',
  headers: {
    'Content-Type': 'application/json',
    Authorization: '125408be-5dc1-412d-9828-ab11ebb03270'
  }
}

export const popupFormAvatar = document.querySelector('.popup_type_avatar').querySelector('.popup__form');
export const popupFormProfile = document.querySelector('.popup_type_profile').querySelector('.popup__form');
export const inputName = popupFormProfile.querySelector('.popup__input_type_name');
export const inputAbout = popupFormProfile.querySelector('.popup__input_type_about');
export const popupFormCard = document.querySelector('.popup_type_card').querySelector('.popup__form');
export const profileEditButton = document.querySelector('.profile__edit-button');
export const cardAddButton = document.querySelector('.profile__add-button');
export const avatarEditButton = document.querySelector('.profile__edit-img-button');
export const loadingText = 'Сохранение...';
