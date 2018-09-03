import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Header, Divider, Input } from 'semantic-ui-react'

import Navigation from './Navigation'

class CreateStudent extends Component {

  state = {
    username: '',
    password: '',
    passwordConfirmation: '',
  }

  render() {
    return (
      <div className="setup">
        <Header style={{color: 'white', fontSize: '5vh', display: 'inline-block'}} content='Add Student' />
        <Navigation context='teacher' />
        <Divider inverted/>
        <div style={{textAlign: 'center', width: '90%'}}>
          <Form >
            <Input placeholder='Username' fluid size='huge' style={{marginTop: '4%', marginBottom: '4%'}}/>
            <Input placeholder='Password' fluid size='huge' style={{marginTop: '4%', marginBottom: '4%'}} />
            <Input placeholder='Password Confirmation' fluid size='huge' style={{marginTop: '4%', marginBottom: '4%'}}/>
          </Form>
        </div>

      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    username: state.user.username
  }
}

export default connect(mapStateToProps)(CreateStudent)
