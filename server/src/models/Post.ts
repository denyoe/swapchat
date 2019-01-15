const bookshelf = require('../../bookshelf')
import * as User from './User'
import * as Channel from './Channel'

// export default bookshelf.Model.extend({
//     tableName: 'messages',
//     author: function(): Object {
//         return this.belongsTo(User)
//     },
//     channel: function(): Object {
//         return this.belongsTo(Channel)
//     }
// })

module.exports = bookshelf.model('Post', {
    tableName: 'messages',
    author: function (): Object {
        return this.belongsTo('User')
    },
    channel: function(): Object {
        return this.belongsTo('Channel')
    }
})