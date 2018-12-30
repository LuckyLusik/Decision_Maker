"use strict";
const moment = require('moment');
const express = require('express'); 
const test  = express.Router();
const nodemailer = require('nodemailer')


module.exports = (sharedFunctions, knex) => {
    // Landing page will capture details of the poll to be created
    // Details captured will be fed to all subsequent pages to display relevent data
    
    test.get("/", function (req, res) {
        res.render("../views/resultsTest.ejs")
    });
    return test;
}