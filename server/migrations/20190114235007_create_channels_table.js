
exports.up = function(knex, Promise) {
    return knex.schema.createTable('channels', table => {
        table.increments()
        table.text('name')

        table.integer('user_id').unsigned()
        table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE').onUpdate('CASCADE')
        
        table.timestamps(true, true)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('channels')
};
