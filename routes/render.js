"use strict";

const express = require('express');
const render  = express.Router();
const moment = require('moment');

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
        console.log('Hello: ', req.body.serialized, req.body.shortUrl)
        
        const body = req.body;
        let pollData;
        let choiceData;
        const serialized = body.serialized;
        const shortUrl = body.shortUrl;
        
        
        function nameRequired(){
            if (pollData[0].name_verfy && serialized[0].value !== ''){
                return verifyInputRequirements();
            } else {
                console.error('failed to input name ', pollData[0].name_verfy, serialized[0].value );
            }
        };

        function verifyInputRequirements(){
            let voteValue = {};
            let voteDuplicate = false;
            let votingEnded = true;
            for (let i = 1; i < serialized.length; i++){
                voteValue[serialized[i].value] ? voteDuplicate = true : voteValue[serialized[i].value] = 1; 
                console.log('render.js Counter: ', i, serialized[i].value)
              }
            
            votingEnded = hasVotingEnded()
            
            if (choiceData.length === serialized.length-1 && voteDuplicate === false && votingEnded === false){
                return true;
            }
            else{
                console.log('it didn\'t work')
            }
        }

        function hasVotingEnded(){
            const pollEndTime = moment(pollData[0].end_date).add(5,'hours');
            const currentTime = new Date()

            if ( moment(pollEndTime).isBefore(currentTime)) { //voting has ended
                console.log('what time is pollEndTime: ', pollEndTime, currentTime)
                return true;
            } else {
                console.log('No issue with poll time ending')
                return false;
            }
        };
        
     
        
        async function findData(){
            try{
                await knex('poll')
                    .select('id','short_url', 'name_verfy', 'end_date')
                    .where('short_url', shortUrl[0])
                    .then((result) => {
                        pollData = result;
                        console.log('voteSubmission 1: ', pollData)
                    })
                await knex('choice')
                    .select('title', 'id')
                    .where('poll_id', pollData[0].id )
                    .then((result)=> {
                        choiceData = result;
                        console.log('voteSubmission 2: ', choiceData)
                    })
            }
            catch (err) {
                //if error, send error message back to page 
                console.log(err)
            }
            
        }
        findData().then( 
            function(){

                console.log('Made it to findData.then: ', choiceData, pollData)
                //nameRequired();
                console.log(nameRequired());
                
                //if success on pulling and matching data, redirect to thank you page
            //res.redirect('votingTY.ejs)'
        })
    })


    return render;
}