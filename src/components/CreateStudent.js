import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Header, Divider, Input } from 'semantic-ui-react'

class CreateStudent extends Component {

  state = {
    username: '',
    password: '',
    passwordConfirmation: '',
  }

  render() {
    return (
      <div className="setup">
        <Header style={{color: 'white', fontSize: '5vh'}} content='Create Student' />
        <Divider inverted/>
        <Form style={{width: '100%'}}>
          <Input placeholder='Username' fluid size='huge' style={{marginTop: '4%', marginBottom: '4%'}}/>
          <Input placeholder='Password' fluid size='huge' style={{marginTop: '4%', marginBottom: '4%'}} />
          <Input placeholder='Password Confirmation' fluid size='huge' style={{marginTop: '4%', marginBottom: '4%'}}/>
        </Form>
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
