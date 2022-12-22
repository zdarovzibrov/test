import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
const cardsList = [
  {
    name: "Карачаевск",
    link: "https://i.yapx.ru/U0FjC.jpg",
  },
  {
    name: "Гора Эльбрус",
    link: "https://i.yapx.ru/U0Fi4.jpg",
  },
  {
    name: "Домбай",
    link: "https://i.yapx.ru/U0Fiq.jpg",
  },
  {
    name: "Гора Эльбрус",
    link: "https://i.yapx.ru/U0Fi7.jpg",
  },
  {
    name: "Домбай",
    link: "https://i.yapx.ru/U0Fiy.jpg",
  },
  {
    name: "Карачаево-Черкессия",
    link: "https://i.yapx.ru/U0FjB.jpg",
  },
];

const btnAddCard = document.querySelector(".profile__add-button");
const btnProfileEdit = document.querySelector(".profile__edit-button");
const popupsElements = document.querySelectorAll(".popup");
const editProfile = document.querySelector(".popup_type_profile-info");
export const imagePreview = document.querySelector(".popup_type_image-preview");
const workInput = document.querySelector(".form__input_user_work");
const nameInput = document.querySelector(".form__input_user_name");
const addWorkText = document.querySelector(".profile__work");
const addNameText = document.querySelector(".profile__name");
const formProfile = document.querySelector(".form_type_profile");
const addElem = document.querySelector(".popup_type_add-card");
const newElementForm = document.querySelector(".form_type_new-card");
const elementsContainer = document.querySelector(".card__items");
const cardName = document.querySelector(".form__input_card_name");
const cardLink = document.querySelector(".form__input_card_link");
const tegTemplate = document.querySelector("#card-template").content;
export const cardTemplate = tegTemplate.querySelector(".card__item");
export const popupImage = document.querySelector(".popup__image");
export const popupImageTitle = document.querySelector(
  ".popup__image-description"
);

const cardParams = {
  imgCardElement: ".card__image",
  titleCardText: ".card__title",
  likeBtn: ".card__button-likes",
  deleteBtn: ".card__button-delete",
  activeBtn: ".card__button-likes_active",
};

const selectValidation = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inputErrorClass: "form__input_message_error",
  errorClass: "form__input-error_enable",
};

function closePopupPressEsc(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}

export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closePopupPressEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePopupPressEsc);
}

function handleChangeUserProfileInfo(evt) {
  evt.preventDefault();
  addNameText.textContent = nameInput.value;
  addWorkText.textContent = workInput.value;

  closePopup(editProfile);
}

function addFormProfileData() {
  nameInput.value = addNameText.textContent;
  workInput.value = addWorkText.textContent;
}

function renderCard(card) {
  const plusNewCard = new Card(card, cardParams);
  elementsContainer.prepend(plusNewCard.createCard());
}

function renderCardsList() {
  cardsList.forEach(renderCard);
}

renderCardsList();

function handleAddNewElement(evt) {
  evt.preventDefault();

  const card = { name: cardName.value, link: cardLink.value };
  renderCard(card);

  newElementForm.reset();
  closePopup(addElem);
}

popupsElements.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup__close-button") ||
      evt.target.classList.contains("popup_opened")
    ) {
      closePopup(popup);
    }
  });
});

btnProfileEdit.addEventListener("click", () => {
  addFormProfileData();
  openPopup(editProfile);
});

btnAddCard.addEventListener("click", () => {
  openPopup(addElem);
});

newElementForm.addEventListener("submit", handleAddNewElement);
formProfile.addEventListener("submit", handleChangeUserProfileInfo);

const profileFormValidator = new FormValidator(selectValidation, formProfile);
profileFormValidator.enableValidation();

const placeFormValidator = new FormValidator(selectValidation, newElementForm);
placeFormValidator.enableValidation();
