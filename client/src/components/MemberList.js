import React from 'react'
import * as Auth from '../util/Auth'

class MemberList extends React.Component {
    render() {
        const orderedRooms = [...this.props.members].sort((a, b) => a.id > b.id)
        return (
            <div className="members-list">
                <h3>Members:</h3>
                <ul>
                    {orderedRooms.map((room, i) => {
                        let active
                        if (Auth.user() && Auth.user().username === room.username ) {
                            active = 'active'
                        } else {
                            active = ''
                        }
                        return (
                            <li key={i} className={'room ' + active}>
                                <a href='#'>
                                    # {room.username}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default MemberList