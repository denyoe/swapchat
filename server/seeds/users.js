
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      // default password: password
      return knex('users').insert([
        { id: 1, username: 'sam', password: '$2a$10$RGWd9twc/BQZArd9aSdpRelkIGq3EQhAlua2.DIMG.6iaRmtPBP4C' },
        { id: 2, username: 'robin', password: '$2a$10$RGWd9twc/BQZArd9aSdpRelkIGq3EQhAlua2.DIMG.6iaRmtPBP4C' },
        { id: 3, username: 'marcus', password: '$2a$10$RGWd9twc/BQZArd9aSdpRelkIGq3EQhAlua2.DIMG.6iaRmtPBP4C'},
      ]);
    });
};
