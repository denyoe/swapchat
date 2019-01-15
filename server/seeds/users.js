
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { id: 1, username: 'sam', password: 'password' },
        { id: 2, username: 'robin', password: 'password' },
        { id: 3, username: 'marcus', password: 'password'},
      ]);
    });
};
