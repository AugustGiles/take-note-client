import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Divider, Statistic, Button } from 'semantic-ui-react'
import '../styles/App.css'
import { findStudent } from '../redux/actions/fetchActions'
import { clearSelectedStudent } from '../redux/actions/selectedStudentActions'

class StudentShow extends Component {

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/')
    } else if (localStorage.role !== 'teacher') {
      this.props.history.goBack()
    } else {
      this.props.findStudent(this.props.match.params.student)
    }
  }

  componentWillUnmount() {
    this.props.clearSelectedStudent()
  }

  render () {
    const stat =  Math.floor((this.props.currentPracticeTime/this.props.goalPracticeTime)*100)

    return (
      <div className='setup'>
        {this.props.username ?
          (<React.Fragment>
            <Header
              style={{color: 'white', fontSize: '5vh'}}>
              {this.props.username}
            </Header>

            <Divider inverted/>

            <Statistic horizontal inverted>
              <Statistic.Value>{stat}%</Statistic.Value>
              <Statistic.Label>Practice Completion</Statistic.Label>
            </Statistic>

            <Divider inverted/>

            <Header style={{color: 'white', marginBottom: '5%'}} as='h3'>
              Assigned: {this.props.assignmentCreated}
            </Header>

            <p style={{color: 'white'}} >{this.props.assignmentText}</p>

            <div >
              <Button
                inverted size='big'
                style={{marginTop: '3%', marginRight: '1%'}}
                onClick={() => this.props.history.push('/teacherDashboard')}
                content='Back'
              />
              <Button
                inverted style={{marginTop: '3%'}} size='big'
                onClick={() => this.props.history.push(`/createassignment`)}
                content='NewAssignment'
              />
            </div>
          </React.Fragment>) :
          null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    username: state.selectedStudent.username,
    recentAssignment: state.selectedStudent.recentAssignment,
    assignmentCreated: state.selectedStudent.assignmentCreated,
    assignmentText: state.selectedStudent.assignmentText,
    currentPracticeTime: state.selectedStudent.currentPracticeTime,
    goalPracticeTime: state.selectedStudent.goalPracticeTime,
  }
}

export default connect(mapStateToProps, { findStudent, clearSelectedStudent })(StudentShow)
