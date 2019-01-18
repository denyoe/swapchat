import React from 'react'
import Chat from './pages/chat'
import Login from './pages/auth/login'
import './App.css'
import { apiClient } from './util/ApiClient'
import * as Auth from './util/Auth'

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

// const PrivateRoute = ({ component: Component, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={props =>
//         Auth.loggedIn() ? (
//           <Component {...props} />
//         ) : (
//             <Redirect
//               to={{
//                 pathname: "/",
//                 state: { from: props.location }
//               }}
//             />
//           )
//       }
//     />
//   )
// }
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
      <p>
        Welcome! {Auth.user().username}
        <button
          onClick={() => {
            Auth.logout()
            return history.push("/")
          }}
        >
          Sign out
        </button>
      </p>
    ) : (
        <h3 className="loginMsg">Login to get started</h3>
      )
)

class App extends React.Component {

  componentDidMount() {
    // Auth
    // .login('marcus', 'password')
    // .then(() => {
    //   console.info('logged in')
    //   apiClient()
    // })
    // .catch((err) => console.log(err))
    {/* <Route path="/login" component={Login} /> */}
    // apiClient()
  }

  render() {
    return (
      <Router>
        <div>
          <AuthButton />
          {/* <Login /> */}
          <Route path="/" component={Login} /> 
          <PrivateRoute path="/chat" component={Chat} />
          
        </div>
      </Router>
    )
  }
}

export default App
