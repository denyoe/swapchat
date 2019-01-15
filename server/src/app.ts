import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import bodyParser from 'body-parser';
import indexRouter from './routes/index'
import userRouter from './routes/user'
import channelRouter from './routes/channel'

class App {

    public app: express.Application

    constructor() {
        this.app = express()
        this.config()
    }

    private config(): void {
        this.app.use(logger('dev'))
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        // app.use(cookieParser())

        this.app.use('/api/', indexRouter)
        this.app.use('/api/user', userRouter)
        this.app.use('/api/channel', channelRouter)
    }

}

export default new App().app