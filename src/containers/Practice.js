import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Divider } from 'semantic-ui-react'
import {stateToHTML} from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';

import '../styles/App.css'
import Stopwatch from '../components/Stopwatch'
import { patchCurrentPracticeTime } from '../redux/actions/fetchActions'
import { incrementTime, clearStopwatch, togglePause } from '../redux/actions/stopwatchActions'


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

    const convertCommentFromJSONToHTML = (text) => {
      return stateToHTML(convertFromRaw(text))
    }

    return (
      <div className='setup' style={{paddingLeft: '10%', paddingRight: '10%'}}>

        <div>
          <Stopwatch context={'practice'}/>
        </div>
        <Button inverted size="medium" fluid
          icon={this.props.isPaused? 'play' : 'pause'}
          onClick={() => this.props.togglePause()}
        />

        <Divider inverted/>

        { this.props.assignmentText ?
          <div style={{overflow: 'auto'}}>
            <p style={{color: 'white', }}
            dangerouslySetInnerHTML={{ __html: convertCommentFromJSONToHTML(this.props.assignmentText)}}
            />
          </div>
          : null
        }
        <div style={{paddingBottom: '2%', paddingLeft: '10%', paddingRight: '10%', position: 'fixed', bottom: '0', left: '0', width: '100%'}}>
          <Button inverted size="huge" content='End' fluid
            onClick={this.handleEnd}
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

export default connect(mapStateToProps, { patchCurrentPracticeTime, incrementTime,  clearStopwatch, togglePause })(Practice)
