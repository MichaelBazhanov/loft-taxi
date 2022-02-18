//==================================================================================== БЛОК СКРЫТИЯ И ПОКАЗА TOOLTIPS
export const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION'
export const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION'

export const showNotification = ({type, text}) => ({
  type: SHOW_NOTIFICATION,
  payload: { type, text },
})
export const hideNotification = () => ({
  type: HIDE_NOTIFICATION,
})
