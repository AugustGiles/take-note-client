import { INCREMENT_TIME, TOGGLE_PAUSE, CLEAR_STOPWATCH } from '../actions/actionTypes'

export function stopwatchReducer(state={ time: 0, isPaused: false }, action) {
  switch(action.type) {

    case INCREMENT_TIME:
      return {...state, time: state.time + 1}

    case TOGGLE_PAUSE:
      return {...state, isPaused: !state.isPaused}

    case CLEAR_STOPWATCH:
      return {time: 0, isPaused: false}

    default:
      return state

  }
}
