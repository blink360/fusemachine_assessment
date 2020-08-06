const axios = require("axios");

//Import functions
const { getDetailsFromMatches } = require("../functions/getDetailsFromMatches");
const { groupByClubs } = require("../functions/groupByClubs");
const { prepareFinalData } = require("../functions/prepareFinalData");

//URL for the OpenFootball API
const urlForSeasonData = "https://raw.githubusercontent.com/openfootball/football.json/master/{season}/en.1.json";


exports.getPremierLeagueScoresBySeason = async (req, res) => {
    let { season } = req.body;

    let dataForTheSeason = await axios.get(urlForSeasonData.replace("{season}", season));

    let detailsForTheMatches = await getDetailsFromMatches(dataForTheSeason);

    let detailsGroupedByClubs = await groupByClubs(detailsForTheMatches);

    let finalData = await prepareFinalData(detailsGroupedByClubs);

    res.status(200)
        .json(finalData);
}

