"use strict";

const express = require('express');
const voterVoting  = express.Router();

module.exports = (sharedFunctions, knex) => {
    //page to display all details as requried by Poll Admin (see input/out flow doc)
    //user will respond to the question
    voterVoting.get("/:id", function(req, res){
        /*
        - Has voting expired?
        - pull data from poll to load right amount selections
            - use jquery to config
        - render page
        - render choice columns and stars
        */
        const urlId = req.params.id;
        let pollData; //array containing object
        let choiceData; //array containing object
        let pollCreatorData; //array containing object
        let pollingDB = new Promise (
            async function(resolve, reject) { 
                try {
                    await knex('poll')
                        .select('*')
                        .where('short_url', urlId)
                        .then ((result)=> {
                            pollData = result;
                            console.log('Output 1: ', pollData)
                        })
                            
                    await console.log(pollData[0].id);
                    
                    await knex('choice')
                        .select('title','description','id')
                        .where('poll_id', pollData[0].id)
                        .then((result)=> {
                            choiceData = result;
                            console.log('Output 2: ', choiceData)
                        })
                    
                    await console.log(choiceData[0].id, choiceData[1].id)

                    await knex('poll_creator')
                        .select('email', 'name')
                        .where('id', pollData[0].creator_id)
                        .then ((result) => { 
                            pollCreatorData = result;
                            console.log('Output 3: ', pollCreatorData)
                        })
                    resolve (console.log("db pull complete"))
                }
                catch (err) {
                    reject (console.log(err))
                };
        })
        pollingDB.then( ()=>{
            console.log('Page Load')
            console.log('Poll Data =>', pollData)
            console.log('Choice Data =>', choiceData)
            console.log('Poll Create Data =>', pollCreatorData)
            res.render("../views/voting.ejs")}
        ).catch(console.log('Catch Error'))

        
    })

    voterVoting.put("/:id", function (req, res) {
        /*
        -Validate all inputs meet requirements (ie rank order, user name if req.)
        -If error, send ajax response back to error field.
        -redirect user to voting thank you page
        */
        res.redirect('votingTY');
    })

    return voterVoting;
}
