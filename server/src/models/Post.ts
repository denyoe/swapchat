const bookshelf = require('../../bookshelf')
import User from './User'
import Channel from './Channel'

export default bookshelf.Model.extend({
    tableName: 'messages',
    author: function(): Object {
        return this.belongsTo(User)
    },
    channel: function(): Object {
        return this.belongsTo(Channel)
    }
})