import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, removeCard, toggleLike } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validate.js";
import { getUser } from "./api.js";

const validateConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input-type-error",
  errorClass: "popup__input-error-active",
};

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popups = document.querySelectorAll(".popup");
const closeBtns = document.querySelectorAll(".popup__close");

const editFormElement = document.forms["edit-profile"];
const nameInput = editFormElement.elements.name;
const jobInput = editFormElement.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

const cardFormElement = document.forms["new-place"];

// Открытие попапа с изображением
const openImagePopup = (imgEl, cardEl) => {
  const popupImg = popupImage.querySelector(".popup__image");
  const popupCaption = popupImage.querySelector(".popup__caption");
  popupImg.src = imgEl.src;
  popupImg.alt = imgEl.alt;
  popupCaption.textContent = cardEl.querySelector(".card__title").textContent;
  openModal(popupImage);
};

// Рендер стартовых карточек
const renderInitialCards = () => {
  initialCards.forEach((data) => {
    const cardEl = createCard(data, cardTemplate, {
      onDelete: removeCard,
      onLike: toggleLike,
      onPreview: openImagePopup,
    });
    placesList.append(cardEl);
  });
};

// Закрытие попапа по крестику и оверлею
closeBtns.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closeModal(popup));
});
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) closeModal(popup);
  });
});

// Заполнение формы профиля текущими данными
const fillProfileForm = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
};

// Обработка отправки формы редактирования профиля
const handleEditSubmit = (evt) => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closeModal(popupEdit);
};

enableValidation(validateConfig);

editBtn.addEventListener("click", () => {
  clearValidation(editFormElement, validateConfig);
  fillProfileForm();
  openModal(popupEdit);
});
editFormElement.addEventListener("submit", handleEditSubmit);

// Обработка отправки формы добавления карточки
const handleAddSubmit = (evt) => {
  evt.preventDefault();
  const name = cardFormElement.elements["place-name"].value;
  const link = cardFormElement.elements.link.value;
  const newCard = createCard({ name, link }, cardTemplate, {
    onDelete: removeCard,
    onLike: toggleLike,
    onPreview: openImagePopup,
  });
  placesList.prepend(newCard);
  closeModal(popupAdd);
};

addBtn.addEventListener("click", () => {
  cardFormElement.reset();
  clearValidation(cardFormElement, validateConfig);
  openModal(popupAdd);
});
cardFormElement.addEventListener("submit", handleAddSubmit);

const initializeUser = () => {
  getUser()
    .then((user) => {
      profileTitle.textContent = user.name;
      profileDesc.textContent = user.about;
      profileAvatar.style.backgroundImage = `url(${user.avatar})`;
    })
    .catch((err) => {
      console.error(err);
    });
};

initializeUser();
renderInitialCards();
