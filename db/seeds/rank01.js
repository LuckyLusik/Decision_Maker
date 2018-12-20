
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rank').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        // Ranks from 1-3 for movies choices
        knex('rank').insert({id: 1, value: 3}),
        knex('rank').insert({id: 2, value: 2}),
        knex('rank').insert({id: 3, value: 1}),
        // Ranks from 1-3 for restaurant choices
        knex('rank').insert({id: 4, value: 2}),
        knex('rank').insert({id: 5, value: 1}),
        knex('rank').insert({id: 6, value: 3}),
        // Ranks from 1-5 for favourite food choices
        knex('rank').insert({id: 7, value: 1}),
        knex('rank').insert({id: 8, value: 4}),
        knex('rank').insert({id: 9, value: 3}),
        knex('rank').insert({id: 10, value: 2}),
        knex('rank').insert({id: 11, value: 5})
      ]);
    });
};
