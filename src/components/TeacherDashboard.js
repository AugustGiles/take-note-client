import React, { Component } from 'react'
import { Header, Button, Divider } from 'semantic-ui-react'
import '../styles/App.css'
import { connect } from 'react-redux'
import { removeUser } from '../redux/actions/userActions'


class TeacherDashboard extends Component {

  handleLogoutButton = () => {
    localStorage.clear()
    this.props.removeUser()
    this.props.history.push('/')
  }

  render () {

    return (
      <div className='setup' >
        <div >
          <Header
            style={{color: 'white', fontSize: '5vh', display: "inline-block"}}
          >
          {this.props.username}
          </Header>
          <Button inverted content='Logout'
            onClick={this.handleLogoutButton}
            style={{display: 'inline-block', float:'right'}}
          />
        </div>
        <Divider inverted/>
        <Header style={{color: 'white', fontSize: '3vh'}} >Students:</Header>

        {this.props.students && this.props.students.map(student => {
          return (
            <Button
              key={student.id}
              inverted fluid style={{marginTop: '3%'}}
              size='huge'
              onClick={() => this.props.history.push(`/students/${student.id}`)}
              content={student.username}
            />
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username,
    students: state.user.students
  }
}

export default connect(mapStateToProps, { removeUser })(TeacherDashboard)
