import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Dropdown, Button, Header, Modal, Divider, Message } from 'semantic-ui-react'
import { EditorState, convertToRaw } from 'draft-js'
import { Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import '../styles/App.css'
import { practiceAmounts } from '../data/practiceAmounts'
import { assignHomework, findStudent } from '../redux/actions/fetchActions'
import { addErrorMessage, removeErrorMessage } from '../redux/actions/errorActions'
import Navigation from '../components/Navigation'
import ResourceCards from '../components/ResourceCards'

class CreateAssignment extends Component {

  state = {
    editorState: EditorState.createEmpty(),
    practiceAmount: 0,
    resources: [],
    youtubes: [],
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

  componentWillUnmount() {
    this.props.removeErrorMessage()
  }

  handleSend = () => {
    let data = {
      'teacher_id': this.props.id,
      'student_id': this.props.selectedStudentId,
      'assignment_text': convertToRaw(this.state.editorState.getCurrentContent()),
      'practice_goal': this.state.practiceAmount,
      'resources': this.state.resources,
      'youtubes': this.state.youtubes
    }

    if (data["assignment_text"].blocks[0].text === '' || this.state.practiceAmount === 0) {
      this.props.addErrorMessage('Both text and practice time must be sent')
    } else {
      this.props.assignHomework(data)
        .then(this.props.findStudent(this.props.selectedStudentId))
        .then(this.props.history.push(`/students/${this.props.selectedStudentId}`))
    }
  }

  handlePracticeAmount = (e, { value }) => {this.setState({practiceAmount: value})}


  addResource = (resource) => {
    this.setState({resources: [...this.state.resources, resource]})
  }

  addYoutube = (youtube) => {
    this.setState({youtubes: [...this.state.youtubes, youtube]})
  }

  removeResource = (resource) => {
    let index = this.state.resources.indexOf(resource)
    let resources = this.state.resources
    resources.splice(index, 1)
    this.setState({resources: resources})
  }

  removeYoutube = (youtube) => {
    let index = this.state.youtubes.indexOf(youtube)
    let youtubes = this.state.youtubes
    youtubes.splice(index, 1)
    this.setState({youtubes: youtubes})
  }

  render () {

    return (
      <div className='setup'>
        <Header content={`Assignment for ${this.props.selectedStudentUsername}`}
          style={{color: 'white', display: "inline-block", fontSize: '4vh', paddingBottom: '2%'}}
        />
        <Navigation context='teacher'/>
        <Divider inverted />
          <div>
            <Button inverted size='medium' type='submit' icon='send'
              onClick={this.handleSend} content='Send'
            />
          <Modal basic size='large'
              trigger={<Button size='medium' icon='paperclip' inverted content='Attach Resource' />}
              content={<ResourceCards context="assignment"
                addResource={this.addResource} addYoutube={this.addYoutube}
                resources={this.props.resources} youtubes={this.props.youtubes} search={true} />}
            />
          </div>
        <Divider inverted />
        {this.props.errorMessage ?
          <Message error header={this.props.errorMessage} /> : null
        }
        {(this.state.resources.length > 0 || this.state.youtubes.length > 0) ?
          <React.Fragment>
            <Header as='h4' content='Resources:' inverted/>
            {this.state.resources.map(resource => {
              return (
                <div style={{display: 'inline-block', marginRight: '3%'}} key={resource.title}>
                  <Button size="small" icon="delete" inverted content={resource.title}
                    onClick={() => this.removeResource(resource)} />
                </div>
              )
            })}
            {this.state.youtubes.map(youtube => {
              return (
                <div style={{display: 'inline-block', marginRight: '3%'}} key={youtube.title}>
                  <Button size="small" icon="delete" inverted content={youtube.title}
                    onClick={() => this.removeYoutube(youtube)} />
                </div>
              )
            })}
            <Divider inverted />
          </React.Fragment> : null
        }
        <Form>
          <Dropdown
            placeholder='Select Practice Time'
            selection fluid
            style={{marginBottom: '2%', zIndex: '100'}}
            options={practiceAmounts}
            onChange={this.handlePracticeAmount}
          />
          <div style={{height: '45vh', width: '100%'}}>
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
    resources: state.user.resources,
    youtubes: state.user.youtubes,
    errorMessage: state.error
  }
}

export default connect(mapStateToProps, { assignHomework, findStudent, addErrorMessage, removeErrorMessage })(CreateAssignment)
