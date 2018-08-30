import React, { Component } from 'react'
import { Header, Divider, Statistic, Button } from 'semantic-ui-react'
import '../styles/App.css'

export default class StudentShow extends Component {

  state = {
    student: null,
    lastAssignment: null
  }

  componentDidMount() {
    fetch(`http://localhost:3000/users/${this.props.match.params.student}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(resp => resp.json())
      .then(student => {
        let assignment = this.props.findMostRecentAssignment(student.givenAssignments)
        this.setState({student: student, lastAssignment: assignment})
      })
  }

  render () {
    const student = this.state.student
    const lastAssignment = this.state.lastAssignment
    const stat = lastAssignment &&
        Math.floor((lastAssignment['current_practice_time']/lastAssignment['practice_goal'])*100)


    return (
      <div className='setup'>
        <Header
          style={{color: 'white', fontSize: '5vh'}}>
          {student && student.username}
        </Header>

        <Divider inverted/>

        <Statistic horizontal inverted>
          <Statistic.Value>{lastAssignment && stat}%</Statistic.Value>
          <Statistic.Label>Practice Completion</Statistic.Label>
        </Statistic>

        <Divider inverted/>
        <span style={{display: 'inline-block'}}>
          <Header style={{color: 'white', marginBottom: '5%'}} as='h3'>Assigned: {lastAssignment && lastAssignment['created_at']}</Header>
        </span>

        <p style={{color: 'white'}} >
          {lastAssignment && lastAssignment["assignment_text"]}
        </p>

        <div >
          <Button
            inverted style={{marginTop: '3%', marginRight: '1%'}}
            size='big'
            onClick={() => this.props.history.push('/dashboard')}
          >
            Back
          </Button>
          <Button
            inverted style={{marginTop: '3%'}}
            size='big'
            onClick={() => this.props.history.push(`/createassignment`)}
          >
            New Assignment
          </Button>
        </div>
      </div>
    )
  }
}
