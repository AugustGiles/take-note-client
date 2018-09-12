import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import Navigation from './Navigation'
import { Header, Divider, Input, Button, TextArea, Form, Message } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import { updateResources, updateYoutubes } from '../redux/actions/userActions'
import { addErrorMessage, removeErrorMessage } from '../redux/actions/errorActions'

class CreateResource extends Component {

  state={
    file: null,
    disabled: false,
    title: '',
    description: '',
    youtube: '',
    type: 'file',
  }

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/')
    } else if (localStorage.role !== 'teacher') {
      this.props.history.goBack()
    }
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({disabled: true, file: acceptedFiles})
  }

  handleLink = () => {
    let array = this.state.youtube.split('/watch?v=')
    array.splice(1, 0, 'embed')
    return array.join('/')
  }

  handleSave = () => {
    let formData = new FormData()

    if (this.state.file) {
      formData.append("file", this.state.file[this.state.file.length - 1])
      formData.append("title", this.state.title)
      formData.append("teacher_id", this.props.teacherId)
      formData.append("description", this.state.description)

      if (this.state.file === null || this.state.title === '' || this.state.description === '') {
        this.props.addErrorMessage('Please select a file and complete all fields')
      } else {
        debugger
        fetch('https://take-note-server.herokuapp.com/resources', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: formData
        })
          .then(resp => resp.json())
          .then(info => {
            this.props.updateResources(info)
            this.props.history.push('/viewresources')
          })
      }
    } else {
      formData.append("link", this.handleLink(this.state.youtube))
      formData.append("title", this.state.title)
      formData.append("teacher_id", this.props.teacherId)
      formData.append("description", this.state.description)

      if (this.state.youtube === '' || this.state.title === '' || this.state.description === '') {
        this.props.addErrorMessage('Please select a file and complete all fields')
      } else {
        debugger
        fetch('https://take-note-server.herokuapp.com/youtubes', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body: formData
        })
          .then(resp => resp.json())
          .then(info => {
            this.props.updateYoutubes(info)
            this.props.history.push('/viewresources')
          })
      }
    }
  }

  render() {
    return(
      <div className='setup' >
        <Header
          style={{color: 'white', fontSize: '5vh', display: "inline-block"}}
          content='Create:'
        />
        <Navigation context='teacher' />
        <Button inverted style={{float: 'right'}} icon='angle left' content='Back'
          onClick={() => this.props.history.push(`/viewresources`)} />

        <Divider inverted />

        {this.props.errorMessage ?
          <Message error header={this.props.errorMessage} /> : null
        }

        <Header content='Resource Title:' inverted/>
        <Input value={this.state.title} onChange={(e) => this.setState({title: e.target.value})}/>
        <Header content='Description:' inverted/>
        <Form>
          <TextArea value={this.state.description}
            onChange={(e) => this.setState({description: e.target.value})}/>
        </Form>

        {!this.state.file ?
          <React.Fragment>
            <Divider inverted />
            <Button.Group>
              <Button content='Upload File' onClick={() => this.setState({type: 'file'})} />
              <Button.Or />
              <Button content='YouTube Link' onClick={() => this.setState({type: 'youtube'})} />
            </Button.Group>
          {this.state.type === 'file' ?
            <Dropzone onDrop={this.onDrop.bind(this)} className={'dropzone'}
              disabled={this.state.disabled}
              accept="image/jpeg, image/jpg, image/png, image/gif, audio/mp3, audio/wav, application/pdf" >
              <Header as='h3' style={{color: '#F1F1F1', fontSize: '3vh'}}
                content='Drop your file here or click to open your file manager. For best results with documents, please convert to PDF before uploading.' />
              <Header as='h3' style={{color: '#F1F1F1'}}
                content='Currently Accepting: .jpeg, .jpg, .png, .gif, .mp3, .wav, and .pdf file types' />
            </Dropzone> :
            <div>
              <Header content='YouTube Embed Link:' style={{marginTop: '3%'}} inverted as='h3' />
              <p style={{color: '#F1F1F1'}}>1. Go to youtube video of your choice and copy the link at the TOP of the page</p>
              <p style={{color: '#F1F1F1'}}>2. Paste it in the space below </p>
              <Input fluid value={this.state.youtube}
                onChange={(e) => this.setState({youtube: e.target.value})} />
            </div>

          }
          </React.Fragment> :
          <Header as='h2' inverted content={this.state.file[0].name} />
        }
        <React.Fragment>
          <Divider inverted />
          <Button content='Save Resource' inverted size='huge' onClick={() => this.handleSave()} />
        </React.Fragment>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    teacherId: state.user.id,
    errorMessage: state.error,
  }
}

export default connect(mapStateToProps, { updateResources, updateYoutubes, addErrorMessage, removeErrorMessage })(CreateResource)
