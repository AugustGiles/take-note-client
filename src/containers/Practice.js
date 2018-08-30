import React, { Component } from 'react'
import Stopwatch from '../components/Stopwatch'
import '../styles/App.css'
import { Button, Message } from 'semantic-ui-react'

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
      .then(assignment => {
        this.props.handleAddTime(assignment)
        return assignment
      })
      .then(this.props.history.push('/dashboard'))
  }

  render () {
    const assignmentText = this.props.recentAssignment ?
      this.props.recentAssignment['assignment_text'] : ''

    return (
      <div className='teacher'>
        <Stopwatch
          isPaused={this.state.isPaused}
          time={this.state.time}
          styling={'practice-stopwatch'}
          context={'practice'}
        />
        <Message floating>
          <p >{assignmentText}</p>
        </Message>

        <div style={{textAlign: 'center'}}>
          <Button inverted
            size="huge"
            content={this.state.isPaused? 'Continue' : 'Pause'}
            onClick={this.handlePause}
            style={{margin: '2%'}}
          />
          <Button inverted
            size="huge"
            content='End'
            onClick={this.handleEnd}
            style={{margin: '2%'}}
          />
        </div>

      </div>
    )
  }
}
