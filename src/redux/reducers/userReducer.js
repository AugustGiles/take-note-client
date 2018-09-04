import { ADD_STUDENT, ADD_TEACHER, REMOVE_USER, ADD_PRACTICE_TIME } from '../actions/actionTypes'

export function userReducer(state = {}, action) {
  switch (action.type) {

    case ADD_STUDENT:
      return {
        id: action.payload.userInfo.id,
        username: action.payload.userInfo.username,
        allAssignments: action.payload.userInfo.givenAssignments,
        recentAssignment: action.payload.recentAssignment,
        assignmentText: action.payload.recentAssignment['assignment_text'],
        currentPracticeTime: action.payload.currentPracticeTime,
        goalPracticeTime: action.payload.goalPracticeTime,
        role: 'student',
        loggedIn: true
      }

    case ADD_TEACHER:
      return {
        id: action.payload.userInfo.id,
        username: action.payload.userInfo.username,
        students: action.payload.students,
        role: 'teacher',
        loggedIn: true
      }

    case REMOVE_USER:
      return ''

    case ADD_PRACTICE_TIME:
      return {
        ...state,
        currentPracticeTime: action.practiceTime,
      }

    default:
      return state

  }
}
