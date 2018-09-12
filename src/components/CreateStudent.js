import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Header, Input, Button, Message } from 'semantic-ui-react'

import Navigation from './Navigation'
import { handleStudentCreation, assignHomework } from '../redux/actions/fetchActions'
import { validate, removeErrorMessage, addErrorMessage } from '../redux/actions/errorActions'

class CreateStudent extends Component {

  state = {
    username: '',
    password: '',
    passwordConfirmation: '',
  }

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/')
    } else if (localStorage.role !== 'teacher') {
      this.props.history.goBack()
    } 
  }

  componentWillUnmount() {
    this.props.removeErrorMessage()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.removeErrorMessage()
    let data = {
      username: this.state.username,
      password: this.state.password,
      teacher_id: this.props.id
    }
    if (this.props.validate('createStudent', this.state.username, this.state.password, this.state.passwordConfirmation)) {
      this.props.handleStudentCreation(data)
        .then(assignmentData => {
          this.props.assignHomework(assignmentData)
            .then(this.props.history.push('/teacherDashboard'))
        })
        .catch(message => this.props.addErrorMessage(message))
    }
  }

  render() {
    return (

      <div className="auth" >
        <h1 className='featureText' style={{display: 'inline-block'}}>Take Note .</h1>
        <Navigation context='teacher'/>
        <Button inverted style={{float: 'right'}} icon='angle left' content='Back'
          onClick={() => this.props.history.push(`/`)} />
        <Header
          size='huge'
          style={{color: 'white'}}
          content='Add Student'
        />

        {this.props.errorMessage ?
          <Message error header={this.props.errorMessage} /> : null
        }

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
          <Input
            placeholder='Password Confirmation'
            type="password"
            size='huge' fluid
            style={{paddingTop: '2%'}}
            value={this.state.passwordConfimation}
            onChange={(e) => this.setState({passwordConfirmation: e.target.value})}
          />
          <Button
            inverted fluid
            content='Submit'
            size='large'
            style={{marginTop:'2%', marginBottom: '5%'}}
            onClick={(e) => this.handleSubmit(e)}
          />
        </Form>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    username: state.user.username,
    id: state.user.id,
    errorMessage: state.error,
  }
}

export default connect(mapStateToProps, { handleStudentCreation, assignHomework, validate, removeErrorMessage, addErrorMessage })(CreateStudent)
