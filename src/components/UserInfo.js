export default class UserInfo {
  constructor({avatarSelector, nameSelector, infoSelector }) {
    this._avatar = document.querySelector(avatarSelector);
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    };
  }

  setUserInfo(formData) {
    this._avatar.src = formData.avatar;
    this._name.textContent = formData.name;
    this._about.textContent = formData.about;
    this._userId = formData._id;
  }

  getUserId() {
    return this._userId;
  }
}
