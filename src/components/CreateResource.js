import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import Navigation from './Navigation'
import { Header, Divider, Input, Button, TextArea, Form } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'
import { addResource } from '../redux/actions/userActions'

class CreateResource extends Component {

  state={
    file: null,
    disabled: false,
    title: '',
    description: '',
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({disabled: true, file: acceptedFiles})
  }

  handleSave = () => {
    let formData = new FormData()
    formData.append("title", this.state.title)
    formData.append("file", this.state.file[this.state.file.length - 1])
    formData.append("teacher_id", this.props.teacherId)
    fetch('https://take-note-server.herokuapp.com/resources', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: formData
    })
      .then(resp => resp.json())
      .then(info => {
        this.props.addResource(info)
        this.props.history.push('/viewresources')
      })
  }

  render() {
    return(
      <div className='setup' >
        <Header
          style={{color: 'white', fontSize: '5vh', display: "inline-block"}}
          content='Create A New Resource'
        />
        <Navigation context='teacher' />

        <Divider inverted />

        <Header content='Resource Title:' inverted/>
        <Input value={this.state.title} onChange={(e) => this.setState({title: e.target.value})}/>
        <Header content='Description:' inverted/>


        {!this.state.file ?
          <Dropzone onDrop={this.onDrop.bind(this)} className={'dropzone'}

            disabled={this.state.disabled}
            accept="image/jpeg, image/png, audio/mp3, audio/wav, application/pdf">
            <Header as='h3' style={{color: '#F1F1F1', fontSize: '3vh'}}
              content='Drop Your File Here or Click Here to Open Your File Manager.' />
            <Header as='h3' style={{color: '#F1F1F1'}}
              content='Accepts: .jpeg, .png, .mp3, .wav, and .pdf file types' />
          </Dropzone> :
          <Header as='h2' inverted content={this.state.file[0].name} />
        }
        {(this.state.file && this.state.title) &&
          <React.Fragment>
            <Divider inverted />
            <Button content='Save Resource' inverted size='huge' onClick={this.handleSave} />
          </React.Fragment>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    teacherId: state.user.id
  }
}

export default connect(mapStateToProps, { addResource })(CreateResource)

// <Form>
// <TextArea value={this.state.description}
//   onChange={(e) => this.setState({description: e.target.value})}/>
// </Form>
