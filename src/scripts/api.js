const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-38",
  headers: {
    authorization: "47059eae-25b2-47fb-9b4f-7310fff09a17",
    "Content-Type": "application/json",
  },
};

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editProfile = (body) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const postCard = (body) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
}