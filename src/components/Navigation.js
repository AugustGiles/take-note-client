import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
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
        trigger={<Button icon='list ul' size='big' inverted style={{display: 'inline-block', float:'right'}}/>}
        size='tiny' basic centered={false}
        content={
          this.props.context === 'teacher' ?
          <div style={{textAlign: 'center'}}>
            <Button as={Link} to='/teacherDashboard' size='massive' icon='home'
              content='Dashboard' style={{marginTop: '5%'}}/><br/>
            <Button as={Link} to='/createassignment' size='massive' icon='write'
              content='Create Assignment' style={{marginTop: '5%'}}/><br/>
            <Button size='massive' icon='hand peace outline' as={Link} to='/login' content='Logout'
              style={{marginTop: '5%'}} onClick={this.handleLogoutButton}  /><br/>
          </div> :
          <div style={{textAlign: 'center'}}>
            <Button as={Link} to='/studentDashboard' size='massive' icon='home'
              content='Dashboard' style={{marginTop: '5%'}}/><br/>
            <Button as={Link} to='/practice' size='massive' icon='music'
              content='Practice' style={{marginTop: '5%'}}/><br/>
            <Button as={Link} to={`/students/${this.props.id}`} size='massive' icon='file alternate'
               style={{marginTop: '5%'}} content='Homework'/><br/>
            <Button size='massive' icon='hand peace outline' as={Link} to='/login'
              content='Logout' style={{marginTop: '5%'}} onClick={this.handleLogoutButton}/><br/>
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
