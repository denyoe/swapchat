/* users. */
require('../models/User')
import express from 'express'
import { Model } from 'bookshelf'
import { UserController } from '../controllers/UserController'

let UserCtrl: UserController = new UserController('User')

const router = express.Router()

router.post('/', UserCtrl.create)

const verifyToken = require('../middlewares/verifytoken')
router.use(verifyToken)

router.get('/', UserCtrl.all)

router.get('/:id', UserCtrl.get)   

router.put('/:id', UserCtrl.update)

router.patch('/:id', UserCtrl.update)

router.delete('/:id', UserCtrl.remove)

router.get('/:id/posts', UserCtrl.posts)

router.get('/:id/channels', UserCtrl.channels)

export default router