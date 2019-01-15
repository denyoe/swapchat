const bookshelf = require('../../bookshelf')
import Post from './Post'

export default bookshelf.Model.extend({
    tableName: 'channels',
    posts: function(): Object {
        return this.hasMany(Post)
    }
})