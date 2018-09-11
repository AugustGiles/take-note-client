import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateResources } from '../redux/actions/userActions'
import { Header, Button, Card, Modal } from 'semantic-ui-react'

class ResourceCards extends Component {

  state = {
    resourceAdded: false
  }

  renderResource = (file, title) => {
    let extension = file.split('.')[1]
    if (extension === 'jpeg' || extension === 'png') {
      return (
        <Modal basic size='small'
          trigger={<Button size='medium' content='Show Details' fluid/>}
          content={<img alt={title} src={`https://take-note-server.herokuapp.com${file}`} width={'100%'} height={'auto'}/>}
        />
      )
    } else if (extension === 'pdf') {
      return (
        <Modal size='large' style={{height: '90%'}}
          trigger={<Button size='medium' fluid content='Show Details' />}
          content={
            <object width="100%" height="100%" type="application/pdf" data={`https://take-note-server.herokuapp.com${file}`}>
              <iframe src="/pdf/sample-3pp.pdf#page=2" width="100%" height="100%">
                <p style={{color: '#F1F1F1'}}>This browser does not support PDFs. </p>
              </iframe>
            </object>
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

  render() {
    return(
      <React.Fragment>
      {this.state.resourceAdded === false ?
        <Card.Group centered>
          {this.props.resources && this.props.resources.map(resource => {
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
        </Card.Group> :
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
