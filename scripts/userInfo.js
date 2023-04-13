export default class UserInfo {
  constructor({titleSelector, subtitleSelector}) {
    this._profileName = document.querySelector(titleSelector);
    this._profileAbout = document.querySelector(subtitleSelector);
  }

  getUserInfo() {
    return {username: this._profileName.textContent, about: this._profileAbout.textContent};
  }

  setUserInfo({username, about}) {
    this._profileName.textContent = username;
    this._profileAbout.textContent = about;
  }
}