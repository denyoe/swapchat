import { Request, Response } from 'express'
import { BaseController } from './BaseController';

export class ChannelController extends BaseController {

    public posts = (req: Request, res: Response) => {
        let id: number = req.params.id

        new this.Model({ id: id })
            .fetch({ withRelated: ['posts'] })
            .then((model: Object) => {
                return res.json(model)
            })
            .catch((err: string) => {
                return res.json(new Error(err))
            })
    }

    public post = (req: Request, res: Response) => {
        let id: number = req.params.id

        new this.Model({ id: id })
            .posts()
            .save({
                user_id: 1
            })
            .then((model: Object) => {
                return res.json(model)
            })

    }

}
