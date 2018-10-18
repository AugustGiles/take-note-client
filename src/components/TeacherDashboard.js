import React, { Component } from 'react'
import { Header, Button, Divider, Message } from 'semantic-ui-react'
import '../styles/App.css'
import { connect } from 'react-redux'
import Navigation from './Navigation'
import { fetchUser, findStudent } from '../redux/actions/fetchActions'
import { removeErrorMessage } from '../redux/actions/errorActions'



class TeacherDashboard extends Component {

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/')
    } else if (localStorage.role !== 'teacher') {
      this.props.history.goBack()
    } else {
      this.props.fetchUser()
    }
  }

  componentWillUnmount() {
    this.props.removeErrorMessage()
  }

  render () {

    return (
      <div className='setup' >
        <div style={{width: '100%'}}>
          <Header
            style={{color: 'white', fontSize: '5vh', display: "inline-block"}}
            content={this.props.username}
          />
          <Navigation context='teacher'/>
        </div>
        <Divider inverted/>
        <Header style={{color: 'white', fontSize: '4vh'}} content="Students:" />
        {this.props.errorMessage ?
          <Message success header={this.props.errorMessage} /> : null
        }
          {this.props.students &&
            this.props.students.length > 0 ?
            this.props.students.map(student => {
              return (
                <div className='studentList' key={student.id}>
                  <Button
                    inverted color='grey' fluid
                    size='huge'
                    onClick={() => {
                      this.props.findStudent(student.id)
                        .then(this.props.history.push(`/students/${student.id}`))
                    }}
                    content={student.username}
                  />
                </div>
              )
            })
            : null }
            <div className='studentList'>
              <Button inverted
                color='grey' fluid size='huge'
                onClick={() => this.props.history.push('/createstudent')}
                content='Add Student' icon='add user'
              />
            </div>
            {this.props.students && this.props.students.length === 0 ?
              <Header as='h2' style={{textAlign: 'center', padding: '10%'}} inverted>
                Welcome to Take Note! <br /><br /><br />
              We're excited to give a nice platform for you to communicate with your students, and provide them the resources they need to be successful with their practice. <br /><br />
            Try making a test student, creating some resources, writing an assignment - then log in as the student and see what they can do!
              </Header> : null
            }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username,
    students: state.user.students,
    errorMessage: state.error,
  }
}

export default connect(mapStateToProps, { fetchUser, removeErrorMessage, findStudent })(TeacherDashboard)
