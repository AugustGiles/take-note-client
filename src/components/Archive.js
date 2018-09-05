import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, Header } from 'semantic-ui-react'
import Moment from 'react-moment'
import {stateToHTML} from 'draft-js-export-html';
import { convertFromRaw } from 'draft-js';
import { findStudent } from '../redux/actions/fetchActions'
import Navigation from './Navigation'

class Archive extends Component {

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/login')
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
            <Divider inverted />
            <Header style={{color: 'white', marginBottom: '5%'}} as='h2'>
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
        <Header as='h1' style={{color: 'white', fontSize: '5vh', display: 'inline-block'}} content='Archive:' />
        <Navigation context={localStorage.role}/>
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
  }
}

export default connect(mapStateToProps, { findStudent })(Archive)
