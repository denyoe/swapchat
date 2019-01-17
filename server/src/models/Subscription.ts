const bookshelf = require('../../bookshelf')
import * as User from './User'
import * as Channel from './Channel'

export const Subscription = bookshelf.model('Subscription', {
    tableName: 'user_channels',
})