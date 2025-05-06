const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-38",
  headers: {
    authorization: "47059eae-25b2-47fb-9b4f-7310fff09a17",
    "Content-Type": "application/json",
  },
};

// Обработка ответа сервера
const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Получение данных о пользователе
export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка при получении пользователя:", err);
    });
};

// Получение списка карточек
export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка при получении карточек:", err);
    });
};

// Редактирование профиля
export const editProfile = (body) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(body),
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка при редактировании профиля:", err);
    });
};

// Добавление новой карточки
export const postCard = (body) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(body),
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    });
};

// Удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка при удалении карточки:", err);
    });
};

// Добавление лайка
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка при добавлении лайка:", err);
    });
};

// Удаление лайка
export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка при удалении лайка:", err);
    });
};

// Обновление аватара
export const updateAvatar = (body) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(body),
  })
    .then(checkResponse)
    .catch((err) => {
      console.error("Ошибка при обновлении аватара:", err);
    });
};

// Проверка валидности URL изображения
export const validateImageUrl = (url) => {
  return fetch(url, { method: "HEAD" })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject("Невалидный URL или ресурс не найден");
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.startsWith("image/")) {
        return true;
      } else {
        return Promise.reject("Это не изображение");
      }
    })
    .catch((err) => {
      console.error("Ошибка при проверке URL изображения:", err);
      return Promise.reject(`Ошибка: ${err}`);
    });
};
