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
          dispatch(addTeacher(user, sortStudents(user.students)))
        }
      })
  }
}

function sortStudents(students) {
  return students.sort(function(a,b) {
    if (a.username < b.username) return -1;
    if (a.username > b.username) return 1;
    return 0;
  })
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
            resolve(json)
          } else {
            reject(json.message)
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
        .then(json =>
          json.success ? resolve(json) : reject(json.message)
        )
    })
  }
}

export function handleStudentCreation(userInfo) {
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
            let data = {
              teacher_id: json.user['teacher_id'],
              student_id: json.user.id,
              assignment_text: {
                "blocks":
                [{"key":"dpkr", "text":"Write The First Assignment!", "type":"header-three", "depth":0, "inlineStyleRanges":[], "entityRanges":[], "data":{}
              }], "entityMap":{}},
              practice_goal: 0
            }
            resolve(data)
          } else {
            reject(json.message)
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

export function removeStudent(id) {
  return dispatch => {
    return new Promise(function(resolve, reject) {
      return (
        fetch(`http://localhost:3000/users/${id}`, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        })
          .then(json => resolve('Student Successfully Removed'))
      )
    })
  }
}
