require('../models/Channel')
import express from 'express'
import { Model } from 'bookshelf'
import { ChannelController } from '../controllers/ChannelController'

let ChannelCtrl: ChannelController = new ChannelController('Channel')

const router = express.Router()

const verifyToken = require('../middlewares/verifytoken')
router.use(verifyToken)

router.get('/', ChannelCtrl.all)

router.post('/', ChannelCtrl.create)

router.get('/:id', ChannelCtrl.get)

router.put('/:id', ChannelCtrl.update)

router.patch('/:id', ChannelCtrl.update)

router.delete('/:id', ChannelCtrl.remove)

router.post('/:id', ChannelCtrl.post)

router.get('/:id/members', ChannelCtrl.members)

router.get('/:id/posts', ChannelCtrl.posts)

router.post('/:id/subscribe/:user_id', ChannelCtrl.subscribe)

router.delete('/:id/subscribe/:user_id', ChannelCtrl.unsubscribe)

export default router