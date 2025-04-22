let currentModal = null;

function handleEscClose(evt) {
  if (evt.key === "Escape" && currentModal) {
    closeModal(currentModal);
  }
}

export function openModal(modalEl) {
  modalEl.classList.add("popup_is-opened");
  currentModal = modalEl;
  document.addEventListener("keydown", handleEscClose);
}

export function closeModal(modalEl) {
  modalEl.classList.remove("popup_is-opened");
  if (currentModal === modalEl) {
    currentModal = null;
    document.removeEventListener("keydown", handleEscClose);
  }
}
