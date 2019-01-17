import React from 'react'
import { Link } from 'react-router-dom'

const ShowQuestion = (props) => {
    const question_id = props.match.params.id

    return (
        <div>
            <h2>Display Question: {question_id}</h2>
            <Link to='/teacher'>Back</Link>
        </div>
    )
}

export default ShowQuestion
