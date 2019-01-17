
exports.seed = function (knex, Promise) {

    return knex('user_channels').del()
        .then(function () {
            // Inserts seed entries
            return knex('user_channels').insert([
                { id: 1, user_id: 2, channel_id: 2 },
                { id: 2, user_id: 3, channel_id: 2 },
            ])
        })

}
