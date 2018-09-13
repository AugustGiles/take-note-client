import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import Navigation from './Navigation'
import { Header, Divider, Button } from 'semantic-ui-react'
import ResourceCards from './ResourceCards'

class ViewResources extends Component {

  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push('/')
    } else if (localStorage.role !== 'teacher') {
      this.props.history.goBack()
    }
  }

  combinedResources = () => {
    let array = []
    if (this.props.resources && this.props.youtubes) {
      this.props.resources.forEach(resource => array.push(resource))
      this.props.youtubes.forEach(youtube => array.push(youtube))
    }
    return array
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


        {this.combinedResources().length > 0 ?
          <ResourceCards context="view" resources={this.props.resources}
            youtubes={this.props.youtubes} search={true}/> :
          <Header as='h2' style={{textAlign: 'center', padding: '10%'}} inverted content='No Resources To Show Yet' />
        }

      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    resources: state.user.resources,
    youtubes: state.user.youtubes,
  }
}

export default connect(mapStateToProps)(ViewResources)
