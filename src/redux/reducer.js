import { combineReducers } from 'redux'
import { userReducer } from './reducers/userReducer'
import { stopwatchReducer } from './reducers/stopwatchReducer'
import { selectedStudentReducer } from './reducers/selectedStudentReducer'

const takeNoteAppReducer = combineReducers({
  user: userReducer,
  selectedStudent: selectedStudentReducer,
  stopwatch: stopwatchReducer,
})

export default takeNoteAppReducer
