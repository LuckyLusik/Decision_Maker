"use strict";

const express = require('express');
const landing  = express.Router();

module.exports = (knex) => {
    // Landing page will capture details of the poll to be created
    // Details captured will be fed to all subsequent pages to display relevent data
    landing.get("/", (req, res) => {
        
        res.render("../views/index.ejs");
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
        - objectionCreationAdmin is a callback function in sharedFunctions 
        */
        const pollAdminObject = sharedFunctions.dataValidationAdmin (req.body.adminName, req.body.adminEmail, req.body.pollTitle, req.body.pollDescription, req.body.choiceTitle, req.body.choiceDescription, req.body.endData, requireName, objectCreationAdmin)
        
        const didInsertWork = pushAdminDetails(pollAdminObject);

        if (didInsertWork){
            res.redirect ('/pollSetupTY');
        } else {
            res.json("Something went wrong. Please try to submit your poll again")
        }
        
        
    });


    return landing;
}
