import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import bodyParser from 'body-parser'
import indexRouter from './routes/index'
import userRouter from './routes/user'
import channelRouter from './routes/channel'
import { UserController } from './controllers/UserController'


const graphqlHTTP = require('express-graphql')
import passport from 'passport'
const dotenv = require('dotenv').config()
const Auth = require('./controllers/AuthController').default
import expressValidator from 'express-validator'

const typeDefs = require('./schema')

class App {

    public app: express.Application
    // GraphQL schema
    public schema: any
    // Root resolver
    public root: any

    constructor() {
        // GraphQL schema
        this.schema = typeDefs

        let UserCtrl: UserController = new UserController('User')

        // Root resolver
        this.root = {
            message: () => 'Hello World!',

            user: (args: any) => UserCtrl.byId(args.id),

            channel: () => 'Hello World!',

            post: () => 'Hello World!',
            posts: () => 'Hello World!',
        }

        this.app = express()
        this.config()
    }

    private config(): void {
        this.app.use(logger('dev'))
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
        // this.app.use(cookieParser())

        this.app.use(expressValidator())

        this.app.use(Auth.initialize())

        this.app.use('/grahql', graphqlHTTP({
            schema: this.schema,
            rootValue: this.root,
            graphiql: true
        }))

        this.app.use('/api/', indexRouter)
        this.app.use(process.env.API_BASE + 'login', Auth.login)
        this.app.use(process.env.API_BASE + 'user', userRouter)
        this.app.use(process.env.API_BASE + 'channel', channelRouter)
    }

}

export default new App().app