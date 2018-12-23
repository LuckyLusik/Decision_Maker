"use strict";

const express = require('express');
const voterResult  = express.Router();

module.exports = (knex) => {

    voterResult.get("/voterResult", function(req, res){

        res.render("../views/results.ejs")
    })

    return voterResult;
}
