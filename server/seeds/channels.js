
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('channels').del()
    .then(function () {
      // Inserts seed entries
      return knex('channels').insert([
        { id: 1, name: 'General' },
        { id: 2, name: 'Misc' },
      ]);
    });
};
