"use strict";

const express = require('express');
const render  = express.Router();

module.exports = (sharedFunctions, knex) => {

    render.get("/:id", function(req, res){
    
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
            const fullData = {pollData, choiceData, pollCreatorData}
            console.log('Full Data => ', fullData )
            res.json(fullData)
        }).catch(console.log('Catch Error'))

    });

    return render;
}