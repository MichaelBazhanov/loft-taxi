export const serverLogin = async (email, password) => {
  return fetch(
    `https://loft-taxi.glitch.me/auth?username=${email}&password=${password}`,
  )
    .then((res) => res.json()) // res = {success: true/false}
    .then((data) => data.success) // true / false
}
// https://loft-taxi   => выполняем запрос по адресу сервера
// glitch.me           => расположен на сервисе этом
// auth?username=${email}&password=${password} => GET запрос
