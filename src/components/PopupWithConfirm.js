import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._confirmButton = this._popup.querySelector('.popup__save-button');
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmButton.addEventListener('click', () => {
      this._handleFormSubmit(this._cardId, this._card);
      super.close();
    })
  }

  open(cardId, card) {
    super.open();
    this._cardId = cardId;
    this._card = card;
  }
}
