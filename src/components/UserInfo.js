export default class UserInfo {
  constructor({titleSelector, subtitleSelector, avatarSelector}) {
    this._profileName = document.querySelector(titleSelector);
    this._profileAbout = document.querySelector(subtitleSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {name: this._profileName.textContent, about: this._profileAbout.textContent};
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
    this._userId = data._id;
    return this._userId;
  }
  setUserAvatar(link) {
    this._profileAvatar.src = link;
  }

  getUserId() {
    return this._userId;
  }
}