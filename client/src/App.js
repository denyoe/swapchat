import React, { Component } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Teacher, TeacherSideNav } from './pages/teacher'
import { Student } from './pages/student'
import './App.css'

import { Layout, Menu } from 'antd'

const { Header, Content } = Layout

class App extends Component {
  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">
              <Link to="/teacher">Teacher</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/student">Student</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>

          <Switch>
            <Route path="/teacher" component={ TeacherSideNav } />
          </Switch>

          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, "minHeight": "88vh" }}>
                  <Switch>
                    <Route path="/teacher" component={ Teacher } />
                    <Route path="/student" component={ Student } />
                  </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default App
