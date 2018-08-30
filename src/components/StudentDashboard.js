import React, { Component } from 'react'
import Stopwatch from './Stopwatch'
import { Button, Header } from 'semantic-ui-react'

export default class StudentDashboard extends Component {


  render () {
    return (
      <div className='setup'>
        <div >
          <Header
            style={{color: 'white', fontSize: '5vh', display: "inline-block"}}
          >
          {this.props.user.username}
          </Header>
          <Button inverted content='Logout'
            onClick={this.props.handleLogout}
            style={{display: 'inline-block', float:'right'}}
          />
        </div>
        <Stopwatch
          isPaused={true}
          time={this.props.time}
          context={'dashboard'}
          text={'Remaining Practice Time'}
          routeToPractice={this.props.handlePracticeRoute}
        />
      </div>
    )
  }

}
