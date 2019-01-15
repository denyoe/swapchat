import { Request, Response } from 'express'
import { BaseController } from './BaseController';

export class UserController extends BaseController {

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

}
