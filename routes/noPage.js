"use strict";

const express = require('express');
const noPage  = express.Router();

module.exports = (knex) => {

    noPage.get("/", function(req, res){
        // render a page does not exist message
        // provide link to main poll creation page 
        res.render()
    })

    return noPage;
}
