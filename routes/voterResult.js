"use strict";

const express = require('express');
const voterResult  = express.Router();

module.exports = (knex) => {

    voterResult.get("/:id", function(req, res){
        
        res.render()
    })

    return voterResult;
}
