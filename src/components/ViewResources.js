import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import Navigation from './Navigation'
import { Header, Divider, Button } from 'semantic-ui-react'
import ResourceCards from './ResourceCards'

class ViewResources extends Component {

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
        <ResourceCards context="view"/>
      </div>
    )
  }
}

export default connect()(ViewResources)
