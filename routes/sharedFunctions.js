"use strict";

const express = require('express');
const router  = express.Router();

module.exports = function sharedFunctions(knex) => {

  return {

    //create random string for shortened URL
    urlString: function(){

    }
    ,
    //takes profile details and puts it into an array within an object to be used by pushAdminDetails
    // returns an array within an object
    objectCreationAdmin: function(adminName, adminEmail, urlString, pollTitle, pollDescription, choiceTitle, choiceDescription, startData, endDate){
      //TO-DO: CREATE START DATE
      
      const pollCreatorInfo = {[adminName, adminEmail]};
      const pollInfo = {[pollTitle, pollDescription,startDate,endDate]};
      const choiceInfo = {[choiceTitle, choiceDescription]};

      return summaryArray = [pollCreatorInfo, pollInfo, choiceInfo];
    }
    ,
    //tool to push data into knex/psql. This DOES NOT include
    //data for Name and Email address of voters. See separate function.
    //urlString function required for urlString
    // function needs to return poll id after db created to input voterDetails if required.
    pushAdminDetails: function (pollAdminObject, callback) {

    }
    ,
    objectCreationVoter: function(pollId, name, email) {

    }
    ,
    // push user data tied to pushPollDetails if required. 
    // 
    pushVoterDetails: function(pollId, name, email, callback) {

    }
    ,
    // takes voter id and the choices in an object and pushes 
    // 
    voterChoice: function(voterId, choiceObject){

    }

    ,
    // shuts down the poll based on ID
    isPollingClosed: function(pollID, callback){
      // check db to determine what when time of poll is.
      // takes pollID, knex returns end time. Compare return time to current time.
      // returns true/false
    },
    endPolling: function(){
      // if polling is closed all required actions below
    },
  }
  return router;
}
