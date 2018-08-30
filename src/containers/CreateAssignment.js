import React, { Component } from 'react'
import { Form, Dropdown, TextArea, Button, Header } from 'semantic-ui-react'

import { practiceAmounts } from '../data/practiceAmounts'

export default class CreateAssignment extends Component {

  state = {
    assignmentText: '',
    studentSelect: 0,
    practiceAmount: 0,
  }

  studentOptions = () => {
    return this.props.students.map(student => {
      return {key: student.id, value: student.id, text: student.username}
    })
  }

  handleSend = () => {
    // need to not hardcode teacher id - get from local storage once token established
    let data = {
      'teacher_id': 1,
      'student_id': this.state.studentSelect,
      'assignment_text': this.state.assignmentText,
      'practice_goal': this.state.practiceAmount,
    }
    // post to assignments
    fetch(`http://localhost:3000/assignments`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(json => {
        this.props.history.push('/dashboard')
      })
  }

  handleTextArea = (e) => {
    this.setState({assignmentText: e.target.value})
  }

  handlePracticeAmount = (e, { value }) => {
    this.setState({practiceAmount: value})
  }

  handleStudentSelect = (e, { value }) => {
    this.setState({studentSelect: value})
  }

  render () {

    return (
      <Form>
        <Header style={{color: 'white'}}>New Assignment</Header>
        <Dropdown
          placeholder='Select Student'
          search selection fluid
          style={{marginBottom: '2%'}}
          options={this.studentOptions()}
          onChange={this.handleStudentSelect}
        />
        <Dropdown
          placeholder='Select Practice Time'
          selection fluid
          style={{marginBottom: '2%'}}
          options={practiceAmounts}
          onChange={this.handlePracticeAmount}

        />
        <TextArea
          placeholder='Assignment Text'
          style={{ minHeight: '65vh'}}
          onChange={(e) => this.handleTextArea(e)}
        />
        <div style={{display: 'inline-block'}}>
          <Button
            inverted style={{marginTop: '3%'}}
            size='big'
            onClick={() => this.props.history.push('/dashboard')}
            content='Dashboard'
          />
          <Button
            inverted style={{marginTop: '3%'}}
            size='big'
            onClick={this.handleSend}
            content='Send'
          />
        </div>
      </Form>
    )
  }

}
