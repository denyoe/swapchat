const bookshelf = require('../../bookshelf')
import * as Post from './Post'

export const Channel = bookshelf.model('Channel', {
    tableName: 'channels',
    posts: function (): any {
        return this.hasMany('Post')
    },
    members: function(): any {
        return this.belongsToMany('User', 'user_channels')
    },
    owner: function(): any {
        return this.belongsTo('User')
    }
})