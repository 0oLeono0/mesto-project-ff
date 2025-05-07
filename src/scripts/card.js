import { addLike, removeLike } from "./api.js";

// Удаление карточки
export const removeCard = (cardEl) => {
  cardEl.remove();
};

// Переключение лайка и обновление счётчика
export const handleLikeToggle = (cardId, likeBtn, likeCountEl) => {
  const isLiked = likeBtn.classList.contains("card__like-button_is-active");
  const action = isLiked ? removeLike : addLike;

  likeBtn.classList.toggle("card__like-button_is-active");
  let count = Number(likeCountEl.textContent);
  likeCountEl.textContent = isLiked ? count - 1 : count + 1;

  action(cardId)
    .then((updatedCard) => {
      likeCountEl.textContent = updatedCard.likes.length;
    })
    .catch((err) => {
      console.error("Ошибка при изменении лайка:", err);
      likeBtn.classList.toggle("card__like-button_is-active");
      likeCountEl.textContent = isLiked ? count : count - 1;
    });
};

// Создание элемента карточки
const createCardElement = ({ name, link, likes = [] }, template) => {
  const cardEl = template.querySelector(".card").cloneNode(true);
  const imgEl = cardEl.querySelector(".card__image");
  const titleEl = cardEl.querySelector(".card__title");
  const likeCountEl = cardEl.querySelector(".card__like-count");

  titleEl.textContent = name;
  imgEl.src = link;
  imgEl.alt = name;
  likeCountEl.textContent = likes.length;

  return { cardEl, imgEl, likeCountEl };
};

// Создание карточки
export const createCard = (
  data,
  template,
  { onDelete, onLike, onPreview },
  currentUserId
) => {
  const { cardEl, imgEl, likeCountEl } = createCardElement(data, template);

  const deleteBtn = cardEl.querySelector(".card__delete-button");
  if (data.owner._id !== currentUserId) {
    deleteBtn.remove();
  } else {
    deleteBtn.addEventListener("click", () => onDelete(cardEl, data._id));
  }

  const likeBtn = cardEl.querySelector(".card__like-button");
  const isLiked = data.likes.some((like) => like._id === currentUserId);
  if (isLiked) {
    likeBtn.classList.add("card__like-button_is-active");
  }
  likeCountEl.textContent = data.likes.length;

  likeBtn.addEventListener("click", () =>
    onLike(data._id, likeBtn, likeCountEl)
  );

  imgEl.addEventListener("click", () => onPreview(imgEl.src, imgEl.alt)); // Передаем src и alt как аргументы

  return cardEl;
};
