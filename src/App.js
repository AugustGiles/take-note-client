import React, { Component } from 'react';
import { Route } from 'react-router';

import './styles/App.css'
import Practice from './containers/Practice'
import Dashboard from './containers/Dashboard'

class App extends Component {

  state = {
    user: null,
    recentAssignment: null,
    time: null
  }

  componentDidMount() {
    fetch(`http://localhost:3000/users/2`)
      .then(resp=>resp.json())
      .then(user => {
        this.setState({
          user: user,
          recentAssignment: user.givenAssignments[user.givenAssignments.length -1],
          time: user.givenAssignments[user.givenAssignments.length -1]['current_practice_time']
        })
      })
  }

  handleAddTime = (timeInSeconds) => {
    this.setState({time: timeInSeconds})
  }


  render() {


    return (
        <div >
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
