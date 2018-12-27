"use strict";

const express = require('express');
const noPage  = express.Router();

module.exports = (knex) => {

    noPage.get("/noPage", function(req, res){
        // render a page does not exist message
        // provide link to main poll creation page
        res.render("../views/noPage.ejs")
    })

    return noPage;
}
