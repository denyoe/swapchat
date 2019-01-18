import { Request, Response } from 'express'
import { BaseController } from './BaseController'
import * as bcrypt from 'bcryptjs'
import bookshelf from 'bookshelf'

export class UserController extends BaseController {

    public create = async (req: Request, res: Response) => {
        let hash = await bcrypt.hash(req.body.password, 10)

        new this.Model({
            username: req.body.username,
            password: hash
        })
        .save()
        .then((model: bookshelf.Model<any>) => res.status(201).json(model))
        .catch((err: string) => res.json(err))
    }

    public posts = (req: Request, res: Response) => {
        let id: number = req.params.id

        new this.Model({ id: id })
            .fetch({ withRelated: ['posts'] })
            .then((model: bookshelf.Model<any>) => res.json(model))
            .catch((err: string) => res.json(err))
    }

    public byUsername = (username: string) => {
        new this.Model({ username: username })
            .then((model: bookshelf.Model<any>) => model.toJSON())
            .catch((err: string) => new Error(err))
    }

    public channels = (req: Request, res: Response) => {
        let id: number = req.params.id

        new this.Model({ id: id })
            .fetch({ withRelated: ['channels', 'owned_channels'] })
            .then((model: bookshelf.Model<any>) => res.json(model))
            .catch((err: string) => res.json(err))
    }

}
