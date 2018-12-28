"use strict";

const express = require('express');
const votingTY  = express.Router();

module.exports = (knex) => {
    // Thanks user for voting
    // Provides voting results
    votingTY.get("/", function(req, res) {

        //- Polls Knex for voter name and voting results to be displayed in body if required by Admin
        //- Thank user for voting
        //- render votingTY EJS page

        res.render("../views/votingTY.ejs")
    });

    return votingTY;
}
