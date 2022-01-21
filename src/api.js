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
      return { success: data.success, token: data.token }
    })
}
// https://loft-taxi   => выполняем запрос по адресу сервера
// glitch.me           => расположен на сервисе этом
// auth?username=${email}&password=${password} => GET запрос

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
    .then((res) => res.json()) // res = {success: true/false}
    .then((data) => {
      return data.success
    }) // true / false
}

// Получение данных карты на клиенте
export const serverGetCard = async (token) => {
  return fetch(`https://loft-taxi.glitch.me/card?token=${token}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => (res.status === 200 ? res.json() : ''))
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
