import React, { Component } from 'react'
import { 
  Form, 
  Input, 
  Icon, Select, Row, Col, 
  Button, Switch, Divider, 
  message
} from 'antd'
import { apiClient } from '../../util/ApiClient'
import api from '../../config/Api'
import {
  formItemLayout,
  formItemLayoutWithoutLabel2,
  tailFormItemLayout
} from './partials'

const FormItem = Form.Item
const { Option } = Select


class CreateQuizForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      'quiz_name': '',
      'shuffleQuestions': true,
      'shuffleAnswers': true,
      'questions': [],
      'allQuestions': [],
      loading: false,
      validation: {
        'quiz_name': {
          'status': '',
          'help': ''
        },
        'questions': {
          'status': '',
          'help': ''
        }
      }

    }

    this.fetchQuestions()

    this.handleQuizNameUpdate = this.handleQuizNameUpdate.bind(this)
    this.handleShuffleQuestionsUpdate = this.handleShuffleQuestionsUpdate.bind(this)
    this.handleShuffleAnswersUpdate = this.handleShuffleAnswersUpdate.bind(this)
    this.handleQuestionsUpdate = this.handleQuestionsUpdate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  fetchQuestions = () => {

    apiClient()
      .get(api.question)
      .then(({ data, status }) => {
        if (status === 200) {
          this.setState({
            allQuestions: data
          })
        }

      })
      .catch(err => {
        console.log(err)
      })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.state.quiz_name === '') {
      this.setState({
        validation: { quiz_name: { 'status': 'error', 'help': 'Quiz Name cannot be empty' } }
      })
    } else if( this.state.questions.length === 0 ) {
      message.error('You must select at least one question')
    } else {
      this.setState({ loading: true })

      let progressIndicator = message.loading('Saving Quiz...', 0.5)

      let quiz = {
        'name': this.state.quiz_name,
        'shuffleQuestions': this.state.shuffleQuestions,
        'shuffleAnswers': this.state.shuffleAnswers,
        'questions': this.state.questions,
      }

      apiClient()
        .post(api.quiz, quiz)
        .then(({ status }) => {
          if (status === 200) {
            this.setState({ loading: false })
            progressIndicator.then(() => message.destroy())
                              .then(() => message.info('New Quiz Successfully Created.', 1))
            // .then(() => this.props.history.push('/teacher/question/3'))
          }

        })
        .catch(err => {
          this.setState({ loading: false })
          if (!err.response) {
            progressIndicator.then(() => message.error('Network Error: Could Not Connect To API', 2))
          } else {
            progressIndicator.then(() => message.error('Could Not Save Question'))
          }
        })
    }
  }

  handleQuizNameUpdate(e) {
    if (e.target.value === '') {
      this.setState({
        validation: { quiz_name: { 'status': 'error', 'help': 'Quiz Name cannot be empty' } }
      })
    } else {
      this.setState({
        validation: { quiz_name: { 'status': 'success', 'help': '' } }
      })
    }
    this.setState({ quiz_name: e.target.value })
  }

  handleShuffleQuestionsUpdate(value) {
    this.setState({ shuffleQuestions: value })
  }

  handleShuffleAnswersUpdate(value) {
    this.setState({ shuffleAnswers: value })
  }

  handleQuestionsUpdate(values) {
    this.setState({
      questions: values
    })
  }

  render() {

    let questions = []
    this.state.allQuestions.map((question) => {
      questions.push(<Option key={question.id}>{question.label} - {question.type}</Option>)
    })

    return (
      <Form onSubmit={ this.handleSubmit }>

        <FormItem
          {...formItemLayout}
          label="Quiz Name"
          hasFeedback
          validateStatus={this.state.validation.quiz_name.status}
          help={this.state.validation.quiz_name.help}
        >
          <Input placeholder="Quiz Name" value={this.state.quiz_name} onChange={this.handleQuizNameUpdate} />
        </FormItem>
        
        <FormItem
          {...formItemLayoutWithoutLabel2}
        >
          <Row gutter={8}>
            <Col span={12}>
                Shuffle Questions 
                <Switch 
                  checkedChildren={<Icon type="check" />} 
                  unCheckedChildren={<Icon type="close" />} 
                  checked={ this.state.shuffleQuestions } 
                  onChange={this.handleShuffleQuestionsUpdate}
                />
            </Col>
              <Col span={12}>
                Shuffle Answers 
                <Switch
                  checkedChildren={<Icon type="check" />} 
                  unCheckedChildren={<Icon type="close" />} 
                  checked={ this.state.shuffleAnswers } 
                  onChange={this.handleShuffleAnswersUpdate}
                />
              </Col>
          </Row>
        </FormItem>

        <Divider orientation="left">Questions</Divider>

        <FormItem
          {...formItemLayoutWithoutLabel2}
        >
          <Select
            mode="multiple"
            size="large"
            style={{ width: '100%' }}
            placeholder="Please Select Questions"
            allowClear
            showSearch
            onChange={this.handleQuestionsUpdate}
          >
            { questions }
          </Select>
        </FormItem>

        <Divider />

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Save</Button>
        </FormItem>

      </Form>
      
    )
  }

}

const WrappedCreateQuizForm = Form.create()(CreateQuizForm);

export default WrappedCreateQuizForm
