import React, { Component } from 'react'
import { Button, Input, Header, Divider, Form } from 'semantic-ui-react'
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
          .then(json => {
            localStorage.setItem('token',json.token)
            json.user['teacher_id'] ?
              localStorage.setItem('role', 'student') :
                localStorage.setItem('role', 'teacher')
            this.props.fetchUser()
            return (json.user['teacher_id'] ? 'student' : 'teacher')
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
      <div className="auth" style={{padding: '13%', paddingTop: '12%'}}>
        <h1 className='featureText' style={{color: 'white', fontSize: '36px'}}>Take Note .</h1>
        <Header
          size='huge'
          style={{color: 'white'}}
          content={this.props.context === 'signup' ? 'Create Studio Account' : 'Login'}
        />
        <Form>
          <Input
            placeholder='Username'
            value={this.state.username}
            size='huge' fluid
            style={{paddingTop: '2%'}}
            onChange={(e) => this.setState({username: e.target.value})}
          />
          <Input
            placeholder='Password'
            type="password"
            size='huge' fluid
            style={{paddingTop: '2%'}}
            value={this.state.password}
            onChange={(e) => this.setState({password: e.target.value})}
          />
          {this.props.context === 'signup' &&
            <Input
              placeholder='Password Confirmation'
              type="password"
              size='huge' fluid
              style={{paddingTop: '2%'}}
              value={this.state.passwordConfimation}
              onChange={(e) => this.setState({passwordConfirmation: e.target.value})}
            />
          }
          <Button
            inverted fluid
            content='Submit'
            size='large'
            style={{marginTop:'2%', marginBottom: '5%'}}
            onClick={(e) => this.handleSubmit(e)}
          />
        </Form>
        <Divider inverted />

        {this.props.context === 'signup' ?
          <div style={{marginTop: '15%'}}>
            <Header as='h3' style={{color:'white'}} content='Already have an account?' />
            <Button inverted content='Login' onClick={() => this.props.history.push('/')} />
          </div> :
            <div style={{marginTop: '15%'}}>
              <Header as='h3' style={{color:'white'}} content='Become a participating teacher...' />
              <Button inverted content='SignUp' onClick={() => this.props.history.push('/signup')} />
            </div>
        }
      </div>
    )
  }
}

export default connect(null, { handleLogin, handleSignUp, fetchUser })(AuthForm)
