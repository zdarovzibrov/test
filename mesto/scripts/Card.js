//Использую директиву импорта из index.js
import {
  openPopup,
  imagePreview,
  cardTemplate,
  popupImage,
  popupImageTitle,
} from "./index.js";

export default class Card {
  constructor(data, selector) {
    this._name = data.name;
    this._link = data.link;
    this._title = selector.titleCardText;
    this._img = selector.imgCardElement;
    this._likeBtn = selector.likeBtn;
    this._deleteBtn = selector.deleteBtn;
    this._activeBtn = selector.activeBtn;
  }
  //Генерирую карточку методом _createTemplate
  _createTemplate() {
    const card = cardTemplate.cloneNode(true);
    return card;
  }
//Добавление данных методом _setData
  _setData() {
    const title = this._cardElement.querySelector(this._title);
    const img = this._cardElement.querySelector(this._img);
    title.textContent = this._name;
    img.src = this._link;
    img.alt = this._name;
  }
//Подключаю переключение активной Like методом _toggleCardActive
  _toggleCardActive() {
    this._cardElement
      .querySelector(this._likeBtn)
      .classList.toggle("card__button-likes_active");
  }
// Удаление карточки методом _deleteCard
  _deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
//Метод просмотра карточки _previewImg
  _previewImg(link, name) {
    popupImage.src = link;
    popupImageTitle.textContent = name;
    popupImage.alt = name;
    openPopup(imagePreview);
  }
//Добавляю слушателей событий методом _setListeners
  _setListener() {
    this._cardElement
      .querySelector(this._likeBtn)
      .addEventListener("click", () => this._toggleCardActive());
    this._cardElement
      .querySelector(this._deleteBtn)
      .addEventListener("click", () => this._deleteCard());
    this._cardElement
      .querySelector(this._img)
      .addEventListener("click", () =>
        this._previewImg(this._link, this._name)
      );
  }
//Метод создание карточки createCard из шаблона
  createCard() {
    this._cardElement = this._createTemplate();
    this._setData();
    this._setListener();
    return this._cardElement;
  }
}
