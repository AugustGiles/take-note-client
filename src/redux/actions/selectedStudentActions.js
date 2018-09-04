import { SELECT_STUDENT, CLEAR_SELECTED_STUDENT } from './actionTypes'

export const selectStudent = (student, assignment) => ({
  type: SELECT_STUDENT,
  payload: {
    id: student.id,
    studentUsername: student.username,
    recentAssignment: assignment,
    allAssignments: student.givenAssignments,
  }
})

export const clearSelectedStudent = (student) => ({
  type: CLEAR_SELECTED_STUDENT
})
