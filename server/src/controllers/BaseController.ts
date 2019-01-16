import { Request, Response } from 'express'
import { ICRUD } from './ICRUD'
import { threadId } from 'worker_threads'
import { Model } from 'bookshelf'
const Bookshelf = require('../../bookshelf')
import _ from 'lodash'

export class BaseController implements ICRUD {

    public Model: any

    constructor(theModel: string) { 
        this.Model = Bookshelf.model(theModel)
    }

    public all = (req: Request, res: Response) => {
        this.Model.fetchAll().then((collection: Object) => {
            return res.json(collection)
        }).catch((err: string) => {
            return res.json(new Error(err))
        })
    }

    public create = (req: Request, res: Response) => {
        new this.Model(req.body)
            .save()
            .then((model: Object) => {
                return res.status(201).json(model)
            })
    }

    public get = (req: Request, res: Response) => {
        this.Model.where('id', req.params.id)
            .fetch()
            .then((model: Object) => {
                return res.json(model)
            }).catch((err: string) => {
                return res.json(new Error(err))
            })
    }

    public byId = (id: number) => {
        this.Model.where('id', id)
            .fetch()
            .then((model: any) => {
                // console.log(_.toArray(model.toJSON()))
                // return _.toArray(model.toJSON())
                return model.toJSON()
            }).catch((err: string) => {
                return new Error(err)
            })
    }

    public update = (req: Request, res: Response) => {
        let id: number = req.params.id

        new this.Model({ id: id })
            .save(req.body)
            .then((model: Object) => {
                return res.json(model)
            })
            .catch((err: string) => {
                return res.json(new Error(err))
            })
    }

    public remove = (req: Request, res: Response) => {
        let id: number = req.params.id

        this.Model.forge({ id: id })
            .destroy()
            .then((model: Object) => {
                return res.json({
                            status: 'success',
                            msg: 'Record Successfully Delated',
                            data: model
                        })
            })
            .catch((err: string) => {
                return res.json(new Error(err))
            })
    }

}
