export default class Card {
  constructor(cardInfo, templateSelector, handleCardClick, handleDeleteButtonClick, handleLikeClick, userId) {
    this._name = cardInfo.name;
    this._link = cardInfo.link;
    this._likes = cardInfo.likes;
    this._cardId = cardInfo._id;
    this._ownerId = cardInfo.owner._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeClick = handleLikeClick;
    this._userId = userId;
    this._getTemplate();
  }

  _getTemplate() {
    this._cardTemplate = document.querySelector(this._templateSelector).content.querySelector('.gallery__item');
  }

  generateCard() {
    this._card = this._cardTemplate.cloneNode(true);;

    this._cardPhoto = this._card.querySelector('.gallery__photo');
    this._cardTitle = this._card.querySelector('.gallery__title');
    this._cardLike = this._card.querySelector('.gallery__like');
    this._cardDeleteButton = this._card.querySelector('.gallery__del');
    this._cardLikeCounter = this._card.querySelector('.gallery__like-counter')

    this._cardPhoto.src = this._link;
    this._cardPhoto.alt = this._name;
    this._cardTitle.textContent = this._name;

    this.setLikes(this._likes);
    this._toggleLikeStatus();
    this._hideCardDeleteButton();
    this._setEventListeners();

    return this._card;
  }

  setLikes(arrayOfLikes) {
    this._cardLikeCounter.textContent = arrayOfLikes.length;
    this._likes = arrayOfLikes;
    this._toggleLikeStatus();
  }

  _isLiked() {
    return this._likes.find((like) => {
      return like._id === this._userId;
    });
  }

  _toggleLikeStatus() {
    if (this._isLiked()) {
      this._cardLike.classList.add('gallery__like_active');
    } else {
      this._cardLike.classList.remove('gallery__like_active');
    }
  }

  _hideCardDeleteButton() {
    if (this._userId !== this._ownerId) {
      this._cardDeleteButton.remove();
    }
  }

  _setEventListeners() {
    this._cardPhoto.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._cardLike.addEventListener("click", () => {
      this._handleLikeClick(this._isLiked(), this._cardId);
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteButtonClick(this._cardId, this._card);
    });
  }
}
