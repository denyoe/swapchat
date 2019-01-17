
exports.up = function(knex, Promise) {
    return knex.schema.createTable('user_channels', table => {
        table.increments()

        table.integer('user_id').unsigned().notNull()
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')

        table.integer('channel_id').unsigned().notNull()
        table.foreign('channel_id').references('id').inTable('channels').onDelete('CASCADE').onUpdate('CASCADE')

        table.timestamps(true, true)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('user_channels')
};
