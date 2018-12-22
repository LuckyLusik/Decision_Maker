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
        //OLD console.log("submit button received:", req.body)
        const urlString = sharedFunctions.urlString(); //for urlID
        const body = req.body;
        const endDate = `${body.endDate} ${body.endHour} ${body.endAmPm}`;
        let templateVars = {
            name: body.name,
            email: body.email,
            pollTitle: body.pollTitle,
            pollEndDate: endDate,
            urlId: urlString,
            choiceCounted: 0,
            //will poll_id be needed for the thank you page? can be push into templateVars
        }

        async function noBlanks (name, email, pollTitle, choice1, choice2) {
            try{
                if (name.trim() === undefined || email === undefined || pollTitle.trim() === undefined || choice1.trim() === undefined || choice2.trim() === undefined ){
                    //TO-DO will need to notify of Toggle Div for Error
                    //TO-DO need to add urlString to returned ID
                console.log('DID IT FAIL?')
                } else {
                    console.log('It passed check')
                    const startDate = moment(new Date()).format("YYYY-MM-DD hh:mm a");
                    
                    // OLD console.log('startDate', startDate, 'endDate', typeof(body.endDate), body.endDate, 'time', typeof(body.endHour), body.endHour);
                    const pollCreatorInfo = [{ name: body.name, email: body.email}];
                    const pollInfo = {title: body.pollTitle, description: body.pollDescription, start_date: startDate, end_date: endDate}; //TO-DO : add , id_url: urlString, requireName back into pollInfo
                    const choiceInfo = [body.choice1, body.choice2, body.choice3, body.choice4, body.choice5]
                    const choiceDescription = [body.choiceDescription1, body.choiceDescription2, body.choiceDescription3, body.choiceDescription4, 
                    body.choiceDescription5]
                    let choiceArray     = [];
                    

                    for (const i in choiceInfo) {
                        if (!choiceInfo[i]) { break; }
                        choiceArray.push(
                            {title: choiceInfo[i], description: choiceDescription[i]}
                        )
                        templateVars.choiceCounted = i+1;
                    }
                    //console.log('Variables', pollCreatorInfo, pollInfo, choiceArray)
                    console.log("Before DB insert processing")
                    const [creator_id] = await knex('poll_creator')
                        .insert(pollCreatorInfo)
                        .returning('id')
                    pollInfo.creator_id = creator_id
                    const [poll_id] = await knex('poll')
                        .insert(pollInfo)
                        .returning('id')
                    choiceArray.forEach(c => c['poll_id'] = poll_id)
                    const choice = await knex('choice')
                        .insert(choiceArray)
                        .returning('id')
                }
            }
            catch(err){
                //will need to add further err catching 
                console.log('bad bad', err)
            }          
        }
        //processing the data into the db
        noBlanks (req.body.name, req.body.name, req.body.email, req.body.pollTitle, req.body.choice1, req.body.choice2);
        console.log(templateVars);
        //Sends user into new page with all of the templateVars which is sufficient for the page to load with necessary text.
        res.render('pollSetupTY', templateVars)
    });
    return landing;
}
