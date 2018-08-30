import React, { Component } from 'react'
import { Button, Statistic } from 'semantic-ui-react'
import '../styles/App.css'


export default class Stopwatch extends Component {

  render () {
    const time = this.props.time
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor(time / 60) % 60
    const seconds = time % 60

    return (
      <div style={{padding: '10%', width: '100%'}}>
        <Statistic
          size='large'
          style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', paddingBottom: '10%'}}
        >
          <Statistic.Value style={{color: 'white'}}>
            {hours}:
            {minutes < 10 ? 0 : ''}{minutes}:
            {seconds < 10 ? 0 : ''}{seconds}
          </Statistic.Value>
          <Statistic.Label style={{color: 'white'}}>
            {this.props.text && this.props.text}
          </Statistic.Label>
        </Statistic>
        {(this.props.context === 'dashboard') ? <Button inverted fluid
          size="huge"
          content='Start Practice!'
          onClick={this.props.routeToPractice}
        /> : null}
      </div>
    )
  }
}
