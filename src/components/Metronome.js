import React, { Component } from 'react'
import { Divider, Button, Header, Modal } from 'semantic-ui-react'
import Ticker from '../tm-ticker/src/Ticker'
import Slider from 'react-rangeslider'
import 'react-rangeslider/lib/index.css'
import posed from 'react-pose'
import '../styles/App.css'

const Circle = posed.div({
  hidden: { 'border-radius': '75%', opacity: .3},
  visible: { 'border-radius': '50%', opacity: .9}
})

class Metronome extends Component {

  constructor(props) {
    super(props)
    this.audio = React.createRef()
    this.state = {
      bpm: 92,
      active: false,
      visible: true
    }
  }

  startMetronome = () => {
    this.setState({active: true})
    this.ticker = new Ticker((60000/this.state.bpm), () => {
      this.audio.current.currentTime = 0
      this.audio.current.play()
    })
    this.visualTicker = new Ticker((30000/this.state.bpm), () => {
      this.setState({visible: !this.state.visible})

    })
    this.ticker.start()
    this.visualTicker.start()
  }


  //   M E T R O N O M E      A U D I O / V I S U A L     H A N D L E R S
  pauseMetronome = () => {
    this.setState({active: false})
    this.ticker.stop()
    this.visualTicker.stop()
  }

  handleBPMChange = (value) => {
    if (this.state.active === true) this.pauseMetronome();
    this.setState({bpm: value})
  }

  render() {
    return (
      <Modal
        trigger={<Button icon='hourglass outline' size='large' inverted style={{display: 'inline-block'}}/>}
        size='large' basic onClose={() => this.state.active === true ? this.pauseMetronome() : null}
        style={{height: '60vh'}}
        content={
          <div style={{textAlign: 'center'}}>
            <audio ref={this.audio} src='https://dl.dropbox.com/s/0w351p088g1e0b2/130853__juskiddink__claves.wav?dl=0' />
              <Header content={`Metronome at ${this.state.bpm} BPM`} style={{color: 'white'}}/>
              <Divider inverted />
              <div style={{height: '25vh'}}>
                <Circle className='circleAnimation' pose={this.state.visible ? 'visible' : 'hidden'} />
              </div>

              <Slider
                min={40}
                max={170}
                value={this.state.bpm}
                onChange={this.handleBPMChange}
              />
              {this.state.active === false ?
                <Button icon='play' onClick={this.startMetronome} fluid /> :
                  <Button icon='pause' onClick={this.pauseMetronome} fluid />
              }
          </div>
        }
      />
    )
  }
}

export default Metronome
