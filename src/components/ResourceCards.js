import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateResources } from '../redux/actions/userActions'
import { Header, Button, Card, Modal, Input } from 'semantic-ui-react'

class ResourceCards extends Component {

  state = {
    resourceAdded: false,
    searchTerm: '',
  }

  renderResource = (file, title) => {
    let extension
    if (file.includes('/embed/')) {
      extension = 'youtube'
    } else {
      extension = file.split('.')[1]
    }

    if (extension === 'jpeg' || extension === 'png' || extension === 'jpg' || extension === 'gif') {
      return (
        <Modal basic size='small'
          trigger={<Button size='medium' content='Show Details' fluid/>}
          content={<img alt={title} src={`https://take-note-server.herokuapp.com${file}`} width={'100%'} height={'auto'}/>}
        />
      )
    } else if (extension === 'pdf') {
      return (
        <Modal size='small'
          trigger={<Button size='medium' fluid content='Show Details' />}
          content={
            <iframe
              src={`https://docs.google.com/viewer?url=https://take-note-server.herokuapp.com${file}&embedded=true`} style={{width:'100%', height:'80vh'}} frameborder="0">
              <p style={{color: '#F1F1F1'}}>PDF is not available on your device.</p>
            </iframe>
          }
        />
      )
    } else if (extension === 'mp3' || extension === 'wav') {
      return (
        <Modal basic size='mini'
          trigger={<Button size='medium' content='Show Details' fluid/>}
          content={<audio src={`https://take-note-server.herokuapp.com${file}`} controls />}
        />
      )
    } else if (extension === 'youtube') {
      return (
        <Modal basic size='small'
          trigger={<Button size='medium' content='Show Details' fluid/>}
          content={
            <iframe width="560" height="315" src={`${file}`} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          }
        />
      )
    }
  }

  handleDelete = (id) => {
    fetch(`https://take-note-server.herokuapp.com/resources/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then(resp => resp.json())
      .then(json => this.props.updateResources(json))
  }

  handleSelect = (resource) => {
    this.setState({resourceAdded: true})
    this.props.addResource(resource)
  }

  filterResources = (resources) => {
    return resources.filter(resource => {
      return resource.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
    })
  }

  render() {
    return(
      <React.Fragment>
      {this.state.resourceAdded === false ?
        <React.Fragment>
          {this.props.search &&
            <React.Fragment>
              <Header as='h3' content="Quick Search:" inverted
                style={{display: 'inline-block', marginRight: '2%'}} />
              <Input value={this.state.searchTerm} style={{marginBottom: '2%', display: 'inline-block'}}
                onChange={(e) => this.setState({searchTerm: e.target.value})}
              />
            </React.Fragment>
          }
          <Card.Group >
            {this.props.resources && this.filterResources(this.props.resources).map(resource => {
              // debugger
              return (
                <Card>
                  <Card.Content header={resource.title} />
                  <Card.Content description={resource.description} />
                  <Card.Content extra>
                    {this.renderResource(resource.file, resource.title)}
                    {(this.props.context === 'view' && this.props.role === 'teacher') &&
                      <Button icon='delete' size='medium' fluid
                        content='Remove' style={{display: 'inline-block', marginTop: '2%'}}
                        onClick={() => this.handleDelete(resource.id)}
                      /> }
                    {(this.props.context === 'assignment' && this.props.role === 'teacher') &&
                      <Button icon='add' size='small' content='Add To Assignment' fluid
                        style={{display: 'inline-block', marginTop: '2%'}}
                        onClick={() => this.handleSelect(resource)}
                      /> }

                  </Card.Content>
                </Card>
              )
            })}
            {this.props.youtubes && this.filterResources(this.props.youtubes).map(link => {
              // debugger
              return (
                <Card>
                  <Card.Content header={link.title} />
                  <Card.Content description={link.description} />
                  <Card.Content extra>
                    {this.renderResource(link.link, link.title)}
                    {(this.props.context === 'view' && this.props.role === 'teacher') &&
                      <Button icon='delete' size='medium' fluid
                        content='Remove' style={{display: 'inline-block', marginTop: '2%'}}
                        onClick={() => console.log('remove')}
                      /> }
                    {(this.props.context === 'assignment' && this.props.role === 'teacher') &&
                      <Button icon='add' size='small' content='Add To Assignment' fluid
                        style={{display: 'inline-block', marginTop: '2%'}}
                        onClick={() => console.log('select')}
                      /> }

                  </Card.Content>
                </Card>
              )
            })}
          </Card.Group>
        </React.Fragment> :
        <Header inverted content={`Selected!`} />
      }
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    role: state.user.role
  }
}

export default connect(mapStateToProps, { updateResources })(ResourceCards)
