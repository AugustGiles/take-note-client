import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import Navigation from './Navigation'
import { Header, Divider, Button } from 'semantic-ui-react'

class ViewResources extends Component {

  renderResource = (file, title) => {
    let extension = file.split('.')[1]
    if (extension === 'jpeg' || extension === 'png') {
      return <img alt={title} src={`https://take-note-server.herokuapp.com${file}`} />
    } else if (extension === 'pdf') {
      return <embed src={`https://take-note-server.herokuapp.com${file}`} />
    } else if (extension === 'mp3' || extension === 'wav') {
      return <audio src={`https://take-note-server.herokuapp.com${file}`} controls />
    }
  }

  render() {
    return(
      <div className='setup'>
        <Header style={{color: 'white', fontSize: '5vh', display: 'inline-block'}} content='Resources' />

        <Navigation context={localStorage.role}/>

        <Divider inverted/>
          <Button icon='write' size='medium' inverted
            content='Create Resource' style={{display: 'inline-block'}}
            onClick={() => this.props.history.push(`/createresource`)}
          />
        <Divider inverted/>
        {this.props.resources && this.props.resources.map(resource => {
          return (
            <div>
              <Header as='h2' content={resource.title} inverted />
              <p>{resource.description}</p>
              {this.renderResource(resource.file, resource.title)}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    resources: state.user.resources
  }
}

export default connect(mapStateToProps)(ViewResources)
