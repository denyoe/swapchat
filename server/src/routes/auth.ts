import express from 'express'
const router = express.Router()

router.get('/auth', (req: any, res: any, next: any) => {
    res.send('respond with a resource')
})

export default router
