"use strict";

const express = require('express');
const voterResult  = express.Router();

module.exports = (sharedFunctions) => {

  //when a user finishes their poll inputs, they are rediected to a thank you page and then redirected
  //to the voter results page that shows poll results

  voterResult.get("/:id/results", function(req, res) {

    let pollData = knex('poll')
       // Or .where('poll.short_url', req.params.id)
      .where('short_url', '=', req.params.id)
      .limit(10)
      .join('choice', 'choice.poll_id', '=', 'poll.id')
      .select('poll.title', 'poll.description', 'poll.start_date', 'poll.end_date', 'choice.title', 'choice.description')
      .then(function (rows) {
        rows.toArray(function (err, result){
          if (err) throw err;
          // should show the selected data in an array of objects, which we should be able to loop through now ---> .forEach()
         console.log(result);
        })
        console.log(rows);
        // the key to get the data back is the res.send() or the res.json()....
        // res.json(rows);
    });


    //these are join functions to access related data from each table, we will need to refactor
    let choiceData = knex('choice')
      .join('rank', 'rank.choice_id', '=', 'choice.id')
      .select('rank.value')
      .then(function (rows) {
        console.log(rows);
        res.json(rows);
    })

    let voterData = knex('poll_voter')
      .join('rank', 'rank.voter_id', '=', 'poll_voter.id')
      .select('poll.name', 'poll.email')
      .then(function (rows) {
        console.log(rows);
        res.json(rows);
    })

      // We have to take the data and stringify it to an array and then parse it I think
      // storableData = JSON.stringify(arrayData)
      // arrayData = JSON.parse(storableData)


      //we would need to npm install knex-populate to use this, it might be helpful
      //const knex_populate = require('knex-populate')

      //knex_populate(knex, 'poll')
      //.find(object_with_query_params(if any)) <------ if we leave this blank we get all of them
      //.populate(referenced_table, foreign_key, [alias]) <----- ('poll', 'creator_id')
      //.exec
      //.then(results => res.send(results));
      //});


