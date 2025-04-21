import '../pages/index.css';
import { initialCards } from './cards';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(card, deleteCallBack) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', deleteCallBack);
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard() {
  this.closest('.card').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach((card) => placesList.append(addCard(card, deleteCard)));

// Мдальные окна
const editBtn = document.querySelector('.profile__edit-button');
const addBtn = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');
const closeBtns = document.querySelectorAll('.popup__close');

const formElement = document.forms['edit-profile'];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

function openModal(modal) {
  if (modal === popupEdit) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDesc.textContent;
  }
  modal.style.display = 'flex';
  document.addEventListener('keydown', handleEsc);
}

function closeModals() {
  popups.forEach((modal) => (modal.style.display = 'none'));
  document.removeEventListener('keydown', handleEsc);
}

editBtn.addEventListener('click', () => openModal(popupEdit));
addBtn.addEventListener('click', () => openModal(popupAdd));
placesList.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('card__image')) {
    const popupImg = popupImage.querySelector('.popup__image');
    const popupCaption = popupImage.querySelector('.popup__caption');

    popupImg.src = evt.target.src;
    popupImg.alt = evt.target.alt;

    const cardTitle = evt.target
      .closest('.card')
      .querySelector('.card__title').textContent;
    popupCaption.textContent = cardTitle;

    openModal(popupImage);
  }
});
// закрытие по крестику
closeBtns.forEach((btn) => btn.addEventListener('click', closeModals));

// закрытие по оверлею
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === popup) {
      closeModals();
    }
  });
});

// закрытие по ESC
function handleEsc(evt) {
  if (evt.key === 'Escape') {
    closeModals();
  }
}

// Редактирование имени и информации о себе
function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  closeModals();
}

formElement.addEventListener('submit', handleFormSubmit);
