import React, { Component } from 'react'
import Stopwatch from './Stopwatch'
import { Button, Header, Divider } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Navigation from './Navigation'

class StudentDashboard extends Component {

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/login')
    } else if (localStorage.role !== 'student') {
      this.props.history.goBack()
    }
  }

  render () {

    return (
      <div className='setup'>

        <Header
          style={{color: 'white', fontSize: '5vh', display: "inline-block"}}
          content={this.props.username}
        />
        <Navigation context='student' />

        <Divider inverted/>

        <Stopwatch
          context={'dashboard'}
          text={'Remaining Practice Time'}
        />
        <Button inverted fluid
          size="huge"
          content='Start Practice!'
          onClick={() => this.props.history.push('/practice')}
        />

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username,
    recentAssignment: state.user.recentAssignment,
    currentPracticeTime: state.user.currentPracticeTime,
    goalPracticeTime: state.user.goalPracticeTime,
  }
}

export default connect(mapStateToProps)(StudentDashboard)
