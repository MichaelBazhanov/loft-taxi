//==================================================================================== БЛОК СКРЫТИЯ И ПОКАЗА TOOLTIPS
export const SHOW = 'SHOW'
export const HIDE = 'HIDE'

export const show = ({type, text}) => ({
  type: SHOW,
  payload: { type, text },
})
export const hide = () => ({
  type: HIDE,
})
