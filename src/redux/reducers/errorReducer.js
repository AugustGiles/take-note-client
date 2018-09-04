import {ADD_ERROR_MESSAGE, REMOVE_ERROR_MESSAGE} from '../actions/actionTypes'

export function errorReducer(state=null, action) {
  switch(action.type) {

    case ADD_ERROR_MESSAGE:
      return action.message

    case REMOVE_ERROR_MESSAGE:
      return null

    default:
      return state

  }
}
