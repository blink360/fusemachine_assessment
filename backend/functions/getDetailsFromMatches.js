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
                                win: match.score ? (match.score.ft[0] > match.score.ft[1] ? 1 : 0) : null,
                                lose: match.score ? (match.score.ft[0] < match.score.ft[1] ? 1 : 0) : null,
                                draw: match.score ? (match.score.ft[0] === match.score.ft[1] ? 1 : 0) : null,
                                goalsFor: match.score ? match.score.ft[0] : null,
                                goalsAgainst: match.score ? match.score.ft[1] : null
                            },
                            team_two_name: match.team2,
                            team_two_details:
                            {
                                win: match.score? (match.score.ft[1] > match.score.ft[0] ? 1 : 0) : null,
                                lose: match.score? (match.score.ft[1] < match.score.ft[0] ? 1 : 0) : null,
                                draw: match.score ? (match.score.ft[0] === match.score.ft[1] ? 1 : 0) : null,
                                goalsFor: match.score ? match.score.ft[1] : null,
                                goalsAgainst: match.score ? match.score.ft[0] : null
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