export function removeCard(cardEl) {
  cardEl.remove();
}

export function toggleLike(buttonEl) {
  buttonEl.classList.toggle("card__like-button_is-active");
}

function createCardElement({ name, link }, template) {
  const cardEl = template.querySelector(".card").cloneNode(true);
  const img = cardEl.querySelector(".card__image");
  cardEl.querySelector(".card__title").textContent = name;
  img.src = link;
  img.alt = name;
  return cardEl;
}

export function createCard(data, template, { onDelete, onLike, onPreview }) {
  const cardEl = createCardElement(data, template);

  cardEl
    .querySelector(".card__delete-button")
    .addEventListener("click", () => onDelete(cardEl));

  const likeBtn = cardEl.querySelector(".card__like-button");
  likeBtn.addEventListener("click", () => onLike(likeBtn));

  const imgEl = cardEl.querySelector(".card__image");
  imgEl.addEventListener("click", () => onPreview(imgEl, cardEl));

  return cardEl;
}
