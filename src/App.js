import React, { Component } from 'react';
import { Route } from 'react-router';

import './styles/App.css'
import Practice from './containers/Practice'
import StudentDashboard from './components/StudentDashboard'
import TeacherDashboard from './components/TeacherDashboard'
import CreateAssignment from './containers/CreateAssignment'
import StudentShow from './components/StudentShow'
import AuthForm from './components/AuthForm'
import CreateStudent from './components/CreateStudent'
import Archive from './components/Archive'
import CreateResource from './components/CreateResource'
import ViewResources from './components/ViewResources'
import { fetchUser } from './redux/actions/fetchActions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


class App extends Component {

  componentDidMount() {
    if (localStorage.token){
      this.props.fetchUser()
    }
  }

  render() {
    return (
      <div className='App'>

        <Route
          exact path='/'
          render={(props) => <AuthForm {...props} context={'login'} /> }
        />

        <Route
          exact path='/signup'
          render={(props) => <AuthForm {...props} context={'signup'}/> }
        />

        <Route
          exact path="/studentDashboard"
          render={(props) => <StudentDashboard {...props} /> }
        />

        <Route
          exact path="/teacherDashboard"
          render={(props) => <TeacherDashboard {...props}/> }
        />

        <Route
          exact path="/createassignment"
          render={(props) => <CreateAssignment {...props} /> }
        />

        <Route
          exact path='/createstudent'
          render={(props) => <CreateStudent {...props} /> }
        />

        <Route
          exact path='/createresource'
          render={(props) => <CreateResource {...props} />}
        />

        <Route
          exact path='/viewresources'
          render={(props) => <ViewResources {...props} />}
        />

        <Route
          exact path="/practice"
          render={(props) => <Practice {...props} /> }
        />

        <Route
          exact path="/students/:student"
          render={(props) => <StudentShow {...props} /> }
        />

        <Route exact path='/students/:student/archive'
          render={(props) => <Archive {...props} /> }
        />

      </ div>
    )
  }
}

export default withRouter(connect(null, { fetchUser })(App));
