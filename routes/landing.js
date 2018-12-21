"use strict";

const express = require('express');
const landing  = express.Router();

module.exports = (sharedFunctions) => {
    // Landing page will capture details of the poll to be created
    // Details captured will be fed to all subsequent pages to display relevent data
    landing.get("/", function (req, res) {
        
        res.render("../views/index.ejs");
      });

    landing.post("/", function (req, res) {
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
        console.log("submit button received:", req.body)
        const pollAdminObject = sharedFunctions.dataValidationAdmin (req.body.name, req.body.email, req.body.pollTitle, req.body.pollDescription, req.body.choiceOne,  req.body.choiceDescriptionOne, req.body.choiceTwo,  req.body.choiceDescriptionTwo,req.body.choiceThree,  req.body.choiceDescriptionThree, req.body.choiceFour,  req.body.choiceDescriptionFour, req.body.choiceFive,  req.body.choiceDescriptionFive, req.body.endData, req.body.checkbox, sharedFunctions.objectCreationAdmin)
        
        const didInsertWork = sharedFunctions.pushAdminDetails(pollAdminObject);

        if (didInsertWork){
            res.redirect ('/pollSetupTY');
        } else {
            res.json("Something went wrong. Please try to submit your poll again")
        }
        
        
    });


    return landing;
}
