"use strict";

const express = require('express');
const landing  = express.Router();

module.exports = (knex) => {
    // Landing page will capture details of the poll to be created
    // Details captured will be fed to all subsequent pages to display relevent data
    landing.get("/", (req, res) => {
        res.render("landing");
      });

    landing.put("/", function (req, res) {
        /*
        - validate all datasets incoming, if data is missing Ajax response 
        needed to error field
        - Fields (Poll Title, Poll Description, Poll Options, Admin name, 
        email address, (t/f for name submission), poll closing time)
        - Create shortened path link
        - puts poll details into psql via knex
        - send email
        */
        sharedFunctions.objectCreationAdmin (req.body.adminName, req.body.adminEmail, urlString,req.body.pollTitle, req.body.pollDescription, req.body.choiceTitle, req.body.choiceDescription, req.body.endData)

        res.redirect ('/pollSetupTY');
    });


    return landing;
}
