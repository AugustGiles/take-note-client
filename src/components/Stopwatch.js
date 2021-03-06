import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Statistic } from 'semantic-ui-react'
import '../styles/App.css'
import { togglePause } from '../redux/actions/stopwatchActions'

class Stopwatch extends Component {

  render () {
    const time = this.props.context === 'dashboard' ?
      (this.props.goalPracticeTime - this.props.currentPracticeTime) : this.props.time
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor(time / 60) % 60
    const seconds = time % 60

    return (
      <div style={{ width: '100%'}}>
        {time ?
          <div style={{textAlign: 'center', paddingBottom: '5%'}}>
            <Statistic size='huge' >
              <Statistic.Value style={{color: 'white'}}>
                {hours}:
                {minutes < 10 ? 0 : ''}{minutes}:
                {seconds < 10 ? 0 : ''}{seconds}
              </Statistic.Value>
              <Statistic.Label style={{color: 'white'}}>
                {this.props.text && this.props.text}
              </Statistic.Label>
            </Statistic>
          </div> :
          <div style={{textAlign: 'center', paddingBottom: '5%'}}>
            <Statistic size='huge' >
              <Statistic.Value style={{color: 'white'}}>
                0:00:00
              </Statistic.Value>
            </Statistic>
          </div>
        }
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
    time: state.stopwatch.time,
    loggedIn: state.user.loggedIn,
    isPaused: state.stopwatch.isPaused,
  }
}

export default connect(mapStateToProps, { togglePause })(Stopwatch)
