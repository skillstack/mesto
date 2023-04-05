export default class Section {
  constructor (renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderCards(listOfCards) {
    listOfCards.forEach(cardInfo => {
      this._renderer(cardInfo);
    });
  }

  addNewCard(newCard) {
    this._container.prepend(newCard);
  }
}
