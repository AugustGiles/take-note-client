import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, Header, Button } from 'semantic-ui-react'
import Moment from 'react-moment'
import {stateToHTML} from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import { findStudent } from '../redux/actions/fetchActions'
import Navigation from './Navigation'

class Archive extends Component {

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/')
    } else if (this.props.studentId === parseInt(this.props.match.params.student, 0)){
      this.props.findStudent(this.props.match.params.student)
    } else if (localStorage.role !== 'teacher') {
      this.props.history.goBack()
    } else {
      this.props.findStudent(this.props.match.params.student)
    }
  }

  renderAssignments = (convertCommentFromJSONToHTML) => {
    if (this.props.allAssignments) {
      let sortedAssignments = this.props.allAssignments.sort((a,b) => b.id - a.id)
      return sortedAssignments.map(assignment => {
        return (
          <div key={assignment.id}>
            <Header style={{color: 'white', marginBottom: '5%'}} as='h3'>
              Assigned: <Moment format="MM/DD/YYYY" date={assignment["created_at"]} />
            </Header>
            <p style={{color: 'white', paddingBottom: '5%'}}
              dangerouslySetInnerHTML={{ __html: convertCommentFromJSONToHTML(assignment["assignment_text"])}}
            />
            <Divider inverted />
          </div>
        )
      })
    }
  }

  render() {
    const convertCommentFromJSONToHTML = (text) => {
      return stateToHTML(convertFromRaw(text))
    }

    return (
      <div className='setup'>
        <Header as='h1' style={{color: 'white', fontSize: '5vh', display: 'inline-block'}} content={`${this.props.studentUsername}`} />
        <Navigation context={localStorage.role}/>
        <Divider inverted />
        {localStorage.role === 'teacher' ?
          <div>
            <Button icon='user outline' size='medium' inverted
              content='Student Main' style={{display: 'inline-block', marginTop: '1%'}}
              onClick={() => this.props.history.push(`/students/${this.props.id}`)}
            />
            <Button icon='write' size='medium' inverted
                content='Write Assignment' style={{display: 'inline-block', marginTop: '1%'}}
                onClick={() => this.props.history.push(`/createassignment`)}
              />
            <Button icon='minus' size='medium' inverted
              content='Remove Student'
              style={{display: 'inline-block', marginTop: '1%'}}
              onClick={() => {
                this.props.addErrorMessage('Are you sure you want to delete?')
              }}
            />
          </div> : null
        }
        <Divider inverted />
        {this.renderAssignments(convertCommentFromJSONToHTML)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    id: state.selectedStudent.id,
    studentId: state.user.id,
    allAssignments: state.selectedStudent.allAssignments,
    role: state.user.role,
    studentUsername: state.selectedStudent.username,
  }
}

export default connect(mapStateToProps, { findStudent })(Archive)
