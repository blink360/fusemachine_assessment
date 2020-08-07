exports.prepareFinalData = (object) => {
    return new Promise(
        (resolve, reject) => {
            try {
                let arrangedData = {};
                let finalData = [];

                //Reduce the details of the matches into a single object. The keys contain arrays as value (from other objects)
                Object.keys(object).forEach((club) => {
                    arrangedData[club] = object[club].details.reduce((r, o) => {
                        Object.entries(o).forEach(([k, v]) => (r[k] = r[k] || []).push(v));
                        return r;
                    }, {});
                })

                //Finally modifying the objects to have the required fields and reducing the array values to a single value (sum)
                Object.keys(arrangedData).forEach((club,index) => {
                    //get last five matches win loss data
                    let last_five_match_win_loss = arrangedData[club].win.reverse().filter((data) => data != null).slice(0, 5);
                    //get last five matches draw data
                    let last_five_match_draw = arrangedData[club].draw.reverse().filter((data) => data != null).slice(0, 5);
                    //set match draw data in the win loss array
                    last_five_match_draw.forEach((d, i) => {
                        if (d === 1) {
                            last_five_match_win_loss[i] = -1;
                        }
                    });
                    //replace numerals with alphabets to denote win loss and draw
                    last_five_match_win_loss.forEach((d, i) => {
                        if (d === 1) {
                            last_five_match_win_loss[i] = 'W';
                        }
                        else if (d === 0) {
                            last_five_match_win_loss[i] = 'L';
                        }
                        else {
                            last_five_match_win_loss[i] = 'D';
                        }
                    });

                    finalData[index] = {
                        name: club,
                        matches_played: arrangedData[club].win.filter((data) => data != null).length,
                        wins: arrangedData[club].win.reduce((c, a) => { return c + a }),
                        draws: arrangedData[club].draw.reduce((c, a) => { return c + a }),
                        losses: arrangedData[club].lose.reduce((c, a) => { return c + a }),
                        goals_for: arrangedData[club].goalsFor.reduce((c, a) => { return c + a }),
                        goals_against: arrangedData[club].goalsAgainst.reduce((c, a) => { return c + a }),
                        goal_difference: arrangedData[club].goalsFor.reduce((c, a) => { return c + a }) - arrangedData[club].goalsAgainst.reduce((c, a) => { return c + a }),
                        points: arrangedData[club].win.reduce((c, a) => { return c + a }) * 3 + arrangedData[club].draw.reduce((c, a) => { return c + a }),
                        last_five_matches: last_five_match_win_loss,
                    }

                })

                resolve(finalData);
            }
            catch (err) {
                reject(err.message);
            }
        }
    )


}