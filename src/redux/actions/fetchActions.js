import { addStudent, addTeacher, findMostRecentAssignment, addPracticeTime } from './userActions'
import { selectStudent } from './selectedStudentActions'

export function fetchUser() {
  return dispatch => {
    fetch(`http://localhost:3000/profile`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(resp=>resp.json())
      .then(user => {
        // set relevant state for a student user
        if (user.teacher) {
          let assignment = findMostRecentAssignment(user.givenAssignments)
          let time = findMostRecentAssignment(user.givenAssignments)['current_practice_time']
          dispatch(addStudent(user, assignment,time))
        // set relevant state for a teacher user
        } else {
          dispatch(addTeacher(user))
        }
      })
  }
}

export function handleLogin(userInfo) {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      return fetch ('http://localhost:3000/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo)
      })
        .then(resp => resp.json())
        .then(json => {
          if (json.success) {
            localStorage.setItem('token', json.token)
            json.user['teacher_id'] ?
              localStorage.setItem('role', 'student') :
                localStorage.setItem('role', 'teacher')
            resolve(json.user)
          } else {
            console.log("Login Failed")
          }
        })
    })
  }
}

export function handleSignUp(userInfo) {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      return fetch ('http://localhost:3000/users', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userInfo)
      })
        .then(resp => resp.json())
        .then(json => {
          if (json.success) {
            localStorage.setItem('token',json.token)
            resolve()
          } else {
            console.log('Signup Failed')
          }
        })
    })
  }
}

export function patchCurrentPracticeTime(id, data) {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      return (
        fetch(`http://localhost:3000/assignments/currentpractice/${id}`, {
          method: "PATCH",
          mode: "cors",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(data)
        })
          .then(resp => resp.json())
          .then(assignment => {
            dispatch(addPracticeTime(assignment))
            resolve()
          })
      )
    })
  }
}

export function findStudent(studentId) {
  return dispatch => {
    fetch(`http://localhost:3000/users/${studentId}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(resp => resp.json())
      .then(student => {
        let assignment = findMostRecentAssignment(student.givenAssignments)
        dispatch(selectStudent(student, assignment))
      })
  }
}

export function assignHomework(data) {
  return dispatch => {
    return new Promise(function (resolve, reject) {
      return (
        fetch(`http://localhost:3000/assignments`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify(data)
        })
          .then(resp => resp.json())
          .then(json => {
            resolve()
          })
      )
    })
  }
}
