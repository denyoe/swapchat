
exports.seed = function (knex, Promise) {

    return knex('messages').del()
        .then(function () {
            // Inserts seed entries
            return knex('messages').insert([
                { id: 1, body: 'Body 1', user_id: 1, channel_id: 1 },
                { id: 2, body: 'Body 2', user_id: 1, channel_id: 2 },
                { id: 3, body: 'Body 3', user_id: 3, channel_id: 1 },
            ])
        })

}
