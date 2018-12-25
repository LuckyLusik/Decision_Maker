"use strict";

const express = require('express');
const render  = express.Router();

module.exports = (sharedFunctions, knex) => {

    render.post("/voteRender", function(req, res){
        console.log("trying to render")
        let pollData; //array containing object
        let choiceData; //array containing object
        let pollCreatorData; //array containing object
        async function findData () { 
            const urlId = req.body.shortUrl;
            console.log(urlId)
            try {
                await knex('poll')
                    .select('*')
                    .where('short_url', urlId[0])
                    .then ((result)=> {
                        pollData = result;
                        //console.log('Output 1: ', pollData)
                    })
                        
                await console.log(pollData[0].id);
                
                await knex('choice')
                    .select('title','description','id')
                    .where('poll_id', pollData[0].id)
                    .then((result)=> {
                        choiceData = result;
                        //console.log('Output 2: ', choiceData)
                    })
                
                await console.log(choiceData[0].id, choiceData[1].id)

                await knex('poll_creator')
                    .select('email', 'name')
                    .where('id', pollData[0].creator_id)
                    .then ((result) => { 
                        pollCreatorData = result;
                        //console.log('Output 3: ', pollCreatorData)
                    })
            }
            catch (err) {
                console.log(err);
            };
        }
        findData().then(function(){
            const fullData = {pollData, choiceData, pollCreatorData}
            console.log('Full Data => ', fullData )
            res.json(fullData)
        })

    });

    render.post("/voteSubmission", function(req, res){
        //validate date by pulling requirements from database:
        // requirements are whether name is needed, number of votes needed to be case
        // if duplicate vote were submitted, if voting time is expired.
        // db call for: verfyName, numberOfVotes, voting time
        console.log('Hello: ', req.body)


    })


    return render;
}