const knex = require('knex')
const bookshelf = require('bookshelf')
const config = require('./knexfile')

module.exports = bookshelf(
    knex(config.development)
)
