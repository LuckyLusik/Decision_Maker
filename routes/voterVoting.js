"use strict";

const express = require('express');
const voterVoting  = express.Router();

module.exports = (knex) => {
    //page to display all details as requried by Poll Admin (see input/out flow doc)
    //user will respond to the question
    voterVoting.get("/:id", function(req, res){

    //display poll title, poll description, choice titles, choice descriptions, time expiration

    let pollData = knex('poll')
       // Or .where('poll.short_url', req.params.id)
      .where('short_url', '=', req.params.id)
      .limit(10)
      .join('choice', 'choice.poll_id', '=', 'poll.id')
      .select('poll.title', 'poll.description', 'poll.start_date', 'poll.end_date', 'choice.title', 'choice.description')
      .then(function (rows) {
        console.log(rows);
        res.json(rows);
    })

    voterVoting.put(":/id", function (req, res) {
        //use similar functions from landing page to send data to server
        //insert name
        //insert email
        //send choices (using borda function)
        res.redirect('votingTY');
    })

    return voterVoting;
}
