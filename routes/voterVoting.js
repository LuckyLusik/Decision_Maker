"use strict";

const express = require('express');
const voterVoting  = express.Router();

module.exports = (sharedFunctions, knex) => {
    //page to display all details as requried by Poll Admin (see input/out flow doc)
    //user will respond to the question
    voterVoting.get("/:id", function(req, res){
        const templateVars = {
            urlId: req.params.id,
        }
        res.render("../views/voting.ejs")
    })

    voterVoting.put("/:id", function (req, res) {
        
        /*
        -Validate all inputs meet requirements (ie rank order, user name if req.)
        -If error, send ajax response back to error field.
        -redirect user to voting thank you page
        */
        res.redirect('votingTY');
    })

    return voterVoting;
}
