//get team names, winner, isDraw, goalsFor and goalsAgainst for each matches in the season
exports.getDetailsFromMatches = (array) => {
    return new Promise(
        (resolve, reject) => {
            try {
                //loop through the json arrays and return an object with match details
                let detailsForTheMatches = [];
                array.data.rounds.map((match) => match.matches.forEach((match) => {
                    detailsForTheMatches.push({
                        data: {
                            team_one_name: match.team1,
                            team_one_details:
                            {
                                win: match.score.ft[0] > match.score.ft[1] ? 1 : 0,
                                lose: match.score.ft[0] < match.score.ft[1] ? 1 : 0,
                                draw: match.score.ft[0] === match.score.ft[1] ? 1 : 0,
                                goalsFor: match.score.ft[0],
                                goalsAgainst: match.score.ft[1]
                            },
                            team_two_name: match.team2,
                            team_two_details:
                            {
                                win: match.score.ft[1] > match.score.ft[0] ? 1 : 0,
                                lose: match.score.ft[1] < match.score.ft[0] ? 1 : 0,
                                draw: match.score.ft[0] === match.score.ft[1] ? 1 : 0,
                                goalsFor: match.score.ft[1],
                                goalsAgainst: match.score.ft[0]
                            }
                        }
                    });
                }));

                resolve(detailsForTheMatches);
            }
            catch (error) {
                reject(error.message);
            }
        }
    )
}