/* users. */
require('../models/User')
import express from 'express'
import { Model } from 'bookshelf'
import { UserController } from '../controllers/UserController'

let UserCtrl: UserController = new UserController('User')

const router = express.Router()

const verifyToken = require('../middlewares/verifytoken')
router.use(verifyToken)

router.get('/', UserCtrl.all)

router.post('/', UserCtrl.create)

router.get('/:id', UserCtrl.get)   

router.put('/:id', UserCtrl.update)

router.patch('/:id', UserCtrl.update)

router.delete('/:id', UserCtrl.remove)

router.get('/:id/posts', UserCtrl.posts)

export default router