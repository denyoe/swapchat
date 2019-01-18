import React from 'react'
import Chat from './pages/chat'
import Login from './pages/auth/login'
import './App.css'
import * as Auth from './util/Auth'

import { Button } from 'antd';

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  withRouter
} from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
          Auth.loggedIn() ? (
          <Component {...props} />
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: props.location }
              }}
            />
          )
      }
    />
  )
}

const AuthButton = withRouter(
  ({ history }) =>
    Auth.loggedIn() ? (
      <p className="welcome-msg">
        Welcome! {Auth.user().username}
        &nbsp;
        <Button
          type="primary"
          size="small"
          onClick={() => {
            Auth.logout()
            return history.push("/")
          }}
        >
          Sign out
        </Button>
      </p>
    ) : (
        <div>
          <h3 className="loginMsg">Login to get started</h3>
        </div>
      )
)

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="main-view">
          <AuthButton />
          <Route path="/" component={Login} /> 
          <PrivateRoute path="/chat" component={Chat} />
        </div>
      </Router>
    )
  }
}

export default App
