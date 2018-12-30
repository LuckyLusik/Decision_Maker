"use strict";
const moment = require('moment');
const express = require('express');
const voterResult  = express.Router();

module.exports = (sharedFunctions, knex) => {

    voterResult.get("/:id", function(req, res) {

        res.render("../views/results.ejs")
    })

    return voterResult;
}
