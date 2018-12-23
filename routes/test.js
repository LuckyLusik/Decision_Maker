"use strict";
const moment = require('moment');
const express = require('express'); 
const test  = express.Router();
const nodemailer = require('nodemailer')


module.exports = (sharedFunctions, knex) => {
    // Landing page will capture details of the poll to be created
    // Details captured will be fed to all subsequent pages to display relevent data
    
    test.get("/", function (req, res) {
        let pollData; //array containing object
        let choiceData; //array containing object
        let pollCreatorData; //array containing object

        async function pullData(){
            
            try {
                await knex('poll')
                    .select('*')
                    .where('short_url', 'xocc4Mq')
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
                    
            }
            catch (err) {
                console.log(err);
            };
        }
        console.log(pullData())
    });
    return test;
}