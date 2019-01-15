const knex = require('knex')
const bookshelf = require('bookshelf')
const config = require('./knexfile')

const Bookshelf = bookshelf(
    knex(config.staging)
)

Bookshelf.plugin('registry')

module.exports = Bookshelf
