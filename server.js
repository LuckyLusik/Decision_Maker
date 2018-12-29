"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const moment      = require('moment')
const nodemailer  = require('nodemailer');

// Seperated Routes for each Resource
//const usersRoutes = require("./routes/users");
const sharedFunctions = require ("./lib/sharedFunctions")(knex);
const landingRoutes = require("./routes/landing")(sharedFunctions,knex, nodemailer);
const pollAdminRoutes = require("./routes/pollAdmin")(sharedFunctions, knex);
const noPageRoutes = require("./routes/noPage")(sharedFunctions, knex);
const voterResultRoutes = require("./routes/voterResult")(sharedFunctions, knex);
const voterVotingRoutes = require("./routes/voterVoting")(sharedFunctions, knex);
const pollSetupTYRoutes = require("./routes/pollSetupTY")(sharedFunctions, knex);
const votingTYRoutes = require ("./routes/votingTY")(sharedFunctions, knex);
const renderRoutes = require ("./routes/render")(sharedFunctions, knex);
const testRoutes = require ("./routes/test")(sharedFunctions, knex)//test route

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
//app.use("/api/users", usersRoutes(knex));
app.use("/pa", pollAdminRoutes);
app.use("/np", noPageRoutes);
app.use("/vr", voterResultRoutes);
app.use("/vl", voterVotingRoutes);
app.use("/pst", pollSetupTYRoutes);
app.use("/vty", votingTYRoutes);
app.use("/testRoutes", testRoutes);
app.use("/render", renderRoutes);
app.use("/", landingRoutes);



// Home page

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

