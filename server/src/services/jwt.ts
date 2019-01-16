import * as jwt from 'jsonwebtoken'

export const parse = (req: any): any => {
    let token: string
    if (req.headers['authorization']) {
        token = req.headers['authorization'].split(' ')[1]
    } else {
        token = req.body.token || req.query.token || req.headers['x-access-token']
    }

    let decoded = jwt.decode(token)

    return decoded
}
