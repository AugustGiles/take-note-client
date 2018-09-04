import { combineReducers } from 'redux'
import { userReducer } from './reducers/userReducer'
import { stopwatchReducer } from './reducers/stopwatchReducer'
import { selectedStudentReducer } from './reducers/selectedStudentReducer'
import { errorReducer } from './reducers/errorReducer'

const takeNoteAppReducer = combineReducers({
  user: userReducer,
  selectedStudent: selectedStudentReducer,
  stopwatch: stopwatchReducer,
  error: errorReducer,
})

export default takeNoteAppReducer
