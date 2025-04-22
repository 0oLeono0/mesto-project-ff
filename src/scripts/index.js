import "../pages/index.css";
import { initialCards } from "./cards";

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

// Создание карточки
function createCardElement({ name, link }, template) {
  const cardElement = template.querySelector(".card").cloneNode(true);
  const imageEl = cardElement.querySelector(".card__image");
  cardElement.querySelector(".card__title").textContent = name;
  imageEl.src = link;
  imageEl.alt = name;
  return cardElement;
}

// Удаление карточки
function removeCard(cardEl) {
  cardEl.remove();
}

// Лайк
function toggleLike(buttonEl) {
  buttonEl.classList.toggle("card__like-button_is-active");
}

// Открытие попапа изображения
function openImagePopup(imgEl, cardEl) {
  const popupImg = popupImage.querySelector(".popup__image");
  const popupCaption = popupImage.querySelector(".popup__caption");

  popupImg.src = imgEl.src;
  popupImg.alt = imgEl.alt;
  popupCaption.textContent = cardEl.querySelector(".card__title").textContent;

  openPopup(popupImage);
}

// Колбэки карточки
function setCardEventListeners(cardElement, { onDelete, onLike, onPreview }) {
  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => onDelete(cardElement));

  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", () => onLike(likeBtn));

  const imgEl = cardElement.querySelector(".card__image");
  imgEl.addEventListener("click", () => onPreview(imgEl, cardElement));
}

// Создание карточки с функционалом
function createCard(data, template) {
  const cardEl = createCardElement(data, template);
  setCardEventListeners(cardEl, {
    onDelete: removeCard,
    onLike: toggleLike,
    onPreview: openImagePopup,
  });
  return cardEl;
}

// Рендер карточек на страницу
function renderInitialCards(cards, container, template) {
  cards.forEach(cardData => {
    container.append(createCard(cardData, template));
  });
}

// Открытие попапа
function openPopup(popupEl) {
  popupEl.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

// Закрытие попапа
function closePopup(popupEl) {
  popupEl.classList.remove("popup_is-opened");
}

// Закрытие всех попапов
function closeAllPopups() {
  popups.forEach(popup => popup.classList.remove("popup_is-opened"));
  document.removeEventListener("keydown", handleEscClose);
}

// Закрытие по ESC
function handleEscClose(evt) {
  if (evt.key === "Escape") closeAllPopups();
}

// Крестик
closeBtns.forEach(btn => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closePopup(popup));
});

// Оверлей
popups.forEach(popup => {
  popup.addEventListener("click", evt => {
    if (evt.target === popup) closePopup(popup);
  });
});

// Редактирование профиля
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
}

// Обработка сабмита
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closeAllPopups();
}

editBtn.addEventListener("click", () => {
  fillProfileForm();
  openPopup(popupEdit);
});
formElement.addEventListener("submit", handleEditProfileSubmit);

// Создание новой карточки
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = cardFormElement.elements["place-name"].value;
  const link = cardFormElement.elements.link.value;
  placesList.prepend(createCard({ name, link }, cardTemplate));
  cardFormElement.reset();
  closeAllPopups();
}

addBtn.addEventListener("click", () => openPopup(popupAdd));
cardFormElement.addEventListener("submit", handleAddCardSubmit);

renderInitialCards(initialCards, placesList, cardTemplate);
