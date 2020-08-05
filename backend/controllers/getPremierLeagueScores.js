const _ = require("lodash");
const axios = require('axios');

const {getDetailsFromMatches} = require("../functions/getDetailsFromMatches");
const {groupByClubs} = require("../functions/groupByClubs");

const urlForSeasonData = "https://raw.githubusercontent.com/openfootball/football.json/master/{season}/en.1.json";


getPremierLeagueScoresBySeason = async (req, res) => {
    //let {season} = req.body;

    let dataForTheSeason = await axios.get(urlForSeasonData.replace("{season}", "2018-19"));
    
    let detailsForTheMatches = await getDetailsFromMatches(dataForTheSeason);

    let detailsGroupedByClubs = await groupByClubs(detailsForTheMatches);

    console.log(JSON.stringify(detailsGroupedByClubs));

}

getPremierLeagueScoresBySeason();