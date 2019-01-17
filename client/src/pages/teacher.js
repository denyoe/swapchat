import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { CreateQuiz, ManageQuiz } from './quiz/index'
import { CreateQuestion, ManageQuestion } from './question/index'
import { Layout, Menu, Icon } from 'antd'

const { SubMenu } = Menu
const { Sider } = Layout


const Teacher = () => (
    <div>
        <Switch>
            <Route path="/teacher/quiz/create" component={ CreateQuiz } />
            <Route path="/teacher/quiz/manage" component={ ManageQuiz } />

            <Route path="/teacher/question/create" component={ CreateQuestion } />
            <Route path="/teacher/question/manage" component={ ManageQuestion } />
        </Switch>
    </div>
)

const TeacherSideNav = () => (
    <Sider width={200} style={{ background: '#fff' }}>
        <Menu
            mode="inline"
            defaultOpenKeys={['sub2']}
            style={{ height: '100%', borderRight: 0 }}
        >

            <SubMenu key="sub2" title={<span><Icon type="question-circle" />Questions</span>}>
                <Menu.Item key="9"><Link to="/teacher/question/create">Create</Link></Menu.Item>
                <Menu.Item key="10"><Link to="/teacher/question/manage">Manage</Link></Menu.Item>
            </SubMenu>
            
            <SubMenu key="sub1" title={<span><Icon type="laptop" />Quiz</span>}>
                <Menu.Item key="6"><Link to="/teacher/quiz/create">Create</Link></Menu.Item>
                <Menu.Item key="7"><Link to="/teacher/quiz/manage">Manage</Link></Menu.Item>
            </SubMenu>
            
            <Menu.Item key="11">
                <Icon type="line-chart" />
                Results
            </Menu.Item>
        </Menu>
    </Sider>
)

export {
    Teacher,
    TeacherSideNav
}
