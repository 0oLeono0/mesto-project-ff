import "../pages/index.css";
import { createCard, removeCard, toggleLike } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validate.js";
import { getUser, getCards, editProfile, postCard } from "./api.js";

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

let currentUserId = null;

// Открытие попапа с изображением
function openImagePopup(imgEl, cardEl) {
  const popupImg = popupImage.querySelector(".popup__image");
  const popupCaption = popupImage.querySelector(".popup__caption");
  popupImg.src = imgEl.src;
  popupImg.alt = imgEl.alt;
  popupCaption.textContent = cardEl.querySelector(".card__title").textContent;
  openModal(popupImage);
}

// Универсальная функция добавления карточки в список
function addCardToList(cardData, userId, prepend = false) {
  const cardEl = createCard(
    cardData,
    cardTemplate,
    {
      onDelete: removeCard,
      onLike: toggleLike,
      onPreview: openImagePopup,
    },
    userId
  );
  if (prepend) {
    placesList.prepend(cardEl);
  } else {
    placesList.append(cardEl);
  }
}

// Закрытие попапа по клику на крестик или оверлей
closeBtns.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closeModal(popup));
});
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === popup) closeModal(popup);
  });
});

// Заполнение формы редактирования профиля текущими данными
function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDesc.textContent;
}

// Обработчик отправки формы редактирования профиля
function handleEditSubmit(evt) {
  evt.preventDefault();

  const saveButton = editFormElement.querySelector(
    validateConfig.submitButtonSelector
  );
  const originalText = saveButton.textContent;
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;

  const newData = {
    name: nameInput.value,
    about: jobInput.value,
  };

  editProfile(newData)
    .then((updatedUser) => {
      profileTitle.textContent = updatedUser.name;
      profileDesc.textContent = updatedUser.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.error("Не удалось сохранить профиль:", err);
    })
    .finally(() => {
      saveButton.textContent = originalText;
      saveButton.disabled = false;
    });
}

// Обработчик отправки формы добавления новой карточки
function handleAddSubmit(evt) {
  evt.preventDefault();

  const saveButton = cardFormElement.querySelector(
    validateConfig.submitButtonSelector
  );
  const originalText = saveButton.textContent;
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true;

  const name = cardFormElement.elements["place-name"].value;
  const link = cardFormElement.elements.link.value;

  postCard({ name, link })
    .then((createdCard) => {
      addCardToList(createdCard, currentUserId, true);
      closeModal(popupAdd);
    })
    .catch((err) => {
      console.error("Не удалось создать карточку:", err);
    })
    .finally(() => {
      saveButton.textContent = originalText;
      saveButton.disabled = false;
    });
}

// Инициализация валидации
enableValidation(validateConfig);

// Слушатели для открытия попапов
editBtn.addEventListener("click", () => {
  clearValidation(editFormElement, validateConfig);
  fillProfileForm();
  openModal(popupEdit);
});
addBtn.addEventListener("click", () => {
  cardFormElement.reset();
  clearValidation(cardFormElement, validateConfig);
  openModal(popupAdd);
});

// Слушатели для сабмита форм
editFormElement.addEventListener("submit", handleEditSubmit);
cardFormElement.addEventListener("submit", handleAddSubmit);

// Загрузка данных пользователя и карточек
Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    currentUserId = user._id;

    profileTitle.textContent = user.name;
    profileDesc.textContent = user.about;
    profileAvatar.style.backgroundImage = `url(${user.avatar})`;

    cards.forEach((card) => addCardToList(card, currentUserId));
  })
  .catch((err) => {
    console.error("Ошибка при инициализации данных:", err);
  });
