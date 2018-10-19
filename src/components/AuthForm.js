import React, { Component } from 'react'
import { Button, Input, Header, Divider, Form, Message } from 'semantic-ui-react'
import '../styles/App.css'
import { handleLogin, handleSignUp, fetchUser } from '../redux/actions/fetchActions'
import { validate, removeErrorMessage, addErrorMessage } from '../redux/actions/errorActions'
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

  componentWillUnmount() {
    this.props.removeErrorMessage()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.removeErrorMessage()
    if (this.props.validate(
      this.props.context, this.state.username, this.state.password, this.state.passwordConfirmation )) {
      if (this.props.context === 'login') {
        this.props.handleLogin(this.state)
          .then(user => {
            this.props.fetchUser()
            return (user['teacher_id'] ? 'student' : 'teacher')
          })
          .then(user => this.props.history.push(`/${user}dashboard`))
          .catch(message => this.props.addErrorMessage(message))
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
          .catch(message => this.props.addErrorMessage(message))
      }
    }
  }

  render() {
    return (
      <div className="auth" >
        <h1 className='featureText' >Take Note .</h1>
        <Header
          size='huge'
          style={{color: 'white'}}
          content={this.props.context === 'signup' ? 'Create Studio Account' : 'Login'}
        />

        {this.props.errorMessage ?
          <Message error header={this.props.errorMessage} /> : null
        }

        <Form >
          <Input
            aria-label='Username'
            placeholder='Username'
            value={this.state.username}
            size='huge' fluid
            style={{paddingTop: '2%'}}
            onChange={(e) => this.setState({username: e.target.value})}
          />
          <Input
            aria-label='Password'
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
          <div style={{marginTop: '5%'}}>
            <Header as='h3' style={{color:'white'}} content='Already have an account?' />
            <Button inverted content='Login'
              onClick={() => {
                this.props.removeErrorMessage()
                this.props.history.push('/')}
              }
            />
          </div> :
            <div style={{marginTop: '12%'}}>
              <Header as='h3' style={{color:'white'}} content='Become a participating teacher...' />
              <Button inverted content='SignUp'
                onClick={() => {
                  this.props.removeErrorMessage()
                  this.props.history.push('/signup')}
                }
              />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {errorMessage: state.error}
}

export default connect(mapStateToProps, { handleLogin, handleSignUp, fetchUser, validate, removeErrorMessage, addErrorMessage })(AuthForm)
