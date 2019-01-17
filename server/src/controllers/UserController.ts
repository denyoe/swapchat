import { Request, Response } from 'express'
import { BaseController } from './BaseController'
import * as bcrypt from 'bcryptjs'

export class UserController extends BaseController {

    public create = async (req: Request, res: Response) => {
        let hash = await bcrypt.hash(req.body.password, 10)

        new this.Model({
            username: req.body.username,
            password: hash
        })
        .save()
        .then((model: Object) => {
            return res.status(201).json(model)
        })
        .catch((err: string) => {
            return res.json(err)
        })
    }

    public posts = (req: Request, res: Response) => {
        let id: number = req.params.id

        new this.Model({ id: id })
            .fetch({ withRelated: ['posts'] })
            .then((model: Object) => {
                return res.json(model)
            })
            .catch((err: string) => {
                return res.json(err)
            })
    }

    public byUsername = (username: string) => {
        new this.Model({ username: username })
            .then((model: any) => {
                console.log('hey', model)
                return model.toJSON()
            })
            .catch((err: string) => {
                return new Error(err)
            })
    }

    public channels = (req: Request, res: Response) => {
        let id: number = req.params.id

        new this.Model({ id: id })
            .fetch({ withRelated: ['channels', 'owned_channels'] })
            .then((model: Object) => {
                return res.json(model)
            })
            .catch((err: string) => {
                return res.json(err)
            })
    }

}
