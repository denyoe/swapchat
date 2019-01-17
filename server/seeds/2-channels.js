
exports.seed = function (knex, Promise) {

    return knex('channels').del()
        .then(function () {
            // Inserts seed entries
            return knex('channels').insert([
                { id: 1, name: 'General', user_id: 3 },
                { id: 2, name: 'Misc', user_id: 1 },
            ])
        })

}
