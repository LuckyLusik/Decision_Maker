"use strict";
const moment = require('moment');
const express = require('express'); 
const landing  = express.Router();

module.exports = (sharedFunctions, knex) => {
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
        
        async function noBlanks (name, email, pollTitle, choice1, choice2) {
            const body = req.body;
            
            if (name.trim() === undefined || email === undefined || pollTitle.trim() === undefined || choice1.trim() === undefined || choice2.trim() === undefined ){
                //TO-DO will need to notify of Toggle Div for Error
            console.log('DID IT FAIL?')
            } else {
                console.log('It passed check')
                const startDate = Math.floor(new Date().getTime()/1000.0)
                const endDate = `${body.endDate} ${body.endHour} ${body.endAmPm}`
                console.log('startDate', startDate, 'endDate', typeof(body.endDate), body.endDate, 'time', typeof(body.endHour), body.endHour);
                sharedFunctions.sumTime(endDate)
                const urlString = sharedFunctions.urlString();
                const pollCreatorInfo = [{ name: body.name, email: body.email}];
                const pollInfo = [{title: body.pollTitle, description: body.pollDescription, start_date: startDate, end_date: endDate}]; //TO-DO : add , id_url: urlString, requireName back into pollInfo
                const choiceInfo    = [body.choice1, body.choice2, body.choice3, body.choice4, body.choice5]
                const choiceDescription   = [body.choiceDescription1, body.choiceDescription2, body.choiceDescription3, body.choiceDescription4, 
                body.choiceDescription5]
                let choiceArray     = [];
                

                for (const i in choiceInfo) {
                    console.log('In the choice array')
                    if (!choiceInfo[i]) { break; }
                    choiceArray.push({title: choiceInfo[i], description: choiceDescription[i]})
                    console.log('did I make it?')
                }
                console.log('Variables', pollCreatorInfo, pollInfo, choiceArray)
                /*
                knex('whatever')
                  .insert(toInsert)
                  .returning('id')
                  .then((ids) => {
                      return knex.whatever
                  })
                */ 
                console.log("Before processing")
                const poll = await knex('poll')
                    .insert(pollInfo)
                    .returning('id')
                const creator = await knex('creator')
                    .insert(pollCreatorInfo)
                    .returning('id')
                const choice = await knex('choice')
                    .insert(choiceInfo)
                    .returning('id') //TO-DO, how do I return an ID to push the choice title ids?
           }
           knex('poll').select('*').asCallback(function(err,rows){
               if(err){
               console.error(err)
               return
                } 
                console.log(rows)
                return
           })
          
        }
        return noBlanks (req.body.name, req.body.name, req.body.email, req.body.pollTitle, req.body.choice1, req.body.choice2);
    });


    return landing;
}
