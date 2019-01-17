import React, { Component } from 'react'
import { Steps, Button, message, Row, Col, Input, List, Checkbox } from 'antd';
import { apiClient } from '../../util/ApiClient'
import api from '../../config/Api'

const Step = Steps.Step
const { TextArea } = Input

class RunQuiz extends Component {
    constructor(props) {
        super(props)

        this.state = {
            quiz: '',
            current: 0,
            questions: [],
            answers: [],
            mappedAnswers: [],
            score: 0,
            candidate: props.candidate
        }

        if( props.id && props.candidate ) {
            this.fetchQuiz(props.id)
        } else {
            console.log('No Prop Provided')
        }
        
    }

    next() {
        // this.setState({
        //     answers: [...this.state.answers, {}]
        // })

        const current = this.state.current + 1
        this.setState({ current })
    }

    prev() {
        const current = this.state.current - 1
        this.setState({ current })
    }

    handleQuizDone() {
        message.success('Quiz complete!')
    }

    handleUpdateAnswer(id, value) {
        const newAnswers = this.state.answers.map((response, k) => {
            if ( this.state.questions )
            if (k !== id) return response
            return value
        })
        
        this.setState({
            answers: newAnswers
        })
    }

    mapAnswers() {
        // let answers = []
        // const questions = this.state.questions
        // questions.forEach(question => {
        //     if( question.type !== 'TXT' && question.id > 0 ) {
        //         let index = question.id
        //         // console.log(question.options)
        //         answers[index] = question.options.filter((last, option) => {
        //             return option.valid === true
        //         })
        //     }
        // })
        // this.setState({
        //     mappedAnswers: answers
        // })
        // console.log(this.state.mappedAnswers)
    }

    fetchQuiz(id) {
        apiClient()
            .get(api.quiz + '/' + id)
            .then(({ data, status }) => {
                if (status === 200) {
                    this.setState({
                        quiz: { id: data.id, name: data.name, uid: data.uid },
                        questions: [...data.questions, {
                            "id": 0,
                            "label": "End",
                            "type": "Quiz Complete",
                            "options": []
                        }]
                    })
                    // this.mapAnswers()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { questions, current, quiz, candidate } = this.state
        return (
            <div>
                <h3>{ "(" + candidate + ") " + quiz.name }</h3>
                <br></br>
                <Row gutter={16}>
                    <Col sm={7}>
                        <Steps direction="vertical" current={current}>
                            {
                                questions.map((question, idx) => {
                                    let title = ''
                                    if (idx === questions.length - 1) {
                                        title = question.label
                                    } else {
                                        title = "Question " + parseInt(idx + 1)
                                    }
                                    return (
                                        <Step key={question.id} title={title} description={question.type} />
                                    )
                                })
                            }
                        </Steps>
                    </Col>
                    <Col sm={17}>
                        <div className="steps-content" style={{ "minHeight": "64vh" }}>
                            {
                                current < questions.length - 1 &&
                                <TextArea rows={4} style={{ "marginBottom": "5vh" }} value={questions[current] && questions[current].label} disabled />
                            }

                            {
                                current === questions.length - 1 &&
                                <div>
                                    Congratulations! You've completed the quiz. Click on "Done" to submit your answers.
                                    {/* diaplay results here */}
                                </div>
                            }
                            
                            {
                                questions[current] && questions[current].type === 'TXT' &&
                                <TextArea rows={4} />
                            }

                            {
                                questions[current] && questions[current].type !== 'TXT' &&

                                questions[current].options.map(option => {
                                    return (
                                        <List.Item key={option.id}>
                                            <Checkbox value={this.state.answers[option.id]} onChange={(e) => this.handleUpdateAnswer(option.id, e.target.value)}>{option.label}</Checkbox>
                                        </List.Item>
                                    )
                                })
                            }
                        </div>
                        <br></br>
                        <div className="steps-action">
                            {
                                current < questions.length - 1
                                && <Button type="primary" onClick={() => this.next()}>Next</Button>
                            }
                            {
                                current === questions.length - 1
                                && <Button type="primary" onClick={() => this.handleQuizDone()}>Done</Button>
                            }
                            {
                                current > 0
                                && (
                                    <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                                        Previous
                            </Button>
                                )
                            }
                        </div>
                    </Col>
                </Row>
                
            </div>
        )
    }
}

export default RunQuiz
