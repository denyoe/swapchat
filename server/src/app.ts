import express from 'express'
// const cookieParser = require('cookie-parser')
import cors from 'cors'
import logger from 'morgan'
import bodyParser from 'body-parser';
import indexRouter from './routes/index'
import userRouter from './routes/user'

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
// app.use(cookieParser())

app.use('/api/', indexRouter)
app.use('/api/user', userRouter)

app.listen(4000, () => console.log('Chat Server running. Port: 4000. Enjoy!'))
