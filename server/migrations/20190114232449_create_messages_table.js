
exports.up = function(knex, Promise) {
    return knex.schema.createTable('messages', table => {
        table.increments()
        table.text('body')

        table.integer('user_id').unsigned()
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')

        table.integer('channel_id').unsigned()
        table.foreign('channel_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')

        table.timestamps(true, true)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('messages')
};
