"use strict";
const moment = require('moment')

module.exports = function sharedFunctions(knex) {

  return {

    //tool to sum date and hours into 
    sumTime: function (dateTimeString){
      console.log('inside sumTime', moment(dateTimeString, "YYYY-MM-DD hh:mm a").valueOf())
      return moment(dateTimeString, "YYYY-MM-DD hh:mm a").valueOf()       
    }
    ,
    //create random string for shortened URL
    urlString: function(){
      var ranNum = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      for (var i = 0; i < 7; i++)
        ranNum += possible.charAt(Math.floor(Math.random() * possible.length));
      return ranNum;
    }
    ,
    // reviews incoming data before passing it to dataValidationAdmin.
    // If data is invalid, send error to front end.
    // Include error message
    dataValidationAdmin : function(adminName, adminEmail, pollTitle, pollDescription, choiceDescription, endDate, callback) {
      if (adminName === undefined || adminEmail === undefined || pollTitle === undefined || endDate === undefined) {
        console.log("dataValidation return an undefined");
        //TO-DO throw error back to front end with error message
      } else {
        return callback (adminName, adminEmail, pollTitle, pollDescription, choiceTitle, choiceDescription, endDate) 
      }
    }
    ,
    //takes profile details and puts it into an array within an object to be used by pushAdminDetails
    // callback to determine if any data is missing. 
    // returns an array within an object, or error if data does not match.
    objectCreationAdmin: function(adminName, adminEmail, pollTitle, pollDescription, choiceTitle, choiceDescription, endDate){ //TO-DO : add , requireName back into function
      //TO-DO include logic for IF choiceDescriptionTHREE FOUR or FIVE is blank, remove from  FOR LOOP 
      console.log('Entered objectCreationAdmin')
      const startDate = moment(Date.now()).valueOf();
      const urlString = urlString();
      const pollCreatorInfo = [{ name: adminName, email: adminEmail}];
      const pollInfo = [{title: pollTitle, description: pollDescription, start_date: startDate, end_date: endDate}]; //TO-DO : add urlString, requireName back into pollInfo
      const choiceInfo = [{title: choiceTitle, description: choiceDescription}];

      console.log('Exiting objectCreationAdmin', pollCreatorInfo);
      return summaryArray = [pollInfo,pollCreatorInfo, choiceInfo];
    }
    ,
    //tool to push data into knex/psql. This DOES NOT include
    //data for Name and Email address of voters. See separate function.
    //urlString function required for urlString
    // function needs to return poll id after db created to input voterDetails if required.
    pushAdminDetails: function(pollAdminObject) {
      //Knex to push pollAdminObject into database;
      console.log("Inside pushAdminDetails: ", pollAdminObject)
        knex("poll")
          .insert(pollAdminObject[0])
          .exec (function (err, id){
            if (err){
              console.log('pushAdminDetail has Error: ', err);
              throw err;
            } else {
            knex("creator")
            .insert(pollAdminObject[1])
            .exec (function (err, id) {
              if (err){
                console.log('pushAdminDetail has Error: ', err);
                throw err;
              } else {
                knex("choice")
                .insert(pollAdminObject[2])
                .exec (function (err, id) {
                  if (err){
                    console.log('pushAdminDetail has Error: ', err);
                    throw err;
                  }
                }).returning('id')
              }  
            })
          }

        if (req.body.requireName === true){
          pushVoterDetails(knexPollId, voterNameObject)
        } 
      })
      
      if (err){
        console.log('pushAdminDetail has Error: ', err);
      } else {
        return true;
      } 
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
}
