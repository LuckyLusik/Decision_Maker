
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('choice').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('choice').insert({id: 1, title: 'The Dark Knight', description: 'The best Batman movie ever made!'}),
        knex('choice').insert({id: 2, title: 'Wonder Woman', description: 'About a badass superhero who battles a god and wins...'}),
        knex('choice').insert({id: 3, title: 'Ironman', description: 'Hands down the best Marvel movie.'}),
        knex('choice').insert({id: 4, title: 'McDonalds', description: 'Oldie but  goodie!'}),
        knex('choice').insert({id: 5, title: 'Tim Hortons', description: 'Canadian favourite.'}),
        knex('choice').insert({id: 6, title: 'Chipotle', description: 'Burritos...'}),
        knex('choice').insert({id: 7, title: 'Japanese', description: 'Sushi rocks!'}),
        knex('choice').insert({id: 8, title: 'Thai', description: 'If you love peanuts and delicious noodles.'}),
        knex('choice').insert({id: 9, title: 'Italian', description: 'Come on...'}),
        knex('choice').insert({id: 10, title: 'Mexican', description: 'Tacos, burritos and salsa!'}),
        knex('choice').insert({id: 11, title: 'French', description: 'Expensive and mouth watering.'}),

      ]);
    });
};
