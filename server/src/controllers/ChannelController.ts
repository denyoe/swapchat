import { Request, Response } from 'express'
import { BaseController } from './BaseController'
import { parse } from '../services/jwt'
import { Post } from '../models/Post'
import { User } from '../models/User'
const Bookshelf = require('../../bookshelf')

export class ChannelController extends BaseController {

    public posts = (req: Request, res: Response) => {
        let id: number = req.params.id

        new this.Model({ id: id })
            .fetch({ withRelated: ['posts'] })
            .then((model: any) => {
                return res.json(model)
            })
            .catch((err: string) => {
                return res.json(new Error(err))
            })
    }

    public post = async (req: Request, res: Response) => {
        let channel_id: number = req.params.id
        // get username from JWT token in header
        let username = parse(req).username

        let user: any = await new User({ username: username }).fetch()

        new Post({
            body: req.body.body,
            user_id: user.id,
            channel_id: channel_id
        })
        .save()
        .then((model: any) => {
            return res.status(201).json(model)
        })
        .catch((err: any) => {
            console.log(err, 'err')
            return res.status(500).json(new Error(err))
        })

    }

}
