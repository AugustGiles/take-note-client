import React, { Component } from 'react'
import '../styles/Stopwatch.css'

export default class Stopwatch extends Component {

  render () {

    const hours = Math.floor(this.props.time / 3600)
    const minutes = Math.floor(this.props.time / 60) % 60
    const seconds = this.props.time % 60

    return (
      <div className='stopwatch'>
        <div>
          {hours}:
          {minutes < 10 ? 0 : ''}{minutes}:
          {seconds < 10 ? 0 : ''}{seconds}
        </div>

      </div>



    )
  }

}
