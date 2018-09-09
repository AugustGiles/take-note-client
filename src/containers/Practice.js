import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Divider } from 'semantic-ui-react'
import {stateToHTML} from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';

import '../styles/App.css'
import Stopwatch from '../components/Stopwatch'
import Metronome from '../components/Metronome'
import RecorderDevice from '../components/RecorderDevice'
import { patchCurrentPracticeTime } from '../redux/actions/fetchActions'
import { incrementTime, clearStopwatch, togglePause } from '../redux/actions/stopwatchActions'


class Practice extends Component {

  state = {
    metronomeActive: false,
  }

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/')
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

  toggleMetronome = () => {
    this.setState({metronomeActive: !this.state.metronomeActive})
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

        <Divider inverted />

        <div style={{textAlign: 'center'}}>
          <Button inverted size="large" style={{display: 'inline-block'}}
            icon={this.props.isPaused? 'play' : 'pause'}
            onClick={() => this.props.togglePause()}
          />
          <Metronome />
          <RecorderDevice assignmentId={this.props.recentAssignment && this.props.recentAssignment.id}/>
        </div>

        <Divider inverted/>

        { this.props.assignmentText ?
          <div style={{overflow: 'auto'}}>
            <p style={{color: 'white', }}
            dangerouslySetInnerHTML={{ __html: convertCommentFromJSONToHTML(this.props.assignmentText)}}
            />
          </div>
          : null
        }
        <div style={{paddingBottom: '2%', width: '100%'}}>
          <Button size="huge" content='End' fluid onClick={this.handleEnd}  />
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

//
// <React.Fragment>
//   <audio id='playback'/>
//   <Button icon='play' size='massive' onClick={this.handlePlayback} />
//   <Header content='Click play to hear your recording. Click outside to exit recording session' inverted />
// </React.Fragment>
