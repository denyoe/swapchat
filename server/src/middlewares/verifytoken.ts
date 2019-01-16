import * as jwt from 'jsonwebtoken'

module.exports = (req: any, res: any, next: any) => {
    let token
    if (req.headers['authorization'] ) {
        token = req.headers['authorization'].split(' ')[1]
    } else {
        token = req.body.token || req.query.token || req.headers['x-access-token']
    }
    const secret: any = process.env.JWT_SECRET
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, secret, (err: any, decoded: any) => {
            if (err) { // failed verification.
                return res.json({ "error": true })
            }
            req.decoded = decoded;
            next() // no error, proceed
        })
    } else {
        // forbidden without token
        return res.status(401).json({
            "error": true
        })
    }
}