import React from 'react'

import MessageList from '../../components/MessageList'
import ChannelList from '../../components/ChannelList'
import MemberList from '../../components/MemberList'
import { apiClient } from '../../util/ApiClient'
import api from '../../config/Api'
import SendMessageForm from '../../components/SendMessageForm'
import NewChannelForm from '../../components/NewChannelForm'

import {
	message
} from 'antd'

export default class Chat extends React.Component {

	constructor() {
		super()
		this.state = {
			channels: [],
			messages: [],
			members: [],
			roomId: null
		}

		this.switchRoom = this.switchRoom.bind(this)
		this.loadChannels = this.loadChannels.bind(this)
		this.loadMessages = this.loadMessages.bind(this)
		this.loadMembers = this.loadMembers.bind(this)
		this.sendMessage = this.sendMessage.bind(this)
		this.saveChannel = this.saveChannel.bind(this)
		
	}

	componentDidMount() {
		this.loadChannels()
		if( this.state.roomId ) {
			this.loadMessages(this.state.roomId)
			this.loadMembers(this.state.roomId)
		}

		setInterval(() => {
			this.loadMessages(this.state.roomId)
		}, 5000)
	}

	loadMessages(id) {
		apiClient()
			.get(api.channelMsg(id))
			.then(({data}) => {
				this.setState({
					messages: [...data]
				})
			})
			.catch(err => {
				if (err.response.status === 403) {
					message.error("Access Denied")
					this.setState({
						roomId: null,
						messages: [],
						members: [],
					})
				}
			})
	}

	loadChannels() {
		apiClient()
			.get(api.channel)
			.then(({ data }) => {
				this.setState({
					channels: [...data]
				})
			})
	}

	loadMembers(id) {
		apiClient()
			.get(api.channelMbrs(id))
			.then(({ data }) => {
				let { members, owner } = data
				this.setState({
					members: [...members, owner]
				})
			})
	}

	switchRoom(id) {
		this.setState({
			roomId: id,
			messages: [],	
			members: []
		})
		// get messages for curent room
		this.loadMessages(id)
		this.loadMembers(id)
	}

	sendMessage(body) {
		if( body === '' ) {
			message.warning("Message Body Cannot Be Empty")
		} else if(! this.state.roomId ){
			message.warning("Please choose a channel to post to")
		} else {
			apiClient()
				.post(api.postToChannel(this.state.roomId), { body: body })
				.then(res => {
					this.loadMessages(this.state.roomId)
				})
		}
	}

	saveChannel(name) {
		if (name === '') {
			message.warning("Name Cannot Be Empty")
		} else {
			apiClient()
				.post(api.channel, { name: name })
				.then(res => {
					this.loadChannels()
				})
		}
	}

	render() {
		return (
			<div className="app">
				<ChannelList 
					switchRoom={this.switchRoom}
					rooms={this.state.channels} 
					currentRoomId={this.state.roomId}
				/>
				<MessageList
					messages={this.state.messages}
					currentRoomId={this.state.roomId}
				/>
				<MemberList
					members={this.state.members}
					currentRoomId={this.state.roomId}
				/>
				<SendMessageForm 
					sendMessage={this.sendMessage}
				/>
				<NewChannelForm 
					saveChannel={this.saveChannel}
				/>
			</div>
		)
	}
}