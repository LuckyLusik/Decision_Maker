
exports.seed = function(knex, Promise) {

function delete_poll_creator () {
  return knex('poll_creator').del()
}

function delete_poll () {
  return knex('poll').del()
}

function delete_choice () {
  return knex('choice').del()
}

function delete_poll_voter () {
  return knex('poll_voter').del()
}

function delete_rank () {
  return knex('rank').del()
}

function insert_poll_creator () {
  return knex('poll_creator').insert([
    {name: 'Joe', email: 'joejoe32@hotmail.com'}
  ]).returning('*');
}

//One FK refering to poll_creator
function insert_poll (poll_creators) {
  return knex('poll').insert([
    {title: 'Movie Poll', description: 'Choose the movie you want to see tmrw!', start_date: '2018-12-18 23:43:43', end_date: '2018-12-19 22:32:44', creator_id: poll_creators[0].id}
  ]).returning('*');
}

//One FK refering to poll
function insert_choice (polls) {
  return knex('choice').insert([
    {title: 'The Dark Knight', description: 'The best Batman movie ever made!', poll_id: polls[0].id},
    {title: 'Wonder Woman', description: 'About a badass superhero who battles a god and wins...', poll_id: polls[0].id},
    {title: 'Ironman', description: 'Hands down the best Marvel movie.', poll_id: polls[0].id}
  ]).returning('*');
}

function insert_poll_voter () {
  return knex('poll_voter').insert([
    {name: 'Tom', email: 'tomguy@hotmail.com'},
    {name: 'Rafa', email: 'gorgon@yahoo.ca'}
  ]).returning('*');
}

//Two FK refering to choice and poll_voter
function insert_rank (poll_voters, choices) {
  return knex('rank').insert([
    {choice_id: choices[0].id, value: 3, voter_id: poll_voters[0].id},
    {choice_id: choices[1].id, value: 2, voter_id: poll_voters[0].id},
    {choice_id: choices[2].id, value: 1, voter_id: poll_voters[0].id},
    {choice_id: choices[0].id, value: 1, voter_id: poll_voters[1].id},
    {choice_id: choices[1].id, value: 3, voter_id: poll_voters[1].id},
    {choice_id: choices[2].id, value: 2, voter_id: poll_voters[1].id}
  ]).returning('*');
}


return delete_rank()
  .then(delete_choice)
  .then(delete_poll_voter)
  .then(delete_poll)
  .then(delete_poll_creator)
  .then(insert_poll_creator)
  .then(poll_creators => insert_poll(poll_creators))
  .then(polls => insert_choice(polls))
  .then(choices => {
    insert_poll_voter()
      .then(poll_voters => insert_rank(poll_voters, choices))
  })

}



