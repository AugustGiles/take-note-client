import {SELECT_STUDENT, CLEAR_SELECTED_STUDENT } from '../actions/actionTypes'

export function selectedStudentReducer(state={}, action) {
  switch(action.type) {

    case SELECT_STUDENT:
      return {
        id: action.payload.id,
        username: action.payload.studentUsername,
        recentAssignment: action.payload.recentAssignment,
        goalPracticeTime: action.payload.recentAssignment['practice_goal'],
        currentPracticeTime: action.payload.recentAssignment['current_practice_time'],
        assignmentCreated: action.payload.recentAssignment['created_at'],
        assignmentText: action.payload.recentAssignment['assignment_text'],
        resources: action.payload.recentAssignment.resources,
        allAssignments: action.payload.allAssignments,
        recordings: action.payload.recentAssignment.recordings,
      }

    case CLEAR_SELECTED_STUDENT:
      return ''

    default:
      return state

  }
}
