export default class Section {
  constructor ({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderElement() {
    this._items.forEach(element => {
      this._renderer(element);
    });
  }

  addElement(element) {
    this._container.prepend(element);
  }
}
