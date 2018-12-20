"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
    // poll admin access to poll details
    // see poll results, name of voters if required in setup
    // contains voter link
    pollAdmin.get("/:id", function(req, res) {
        
        //- Polls Knex for Poll admin name and email address to be displayed in body
        //- render pollSetupTY page EJS
        res.render("pollAdmin")
    });

    pollAdmin.post("/:id", function(req, res){
        // stop poll function is called. Poll is closed. 

    });


    return router;
}