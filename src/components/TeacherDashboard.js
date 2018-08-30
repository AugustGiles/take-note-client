import React, { Component } from 'react'
import { Header, Button, Divider } from 'semantic-ui-react'
import '../styles/App.css'


export default class TeacherDashboard extends Component {

  render () {

    return (
      <div className='setup' >
        <div >
          <Header
            style={{color: 'white', fontSize: '5vh', display: "inline-block"}}
          >
          {this.props.user.username}
          </Header>
          <Button inverted content='Logout'
            onClick={this.props.handleLogout}
            style={{display: 'inline-block', float:'right'}}
          />
        </div>
        <Divider inverted/>
        <Header style={{color: 'white', fontSize: '3vh'}} >Students:</Header>

        {this.props.students && this.props.students.map(student => {
          return (
            <Button
              key={student.id}
              inverted fluid style={{marginTop: '3%'}}
              size='huge'
              onClick={() => this.props.handleStudentShowRoute(student.id)}
              content={student.username}
            />
          )
        })}
      </div>
    )
  }
}
