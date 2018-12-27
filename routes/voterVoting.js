"use strict";

const express = require('express');
const voterVoting  = express.Router();

module.exports = (sharedFunctions, knex) => {
    //page to display all details as requried by Poll Admin (see input/out flow doc)
    //user will respond to the question
    voterVoting.get("/:id", function(req, res){
       
       res.render("../views/voting.ejs")
    })

    return voterVoting;
}