import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Divider, Statistic, Button, Message } from 'semantic-ui-react'
import '../styles/App.css'
import { findStudent } from '../redux/actions/fetchActions'
import { clearSelectedStudent } from '../redux/actions/selectedStudentActions'
import Navigation from './Navigation'
import {stateToHTML} from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import Moment from 'react-moment'
import { removeErrorMessage, addErrorMessage } from '../redux/actions/errorActions'
import { removeStudent } from '../redux/actions/fetchActions'

class StudentShow extends Component {

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/')
    } else if (this.props.id === parseInt(this.props.match.params.student, 0)){
      this.props.findStudent(this.props.match.params.student)
    } else if (localStorage.role !== 'teacher') {
      this.props.history.goBack()
    } else {
      this.props.findStudent(this.props.match.params.student)
    }
  }

  render () {
    const stat = Math.floor((this.props.currentPracticeTime/this.props.goalPracticeTime)*100)

    const convertCommentFromJSONToHTML = (text) => {
      return stateToHTML(convertFromRaw(text))
    }

    return (
      <div className='setup'>
        {this.props.username ?
          (<React.Fragment>
            <Header
              style={{color: 'white', fontSize: '5vh', display: 'inline-block'}}>
              {this.props.username}
            </Header>

            <Navigation context={localStorage.role}/>

            <Divider inverted/>

              {localStorage.role === 'teacher' ?
                <div>
                  <Button icon='folder open outline' size='medium' inverted
                    content='Archive' style={{display: 'inline-block'}}
                    onClick={() => this.props.history.push(`/students/${this.props.studentId}/archive`)}
                  />
                  <Button icon='write' size='medium' inverted
                    content='Write Assignment' style={{display: 'inline-block'}}
                    onClick={() => this.props.history.push(`/createassignment`)}
                  />
                </div> : null
              }

            <Divider inverted/>

              <Statistic horizontal inverted>
                <Statistic.Value>{stat}%</Statistic.Value>
                <Statistic.Label>Practice Completion</Statistic.Label>
              </Statistic>

            <Divider inverted />

            {this.props.errorMessage ?
              <Message warning >
                <Message.Header>
                  {this.props.errorMessage}
                  <Button content="Delete" style={{marginLeft: '10%', marginTop: '5%', marginBottom: '5%'}} size='medium'
                    onClick={() => {
                      this.props.removeStudent(parseInt(this.props.studentId, 0))
                      .then(message => {
                        this.props.addErrorMessage(message)
                        this.props.history.push('/teacherDashboard')
                      })
                    }}
                  />
                  <Button content="Nevermind" style={{marginLeft: '10%'}} size='medium'
                    onClick={() => {
                      this.props.removeErrorMessage()
                    }}
                  />
              </Message.Header>
              </Message> : null
            }

            <Header style={{color: 'white', marginBottom: '5%'}} as='h3'>
              Assigned: <Moment format="MM/DD/YYYY" date={this.props.assignmentCreated} />
            </Header>

            <p style={{color: 'white', paddingBottom: '5%'}}
              dangerouslySetInnerHTML={{ __html: convertCommentFromJSONToHTML(this.props.assignmentText)}}
            />

          {this.props.recentAssignment && this.props.recentAssignment['recordings'].map(recording => {

              return <audio key={recording} src={`https://take-note-server.herokuapp.com/${recording}`}
                controls style={{padding: '2%'}}
                />
            })}

            {localStorage.role === 'teacher' ?
              <div>
                <Button icon='minus' size='medium' inverted
                  content='Remove Student'
                  style={{display: 'inline-block'}}
                  onClick={() => {
                    this.props.addErrorMessage('Are you sure you want to delete?')
                  }}
                />
              </div> : null
            }

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
    id: state.user.id,
    errorMessage: state.error,
    studentId: state.selectedStudent.id,
  }
}

export default connect(mapStateToProps, { findStudent, clearSelectedStudent, addErrorMessage, removeErrorMessage, removeStudent })(StudentShow)
