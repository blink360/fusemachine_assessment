const axios = require("axios");
const NodeCache = require("node-cache");
const dataCache = new NodeCache();
//Import functions
const { getDetailsFromMatches } = require("../functions/getDetailsFromMatches");
const { groupByClubs } = require("../functions/groupByClubs");
const { prepareFinalData } = require("../functions/prepareFinalData");

//URL for the OpenFootball API
const urlForSeasonData = "https://raw.githubusercontent.com/openfootball/football.json/master/{season}/en.1.json";


exports.getPremierLeagueScoresBySeason = async (req, res) => {

    console.log("received request");
    let { season } = req.body;

    if (dataCache.has(season)) {
        res.status(200).json(dataCache.get(season));
    }
    else {
        let dataForTheSeason = await axios.get(urlForSeasonData.replace("{season}", season));
        let detailsForTheMatches = await getDetailsFromMatches(dataForTheSeason);
        let detailsGroupedByClubs = await groupByClubs(detailsForTheMatches);
        let finalData = await prepareFinalData(detailsGroupedByClubs);
        
        dataCache.set(season, finalData);

        res.status(200)
            .json(finalData);

    }
}

