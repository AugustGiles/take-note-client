import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Divider, Modal } from 'semantic-ui-react'
import {stateToHTML} from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';

import '../styles/App.css'
import Stopwatch from '../components/Stopwatch'
import Metronome from '../components/Metronome'
import RecorderDevice from '../components/RecorderDevice'
import ResourceCards from '../components/ResourceCards'
import { patchCurrentPracticeTime, findStudent } from '../redux/actions/fetchActions'
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
          <Button inverted size="huge" style={{display: 'inline-block'}}
            icon={this.props.isPaused? 'play' : 'pause'}
            onClick={() => this.props.togglePause()}
          />
          <Metronome />
          <RecorderDevice assignmentId={this.props.recentAssignment && this.props.recentAssignment.id}/>
          <Modal basic size='small' onOpen={() => this.props.findStudent(this.props.id)}
            trigger={<Button icon='paperclip' inverted size='huge'/>}
            content={<ResourceCards context="assignment" resources={this.props.resources}
                        youtubes={this.props.youtubes} />
                    }
          />
        </div>

        <Divider inverted/>

        { this.props.assignmentText ?
          <div style={{overflow: 'auto'}}>
            <p style={{color: 'white'}}
            dangerouslySetInnerHTML={{ __html: convertCommentFromJSONToHTML(this.props.assignmentText)}}
            />
          </div>
          : null
        }
        <div style={{paddingBottom: '2%', width: '100%', paddingTop: '5%'}}>
          <Button size="huge" content='End' fluid onClick={this.handleEnd} inverted />
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
    assignmentText: state.user.assignmentText,
    resources: state.selectedStudent.resources,
    id: state.user.id,
    youtubes: state.selectedStudent.youtubes,
  }
}

export default connect(mapStateToProps, { patchCurrentPracticeTime, incrementTime,  clearStopwatch, togglePause, findStudent })(Practice)
