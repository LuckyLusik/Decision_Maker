
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pollCreator').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('pollCreator').insert({id: 1, name: 'Joe', email: 'joejoe32@hotmail.com'}),
        knex('pollCreator').insert({id: 2, name: 'Ronald', email: 'thrace@gmail.com'}),
        knex('pollCreator').insert({id: 3, name: 'Jess', email: 'Jess42@yahoo.ca'}),
        knex('pollCreator').insert({id: 4, name: 'James Toddington', email: 'Todd23@yahoo.ca'})
      ]);
    });
};
