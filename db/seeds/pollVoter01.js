
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pollVoter').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('pollVoter').insert({id: 1, name: 'Tom', email: 'tombutt@hotmail.com'}),
        knex('pollVoter').insert({id: 2, name: 'Rafa', email: 'gorgon@yahoo.ca'}),
        knex('pollVoter').insert({id: 3, name: 'Joon', email: 'Krock@gmail.com'})
      ]);
    });
};
