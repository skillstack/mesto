import './index.css';

import Api from "../components/Api.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from '../components/PopupWithConfirm.js';
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import {
  validationConfig,
  profileInfo,
  popupFormAvatar,
  popupFormProfile,
  inputName,
  inputAbout,
  popupFormCard,
  profileEditButton,
  cardAddButton,
  avatarEditButton,
  loadingText,
  apiConfig
} from "../utils/constants.js";

const profileFormValidator = new FormValidator(validationConfig, popupFormProfile);
const cardFormValidator = new FormValidator(validationConfig, popupFormCard);
const avatarFormValidator = new FormValidator(validationConfig, popupFormAvatar);
const userInfo = new UserInfo(profileInfo);
const popupWithImage = new PopupWithImage('.popup_type_img');
const api = new Api(apiConfig);

function hendleAvatarButton() {
  avatarFormValidator.resetValidation();
  popupChangeAvatar.open();
};

function hendleEditProfileButton() {
  profileFormValidator.resetValidation();
  const info = userInfo.getUserInfo();
  inputName.value = info.name;
  inputAbout.value = info.about;
  popupEditProfile.open();
};

function hendleAddCardButton() {
  cardFormValidator.resetValidation();
  popupNewCard.open();
};

function handleCardClick(name, link) {
  popupWithImage.open(name, link);
}

function handleDeleteButtonClick(cardId, card) {
  popupConfirmDeleteCard.open(cardId, card);
}

function displayLoadingText(popupButton, text) {
  popupButton.textContent = text;
}

function createCard(cardInfo) {
  const userId = userInfo.getUserId();
  const card = new Card(cardInfo, '#cardTemplate', handleCardClick, handleDeleteButtonClick,
    (isLiked, cardId) => {
      if (isLiked) {
        api.removeCardLike(cardId)
          .then((cardInfo) => {
            card.setLikes(cardInfo.likes)
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
      } else {
        api.setCardLike(cardId)
          .then((cardInfo) => {
            card.setLikes(cardInfo.likes)
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          })
      }
    }, userId);
  return card.generateCard();
};

const cardsGallery = new Section(
  (cardInfo) => {
    const newCard = createCard(cardInfo);
    cardsGallery.addNewCard(newCard);
  },
  '.gallery'
);

Promise.all([api.getUserInfo(), api.getInitialCard()])
  .then(([userData, listOfCards]) => {
    userInfo.setUserInfo(userData);
    cardsGallery.renderCards(listOfCards.reverse());
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })

const popupNewCard = new PopupWithForm({
  popupSelector: '.popup_type_card',
  handleFormSubmit: (cardInfo, popupButton) => {
    const initialButtonText = popupButton.textContent;
    displayLoadingText(popupButton, loadingText);
    api.postNewCard(cardInfo)
      .then((cardInfo) => {
        cardsGallery.renderCards([cardInfo]);
      })
      .then(() => {
        popupNewCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        displayLoadingText(popupButton, initialButtonText);
      })
  }
})

const popupConfirmDeleteCard = new PopupWithConfirm({
  popupSelector: '.popup_type_confirm',
  handleFormSubmit: (cardId, card) => {
    api.deleteCard(cardId)
      .then(() => {
        card.remove();
      })
      .then(() => {
        popupConfirmDeleteCard.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }
})

const popupChangeAvatar = new PopupWithForm({
  popupSelector: '.popup_type_avatar',
  handleFormSubmit: (formData, popupButton) => {
    const initialButtonText = popupButton.textContent;
    displayLoadingText(popupButton, loadingText);
    api.updateAvatar(formData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
      })
      .then(() => {
        popupChangeAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        displayLoadingText(popupButton, initialButtonText);
      })
  }
})

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handleFormSubmit: (formData, popupButton) => {
    const initialButtonText = popupButton.textContent;
    displayLoadingText(popupButton, loadingText);
    api.setUserInfo(formData)
      .then((userData) => {
        userInfo.setUserInfo(userData);
      })
      .then(() => {
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        displayLoadingText(popupButton, initialButtonText);
      })
  }
})

profileEditButton.addEventListener('click', hendleEditProfileButton);
cardAddButton.addEventListener('click', hendleAddCardButton);
avatarEditButton.addEventListener('click', hendleAvatarButton);

popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupNewCard.setEventListeners();
popupChangeAvatar.setEventListeners();
popupConfirmDeleteCard.setEventListeners();

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();
