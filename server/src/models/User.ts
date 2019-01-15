const bookshelf = require('../../bookshelf')
import Post from './Post'

export default bookshelf.Model.extend({
    tableName: 'users',
    posts: function (): Object {
        return this.hasMany(Post)
    }
})

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