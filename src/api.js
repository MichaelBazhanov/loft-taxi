export const serverLogin = async (email, password) => {
  return fetch(`https://loft-taxi.glitch.me/auth`, {
    method: 'POST',
    body: JSON.stringify({ email, password }), // данные могут быть 'строкой' или {объектом}!
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json()) // res = {success: true/false}
    .then((data) => {
      localStorage.setItem('token', data.token)
      return data.success
    }) // true / false
}
// https://loft-taxi   => выполняем запрос по адресу сервера
// glitch.me           => расположен на сервисе этом
// auth?username=${email}&password=${password} => GET запрос

export const serverCard = async (
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
