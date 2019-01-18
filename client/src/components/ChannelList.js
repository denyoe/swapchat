import React from 'react'

class ChannelList extends React.Component {
    render() {
        const orderedRooms = [...this.props.rooms].sort((a, b) => a.id > b.id);
        return (
            <div className="rooms-list">
                <h3>Channels:</h3>
                <ul>
                    {orderedRooms.map((room, i) => {
                        const active = this.props.currentRoomId === room.id ? 'active' : '';
                        return (
                            <li key={i} className={'room ' + active}>
                                <a href="#" onClick={() => this.props.switchRoom(room.id)}>
                                    # {room.name}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default ChannelList