import React, { Component } from 'react'

import { Table, Button, Tooltip, message, Popover, List, Icon, Row, Col } from 'antd'

import { apiClient } from '../../util/ApiClient'
import api from '../../config/Api'

import CreateQuestion from './create'
import ShowQuestion from './show'

const ButtonGroup = Button.Group

const columns = [{
    title: 'Label',
    dataIndex: 'label',
}, {
    title: 'Type',
    dataIndex: 'type',
}, {
    title: '',
    dataIndex: 'actions',
}]

class ManageQuestion extends Component {
    state = {
        questions: []
    }
    componentDidMount() {
        this.fetchQuestions()
    }

    deleteQuestion(id) {
        apiClient()
            .delete(api.question + '/' + id)
            .then(({status}) => {
                if( status === 200 ) {
                    message.success('Question Removed')
                    this.setState({
                        questions: this.state.questions.filter(item => item.key !== id)
                    })
                }
            })
            .catch(err => {
                console.log(err)
                message.error('An error occurred')
            })
    }

    fetchQuestions() {
        apiClient()
            .get(api.question)
            .then(({ data, status }) => {
                if (status === 200) {
                    let qs = []
                    data.map(item => {
                        qs.push({
                            key: item.id,
                            label: item.label,
                            type: item.type,
                            actions: this.actionsMarkup(item)
                        })
                    })
                    this.setState({
                        questions: qs
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

        if ( item.options.length ) {
            title = "Answers (" + item.options.length + ")"
            content = <List
                size="small"
                bordered
                dataSource={item.options}
                renderItem={ item => {
                    if( item.valid ) {
                        return (
                            <List.Item>
                                <Row>
                                    <Col className="gutter-row" span={22}>
                                        {item.label}
                                    </Col>
                                    <Col className="gutter-row" span={2}>
                                        <Icon class="float-right" type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
                                    </Col>
                                </Row>
                            </List.Item>
                        )
                    } else {
                        return (
                            <List.Item>{item.label}</List.Item>
                        )
                    }
                    
                }}
            />
        } else {
            title = "Answers (-)"
        }

        return (
            <ButtonGroup>
                <Popover content={content} title={title} trigger="click">
                    <Button type="normal" icon="info-circle" />
                </Popover>

                <Tooltip placement="right" title="Delete Question">
                    <Button type="danger" icon="delete" onClick={() => this.deleteQuestion(item.id)}/>
                </Tooltip>
            </ButtonGroup>
        )
    }

    render() {
        return (
            <div>
                <h3>Manage Questions</h3>
                <Table columns={columns} dataSource={this.state.questions} />
            </div>
        )
    }
}

export {
    CreateQuestion,
    ShowQuestion,
    ManageQuestion
}
