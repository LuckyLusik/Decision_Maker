
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('poll').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('poll').insert({id: 1, title: 'Movie Poll', description: 'Choose the movie you want to see tmrw!', startDate: '2018-12-18 23:43:43', endDate: '2018-12-19 22:32:44'}),
        knex('poll').insert({id: 2, title: 'Restaurant Madness', description: 'Which restaurant do you want to eat at?', startDate: '2018-12-19 17:43:43', endDate: '2018-12-20 21:32:44'}),
        knex('poll').insert({id: 3, title: 'Favourite Food', description: 'What is your favourite food?', startDate: '2018-12-18 10:43:43', endDate: '2018-12-25 9:32:44'})
      ]);
    });
};
