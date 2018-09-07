import React, { Component } from 'react'
import { Button, Modal, Header } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { removeUser } from '../redux/actions/userActions'

class Navigation extends Component {

  handleLogoutButton = () => {
    localStorage.clear()
    this.props.removeUser()
  }

  render() {

    return (
      <Modal
        trigger={<Button icon='list ul' size='medium' inverted style={{display: 'inline-block', float:'right'}}/>}
        size='tiny' basic centered={false}
        content={
          this.props.context === 'teacher' ?
          <div style={{textAlign: 'center'}}>
            <div style={{display: 'inline-block', margin: '5%', textAlign: 'center'}}>
              <Button as={Link} to='/teacherDashboard' size='massive' icon='home'/>
              <Header as='h3' content='Dashboard' style={{color: 'white'}} />
            </div>
            <div style={{display: 'inline-block', margin: '5%', textAlign: 'center'}}>
              <Button as={Link} to='/createassignment' size='massive' icon='write'/>
              <Header as='h3' content='Assignment' style={{color: 'white'}} />
            </div>
            <div style={{display: 'inline-block', margin: '5%', textAlign: 'center'}}>
              <Button size='massive' icon='hand peace outline' as={Link} to='/'
                onClick={this.handleLogoutButton}  />
              <Header as='h3' content='Logout' style={{color: 'white'}} />
            </div>
          </div> :
          <div style={{textAlign: 'center'}}>
            <div style={{display: 'inline-block', margin: '5%', textAlign: 'center'}}>
              <Button as={Link} to='/studentDashboard' size='massive' icon='home'/>
              <Header as='h3' content='Dashboard' style={{color: 'white'}} />
            </div>
            <div style={{display: 'inline-block', margin: '5%', textAlign: 'center'}}>
              <Button as={Link} to='/practice' size='massive' icon='music'/>
              <Header as='h3' content='Practice' style={{color: 'white'}} />
            </div>
            <div style={{display: 'inline-block', margin: '5%', textAlign: 'center'}}>
              <Button as={Link} to={`/students/${this.props.id}`} size='massive' icon='file alternate'/>
              <Header as='h3' content='Homework' style={{color: 'white'}} />
            </div>
            <div style={{display: 'inline-block', margin: '5%', textAlign: 'center'}}>
              <Button as={Link} to={`/students/${this.props.id}/archive`} size='massive' icon='folder open outline'/>
              <Header as='h3' content='Archive' style={{color: 'white'}} />
            </div>
            <div style={{display: 'inline-block', margin: '5%', textAlign: 'center'}}>
              <Button size='massive' icon='hand peace outline' as={Link} to='/'
                onClick={this.handleLogoutButton}  />
              <Header as='h3' content='Logout' style={{color: 'white'}} />
            </div>
          </div>
        }
      />
    )
  }

}

const mapStateToProps = state => {
  return {
    id: state.user.id,
  }
}

export default connect (mapStateToProps, { removeUser })(Navigation)
