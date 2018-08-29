import React, { Component } from 'react';
import { Route } from 'react-router';

import './styles/App.css'
import Practice from './containers/Practice'
import Dashboard from './containers/Dashboard'
import CreateAssignment from './containers/CreateAssignment'

class App extends Component {

  state = {
    user: null,
    time: null,
    students: [],
    recentAssignment: null,
  }

  componentDidMount() {
    fetch(`http://localhost:3000/users/1`)
      .then(resp=>resp.json())
      .then(user => {
        if (user.teacher) {
          this.setState({
            user: user,
            recentAssignment: user.givenAssignments[user.givenAssignments.length -1],
            time: user.givenAssignments[user.givenAssignments.length -1]['current_practice_time'],
          })
        } else {
          this.setState({
            user: user,
            students: user.students,
          })
        }
      })
  }

  handleAddTime = (timeInSeconds) => {
    this.setState({time: timeInSeconds})
  }

  render() {
    return (
      <div >
        <Route
          exact path="/createassignment"
          render={(props) => {
            return <CreateAssignment
              {...props}
              students={this.state.students}
            />
          }}
        />
        <Route exact path="/dashboard" component={() => <Dashboard />} />
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
      </ div>
    );
  }
}

export default App;
