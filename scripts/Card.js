export class Card {
  constructor(item, templateSelector, openImg) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
    this._handlerImageClick = openImg;
    this._getTemplate();
  }

  _getTemplate() {
    this._cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.gallery__item');
  }

  generateCard() {
    this._element = this._cardTemplate.cloneNode(true);;

    this._elementPhoto = this._element.querySelector('.gallery__photo');
    this._elementTitle = this._element.querySelector('.gallery__title');
    this._elementLike = this._element.querySelector('.gallery__like');
    this._elementDeleteButton = this._element.querySelector('.gallery__del');

    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
    this._elementTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }

  _handlerLikeClick() {
    this._elementLike.classList.toggle('gallery__like_active');
  }

  _handlerDeleteClick() {
    this._element.remove();
  }

  _setEventListeners() {
    this._elementPhoto.addEventListener("click", () => {
      this._handlerImageClick(this._name, this._link);
    });

    this._elementLike.addEventListener("click", () => {
      this._handlerLikeClick();
    });

    this._elementDeleteButton.addEventListener("click", () => {
      this._handlerDeleteClick();
    });
  }
}
