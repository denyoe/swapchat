import React, { Component } from 'react'
import { RunQuiz } from './quiz/'

import { apiClient } from '../util/ApiClient'
import api from '../config/Api'

import {
    Form,
    Select,
    Input, 
    Divider,
    Button,
    message
} from 'antd'

import {
    formItemLayoutWithoutLabel2,
    tailFormItemLayout
} from './quiz/partials'

const FormItem = Form.Item
const { Option } = Select

class Student extends Component {

    constructor(props) {
        super(props)

        this.state = {
            selected: '',
            quizzes: [],
            candidate: '',
            start: false
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleNameUpdate = this.handleNameUpdate.bind(this)

        this.fetchQuizzes()
    }

    handleSubmit(e) {
        e.preventDefault()
        if( this.state.candidate !== '' && this.state.selected !== ''  ) {
            this.setState({
                start: true
            })
        } else {
            message.error('Please, Complete the form to continue!')
        }
    }

    handleUpdate(value) {
        this.setState({
            selected: value
        })
    }

    handleNameUpdate(e) {
        this.setState({
            candidate: e.target.value
        })
    }

    fetchQuizzes = () => {
        apiClient()
            .get(api.quiz)
            .then(({ data, status }) => {
                if (status === 200) {
                    data.map(({ id, name }) => {
                        this.setState({
                            quizzes: [...this.state.quizzes, {id: id, 'name': name}]
                        })
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        let quizzes = []
        this.state.quizzes.map(item => {
            quizzes.push(<Option key={item.id}>{item.name}</Option>)
        })
        if( this.state.start ) {
            return (
                <RunQuiz id={this.state.selected} candidate={this.state.candidate} />
            )
        } else {
            return (
                <div>
                    <h2>Student</h2>
                    <Form onSubmit={this.handleSubmit}>

                        <FormItem
                            {...formItemLayoutWithoutLabel2}
                        >
                            <Input placeholder="Enter Your Name" value={this.state.candidate} onChange={this.handleNameUpdate} />
                        </FormItem>

                        <FormItem
                            {...formItemLayoutWithoutLabel2}
                        >
                            <Select
                                size="large"
                                style={{ width: '100%' }}
                                placeholder="Please Select A Quiz"
                                showSearch
                                onChange={this.handleUpdate}
                            >
                                {quizzes}
                            </Select>
                        </FormItem>

                        <Divider />

                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">Start</Button>
                        </FormItem>

                    </Form>
                </div>
            )
        }
    }
}

export {
    Student,
}
