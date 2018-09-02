import React, { Component } from 'react'
import { Header, Button, Divider } from 'semantic-ui-react'
import '../styles/App.css'
import { connect } from 'react-redux'
import { removeUser } from '../redux/actions/userActions'
import Navigation from './Navigation'



class TeacherDashboard extends Component {

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/login')
    } else if (localStorage.role !== 'teacher') {
      this.props.history.goBack()
    }
  }

  handleLogoutButton = () => {
    localStorage.clear()
    this.props.removeUser()
    this.props.history.push('/login')
  }

  render () {

    return (
      <div className='setup' >
        <div style={{width: '100%'}}>
          <Header
            style={{color: 'white', fontSize: '5vh', display: "inline-block"}}
            content={this.props.username}
          />
          <Navigation />

        </div>
        <Divider inverted/>
        <div style={{width: '100%'}}>
          <Header style={{color: 'white', fontSize: '4vh', display:'inline-block'}} >Students:</Header>
          <Button
            icon='plus square' style={{display:'inline-block', float: 'right'}} inverted
            onClick={() => this.props.history.push(`/createstudent`)}
          />
        </div>


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
    students: state.user.students,
  }
}

export default connect(mapStateToProps, { removeUser })(TeacherDashboard)

// <Button inverted content='Logout'
//   onClick={this.handleLogoutButton}
//   style={{display: 'inline-block', float:'right'}}
// />
