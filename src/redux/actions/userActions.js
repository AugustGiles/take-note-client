import { ADD_STUDENT, ADD_TEACHER, REMOVE_USER, ADD_PRACTICE_TIME } from './actionTypes'

export const addTeacher = user => ({
  type: ADD_TEACHER,
  payload: {
    userInfo: user,
    students: user.students
  }
})

export const addStudent = (user, assignment, time) => ({
  type: ADD_STUDENT,
  payload: {
    userInfo: user,
    recentAssignment: assignment,
    goalPracticeTime: assignment['practice_goal'],
    currentPracticeTime: time,
  }
})

export const findMostRecentAssignment = (array) => {
  return array.sort(function(a,b) {
    return b.id - a.id
  })[0]
}

export const removeUser = () => ({
  type: REMOVE_USER
})

export const addPracticeTime = (assignment) => ({
  type: ADD_PRACTICE_TIME,
  practiceTime: assignment['current_practice_time'],
})