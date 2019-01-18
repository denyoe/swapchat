import { Request, Response } from 'express'
import { BaseController } from './BaseController'
import { parse } from '../services/jwt'
import { Post } from '../models/Post'
import { User } from '../models/User'
import { Channel } from '../models/Channel'
import { Subscription } from '../models/Subscription'
import _ from 'lodash'
import bookshelf from 'bookshelf'

export class ChannelController extends BaseController {

    public posts = async (req: Request, res: Response) => {
        let id: number = req.params.id

        // get username from JWT token in header
        let username = parse(req).username
        let user: any = await new User({ username: username }).fetch()

        new this.Model({ id: id })
            .fetch({ withRelated: ['posts', 'members', 'owner'] })
            .then((model: bookshelf.Model<any>) => {
                let channel = model.toJSON()
                if(
                    _.flatMap(channel.members, 'id').indexOf(user.id) !== -1 || // user is member
                    user.id === channel.owner.id // user is owner
                ) {
                    return res.status(200).json(channel.posts)
                } else {
                    return res.status(403).json({ error: "Permission Denied" })
                }
                // return res.json(model)
            })
            .catch((err: string) => res.status(500).json(err))
    }

    public post = async (req: Request, res: Response) => {
        let channel_id: number = req.params.id

        // get username from JWT token in header
        let username = parse(req).username
        let user: any = await new User({ username: username }).fetch()

        new this.Model({id: channel_id})
        .fetch({ withRelated: ['members', 'owner'] })
        .then((model: bookshelf.Model<any>) => {
            let channel = model.toJSON()
            if(
                _.flatMap(channel.members, 'id').indexOf(user.id) !== -1 || // user is member
                user.id === channel.owner.id // user is owner
            ) {
                new Post({
                    body: req.body.body,
                    user_id: user.id,
                    channel_id: channel_id
                })
                .save()
                .then((model: bookshelf.Model<any>) => res.status(201).json(model))
                .catch((err: string) => res.status(500).json(err))
            } else {
                return res.status(403).json({error: "Permission Denied"})
            }
        })
        .catch((err: string) => res.json(err))

    }

    public members = (req: Request, res: Response) => {
        let id: number = req.params.id

        new this.Model({ id: id })
            .fetch({ withRelated: ['members', 'owner'] })
            .then((model: bookshelf.Model<any>) => res.json(model))
            .catch((err: string) => res.json(err))
    }

    public subscribe = async (req: Request, res: Response) => {
        let channel_id: number = req.params.id
        let user_id: number = req.params.user_id

        // authenticated user
        let username = parse(req).username
        let owner: any = await new User({ username: username }).fetch()

        // check user is forum owner
        if (! await new Channel({ id: channel_id, user_id: owner.id }).fetch()) {
            return res.status(403).json({ error: "Permission Denied"})
        }

        let sub = new Subscription({
            user_id: user_id,
            channel_id: channel_id
        })

        sub
        .fetch()
        .then((model: bookshelf.Model<any>) => {
            if (model === null) {
                sub.save().then(() => {
                    res.status(201).json(model)
                })
                .catch((err: string) => res.json(err))
            } else {
                return res.status(422).json({ error: 'user already subscribed' })
            }
        })
        .catch((err: string) => res.status(500).json(err))

    }

    public unsubscribe = async (req: Request, res: Response) => {
        let channel_id: number = req.params.id
        let user_id: number = req.params.user_id

        // authenticated user
        let username = parse(req).username
        let owner: any = await new User({ username: username }).fetch()

        // check user is forum owner
        if (! await new Channel({ id: channel_id, user_id: owner.id }).fetch()) {
            return res.status(403).json({ error: "Permission Denied" })
        }

        Subscription.forge({
            user_id: user_id,
            channel_id: channel_id
        })
        .fetch()
        .then((model: bookshelf.Model<any>) => {
            if(model) {
                model.destroy().then(() => res.json({ msg: 'record deleted' }))
            } else {
                res.json({ msg: 'user not subscribed' })
            }
        })
        .catch((err: string) => res.status(500).json(err))

    }

}
