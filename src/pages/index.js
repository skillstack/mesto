import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import {
  initialCards,
  validationConfig,
  profileInfo,
  popupFormProfile,
  inputName,
  inputAbout,
  popupFormCard,
  profileEditButton,
  cardAddButton,
} from "../utils/constants.js";

const profileFormValidator = new FormValidator(validationConfig, popupFormProfile);
const cardFormValidator = new FormValidator(validationConfig, popupFormCard);
const userInfo = new UserInfo(profileInfo);
const popupWithImage = new PopupWithImage('.popup_type_img');

profileEditButton.addEventListener('click', () => {
  profileFormValidator.resetValidation();
  const info = userInfo.getUserInfo();
  inputName.value = info.name;
  inputAbout.value = info.about;
  popupEditProfile.open();
});

cardAddButton.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  popupNewCard.open();
});

const popupEditProfile = new PopupWithForm({
  popupSelector: '.popup_type_profile',
  handlerFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
  }
})

const popupNewCard = new PopupWithForm({
  popupSelector: '.popup_type_card',
  handlerFormSubmit: (formData) => {
    const card = new Card(formData, '#cardTemplate', () => { popupWithImage.open(formData.name, formData.link) });
    const cardElement = card.generateCard();
    cardList.addElement(cardElement);
  }
})

const cardList = new Section({
  items: initialCards.reverse(),
  renderer: (element) => {
    const card = new Card(element, '#cardTemplate', () => { popupWithImage.open(element.name, element.link) });
    const cardElement = card.generateCard();
    cardList.addElement(cardElement);
  }
}, '.gallery');

cardList.renderElement();

popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupNewCard.setEventListeners();

profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
