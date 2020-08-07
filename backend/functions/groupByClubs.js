exports.groupByClubs = (array) => {
    
    return new Promise(
        (resolve, reject) => {
            try {
                let detailsGroupedByClubs = {};

                array.map((element) => {
                    //Check whether team on is already in the JSON. If it is append the details to the JSON otherwise add it to JSON and append the details
                    if (Object.keys(detailsGroupedByClubs).includes(element.data.team_one_name)) {
                        detailsGroupedByClubs[element.data.team_one_name].details.push(element.data.team_one_details);
                    }
                    else {
                        detailsGroupedByClubs[element.data.team_one_name] = {details:[element.data.team_one_details]};
                    }
                    //Similarly for team two
                    if (Object.keys(detailsGroupedByClubs).includes(element.data.team_two_name)) {
                        detailsGroupedByClubs[element.data.team_two_name].details.push(element.data.team_two_details);
                    }
                    else {
                        detailsGroupedByClubs[element.data.team_two_name] = {details:[element.data.team_two_details]};
                    }
                })

                resolve(detailsGroupedByClubs);
            }
            catch (err) {
                reject(err.message);
            }
        }
    )
} 