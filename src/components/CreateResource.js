import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import Navigation from './Navigation'
import { Header, Divider, Input, Button } from 'semantic-ui-react'
import Dropzone from 'react-dropzone'

class CreateResource extends Component {

  state={
    file: null,
    disabled: false,
    title: ''
  }

  onDrop = (acceptedFiles, rejectedFiles) => {
    this.setState({disabled: true, file: acceptedFiles})
    debugger
  }

  handleSave = () => {
    let formData = new FormData()
    formData.append("title", this.state.title)
    formData.append("file", this.state.file)
    formData.append("teacherId", this.props.teacherId)
    debugger
    fetch('https://take-note-server.herokuapp.com/resources', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: formData
    })
      .then(message => {
        debugger
        console.log(message)
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
        {!this.state.file ?
          <Dropzone onDrop={this.onDrop.bind(this)} className={'dropzone'}
          disabled={this.state.disabled}>
            <p>Drop Your File Here or Open from Finder.</p>
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
  teacherId: state.user.id
}

export default connect()(CreateResource)
