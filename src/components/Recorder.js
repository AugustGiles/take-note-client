import React, { Component } from 'react'
import { Button, Modal, Header } from 'semantic-ui-react'
import '../styles/App.css'
// import { postRecording } from '../redux/actions/fetchActions'

class Recorder extends Component {

  constructor(props) {
    super(props)

    this.mediaRecorder = null
    this.audioChunks = []
    this.audioBlob = null
    this.audioUrl = null
    this.audio = null
  }

  state = {
    active: false,
  }

  prepareRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        this.mediaRecorder = new MediaRecorder(stream)
      })
  }

  startRecording = () => {
    this.mediaRecorder.start()
    this.setState({ active: true })

    this.mediaRecorder.addEventListener('dataavailable', e => {
      this.audioChunks.push(e.data)
    })
  }

  stopRecording = () => {
    this.mediaRecorder.stop()

    this.mediaRecorder.addEventListener('stop', () => {
      this.audioBlob = new Blob(this.audioChunks)
      this.audioUrl = URL.createObjectURL(this.audioBlob)
      this.audio = new Audio(this.audioUrl)
    })
    this.setState({ active: false })
  }

  emergencyStop = () => {
    debugger
    if (this.state.active === true) {this.mediaRecorder.stop()}
    this.mediaRecorder = null
    this.audioBlob = []
    this.audioUrl = null
    this.audio = null
  }

  // handleSaveAudio = (e) => {
  //   // fetch post goes here
  // }

  render() {
    return (
      <Modal
        trigger={<Button icon='microphone' size='large' inverted style={{display: 'inline-block'}}/>}
        size='large' basic
        onOpen={this.prepareRecording}
        onClose={this.emergencyStop}
        content={
          <div style={{textAlign: 'center'}}>
            {(this.audio && this.state.active === false) &&
              <React.Fragment>
                <audio src={this.audioUrl} controls />
                <Button content='Save Recording' inverted onClick={(e) => this.handleSaveAudio(e)}/>
                <Button content='Try Again' inverted onClick={() => {this.emergencyStop(); this.prepareRecording()}} />
              </React.Fragment>
            }
            {(!this.audio && this.state.active === false) &&
              <React.Fragment>
                <Button icon='microphone' circular size='massive'
                  onClick={this.startRecording}
                />
                <Header content="Click to Start" as='h3' style={{color: 'white'}}/>
              </React.Fragment>
            }
            {(!this.audio && this.state.active === true) &&
              <React.Fragment>
                <Button icon='microphone slash' circular size='massive'
                  onClick={this.stopRecording}
                />
                <Header content='Click to Stop' as='h3' style={{color: 'white'}} />
              </React.Fragment>
            }
          </div>
        }
      />
    )
  }
}

export default Recorder
