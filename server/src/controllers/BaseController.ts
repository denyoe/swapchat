import { Request, Response } from 'express'
import { ICRUD } from './ICRUD'
import { parse } from '../services/jwt'
import { User } from '../models/User'
import _ from 'lodash'
import bookshelf, { Model } from 'bookshelf'

const Bookshelf = require('../../bookshelf')

export class BaseController implements ICRUD {

    public Model: any

    constructor(theModel: string) { 
        this.Model = Bookshelf.model(theModel)
    }

    public all = (req: Request, res: Response) => {
        this.Model
        .fetchAll()
        .then((collection: bookshelf.Collection<any>) => res.json(collection))
        .catch((err: string) => res.json(err))
    }

    public create = async (req: Request, res: Response) => {
        let username = parse(req).username

        let user: any = await new User({ username: username }).fetch()
        
        new this.Model(req.body)
            .set({user_id: user.id})
            .save()
            .then((model: bookshelf.Model<any>) => res.status(201).json(model))
            .catch((err: string) => res.status(500).json(err))
    }

    public get = (req: Request, res: Response) => {
        this.Model.where('id', req.params.id)
            .fetch()
            .then((model: bookshelf.Model<any>) => res.json(model))
            .catch((err: any) => res.status(500).json(err))
    }

    public byId = (id: number) => {
        this.Model.where('id', id)
            .fetch()
            .then((model: bookshelf.Model<any>) => model.toJSON())
            .catch((err: string) => new Error(err))
    }

    public update = (req: Request, res: Response) => {
        let id: number = req.params.id

        new this.Model({ id: id })
            .save(req.body)
            .then((model: bookshelf.Model<any>) => res.json(model))
            .catch((err: string) => res.status(500).json(err))
    }

    public remove = (req: Request, res: Response) => {
        let id: number = req.params.id

        this.Model.forge({ id: id })
            .destroy()
            .then(() => res.json({ msg: 'record delated' }))
            .catch((err: string) => res.status(500).json(err))
    }

}
