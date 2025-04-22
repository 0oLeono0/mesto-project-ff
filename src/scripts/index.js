import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, removeCard, toggleLike } from "./card.js";
import { openModal, closeModal } from "./modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popups = document.querySelectorAll(".popup");
const closeBtns = document.querySelectorAll(".popup__close");

const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

const cardFormElement = document.forms["new-place"];

function openImagePopup(imgEl, cardEl) {
  const popupImg = popupImage.querySelector(".popup__image");
  const popupCaption = popupImage.querySelector(".popup__caption");
  popupImg.src = imgEl.src;
  popupImg.alt = imgEl.alt;
  popupCaption.textContent = cardEl.querySelector(".card__title").textContent;
  openModal(popupImage);
}

function renderInitialCards() {
  initialCards.forEach((data) => {
    const cardEl = createCard(data, cardTemplate, {
      onDelete: removeCard,
      onLike: toggleLike,
      onPreview: openImagePopup,
    });
    placesList.append(cardEl);
  });
}

// Закрытие попапа на крестик и оверлей
closeBtns.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closeModal(popup));
});
popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target === popup) closeModal(popup);
  });
});

// Редактирование профиля
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
}
function handleEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closeModal(popupEdit);
}

editBtn.addEventListener("click", () => {
  fillProfileForm();
  openModal(popupEdit);
});
formElement.addEventListener("submit", handleEditSubmit);

// Добавление новой карточки
function handleAddSubmit(evt) {
  evt.preventDefault();
  const name = cardFormElement.elements["place-name"].value;
  const link = cardFormElement.elements.link.value;
  const newCard = createCard({ name, link }, cardTemplate, {
    onDelete: removeCard,
    onLike: toggleLike,
    onPreview: openImagePopup,
  });
  placesList.prepend(newCard);
  cardFormElement.reset();
  closeModal(popupAdd);
}

addBtn.addEventListener("click", () => openModal(popupAdd));
cardFormElement.addEventListener("submit", handleAddSubmit);

renderInitialCards();
