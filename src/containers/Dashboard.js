import React, { Component } from 'react'
import StudentDashboard from '../components/StudentDashboard'
import TeacherDashboard from '../components/TeacherDashboard'
import '../styles/Dashboard.css'

export default class Dashboard extends Component {

  componentDidMount() {
    this.props.fetchUser()
  }

  handlePracticeRoute = () => {
    this.props.history.push('/practice')
  }

  handleStudentShowRoute = (id) => {
    this.props.history.push(`/students/${id}`)
  }

  handleLogoutButton = () => {
    this.props.handleLogout()
    localStorage.clear()
    this.props.history.push('/')
  }

  render () {

    //    student props
    const practiceGoal = this.props.assignment && this.props.assignment['practice_goal']
    const currentPracticeTime = this.props.currentPracticeTime && this.props.currentPracticeTime
    const time = (practiceGoal - currentPracticeTime)

    //    teacher props
    const students = (this.props.students && this.props.students)
    const user = (this.props.user && this.props.user)

    return (
      <React.Fragment>
        {this.props.user && (this.props.user.teacher ?
          <StudentDashboard
            time={time}
            items={this.props.items}
            handlePracticeRoute={this.handlePracticeRoute}
            handleLogout={this.props.handleLogout}
            fetchUser={this.props.fetchUser}
          /> :
          <TeacherDashboard
            students={students}
            user={user}
            handleStudentShowRoute={this.handleStudentShowRoute}
            handleLogout={this.handleLogoutButton}
            fetchUser={this.props.fetchUser}
          />
        )}
      </React.Fragment>
    )
  }

}
