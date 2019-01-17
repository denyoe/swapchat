const bookshelf = require('../../bookshelf')
import * as Post from './Post'
import * as Channel from './Channel'

export const User = bookshelf.model('User', {
    tableName: 'users',
    posts: function (): any {
        return this.hasMany('Post')
    },
    channels: function(): any {
        return this.belongsToMany('Channel', 'user_channels')
    },
    owned_channels: function(): any {
        return this.hasMany('Channel')
    }
})

// module.exports = bookshelf.model('User', User)

// export default class User extends bookshelf.Model {
//     get tableName() {
//         return 'users'
//     }

//     get hasTimestamps() {
//         return false
//     }

//     posts() {
//         return this.hasMany(Post)
//     }

//     verifyPassword(password: string) {
//         return this.get('password') === password
//     }

//     static byEmail(username: string) {
//         return this.forge().query({ where: { username: username } }).fetch()
//     }
// }