const bookshelf = require('../../bookshelf')
import * as Post from './Post'
// import * as Bookshelf from 'bookshelf'

// export default bookshelf.Model.extend({
//     tableName: 'channels',
//     posts: function (): any {
//         return this.hasMany(Post)
//     }
// })

module.exports = bookshelf.model('Channel', {
    tableName: 'channels',
    posts: function (): any {
        return this.hasMany('Post')
    }
})