export const removeCard = (cardEl) => {
  cardEl.remove();
};

export const toggleLike = (buttonEl) => {
  buttonEl.classList.toggle("card__like-button_is-active");
};

const createCardElement = ({ name, link }, template) => {
  const cardEl = template.querySelector(".card").cloneNode(true);
  const imgEl = cardEl.querySelector(".card__image");
  cardEl.querySelector(".card__title").textContent = name;
  imgEl.src = link;
  imgEl.alt = name;
  return { cardEl, imgEl };
};

export const createCard = (data, template, { onDelete, onLike, onPreview }) => {
  const { cardEl, imgEl } = createCardElement(data, template);

  cardEl
    .querySelector(".card__delete-button")
    .addEventListener("click", () => onDelete(cardEl));

  const likeBtn = cardEl.querySelector(".card__like-button");
  likeBtn.addEventListener("click", () => onLike(likeBtn));

  imgEl.addEventListener("click", () => onPreview(imgEl, cardEl));

  return cardEl;
};
