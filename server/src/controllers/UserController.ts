import User from '../models/User'

export const all = (req: any, res: any, next: any) => {
    User.fetchAll().then((users: Object) => {
        return res.json(users)
    }).catch((err: string) => {
        return res.json({
            status: 'error',
            msg: err,
            data: []
        })
    })
}

export const create = (req: any, res: any, next: any) => {
    let user: {username: string, password: string} = {
        'username': req.body.username,
        'password': req.body.password
    }

    new User(user)
        .save()
        .then((user: Object) => {
            return res.json(user)
        })
}

export const get = (req: any, res: any, next: any) => {
    User.where('id', req.params.id).fetch().then((user: Object) => {
        res.json(user)
    }).catch((err: string) => {
        return res.json({
            status: 'error',
            msg: err,
            data: []
        })
    })
}

export const update = (req: any, res: any, next: any) => {
    let id: number = req.params.id

    new User({ id: id })
        .save({
            'username': req.body.username,
            'password': req.body.password
        })
        .then((model: Object) => {
            return res.json({
                status: 'User Updated Successfully',
                data: model
            })
        })
}

export const remove = (req: any, res: any, next: any) => {
    let id: number = req.params.id

    new User({ id: id })
        .destroy()
        .then((model: Object) => {
            res.json({
                status: 'success',
                msg: 'Record Successfully Delated',
                data: model
            })
        })
}

export const posts = (req: any, res: any, next: any) => {
    new User({ id: req.params.id })
        .fetch({ withRelated: ['posts']})
        .then((model: Object) => {
            res.json(model)
        })
}