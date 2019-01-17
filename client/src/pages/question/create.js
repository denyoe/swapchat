import React, { Component } from 'react'
import { apiClient } from '../../util/ApiClient'
import api from '../../config/Api'
import {
    Form,
    Input,
    Icon, Select, Row, Col,
    Button, Divider,
    Radio,
    message
} from 'antd'

import {
    formItemLayoutWithoutLabel,
    formItemLayoutWithoutLabel2,
    AnswersformItemLayout,
    tailFormItemLayout
} from '../quiz/partials'

const FormItem = Form.Item
const Option = Select.Option
const { TextArea } = Input

class CreateQuestionForm extends Component {

    state = {
        'label': '',
        'type': 'MCQ',
        'options': [
            { 'valid': false, label: '' }
        ],
        loading: false,
        validation: {
            label: {
                'status': '',
                'help': ''
            }
        }
    }

    handleTypeChange = (value) => {
        this.setState({ type: value })
    }

    handleLabelChange = (e) => {
        if( e.target.value === '' ) {
            this.setState({
                validation: { label: { 'status': 'error', 'help': 'Question label cannot be empty' } }
            })
        } else {
            this.setState({
                validation: { label: { 'status': 'success', 'help': '' } }
            })
        }
        this.setState({ label: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        
        if( this.state.label === '' ) {
            this.setState({
                validation: { label: { 'status': 'error', 'help': 'Question label cannot be empty' } }
            })
        } else {
            this.setState({ loading: true })

            let progressIndicator = message.loading('Saving Question...', 0.5)

            let question = {
                'label': this.state.label,
                'type': this.state.type,
                'options': this.state.type === 'TXT' ? [] : this.state.options
            }

            // console.log(question)

            apiClient()
                .post(api.question, question)
                .then(({ status }) => {
                    if (status === 200) {
                        this.setState({ loading: false })
                        progressIndicator.then(() => message.destroy())
                            .then(() => message.info('Question Saved.', 1))
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

    handleOptionLabelChange = (idx) => (e) => {
        const newOptions = this.state.options.map((option, k) => {
            if (idx !== k) return option
            return { ...option, label: e.target.value }
        })

        this.setState({ 
            options: newOptions 
        })
    }

    handleOptionValidityChange = (idx) => (e) => {
        const newOptions = this.state.options.map((option, k) => {
            if (idx !== k) return option
            return { ...option, valid: e.target.value }
        })

        this.setState({
            options: newOptions
        })
    }

    addAnswerField = () => {
        this.setState({
            options: this.state.options.concat([{ 'valid': false, label: '' }])
        })
    }

    removeAnswerField = (idx) => {
        this.setState({ 
            options: this.state.options.filter((s, sidx) => idx !== sidx)
        })
    }

    removeLastAnswerField = () => {
        this.removeAnswerField(this.state.options.length - 1)
    }

    render() {
        
        const AnswerFormItems = this.state.options.map((option, k) => {
                switch (this.state.type) {
                    case 'MCQ':
                        return (
                            <FormItem
                                {...AnswersformItemLayout}
                                key={k}
                            >
                                <Row gutter={8}>
                                    <Col span={17}>
                                        <FormItem>
                                            <TextArea placeholder={`Answer Label #${k + 1}`} value={option.label} onChange={this.handleOptionLabelChange(k)} />
                                        </FormItem>
                                    </Col>
                                    <Col span={7}>
                                        <Radio.Group value={option.valid} onChange={this.handleOptionValidityChange(k)} buttonStyle="solid">
                                            <Radio.Button value={true}>True</Radio.Button>
                                            <Radio.Button value={false}>False</Radio.Button>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                            </FormItem>
                        )
                    case 'BOOL':
                        return (
                            <FormItem
                                {...AnswersformItemLayout}
                                key={k}
                            >
                                <Row gutter={8}>
                                    <Col span={17}></Col>
                                    <Col span={7}>
                                        <Radio.Group value={option.valid} onChange={this.handleOptionValidityChange(k)} buttonStyle="solid">
                                            <Radio.Button value={true}>True</Radio.Button>
                                            <Radio.Button value={false}>False</Radio.Button>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                            </FormItem>
                        )
                    case 'TXT':
                        return (
                            <FormItem
                                {...AnswersformItemLayout}
                                key={k}
                            >
                                <Row gutter={8}>
                                    <Col span={17}>
                                        <Input placeholder={`Answer Label #${k + 1}`} value={option.label} onChange={this.handleOptionLabelChange(k)} disabled />
                                    </Col>
                                </Row>
                            </FormItem>
                        )
                }
        })

        return (
            <Form onSubmit={this.handleSubmit}>

                <FormItem
                    {...formItemLayoutWithoutLabel2}
                >
                    <Row gutter={8}>
                        <Col span={17}>
                            <FormItem
                                hasFeedback
                                validateStatus={ this.state.validation.label.status }
                                help={ this.state.validation.label.help }
                            >
                                <TextArea placeholder="Question Label" value={this.state.label} onChange={this.handleLabelChange} />
                            </FormItem>
                        </Col>
                        <Col span={7}>
                            <Select value={this.state.type} onChange={this.handleTypeChange}>
                                <Option value="MCQ">MCQ</Option>
                                <Option value="BOOL">True/False</Option>
                                <Option value="TXT">Short Answer</Option>
                            </Select>
                        </Col>
                    </Row>
                </FormItem>

                <Divider>Answers</Divider>

                { AnswerFormItems }
    
                <FormItem
                    {...formItemLayoutWithoutLabel}
                >
                    <Row gutter={8}>
                        <Col span="10">
                            <Button type="danger" onClick={this.removeLastAnswerField} disabled={this.state.type !== 'MCQ'}>
                                <Icon type="minus-circle-o" /> Remove Answer
                            </Button>
                        </Col>
                        <Col span="10">
                            <Button type="dashed" onClick={this.addAnswerField} disabled={this.state.type !== 'MCQ'}>
                                <Icon type="plus"/> Add Answer
                            </Button>
                        </Col>
                    </Row>
                </FormItem>

                
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" loading={this.state.loading} onClick={this.handleSubmit}>Save</Button>
                </FormItem>

            </Form>

        )
    }

}

const WrappedCreateQuestionForm = Form.create()(CreateQuestionForm);

export default WrappedCreateQuestionForm
