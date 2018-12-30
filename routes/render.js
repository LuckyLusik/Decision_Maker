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
        const urlId = req.body.shortUrl;
        async function findData () { 
            console.log('Data review: ',urlId[0], pollData, choiceData, pollCreatorData)
            try {
                console.log(urlId)
                await knex('poll')
                    .select('*')
                    .where('short_url', urlId[0])
                    .then ((result)=> {
                        pollData = result;
                        console.log('Vote Render Output 1: ', pollData, result)
                    })
                
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
            // let voteValue = {};
            let votingEnded = true;
            //OLD - was for validation of duplicate
            // for (let i = 1; i < serialized.length; i++){
            //     voteValue[serialized[i].value] ? voteDuplicate = true : voteValue[serialized[i].value] = 1;
            //     console.log('render.js Counter: ', i, serialized[i].value)
            //   }
            
            votingEnded = hasVotingEnded()
            console.log('Voting ended: ', hasVotingEnded(), 'Choices: ', choiceData.length, serialized.length-1)
            
            if (choiceData.length === serialized.length-1 && votingEnded === false){
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
            async function insertData(){
                try{ 
                    console.log('Made it to findData.then: ', choiceData, pollData);            
                    let verifiedVote = false;
                    let voteRankArray = [];
                    let voterIdData = [];
                    let templateVars = {
                        votingEndDate: moment(pollData[0].end_date).add(5,'hours'),
                        shortUrl: shortUrl,
                    }
                    const htmlString = 
                    `
                    <section>
                        <span class="glyphicon glyphicon-send poll-success" aria-hidden="true"></span>
                    </section>
                    <section class="main_descrip">
                        <p>Thank you for voting!</p>
                    </section>
                    <section>
                        <a class="link-style" href="http://localhost:8080/vr/${shortUrl}">Press here to visit voter results page</a>
                    </section>`;
                    const insertLocation = "#voteInsert";
                    const jsonArray = [insertLocation, htmlString];

                    verifiedVote = nameRequired();
                    console.log(verifiedVote)
                    if (verifiedVote){
                        console.log("verified! Lets make data")
                        let pollVoterData = {name: serialized[0].value, id_url: shortUrl[0]}
                        let [voterIdDb] = await knex('poll_voter')
                        .insert(pollVoterData)
                        .returning('id')
                        voterIdData.voterIdDb = voterIdDb;
                        await console.log('Data Review: ', voteRankArray, pollVoterData, voterIdData)
                        for (let i = 1; i < serialized.length; i++){
                            voteRankArray.push(
                                {choice_id: choiceData[i-1].id, value: serialized[i].value, voter_id: voterIdData.voterIdDb}
                            )
                        }
                        await console.log('voteRankArray Review: ', voteRankArray)
                        voteRankArray.forEach(async function (o){
                            await knex('rank')
                            .insert(o)
                            .returning('id')
                            return
                        })
                        res.json(jsonArray);
                    } 
                }
                catch (err){
                    console.log("find data err", err)
                }
            }   
                      
            //if success on pulling and matching data, redirect to thank you page
            //res.redirect('votingTY.ejs)'
        )
    });

    render.post("/voteResult", function(req, res){
        //these will be arrays containing objects
        let pollData;
        let choiceData;
        let pollCreatorData;
        let choicesTotals = {};
        const shortUrl = req.body.shortUrl[0]
        console.log("Inside VoteResult: ",req.body)

        const pullData = async function (shortUrl) {
            console.log(shortUrl);
            try {
                await knex ('poll')
                .select('*')
                .where('short_url', shortUrl)
                .then ((result)=> {
                    pollData = result;
                    //this info is to show admin poll owner, poll title, poll description, endDate, whether name is required
                    console.log('pollData output: ', pollData)
                })
                await knex('choice')
                .select('title','description','id')
                .where('poll_id', pollData[0].id)
                .then((result)=> {
                    choiceData = result;
                    //we want choice title, choice description, poll_id for reference
                    console.log('choiceData output: ', choiceData)
                })
                await knex('poll_creator')
                .select('email', 'name')
                .where('id', pollData[0].creator_id)
                .then ((result) => {
                    pollCreatorData = result;
                    console.log('pollCreatorData output: ', pollCreatorData)
                })
            }
            catch (err) {
                console.log(err);
            }
            return choiceData
        };

        const organizeVoteData = async function (choiceData){
            try{
                await Promise.all(choiceData.map (async (element) => {
                    console.log("async: ", element.id)
                    let choiceSum = await knex('rank')
                    .select('value', 'choice_id', 'voter_id')
                    .where('choice_id', element.id)
                    .then(async(result) => {
                        let rankArray = result;
                        let choiceTotal = 0;
                        console.log("what is rankArray? ", rankArray)
                        rankArray.forEach( (e) => {
                            choiceTotal += e.value;
                            console.log("Inside Rank Array: ", choiceTotal, e.value)
                        })
                        console.log('forEach ChoiceTotal: ', choiceTotal)
                        return choiceTotal;
                    })
                    .then(async(result) => {
                        choicesTotals[element.title] = result;
                        console.log("ChoicesTotals: ", result, element.title, choicesTotals)
                        return choicesTotals
                    })
                    .catch((err) => {
                        console.log("error at rankArray". err)
                    })
                }))
                return choicesTotals;
            }
            catch (err) {
                console.log("An Error: ", err);
            }
        };
        
        const sendResults = async function (data){
            try{ 
                console.log("At sendResults: ", data);
                let sendData = [pollData, choiceData, pollCreatorData, data] 
                console.log('Inside transmitData: ', sendData);
                return res.json(sendData)
            }
            catch(err) {
                console.log("Transmit error ", err)
            }
        }

        pullData(shortUrl)
        .then((data) => organizeVoteData(data))
        .then((data1)=> sendResults(data1))
        .catch((err) => {console.log('Pull Data Error: ', err)}) 
    });

    render.post("/adminResult", function(req, res){
        //these will be arrays containing objects
        let pollData;
        let choiceData;
        let pollCreatorData;
        let pollVoterData;
        let choicesTotals = {};
        const shortUrl = req.body.shortUrl[0]
        console.log("Inside Admin Result: ",req.body)

        const pullData = async function (shortUrl) {
            console.log(shortUrl);
            try {
                await knex ('poll')
                .select('*')
                .where('short_url', shortUrl)
                .then ((result)=> {
                    pollData = result;
                    //this info is to show admin poll owner, poll title, poll description, endDate, whether name is required
                    console.log('pollData output: ', pollData)
                })
                await knex('choice')
                .select('title','description','id')
                .where('poll_id', pollData[0].id)
                .then((result)=> {
                    choiceData = result;
                    //we want choice title, choice description, poll_id for reference
                    console.log('choiceData output: ', choiceData)
                })
                await knex('poll_creator')
                .select('email', 'name')
                .where('id', pollData[0].creator_id)
                .then ((result) => {
                    pollCreatorData = result;
                    console.log('pollCreatorData output: ', pollCreatorData)
                })
                await knex('poll_voter')
                .select('name')
                .where('id_url', shortUrl)
                .then((result) => {
                    pollVoterData = result;
                    console.log('pollVoterData output: ', pollVoterData)
                })
            }
            catch (err) {
                console.log(err);
            }
            return choiceData
        };

        const organizeVoteData = async function (choiceData){
            try{
                await Promise.all(choiceData.map (async (element) => {
                    console.log("async: ", element.id)
                    let choiceSum = await knex('rank')
                    .select('value', 'choice_id', 'voter_id')
                    .where('choice_id', element.id)
                    .then(async(result) => {
                        let rankArray = result;
                        let choiceTotal = 0;
                        console.log("what is rankArray? ", rankArray)
                        rankArray.forEach( (e) => {
                            choiceTotal += e.value;
                            console.log("Inside Rank Array: ", choiceTotal, e.value)
                        })
                        console.log('forEach ChoiceTotal: ', choiceTotal)
                        return choiceTotal;
                    })
                    .then(async(result) => {
                        choicesTotals[element.title] = result;
                        console.log("ChoicesTotals: ", result, element.title, choicesTotals)
                        return choicesTotals
                    })
                    .catch((err) => {
                        console.log("error at rankArray". err)
                    })
                }))
                return choicesTotals;
            }
            catch (err) {
                console.log("An Error: ", err);
            }
        };
        
        const sendResults = async function (data){
            try{ 
                console.log("At sendResults: ", data);
                let sendData = [pollData, choiceData, pollCreatorData, data, pollVoterData] 
                console.log('Inside transmitData: ', sendData);
                return res.json(sendData)
            }
            catch(err) {
                console.log("Transmit error ", err)
            }
        }
        pullData(shortUrl)
        .then((data) => organizeVoteData(data))
        .then((data1)=> sendResults(data1))
        .catch((err) => {console.log('Pull Data Error: ', err)}) 
    });

    return render;
}
