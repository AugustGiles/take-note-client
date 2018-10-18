import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Divider, Statistic, Button, Message } from 'semantic-ui-react'
import '../styles/App.css'
import { clearSelectedStudent } from '../redux/actions/selectedStudentActions'
import Navigation from './Navigation'
import ResourceCards from './ResourceCards'
import {stateToHTML} from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import Moment from 'react-moment'
import { removeErrorMessage, addErrorMessage } from '../redux/actions/errorActions'
import { removeStudent, findStudent } from '../redux/actions/fetchActions'

class StudentShow extends Component {

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/')
    } else if (this.props.id === parseInt(this.props.match.params.student, 0)){
      this.props.findStudent(this.props.match.params.student)
    } else if (localStorage.role !== 'teacher') {
      this.props.history.goBack()
    } else if (!this.props.selectedStudent){
      this.props.findStudent(this.props.match.params.student)
    }
  }

  handlePlayback = (id) => {
    let audio = document.getElementById(id)
    audio.load()
    audio.play()
  }

  getStat = () => {
    let stat = Math.floor((this.props.currentPracticeTime/this.props.goalPracticeTime)*100)
    let returnValue
    !stat ? returnValue = 0 : returnValue = stat
    return returnValue
  }

  render () {
    const convertCommentFromJSONToHTML = (text) => {
      return stateToHTML(convertFromRaw(text))
    }

    return (
      <div className='setup' >
        {this.props.studentId === parseInt(this.props.match.params.student, 0) ?
          (<React.Fragment>
            <Header
              style={{color: 'white', fontSize: '5vh', display: 'inline-block'}}>
              {this.props.username}
            </Header>

            <Navigation context={localStorage.role}/>

            <Divider inverted/>

              {localStorage.role === 'teacher' ?
                <div style={{textAlign: 'center'}}>
                  <Button icon='folder open outline' size='huge' inverted compact
                     style={{display: 'inline-block', marginTop: '1%', marginLeft: '2%', marginRight: '2%'}}
                    onClick={() => this.props.history.push(`/students/${this.props.studentId}/archive`)}
                  />
                <Button icon='write' size='huge' inverted compact
                     style={{display: 'inline-block', marginTop: '1%', marginLeft: '2%', marginRight: '2%'}}
                    onClick={() => this.props.history.push(`/createassignment`)}
                  />
                <Button icon='minus' size='huge' inverted compact

                    style={{display: 'inline-block', marginTop: '1%', marginLeft: '2%', marginRight: '2%'}}
                    onClick={() => {
                      this.props.addErrorMessage('Are you sure you want to delete this student?')
                    }}
                  />
                </div> : null
              }

            <Divider inverted/>

            {this.props.errorMessage ?
              <React.Fragment>
                <Message warning >
                  <Message.Header>
                    {this.props.errorMessage}<br></br>
                  <div style={{paddingTop: '2%'}}>
                    <Button content="Delete" style={{width: '48%', display: 'inline-block'}} size='medium'
                        onClick={() => {
                          this.props.removeStudent(parseInt(this.props.studentId, 0))
                          .then(message => {
                            this.props.addErrorMessage(message)
                            this.props.history.push('/teacherDashboard')
                          })
                        }}
                      />
                    <Button content="Nevermind" style={{width: '48%', display: 'inline-block'}} size='medium'
                      onClick={() => {
                        this.props.removeErrorMessage()
                      }}
                      />
                  </div>
                </Message.Header>
                </Message>
                <Divider inverted />
              </ React.Fragment> : null
            }

            <Statistic horizontal inverted>
              <Statistic.Value>{this.getStat()}%</Statistic.Value>
              <Statistic.Label>Practice Completion</Statistic.Label>
            </Statistic>

          <Divider inverted />

            <Header style={{color: 'white', marginBottom: '5%'}} as='h3'>
              Assigned: <Moment format="MM/DD/YYYY" date={this.props.assignmentCreated} />
            </Header>

            <p style={{color: 'white', paddingBottom: '5%'}}
              dangerouslySetInnerHTML={{ __html: convertCommentFromJSONToHTML(this.props.assignmentText)}}
            />

          {this.props.recentAssignment.recordings.length > 0 &&
            <React.Fragment >
              <Divider inverted />
              <Header as='h3' content='Recordings:' inverted />
              {this.props.recentAssignment && this.props.recentAssignment['recordings'].map(recording => {
                return (
              <div key={recording} style={{display: 'inline-block'}}>
                <audio id={recording}
                  src={`https://take-note-server.herokuapp.com/${recording}`} />
                <Button icon='play'  size='massive'
                  onClick={() => this.handlePlayback(recording)} />
              </div>)})}
            </React.Fragment>
          }

          {this.props.resources.length > 0 &&
            <React.Fragment>
              <Divider inverted />
              <ResourceCards context='view' resources={this.props.resources} youtubes={this.props.youtubes}/>
            </React.Fragment>
          }

          </React.Fragment>) : null
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
    resources: state.selectedStudent.resources,
    youtubes: state.selectedStudent.youtubes,
  }
}

export default connect(mapStateToProps, { findStudent, clearSelectedStudent, addErrorMessage, removeErrorMessage, removeStudent })(StudentShow)
