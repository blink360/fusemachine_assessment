const express = require("express");
const router = express.Router();
const {getPremierLeagueScoresBySeason} = require("../controllers/getPremierLeagueScoresBySeason");

router.post("/getScoresBySeason", getPremierLeagueScoresBySeason);

module.exports = router;