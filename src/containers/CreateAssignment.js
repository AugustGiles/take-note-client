import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Dropdown, Button, Header } from 'semantic-ui-react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import '../styles/App.css'
import { practiceAmounts } from '../data/practiceAmounts'
import { assignHomework } from '../redux/actions/fetchActions'
import Navigation from '../components/Navigation'

class CreateAssignment extends Component {

  state = {
    editorState: EditorState.createEmpty(),
    practiceAmount: 0,
  }

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/')
    } else if (localStorage.role !== 'teacher') {
      this.props.history.goBack()
    } else if (this.props.selectedStudentId === undefined) {
      this.props.history.push('/teacherdashboard')
    }
  }

  // studentOptions = () => {
  //   return this.props.students.map(student => {
  //     return {key: student.id, value: student.id, text: student.username}
  //   })
  // }

  handleSend = () => {
    let data = {
      'teacher_id': this.props.id,
      'student_id': this.props.selectedStudentId,
      'assignment_text': convertToRaw(this.state.editorState.getCurrentContent()),
      'practice_goal': this.state.practiceAmount,
    }
    this.props.assignHomework(data)
      .then(this.props.history.push(`/students/${this.props.selectedStudentId}`))
  }

  handlePracticeAmount = (e, { value }) => {this.setState({practiceAmount: value})}
  // handleStudentSelect = (e, { value }) => {this.setState({studentSelect: value})}

  render () {

    return (
      <div className='setup'>
        <Header content={`Assignment for ${this.props.selectedStudentUsername}`}
          style={{color: 'white', display: "inline-block", fontSize: '4vh', paddingBottom: '2%'}}
        />
        <Navigation context='teacher'/>
        <div style={{marginBottom: '3%'}}>
          <Button inverted size='medium' type='submit' icon='send'
            onClick={this.handleSend} content='Send'
          />
        </div>
        <Form>
          <Dropdown
            placeholder='Select Practice Time'
            selection fluid
            style={{marginBottom: '2%', zIndex: '100'}}
            options={practiceAmounts}
            onChange={this.handlePracticeAmount}
          />
          <div style={{height: '50vh', width: '100%'}}>
            <Editor
              editorState={this.state.editorState}
              wrapperClassName="wrapper"
              toolbarClassName="toolbar"
              editorClassName="editor"
              onEditorStateChange={(editorState) => this.setState({editorState})}
              toolbar={{
                options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'history'],
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                history: { inDropdown: true },
              }}
            />
          </div>
        </Form>

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    students: state.user.students,
    id: state.user.id,
    selectedStudentUsername: state.selectedStudent.username,
    selectedStudentId: state.selectedStudent.id,
  }
}

export default connect(mapStateToProps, { assignHomework })(CreateAssignment)

// <Dropdown
//   placeholder='Select Student'
//   search selection fluid
//   style={{marginBottom: '2%', zIndex: '105'}}
//   options={this.props.students && this.studentOptions()}
//   onChange={this.handleStudentSelect}
// />
