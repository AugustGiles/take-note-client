import React, { Component } from 'react';
import { Route } from 'react-router';

import './styles/App.css'
import Practice from './containers/Practice'
import Dashboard from './containers/Dashboard'
import CreateAssignment from './containers/CreateAssignment'
import StudentShow from './components/StudentShow'
import AuthForm from './components/AuthForm'

class App extends Component {

  state = {
    user: null,
    currentPracticeTime: null,
    students: [],
    recentAssignment: null,
    items: [],
    loggedIn: false,
  }

  // componentDidMount() {
  //   this.state.loggedIn &&
  //     this.fetchUser()
  // }

  // Make new route
  fetchUser = () => {
    fetch(`http://localhost:3000/profile`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(resp=>resp.json())
      .then(user => {
        // set relevant state for a student user
        if (user.teacher) {
          this.setState({
            user: user,
            recentAssignment: this.findMostRecentAssignment(user.givenAssignments),
            currentPracticeTime: this.findMostRecentAssignment(user.givenAssignments)['current_practice_time'],
            items: [{header: 'Current Assignment (inactive)'}, {header: 'Assignment Archive (inactive)'}]
          })

        // set relevant state for a teacher user
        } else {
          this.setState({
            user: user,
            students: user.students,
          })
        }

      })
  }

  handleUserLogin = (userInfo) => {
    fetch ('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then(resp => resp.json())
      .then(json => {

        if (!json.success) {
          throw "Incorrect Username or Password"
        }
        localStorage.setItem('token',json.token)
        this.setState({loggedIn:true})
        this.fetchUser()
      })
  }

  handleUserSignUp = (userInfo) => {
    fetch ('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInfo)
    })
      .then(resp => resp.json())
      .then(json => {
        debugger
        if (!json.success) {
          throw "Incorrect Username or Password"
        }
        localStorage.setItem('token',json.token)
        this.setState({loggedIn:true})
        this.fetchUser()
      })
  }

  findMostRecentAssignment = (array) => {
    return array.sort(function(a,b) {
      return b.id - a.id
    })[0]
  }

  handleAddTime = (assignment) => {
    this.setState({currentPracticeTime: assignment['current_practice_time']})
  }

  handleLogout = () => {
    this.setState({loggedIn: false})
  }

  render() {
    return (
      <div className='App'>

        <Route
          exact path='/'
          render={(props) => {
            return (
              <div style={{height: '100%', width: '100%'}}>
                <AuthForm
                  {...props}
                  context={'login'}
                  handleSubmit={this.handleUserLogin}
                />
              </div>
            )
          }}
        />

        <Route
          exact path='/signup'
          render={(props) => {
            return (
              <div style={{height: '100%', width: '100%'}}>
                <AuthForm
                  {...props}
                  context={'signup'}
                  handleSubmit={this.handleUserSignUp}
                />
              </div>
            )
          }}
        />

        <Route
          exact path="/dashboard"
          render={(props) => {
            return (
              <div style={{height: '100%', width: '100%'}}>
                <Dashboard
                  {...props}
                  assignment={this.state.recentAssignment}
                  items={this.state.items}
                  currentPracticeTime={this.state.currentPracticeTime}
                  user={this.state.user}
                  students={this.state.students}
                  fetchUser={this.fetchUser}
                  handleLogout={this.handleLogout}
                />
              </div>
            )
          }}
        />

        <Route
          exact path="/createassignment"
          render={(props) => {
            return (
              <div className='setup'>
                <CreateAssignment
                  {...props}
                  students={this.state.students}
                />
              </div>

            )
          }}
        />

        <Route
          exact path="/practice"
          render={(props) => {
            return <Practice
              {...props}
              recentAssignment={this.state.recentAssignment}
              handleAddTime={this.handleAddTime}
            />
          }}
        />

        <Route
          exact path="/students/:student"
          render={(props) => {
            return (
              <div style={{height: '100%', width: '100%'}}>
                <StudentShow
                  {...props}
                  findMostRecentAssignment={this.findMostRecentAssignment}
                />
              </div>
            )
          }}
        />

      </ div>
    );
  }
}

export default App;
