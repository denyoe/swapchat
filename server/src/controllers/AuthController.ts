import * as jwt from 'jwt-simple'
import moment from 'moment'
import { User } from '../models/User'
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
        return passport.initialize()
    }

    public authenticate = (callback: any) => passport.authenticate("jwt", { session: false, failWithError: true }, callback)

    private genToken = (user: any): Object => {
        let expires = moment().utc().add({ days: 7 }).unix()
        let secret: any = process.env.JWT_SECRET
        let token = jwt.encode({
            exp: expires,
            username: user.username
        // }, 'ogA9ppB$S!dy!hu3Rauvg!L96')
        }, secret)

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

            let user: any = await new User({ username: req.body.username }).fetch()

            if(user) {
                new (Bookshelf.model('User'))({ username: req.body.username })
                    .fetch()
                    .then((model: any) => {
                        if (!model) {
                            res.status(401).json({ "message": "Invalid credentials", "errors": new Error("Invalid Password") })
                        }

                        bcrypt.compare(req.body.password, model.toJSON().password).then((success) => {
                            if (!success) {
                                res.status(401).json({ "message": "Invalid credentials", "errors": new Error("Invalid Password") })
                            }
                            return res.status(200).json(this.genToken(user.toJSON()))
                        })
                    })
            } else {
                return res.status(401).json({ "message": "Invalid credentials", "errors": new Error("User not found") })
            }

        } catch (err) {
            res.status(401).json({ "message": "Invalid credentials", "errors": err })
        }
    }

    private getStrategy = (): Strategy => {
        const params = {
            secretOrKey: process.env.JWT_SECRET,
            // jwtFromRequest: ExtractJwt.fromAuthHeader(),
            jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
            passReqToCallback: true
        }

        return new Strategy(params, (req: Request, payload: any, done: any) => {
            new User({username: payload.username})
                .fetch()
                .then((model: any) => {
                    if (model.length == 0) {
                        return done(null, false, { message: 'User not found' }) 
                    }

                    return done(null, model.toJSON())
                })
        })
    }

}

export default new Auth()