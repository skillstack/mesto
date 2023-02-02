export class FormValidator {
  constructor(validationConfig, popupForm) {
    this._config = validationConfig;
    this._popupForm = popupForm;
    this._inputList = Array.from(this._popupForm.querySelectorAll(this._config.inputSelector));
    this._buttonElement = this._popupForm.querySelector(this._config.submitButtonSelector);
  }

  _showInputError(inputElement) {
    this._errorElement = this._popupForm.querySelector(`.${inputElement.id}-error`);
    this._errorElement.classList.add(this._config.errorClass);
    this._errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._popupForm.querySelector(`.${inputElement.id}-error`);
    this._errorElement.classList.remove(this._config.errorClass);
    this._errorElement.textContent = '';
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    };
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
      this._buttonElement.disabled = false;
    };
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }
}
