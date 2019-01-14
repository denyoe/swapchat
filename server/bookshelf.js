import knex from 'knex'
import bookshelf from bookshelf
import config from './knexfile'

const knex = knex(config.development)

export default bookshelf(knex)
