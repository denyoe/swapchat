
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments()
        table.string('username').notNullable()
        table.password('password').notNullable()
    })
}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
}
