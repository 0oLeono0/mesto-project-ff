import '../pages/index.css'
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
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCallBack);
  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard() {
  this.closest('.card').remove()
}
// @todo: Вывести карточки на страницу
initialCards.forEach((card) => placesList.append(addCard(card, deleteCard)));