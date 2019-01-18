import React from 'react'
import * as Auth from '../../util/Auth'
import { setLogin } from '../../actions'
import store from '../../store'

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'

import {
    Form, Icon, Input, Button,
    message
} from 'antd'

class LoginForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            // redirectToReferrer: false
        }

        // this.handleUsernameUpdate = this.handleUsernameUpdate.bind(this)
        // this.handlePasswordUpdate = this.handlePasswordUpdate.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit = (e) => {
        e.preventDefault()

        Auth
            .login(this.state.username, this.state.password)
            .then(() => {
                store.dispatch(setLogin({
                    username: this.state.username,
                    password: this.state.password
                }))
                // makes component re-render thus checking Auth.loggedIn() in render()
                // this.setState({ redirectToReferrer: true })
                this.forceUpdate()
            })
            .catch((err) => {
                message.error('Invalid Credentials', 0.7)
            })

    }

    handleUsernameUpdate = (e) => {
        this.setState({ username: e.target.value })
    }

    handlePasswordUpdate = (e) => {
        this.setState({ password: e.target.value })
    }

    render() {
        let { from } = this.props.location.state || { from: { pathname: "/chat" } }
        let redirectToReferrer = Auth.loggedIn()

        console.log(redirectToReferrer, from)

        if (redirectToReferrer) return <Redirect to={from} />

        return (
            <div className="LoginForm">
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <Form.Item>
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onChange={this.handleUsernameUpdate} placeholder="Username" />
                    </Form.Item>
                    <Form.Item>
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" onChange={this.handlePasswordUpdate} placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default withRouter(Form.create({ name: 'login_form' })(LoginForm))