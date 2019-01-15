
exports.up = function(knex, Promise) {
    return knex.schema.createTable('channels', table => {
        table.increments()
        table.text('name')
        table.timestamps(true, true)
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('channels')
};
