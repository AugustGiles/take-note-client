import React, { Component } from 'react'
import { Button, Form, Input, Header } from 'semantic-ui-react'
import '../styles/App.css'
import { handleLogin, handleSignUp, fetchUser } from '../redux/actions/fetchActions'
import { connect } from 'react-redux'


class AuthForm extends Component {

  state = {
    username: '',
    password: '',
    passwordConfirmation: '',
  }

  componentDidMount() {
    if (localStorage.token && localStorage.role === 'teacher') {
      this.props.history.push('/teacherDashboard')
    } else if (localStorage.token && localStorage.role === 'student') {
      this.props.history.push('/StudentDashboard')
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    if (this.validate()) {
      if (this.props.context === 'login') {
        this.props.handleLogin(this.state)
          .then(user => {
            this.props.fetchUser()
            return (user['teacher_id'] ? 'student' : 'teacher')
          })
          .then(user => this.props.history.push(`/${user}dashboard`))
      } else {
        this.props.handleSignUp(this.state)
          .then(user => {
            this.props.fetchUser()
            return (user['teacher_id'] ? 'student' : 'teacher')
          })
          .then(user => this.props.history.push(`/${user}dashboard`))
      }
    }
  }

  validate = () => {
    if (this.props.context==='login') {
        if (this.state.username==="" || this.state.password==="") {
            // Add Error
            debugger
            // this.props.addError("Username/Password Required")
            return false
        }
    } else {
        if (this.state.username==="" || this.state.password==="" || this.state.passwordConfirmation==="") {
            debugger
            // Add Error
            // this.props.addError("Username/Password/Password Confirmation Required")
            return false
        }
        if (this.state.password!==this.state.passwordConfirmation) {
            debugger
            // this.props.addError("Password and Password Confirmation must match")
            return false
        }
    }
    return true
  }

  render() {
    return (
      <div className="setup">
        <Form>
          <Header
            size='huge'
            style={{color: 'white', textAlign: 'center'}}
            content='Welcome'
          />
          <Form.Field inline style={{textAlign: 'center'}}>
            <Input
              placeholder='Username'
              value={this.state.username}
              onChange={(e) => this.setState({username: e.target.value})}
            />
          </Form.Field>
          <Form.Field inline style={{textAlign: 'center'}}>
            <Input
              placeholder='Password'
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState({password: e.target.value})}
            />
          </Form.Field>
          {this.props.context === 'signup' &&
              <Form.Field inline style={{textAlign: 'center'}}>
                <Input
                  placeholder='Password Confirmation'
                  type="password"
                  value={this.state.passwordConfimation}
                  onChange={(e) => this.setState({passwordConfirmation: e.target.value})}
                />
              </Form.Field>
          }
          <Form.Field inline style={{textAlign: 'center'}}>
            <Button
              inverted
              content='Submit'
              onClick={(e) => this.handleSubmit(e)}
            />
          </Form.Field>
        </Form>

        {this.props.context === 'signup' ?
          <Button inverted content='Login' onClick={() => this.props.history.push('/')} /> :
            <Button inverted content='SignUp' onClick={() => this.props.history.push('/signup')} />
        }
      </div>
    )
  }
}

export default connect(null, { handleLogin, handleSignUp, fetchUser })(AuthForm)
