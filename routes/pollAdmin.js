"use strict";

const express = require('express');
const pollAdmin  = express.Router();


module.exports = (sharedFunctions, knex) => {
    // poll admin access to poll details
    // see poll results, name of voters if required in setup
    // contains voter link
    pollAdmin.get("/:id", function(req, res) {
        res.render("../views/pollAdmin.ejs")
    });

    pollAdmin.post("/:id", function(req, res){

    });
    return pollAdmin;

}