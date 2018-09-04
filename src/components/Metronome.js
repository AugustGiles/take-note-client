import React, { Component } from 'react'
import { Divider, Button, Input } from 'semantic-ui-react'
import Ticker from 'tm-ticker'

class Metronome extends Component {

  constructor(props) {
    super(props)
    this.audio = React.createRef()
    this.state = {
      bpm: 60,
      active: false,
    }
  }

  startMetronome = () => {
    this.setState({active: true})
    this.ticker = new Ticker((60000/this.state.bpm), () => {
      this.audio.current.currentTime = 0
      this.audio.current.play()
    })
    this.ticker.start()
  }

  pauseMetronome = () => {
    this.setState({active: false})
    this.ticker.stop()
  }

  componentWillUnmount() {
    this.ticker.stop()
  }

  handleBPMChange = (e) => {
    this.pauseMetronome()
    this.setState({bpm: e.target.value})
  }

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <Divider inverted />
        <audio ref={this.audio} src='https://dl.dropbox.com/s/oqhxsptojfd20ec/16987_1461335348.mp3?dl=0' />
        <Input type='number' value={this.state.bpm} onChange={(e) => this.handleBPMChange(e)}/>
        {this.state.active === false ?
          <Button icon='play' onClick={this.startMetronome}></Button> :
            <Button icon='pause' onClick={this.pauseMetronome}></Button>
        }
      </div>
    )
  }
}

export default Metronome
