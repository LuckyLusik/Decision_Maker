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
        
        noBlanks = function (req.body.name, req.body.email, req.body.pollTitle, req.body.choice1,  req.body.choice2) {
            if (req.body.name.trim() === undefined || req.body.email === undefined || req.body.pollTitle.trim() === undefined || req.body.choice1.trim() === undefined || req.body.choice2.trim() === undefined ){
                //TO-DO will need to notify of Toggle Div for Error
            } else {
                const startDate = moment(Date.now()).valueOf();
                const urlString = urlString();
                const pollCreatorInfo = [{ name: adminName, email: adminEmail}];
                const pollInfo = [{title: pollTitle, description: pollDescription, start_date: startDate, end_date: endDate}]; //TO-DO : add urlString, requireName back into pollInfo
                const choiceInfo = [{title: choiceTitle, description: choiceDescription}];
                summaryArray = [pollInfo,pollCreatorInfo, choiceInfo];

                knex('poll')
                    .insert(summaryArray[0])
                    .returning('*')
                knex('creator')
                    .insert(summaryArray[1])
                    .returning('*')
                knex('choice')
                    .insert(summaryArray[2])
                    .returning('*')
            }
        }
    });


    return landing;
}
