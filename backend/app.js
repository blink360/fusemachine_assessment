const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//import routes
app.use('/',require('./routes/getPremierLeagueScoresBySeason'));

module.exports = app;