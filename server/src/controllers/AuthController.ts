import * as jwt from 'jwt-simple'
import moment from 'moment'
import * as User from '../models/User'
import * as bcrypt from 'bcryptjs'
import passport from 'passport'
import { Request, Response } from 'express'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { UserController } from '../controllers/UserController'
const Bookshelf = require('../../bookshelf')
const dotenv = require('dotenv').config()

class Auth {

    public initialize = () => {
        passport.use('jwt', this.getStrategy())
        // passport.use(this.getStrategy())
        return passport.initialize()
    }

    public authenticate = (callback: any) => passport.authenticate("jwt", { session: false, failWithError: true }, callback)

    private genToken = (user: any): Object => {
        let expires = moment().utc().add({ days: 7 }).unix()
        let token = jwt.encode({
            exp: expires,
            username: user.username
        }, 'ogA9ppB$S!dy!hu3Rauvg!L96')
        // }, process.env.JWT_SECRET)

        return {
            token: "JWT " + token,
            expires: moment.unix(expires).format(),
            user: user._id
        }
    }

    public login = async (req: any, res: any) => {
        try {
            req.checkBody("username", "Invalid username").notEmpty()
            req.checkBody("password", "Invalid password").notEmpty()

            let errors = req.validationErrors()
            if (errors) throw errors

            // let user = await User.findOne({ "username": req.body.username }).exec()
            // let user: any = await this.attempt(req.body.username, req.body.password)
            // let user: any = await new UserController('User').byUsername(req.body.username)
            let user: any = await new (Bookshelf.model('User'))({ username: req.body.username }).fetch()

            // console.log('attempting...', user)

            // let success: any = await this.attempt(req.body.username, req.body.password)

            new (Bookshelf.model('User'))({ username: req.body.username })
                .fetch()
                .then((model: any) => {
                    if (! model) {
                        res.status(401).json({ "message": "Invalid credentials", "errors": new Error("Invalid Password") })
                    }

                    bcrypt.compare(req.body.password, model.toJSON().password).then((success) => {
                        if(! success) {
                            // throw new Error("Invalid Password")
                            res.status(401).json({ "message": "Invalid credentials", "errors": new Error("Invalid Password") })
                        }
                        return res.status(200).json(this.genToken(user.toJSON()))
                    })
                    // bcrypt.compare(req.body.password, model.toJSON().password, (err, success) => {
                    //     console.log(err, success)
                    //     if (err) {
                    //         throw new Error("Bcrypt Error")
                    //     }
                    //     if(! success) {
                    //         throw new Error("Invalid Password")
                    //     }
                    //     return res.status(200).json(this.genToken(user.toJson()))
                    // })
                })

            // if (success === false) throw ""

            // res.status(200).json(this.genToken(user))
        } catch (err) {
            res.status(401).json({ "message": "Invalid credentials", "errors": err })
        }
    }

    // private attempt = async (username: string, password: string) => {
    //     new (Bookshelf.model('User'))({ username: username })
    //         .fetch()
    //         .then((model: any) => {
    //             return new Promise((resolve: any, reject: any) => {
    //                 if(!  model)    return reject(new Error("User not found"))
    //                 bcrypt.compare(password, model.toJSON().password, (err, success) => {
    //                     console.log(err, success)
    //                     if (err) return reject(err)
    //                     return resolve(success)
    //                 })
    //             })
    //         })
    // }

    private getStrategy = (): Strategy => {
        const params = {
            secretOrKey: process.env.JWT_SECRET,
            // jwtFromRequest: ExtractJwt.fromAuthHeader(),
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
            passReqToCallback: true
        }

        return new Strategy(params, (req: Request, payload: any, done: any) => {
            // let user: any = new UserController('User').byUsername(payload.username)
            // let user: any = await new (Bookshelf.model('User'))({ username: payload.username }).fetch()
            
            new (Bookshelf.model('User'))({username: payload.username})
                .fetch()
                .then((model: any) => {
                    if (model.length == 0) {
                        return done(null, false, { message: 'User not found' }) 
                    }

                    return done(null, model.toJSON())
                })

            // if(! user) {
            //     return done(null, false, { message: 'User not found' })
            // }

            // return done(null, user)
        })
    }

}

export default new Auth()