"use strict";

const express = require('express');
const pollAdmin  = express.Router();


module.exports = (sharedFunctions, knex) => {
    // poll admin access to poll details
    // see poll results, name of voters if required in setup
    // contains voter link
    pollAdmin.get("/:id", function(req, res) {
        console.log('trying to render')
        //these will be arrays containing objects
        let pollData;
        let choiceData;
        let pollCreatorData;
        let choicesTotals = {};
        const shortUrl = req.params.id

        async function pullData (shortUrl) {
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

        async function organizeVoteData(choiceData){
            try{
                choiceData.forEach(async (element, index) => {
                    console.log("async: ", element.id, index)
                    let choiceSum = await knex('rank')
                    .select('value', 'choice_id', 'voter_id')
                    .where('choice_id', element.id)
                    .then((result) => {
                        let rankArray = result;
                        let choiceTotal = 0;
                        console.log("what is rankArray? ", rankArray)
                        rankArray.forEach( (e) => {
                            choiceTotal += e.value;
                            console.log("Inside Rank Array: ", choiceTotal, e.value)
                        })
                        return choiceTotal;
                    })
                    .then((result) => {
                        console.log("ChoiceTotal: ", result, choicesTotals, element.title)
                        choicesTotals[element.title] = result;
                        return choicesTotals
                    })
                    .then((result) => {
                        console.log("Final output: ", result)
                        return result;
                    })
                    .catch((err) => {
                        console.log("error at rankArray". err)
                    })
                })

            }
            catch (err) {
                console.log("An Error: ", err);
            }
        };

        pullData(shortUrl)
        .then((result) => {organizeVoteData(result)})
        .then((result) => {console.log("Second then statement: ", result)})// lesson learned; non-async function like console.log will execute first without result.
        .catch((err)=> {console.log(err)})
    })

    pollAdmin.post("/:id", function(req, res){

    });
    return pollAdmin;

}