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
        let rankData;
        let pollVoter;

        // function findRankData(choiceId) {
        //     console.log('inside findRankData')
        //     let counter = 0;
        //     await knex('rank')
        //     .select('value', 'choice_id', 'voter_id')
        //     .where('choice_id', choiceId)
        //     .then ((result) => {
        //         let rankArray = result;
        //         rankArray.forEach( (element) => {
        //             return counter += element.value;
        //         })
            
        //     })
        //     console.log("findRankData counter output: ", counter)
        //     return counter; //outputs sum of ranks for a single choice
        // }

        async function pullData () {
            const shortUrl = req.params.id
            
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
                // await knex('rank')
                // .select('value', 'choice_id', 'voter_id')
                // .where('choice_id', choiceData[0].id)
                // .then ((result) => {
                //     rankData = result;
                //     console.log('rankData output: ', rankData)
                // })
                // await knex('poll_voter')
                // .select('name', 'email', 'id_url', 'id')
                // .where('id', rankData[0].voter_id)
                // .then ((result) => {
                //     pollVoter = result;
                //     console.log('pollVoter output: ', pollVoter)
                // })
            }
            catch (err) {
                console.log(err);
            }
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
                        console.log("ChoiceTotal: ", result, choicesTotals, element.id)
                        return choicesTotals[`choice_Id_${element.id}`] = result;
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
        pullData()
        
    })

    pollAdmin.post("/:id", function(req, res){

    });
    return pollAdmin;

}