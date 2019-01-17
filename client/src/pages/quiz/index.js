import React, { Component } from 'react'

import { Table, Button, Tooltip, message, Popover, List } from 'antd'

import { apiClient } from '../../util/ApiClient'
import api from '../../config/Api'

import CreateQuiz from './create'
import RunQuiz from './run'

const ButtonGroup = Button.Group

const columns = [
  {
    title: 'Label',
    dataIndex: 'label',
  }, 
  {
    title: 'UID',
    dataIndex: 'uid',
  }, 
  {
    title: 'Shuffle Questions',
    dataIndex: 'shuffleQuestions',
  },
  {
    title: 'Shuffle Answers',
    dataIndex: 'shuffleAnswers',
  }, 
  {
    title: '',
    dataIndex: 'actions',
  }
]


class ManageQuiz extends Component {
  state = {
    quizzes: []
  }

  componentDidMount() {
    this.fetchQuizzes()
  }

  deleteQuizz(id) {
    apiClient()
      .delete(api.quiz + '/' + id)
      .then(({ status }) => {
        if (status === 200) {
          message.success('Quiz Removed')
          this.setState({
            quizzes: this.state.quizzes.filter(item => item.key !== id)
          })
        }
      })
      .catch(err => {
        console.error(err)
        message.error('An error occurred')
      })
  }

  fetchQuizzes() {
    apiClient()
      .get(api.quiz)
      .then(({ data, status }) => {
        if (status === 200) {
          let qs = []
          data.map(item => {
            qs.push({
              key: item.id,
              label: item.name,
              uid: (item.name + item.id).replace(/\s/g, "").toUpperCase(),
              shuffleQuestions: item.shuffleQuestions.toString().toUpperCase(),
              shuffleAnswers: item.shuffleAnswers.toString().toUpperCase(),
              actions: this.actionsMarkup(item)
            })
          })
          this.setState({
            quizzes: qs
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  actionsMarkup(item) {
    let title = ''
    let content = ''

    if (item.questions.length) {
      title = "Questions (" + item.questions.length + ")"
      content = <List
        size="small"
        bordered
        dataSource={item.questions}
        renderItem={item => <List.Item>{item.label} ({item.type})</List.Item>}
      />
    } else {
      title = "Questions (-)"
    }

    return (
      <ButtonGroup>
        <Popover content={content} title={title} trigger="click">
          <Button type="normal" icon="info-circle" />
        </Popover>

        <Tooltip placement="right" title="Delete Quiz">
          <Button type="danger" icon="delete" onClick={() => this.deleteQuizz(item.id)} />
        </Tooltip>
      </ButtonGroup>
    )
  }

  render() {
    return (
      <div>
        <h3>Manage Quiz</h3>
        <Table columns={columns} dataSource={this.state.quizzes} />
      </div>
    )
  }
}

export {
  CreateQuiz,
  ManageQuiz,
  RunQuiz
}
