require('../models/Channel')
import express from 'express'
import { Model } from 'bookshelf'
import { ChannelController } from '../controllers/ChannelController'

let ChannelCtrl: ChannelController = new ChannelController('Channel')

const router = express.Router()

router.get('/', ChannelCtrl.all)

router.post('/', ChannelCtrl.create)

router.get('/:id', ChannelCtrl.get)

router.put('/:id', ChannelCtrl.update)

router.patch('/:id', ChannelCtrl.update)

router.delete('/:id', ChannelCtrl.remove)

router.post('/:id/message', ChannelCtrl.post)

export default router