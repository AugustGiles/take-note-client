import React, { Component } from 'react'
import { Button, Modal, Header } from 'semantic-ui-react'
import '../styles/App.css'

class RecorderDevice extends Component {

  state = {
    active: false,
    mediaRecorder: null,
    audioChunks: [],
    audioBlob: null,
    audioUrl: null,
    saved: false,
  }

  prepareRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        let mediaRecorder = new MediaRecorder(stream, {type: 'audio/wav'})
        this.setState({ mediaRecorder: mediaRecorder })
      })
  }

  startRecording = () => {
    this.state.mediaRecorder.start()
    this.setState({ active: true })
    this.state.mediaRecorder.addEventListener('dataavailable', e => {
      this.state.audioChunks.push(e.data)
    })

  }

  stopRecording = () => {
    this.state.mediaRecorder.stop()
    this.state.mediaRecorder.addEventListener('stop', () => {
      let audioBlob = new Blob(this.state.audioChunks, {type:'audio'})
      let audioUrl = URL.createObjectURL(audioBlob)
      this.setState({ audioBlob: audioBlob, audioUrl: audioUrl})
    })
    this.setState({ active: false })
  }

  emergencyStop = () => {
    if (this.state.active === true) {this.state.mediaRecorder.stop()}
    this.setState({ mediaRecorder: null, audioBlob: [], audioUrl: null, active: false})
  }

  createFileFromBlob = () => {
    let file = new File([this.state.audioBlob], 'audio1.wav', {type: 'audio/wav'})
    return file
  }

  postRecording(assignmentId) {
    let recording = this.createFileFromBlob()
    let formData = new FormData()
    formData.append("id", assignmentId)
    formData.append("recording", recording)

    fetch('https://take-note-server.herokuapp.com/attachrecording', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: formData
    })
      .then(message => {
        this.setState({saved: true})
        console.log(message)
      })
  }


  render() {
    return (
      <Modal
        trigger={<Button icon='microphone' size='huge' inverted style={{display: 'inline-block'}}/>}
        size='mini' basic
        onOpen={this.prepareRecording}
        onClose={this.emergencyStop}
        content={
          <div style={{textAlign: 'center'}}>
            {(!this.state.active && !this.state.audioUrl) &&
              <React.Fragment>
                <Button icon='microphone' circular size='massive'
                  onClick={this.startRecording}
                />
                <Header content="Click to Start" as='h3' style={{color: 'white'}}/>
              </React.Fragment>
            }
            {(this.state.active && !this.state.audioUrl) &&
              <React.Fragment>
                <Button icon='microphone slash' circular size='massive'
                  onClick={this.stopRecording}
                />
                <Header content='Click to Stop' as='h3' style={{color: 'white'}} />
              </React.Fragment>
            }
            {(this.state.audioUrl && !this.state.saved) &&
              <React.Fragment>
                <audio src={this.state.audioUrl} controls />
                <Button content='Save Recording' inverted
                  onClick={() => this.postRecording(this.props.assignmentId)}/>
              </React.Fragment>
            }
            {(this.state.audioUrl && this.state.saved) &&
              <Header content='Recording Saved!' inverted/>
            }
          </div>
        }
      />
    )
  }
}

export default RecorderDevice
