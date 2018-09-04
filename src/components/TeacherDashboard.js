import React, { Component } from 'react'
import { Header, Button, Divider, Message } from 'semantic-ui-react'
import '../styles/App.css'
import { connect } from 'react-redux'
import Navigation from './Navigation'
import { fetchUser } from '../redux/actions/fetchActions'
import { removeErrorMessage } from '../redux/actions/errorActions'



class TeacherDashboard extends Component {

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/login')
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
        <Header style={{color: 'white', fontSize: '4vh', display:'inline-block'}} >Students:</Header>

        {this.props.errorMessage ?
          <Message success header={this.props.errorMessage} /> : null
        }

        {this.props.students && this.props.students.map(student => {
          return (
            <Button
              key={student.id}
              inverted color='grey' fluid style={{marginTop: '3%'}}
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
    errorMessage: state.error,
  }
}

export default connect(mapStateToProps, { fetchUser, removeErrorMessage })(TeacherDashboard)
