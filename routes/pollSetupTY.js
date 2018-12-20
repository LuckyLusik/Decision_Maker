"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {
    // Thanks poll admin after setuping poll
    // Provides notice that an email is sent
    pollSetupTY.get("/:id", function(req, res) {
        
        //- Polls Knex for Poll admin name, poll admin page link and email address to be displayed in body
        //- render pollSetupTY page EJS
        res.render("pollSetupTY")
    });

    // optional function to redirect user to admin poll page
    pollSetupTY.post("/:id", function(req,res){
        // takes auto redirection request to admin poll page

    });

    return router;
}
