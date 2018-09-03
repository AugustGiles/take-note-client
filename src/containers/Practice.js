import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Message } from 'semantic-ui-react'
import {stateToHTML} from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';

import '../styles/App.css'
import Stopwatch from '../components/Stopwatch'
import { patchCurrentPracticeTime } from '../redux/actions/fetchActions'
import { incrementTime, togglePause, clearStopwatch } from '../redux/actions/stopwatchActions'


class Practice extends Component {

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/login')
    } else if (localStorage.role !== 'student') {
      this.props.history.goBack()
    } else {
      this.interval = setInterval(() => {
        if (!this.props.isPaused) {
          this.props.incrementTime()
        }
      }, 1000)
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    this.props.clearStopwatch()
  }

  handleEnd = () => {
    let data = {"current_practice_time": this.props.time}
    this.props.patchCurrentPracticeTime(this.props.recentAssignment.id, data)
      .then(this.props.history.push(`/${this.props.role}dashboard`))
  }

  render () {
    const assignmentText = this.props.recentAssignment ?
      this.props.recentAssignment['assignment_text'] : ''

    const convertCommentFromJSONToHTML = (text) => {
      return stateToHTML(convertFromRaw(text))
    }

    return (
      <div className='setup' >
        <Stopwatch context={'practice'}/>

        { this.props.assignmentText ?
          <p style={{color: 'white', textAlign: 'center'}}
          dangerouslySetInnerHTML={{ __html: convertCommentFromJSONToHTML(this.props.assignmentText)}}
          /> : null
        }

        <div style={{textAlign: 'center'}}>
          <Button inverted size="huge"
            content={this.props.isPaused? 'Continue' : 'Pause'}
            onClick={() => this.props.togglePause()}
            style={{margin: '2%'}}
          />
          <Button inverted size="huge" content='End'
            onClick={this.handleEnd}
            style={{margin: '2%'}}
          />
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    recentAssignment: state.user.recentAssignment,
    role: state.user.role,
    time: state.stopwatch.time,
    isPaused: state.stopwatch.isPaused,
    assignmentText: state.user.assignmentText
  }
}

export default connect(mapStateToProps, { patchCurrentPracticeTime, incrementTime, togglePause, clearStopwatch })(Practice)
