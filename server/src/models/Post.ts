const bookshelf = require('../../bookshelf')
import * as User from './User'
import * as Channel from './Channel'

export const Post = bookshelf.model('Post', {
    tableName: 'messages',
    author: function (): any {
        return this.belongsTo('User')
    },
    channel: function(): any {
        return this.belongsTo('Channel')
    }
})