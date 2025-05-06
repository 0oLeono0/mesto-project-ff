// Удаление карточки
export const removeCard = (cardEl) => {
  cardEl.remove();
};

// Переключение лайка и обновление счётчика
export const toggleLike = (buttonEl) => {
  const countEl = buttonEl.parentElement.querySelector(".card__like-count");
  buttonEl.classList.toggle("card__like-button_is-active");

  let count = Number(countEl.textContent);
  if (buttonEl.classList.contains("card__like-button_is-active")) {
    count++;
  } else {
    count--;
  }
  countEl.textContent = count;
};

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

  imgEl.addEventListener("click", () => onPreview(imgEl, cardEl));

  return cardEl;
};
