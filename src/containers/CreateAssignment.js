import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Dropdown, TextArea, Button, Header } from 'semantic-ui-react'

import { practiceAmounts } from '../data/practiceAmounts'
import { assignHomework } from '../redux/actions/fetchActions'
import Navigation from '../components/Navigation'

class CreateAssignment extends Component {

  state = {
    assignmentText: '',
    studentSelect: 0,
    practiceAmount: 0,
  }

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/login')
    } else if (localStorage.role !== 'teacher') {
      this.props.history.goBack()
    }
  }

  studentOptions = () => {
    return this.props.students.map(student => {
      return {key: student.id, value: student.id, text: student.username}
    })
  }

  handleSend = () => {
    let data = {
      'teacher_id': this.props.id,
      'student_id': this.state.studentSelect,
      'assignment_text': this.state.assignmentText,
      'practice_goal': this.state.practiceAmount,
    }
    this.props.assignHomework(data)
      .then(this.props.history.push('/teacherDashboard'))
  }

  handleTextArea = (e) => {this.setState({assignmentText: e.target.value})}
  handlePracticeAmount = (e, { value }) => {this.setState({practiceAmount: value})}
  handleStudentSelect = (e, { value }) => {this.setState({studentSelect: value})}

  render () {

    return (
      <div className='setup'>
        <Header content='Assignment'
          style={{color: 'white', display: "inline-block", fontSize: '4vh', paddingBottom: '2%'}}
        />
        <Navigation context='teacher'/>

        <Form>
          <Dropdown
            placeholder='Select Student'
            search selection fluid
            style={{marginBottom: '2%'}}
            options={this.props.students && this.studentOptions()}
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
            style={{ minHeight: '60vh' }}
            onChange={(e) => this.handleTextArea(e)}
          />
          <Button
            inverted fluid style={{marginTop: '3%'}}
            size='big'
            type='submit'
            onClick={this.handleSend}
            content='Send'
          />
        </Form>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    students: state.user.students,
    id: state.user.id
  }
}

export default connect(mapStateToProps, { assignHomework })(CreateAssignment)
