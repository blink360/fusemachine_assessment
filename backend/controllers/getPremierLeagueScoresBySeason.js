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

    let { season } = req.body;
    console.log("Fetching data for season: ",season);

    if (dataCache.has(season)) {
        res.status(200).json(dataCache.get(season));
    }
    else {
        let dataForTheSeason = await axios.get(urlForSeasonData.replace("{season}", season))
            .catch(
                (error) => {
                    res.status(500).json({
                        message:"Error occurred while fetching the data from OpenFootball API"
                    })
                }
            );
        let detailsForTheMatches = await getDetailsFromMatches(dataForTheSeason);
        let detailsGroupedByClubs = await groupByClubs(detailsForTheMatches);
        let finalData = await prepareFinalData(detailsGroupedByClubs);
        let finalSortedData = finalData.sort((a, b) => { return (b.points - a.points) });
        finalSortedData.forEach(
            (club, index) => {
                club.rankings = index + 1;
            }
        )
        dataCache.set(season, finalSortedData);

        res.status(200)
            .json(finalSortedData);

    }
}

