// Авторизация
export const serverLogin = async (email, password) => {
  return fetch(`https://loft-taxi.glitch.me/auth`, {
    method: 'POST',
    body: JSON.stringify({ email, password }), // данные могут быть 'строкой' или {объектом}!
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return { success: data.success, token: data.token, error: data.error }
    })
}

// Регистрация
export const serverRegistration = async (email, password, name, surname) => {
  return fetch(`https://loft-taxi.glitch.me/register`, {
    method: 'POST',
    body: JSON.stringify({ email, name, password, surname }), // данные могут быть 'строкой' или {объектом}!
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return { success: data.success, token: data.token, error: data.error }
    })
}

// Отправка данных карты на сервер
export const serverSendCard = async (
  cardName,
  cardNumber,
  expiryDate,
  cvc,
  token,
) => {
  return fetch(`https://loft-taxi.glitch.me/card?token=${token}`, {
    method: 'POST',
    body: JSON.stringify({ cardName, cardNumber, expiryDate, cvc, token }), // данные могут быть 'строкой' или {объектом}!
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      return { success: data.success, error: data.error }
    })
}

// Получение данных карты на клиенте
export const serverGetCard = async (token) => {
  return fetch(`https://loft-taxi.glitch.me/card?token=${token}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => data)
}

// Получение доступных адресов на клиенте
export const serverGetAddressList = async () => {
  return fetch(`https://loft-taxi.glitch.me/addressList`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => data)
}

// Получение доступных маршрутов на клиенте
export const serverGetRoutes = async (address1, address2) => {
  return fetch(
    `https://loft-taxi.glitch.me/route?address1=${address1.rout}&address2=${address2.rout}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => res.json())
    .then((data) => data)
}
