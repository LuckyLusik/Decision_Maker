"use strict";

const express = require('express');
const  pollAdmin = express.Router();

module.exports = (sharedFunctions, knex) => {
    // poll admin access to poll details
    // see poll results, name of voters if required in setup
    // contains voter link
    pollAdmin.get("/:id", function(req, res) {

        short_url = req.params.id
        knex('poll')

        const templateVars = {
            short_url: short_url,

        }
        /*
        -check if :id exists:
            -if not route to no page.
            -if link exist, pull all related information
        
        - information to retrieve:
            see excel (vote retrival and use tracking tab)
        
        - fill data into poll

        - ensure all required page data is pulled and assign to templateVars.

        - Polls Knex for Poll admin name and email address to be displayed in body
        - render pollSetupTY page EJS

        */
        res.render("pollAdmin", templateVars)
    });

    pollAdmin.post("/:id", function(req, res){
        // stop poll function is called. Poll is closed. 

    });


    return pollAdmin;
}