import { ADD_ERROR_MESSAGE, REMOVE_ERROR_MESSAGE } from './actionTypes'

export const addErrorMessage = (message) => ({
  type: ADD_ERROR_MESSAGE,
  message: message,
})

export const removeErrorMessage = () => ({
  type: REMOVE_ERROR_MESSAGE,
})

export const validate = (context, username, password, passwordConfirmation) => {
  return dispatch => {
    let value = true
    if (context==='login') {
      if (username==="" || password==="") {
          dispatch(addErrorMessage('Submission Requires All Fields'))
          value = false
        }
    } else {
        if (username==="" || password==="" || passwordConfirmation==="") {
          dispatch(addErrorMessage('Submission Requires All Fields'))
          value = false
        }
        if (password!==passwordConfirmation) {
          dispatch(addErrorMessage('Please Be Sure Your Password and Password Confirmation Match'))
          value = false
        }
    }
    return value
  }
}
