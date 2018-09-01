import { INCREMENT_TIME, TOGGLE_PAUSE, CLEAR_STOPWATCH } from './actionTypes'

export const incrementTime = () => ({
  type: INCREMENT_TIME
})

export const togglePause = () => ({
  type: TOGGLE_PAUSE
})

export const clearStopwatch = () => ({
  type: CLEAR_STOPWATCH
})
