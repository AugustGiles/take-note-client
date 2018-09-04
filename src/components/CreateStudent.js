import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Header, Input, Button } from 'semantic-ui-react'

import Navigation from './Navigation'
import { handleSignUp, assignHomework } from '../redux/actions/fetchActions'

class CreateStudent extends Component {

  state = {
    username: '',
    password: '',
    passwordConfirmation: '',
  }

  handleSubmit = (e) => {
    e.preventDefault()
    let data = {
      username: this.state.username,
      password: this.state.password,
      teacher_id: this.props.id
    }
    this.props.handleSignUp(data)
      .then(json => {
        let data = {
          teacher_id: json.user['teacher_id'],
          student_id: json.user.id,
          assignment_text: {
            "blocks":
            [{"key":"dpkr", "text":"Write The First Assignment!", "type":"header-three", "depth":0, "inlineStyleRanges":[], "entityRanges":[], "data":{}
          }], "entityMap":{}},
          practice_goal: 0
        }
        this.props.assignHomework(data)
          .then(this.props.history.push('/teacherDashboard'))
      })

  }

  render() {
    return (

      <div className="auth" style={{padding: '13%', paddingTop: '12%'}}>
        <h1 className='featureText' style={{color: 'white', fontSize: '36px', display: 'inline-block'}}>Take Note .</h1>
        <Navigation context='teacher'/>
        <Header
          size='huge'
          style={{color: 'white'}}
          content='Add Student'
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
  }
}

export default connect(mapStateToProps, { handleSignUp, assignHomework })(CreateStudent)
