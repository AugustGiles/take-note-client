import React, { Component } from 'react'
import Stopwatch from './Stopwatch'
import {  } from 'semantic-ui-react'

export default class StudentDashboard extends Component {

  render () {
    return (
      <div className='teacher'>
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
