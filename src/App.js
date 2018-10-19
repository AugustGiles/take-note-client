import React, { Component } from 'react';
import { Route } from 'react-router';

import './styles/App.css'
import { fetchUser } from './redux/actions/fetchActions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Loading from './components/Loading'

import Loadable from 'react-loadable';

const AuthForm = Loadable({
  loader: () => import('./components/AuthForm'),
  loading: Loading
});

const TeacherDashboard = Loadable({
  loader: () => import ('./components/TeacherDashboard'),
  loading: Loading
})

const StudentDashboard = Loadable({
  loader: () => import('./components/StudentDashboard'),
  loading: Loading
});

const Practice = Loadable({
  loader: () => import('./containers/Practice'),
  loading: Loading
});

const StudentShow = Loadable({
  loader: () => import('./components/StudentShow'),
  loading: Loading
});

const CreateAssignment = Loadable({
  loader: () => import('./containers/CreateAssignment'),
  loading: Loading
});

const CreateStudent = Loadable({
  loader: () => import('./components/CreateStudent'),
  loading: Loading
});

const Archive = Loadable({
  loader: () => import('./components/Archive'),
  loading: Loading
});

const CreateResource = Loadable({
  loader: () => import('./components/CreateResource'),
  loading: Loading
});

const ViewResources = Loadable({
  loader: () => import('./components/ViewResources'),
  loading: Loading
});

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
