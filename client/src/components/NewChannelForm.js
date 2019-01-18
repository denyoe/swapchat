import React from 'react'

class NewChannelForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        this.setState({
            name: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.saveChannel(this.state.name)
        this.setState({
            name: ''
        })
    }

    render() {
        return (
            <div className="new-room-form">
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        placeholder="New Channel Form"
                        onChange={this.handleChange}
                        value={this.state.name}
                        disabled={this.props.disabled}
                        required />
                    <button id="create-room-btn" type="submit">+</button>
                </form>
            </div>
        )
    }
}

export default NewChannelForm