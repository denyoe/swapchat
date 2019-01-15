import { Request, Response } from 'express'

export interface ICRUD {
    get(req: Request, res: Response): any

    all(req: Request, res: Response): any

    create(req: Request, res: Response): any

    update(req: Request, res: Response): any

    remove(req: Request, res: Response): any
}