import React, { Component } from 'react'
import Stopwatch from '../components/Stopwatch'

export default class Practice extends Component {

  state = {
    isPaused: false,
    time: 0,
    active: true,
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (!this.state.isPaused) {
        this.setState({
          time: this.state.time + 1
        })
      }
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  handlePause = () => {
    this.setState({isPaused: !this.state.isPaused})
  }

  handleEnd = () => {
    this.state.isPaused ? this.setState({ active: false }) :
            this.setState({ active: false, isPaused:true })
    let data = {"current_practice_time": this.state.time}
    fetch(`http://localhost:3000/assignments/currentpractice/${this.props.recentAssignment.id}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(user => {
        return this.props.handleAddTime(
          user.givenAssignments[user.givenAssignments.length - 1]['current_practice_time']
        )
      })
      .then(this.props.history.push('/dashboard'))
  }

  render () {

    const assignmentText = this.props.recentAssignment ?
      this.props.recentAssignment['assignment_text'] : ''


    return (
      <React.Fragment>
        <Stopwatch
          isPaused={this.state.isPaused}
          time={this.state.time}
        />
        <p>{assignmentText}</p>
        <button onClick={this.handlePause} >
          {this.state.isPaused? 'Continue' : 'Pause'}
        </button>
        <button onClick={this.handleEnd} >
          End
        </button>

      </React.Fragment>
    )
  }
}
