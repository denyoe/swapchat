import React from 'react'
import { Form, Input, Icon, Select, Row, Col, Button, Divider, Radio } from 'antd'

const FormItem = Form.Item
const Option = Select.Option


const formItemLayout = {
    labelCol: {
        xs: { span: 5 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 15 },
        sm: { span: 12 },
    },
}

const formItemLayoutWithoutLabel = {
    wrapperCol: {
        xs: { span: 10, offset: 10 },
        sm: { span: 10, offset: 10 },
    }
}

const formItemLayoutWithoutLabel2 = {
    wrapperCol: {
        xs: { span: 15, offset: 5 },
        sm: { span: 12, offset: 5 },
    }
}

const AnswersformItemLayout = {
    wrapperCol: {
        xs: { span: 15, offset: 5 },
        sm: { span: 12, offset: 5 },
    }
}

const tailFormItemLayout = {
    wrapperCol: {
        xs: { span: 5, offset: 5 },
        sm: { span: 5, offset: 5 },
    }
}


const addAnswerButtonMarkup = () => {
    return (
        <FormItem
            {...formItemLayoutWithoutLabel}
        >
            <Button type="dashed" style={{ width: '45%', 'margin-left': '43%' }}>
                <Icon type="plus" /> Add Answer
          </Button>
        </FormItem>
    )
}


const answersFieldMarkup = (type, option, k = 0) => {
    switch (type) {
        case 'MCQ':
                return (
                    <FormItem
                        {...AnswersformItemLayout}
                        key={k}
                    >
                        <Row gutter={8}>
                            <Col span={17}>
                                <Input placeholder={`Answer Label #${k + 1}`} value={option.label} />
                            </Col>
                            <Col span={9}>
                                <Radio.Group defaultValue="false" buttonStyle="solid">
                                    <Radio.Button value="true">True</Radio.Button>
                                    <Radio.Button value="false">False</Radio.Button>
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
                            <Radio.Group defaultValue="false" buttonStyle="solid">
                                <Radio.Button value="true">True</Radio.Button>
                                <Radio.Button value="false">False</Radio.Button>
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
                            <Input placeholder="Answer Label" disabled />
                        </Col>
                    </Row>
                </FormItem>
            )
    }
}

const questionFieldMarkup = (k, index, getFieldDecorator, removeQuestionField, addAnswerField) => {
    return (
        <div>
            <Divider orientation="left">Question 1</Divider>
            <FormItem
                {...formItemLayoutWithoutLabel2}
            >
                <Row gutter={8}>
                    <Col span={17}>
                        <Input placeholder="Question Label" />
                    </Col>
                    <Col span={7}>
                        <Select defaultValue="Question Type">
                            <Option value="MCQ">MCQ</Option>
                            <Option value="BOOL">True/False</Option>
                            <Option value="TXT" disabled>Text</Option>
                        </Select>
                    </Col>
                </Row>
            </FormItem>

            <Divider>Answers</Divider>

            { answersFieldMarkup() }

            <FormItem
                {...formItemLayoutWithoutLabel}
            >
                <Button type="dashed" onClick={addAnswerField} style={{ width: '45%', 'margin-left': '43%' }}>
                    <Icon type="plus" /> Add Answer
                </Button>
            </FormItem>

        </div>
    )
}


export {
    addAnswerButtonMarkup,
    answersFieldMarkup,
    questionFieldMarkup,

    formItemLayout,
    formItemLayoutWithoutLabel,
    formItemLayoutWithoutLabel2,
    AnswersformItemLayout,
    tailFormItemLayout
}
