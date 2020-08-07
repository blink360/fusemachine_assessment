import React from 'react';
import LeagueStandingsTable from './components/LeagueStandingsTable';
import axios from 'axios';
import {usePrevious} from './functions/usePrevious';
import _ from 'lodash';
import regeneratorRuntime from "regenerator-runtime";
import AppHeader from './components/AppHeader';


function App() {
    let [seasonData, setSeasonData] = React.useState({});
    let [displayData, setDisplayData] = React.useState({});
    let [seasonToFetch, setSeasonToFetch] = React.useState("2018-19");
    let [] = React.useState("")
    const prevSeasonData = usePrevious(seasonData);
    const prevSeasonToFetch = usePrevious(seasonToFetch);

    let fetchSeasonData = async () =>{
        await axios.post("http://localhost:8000/getScoresBySeason", {
            season: seasonToFetch
        }).then(
            (response) => {
                setSeasonData(response.data);
                setDisplayData(response.data);
            }
        ).catch((err) => {
            console.log(err)
        })
    }
    
    React.useEffect(() => {
        if (_.isEqual(prevSeasonData, seasonData) && _.isEqual(prevSeasonToFetch,seasonToFetch)) {
         return;
        }
        else{
            fetchSeasonData();

        }
      }, [seasonData, prevSeasonData,seasonToFetch, displayData]);

    return (
        <div>
            <AppHeader/>
            <LeagueStandingsTable data={displayData} seasonData={seasonData} setDisplayData={setDisplayData} seasonToFetch={seasonToFetch} setSeasonToFetch={setSeasonToFetch}/>
        </div>
    )
}

export default App
