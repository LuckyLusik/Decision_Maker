"use strict";
const moment = require('moment');
const express = require('express'); 
const landing  = express.Router();
const nodemailer = require('nodemailer')


module.exports = (sharedFunctions, knex) => {
    // Landing page will capture details of the poll to be created
    // Details captured will be fed to all subsequent pages to display relevent data
    landing.get("/", function (req, res) {

        res.render("../views/index.ejs");
      });

    landing.post("/", async function (req, res) {
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
        
        let checkBox = function () {
            if (req.body.checkbox === 'on'){
                return true;
            } else {
                return false;
            }
        }
        let templateVars = {
            name: body.name,
            email: body.email,
            pollTitle: body.pollTitle,
            pollEndDate: endDate,
            urlId: urlString,
            choiceCounted: 0,
            checkbox: checkBox(),
            //will poll_id be needed for the thank you page? can be push into templateVars
        }
        const mailBody = {
            from: 'lighthousetesting@yahoo.com', // sender address
            to: body.email, // list of receivers
            subject: `${body.name}, ${body.pollTitle} is setup!`, // Subject line
            text: `Decision Maker has created your ${body.pollTitle} poll. The link to your admin page is : localhost:8080/pa/${urlString}. Please share the poll link: localhost:8080/vl/${urlString}. `, // plain text body
            html: 
            `<div class="top">
            <img src="/images/logo.png" class="logo">
            <h1>Decision Maker</h1>
            </div>
            <body> 
            Decision Maker has created your ${body.pollTitle} poll. 
            <br> The link to your admin page is : <a href="localhost:8080/pa/${urlString}">localhost:8080/pa/${urlString}</a>. 
            <br>
            <br> Please share the poll link: <a href="localhost:8080/vl/${urlString}">localhost:8080/vl/${urlString}</a>.
            </body>` // html body
        };

        async function noBlanks (name, email, pollTitle, choice1, choice2) {
            try{
                if (name === undefined || email === undefined || pollTitle === undefined || choice1 === undefined || choice2 === undefined ){
                    //TO-DO will need to notify of Toggle Div for Error
                    //TO-DO need to add urlString to returned ID
                    console.log('DID IT FAIL?')
                } else {
                    console.log('It passed check');
                    await console.log('Req.body: ', req.body)
                    const startDate = moment(new Date()).format("YYYY-MM-DD hh:mm a");
                    // OLD console.log('startDate', startDate, 'endDate', typeof(body.endDate), body.endDate, 'time', typeof(body.endHour), body.endHour);
                    const pollCreatorInfo = [{ name: body.name, email: body.email}];
                    const pollInfo = {title: body.pollTitle, description: body.pollDescription, start_date: startDate, end_date: endDate, short_url: urlString, name_verfy: checkBox() }; //TO-DO : add , id_url: urlString, requireName back into pollInfo
                    const choiceInfo = [body.choice1, body.choice2, body.choice3, body.choice4, body.choice5]
                    const choiceDescription = [body.choiceDescription1, body.choiceDescription2, body.choiceDescription3, body.choiceDescription4, 
                    body.choiceDescription5]
                    let choiceArray     = [];
                    const thankYouPage = 
                        `<section>
                        <span class="glyphicon glyphicon-ok-circle poll-success" aria-hidden="true"></span>
                        </section>
                        <section class="main_descrip">
                            <p>You successfully created a poll.</p>
                            <p>Confirmation email is sent to you.</p>
                        </section>
                        <section>
                            <a class="link-style" href="http://localhost:8080/pa/${urlString}">Press here to visit admin page</a>
                        </section>
                        <section class="main_descrip_smaller">
                            <p>This is a link to send your friends:</p>
                        </section>
                        <section>
                            <a class="link-style-nomargin" href="http://localhost:8080/vl/${urlString}">Link to poll</a>
                        </section>`;
                    const injectLocation = '#poll-info'
                    const jsonResArray = [injectLocation, thankYouPage]

                    for (const i in choiceInfo) {
                        if (!choiceInfo[i]) { break; }
                        choiceArray.push(
                            {title: choiceInfo[i], description: choiceDescription[i]}
                        )
                        templateVars.choiceCounted = Number(i)+1;
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
                    
                    console.log("page render")
                    return res.json(jsonResArray);
                }
                
     
            }
            catch(err){
                //will need to add further err catching 
                console.log('bad bad', err)
            } 
        }
        
        //processing the data into the db
        noBlanks (req.body.name, req.body.name, req.body.email, req.body.pollTitle, req.body.choice1, req.body.choice2);
        //Sends user into new page with all of the templateVars which is sufficient for the page to load with necessary text.
        console.log(templateVars);

        sharedFunctions.mailer(mailBody, (error, info) => {
            if (error){
                return console.log('ERROR from email ON LANDING PAGE. EMAIL NOT SENT');
            }
            else {
                if (info){
                    console.log("inside the mailer block!")
                }
            }
        })
        
    });
    return landing;
}
