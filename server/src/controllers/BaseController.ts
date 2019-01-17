import { Request, Response } from 'express'
import { ICRUD } from './ICRUD'
import { threadId } from 'worker_threads'
import { Model } from 'bookshelf'
import { parse } from '../services/jwt'
import { User } from '../models/User'
const Bookshelf = require('../../bookshelf')
import _ from 'lodash'

export class BaseController implements ICRUD {

    public Model: any

    constructor(theModel: string) { 
        this.Model = Bookshelf.model(theModel)
    }

    public all = (req: Request, res: Response) => {
        this.Model.fetchAll().then((collection: any) => {
            return res.json(collection)
        }).catch((err: string) => {
            return res.json(err)
        })
    }

    public create = async (req: Request, res: Response) => {
        let username = parse(req).username

        let user: any = await new User({ username: username }).fetch()
        
        new this.Model(req.body)
            .set({user_id: user.id})
            .save()
            .then((model: any) => res.status(201).json(model))
            .catch((err: any) => res.status(500).json(err))
    }

    public get = (req: Request, res: Response) => {
        this.Model.where('id', req.params.id)
            .fetch()
            .then((model: any) => res.json(model))
            .catch((err: any) => res.status(500).json(err))
    }

    public byId = (id: number) => {
        this.Model.where('id', id)
            .fetch()
            .then((model: any) => {
                return model.toJSON()
            }).catch((err: string) => {
                return new Error(err)
            })
    }

    public update = (req: Request, res: Response) => {
        let id: number = req.params.id

        new this.Model({ id: id })
            .save(req.body)
            .then((model: any) => res.json(model))
            .catch((err: any) => res.status(500).json(err))
    }

    public remove = (req: Request, res: Response) => {
        let id: number = req.params.id

        this.Model.forge({ id: id })
            .destroy()
            .then((model: any) => {
                return res.json({
                            status: 'success',
                            msg: 'Record Successfully Delated',
                            data: model
                        })
            })
            .catch((err: any) => res.status(500).json(err))
    }

}
