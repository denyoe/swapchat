/* users. */
import express from 'express'
import {
    all,
    create,
    get,
    update,
    remove,
    posts
} from '../controllers/UserController'

const router = express.Router()

router.get('/', all)

router.post('/', create)

router.get('/:id', get)

router.put('/:id', update)

router.delete('/:id', remove)

router.get('/:id/posts', posts)

export default router