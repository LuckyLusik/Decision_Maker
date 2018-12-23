"use strict";

const express = require('express');
const  pollAdmin = express.Router();

module.exports = (knex) => {
    // poll admin access to poll details
    // see poll results, name of voters if required in setup
    // contains voter link
    pollAdmin.get("/pollAdmin", function(req, res) {

        //- Polls Knex for Poll admin name and email address to be displayed in body
        //- render pollSetupTY page EJS
        res.render("../views/pollAdmin.ejs")
    });

    pollAdmin.post("/:id", function(req, res){
        // stop poll function is called. Poll is closed.

    });


    return pollAdmin;
}
