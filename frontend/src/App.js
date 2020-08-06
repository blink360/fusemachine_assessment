import React from 'react';
import LeagueStandingsTable from './components/LeagueStandingsTable';
import axios from 'axios';
import {usePrevious} from './functions/usePrevious';
import _ from 'lodash';
import regeneratorRuntime from "regenerator-runtime";
import NavigationBar from './components/NavigationBar';

function App() {
    let [seasonData, setSeasonData] = React.useState({});
    let [seasonToFetch, setSeasonToFetch] = React.useState("2018-19");
    const prevSeasonData = usePrevious(seasonData);
    const prevSeasonToFetch = usePrevious(seasonToFetch);

    let fetchSeasonData = async () =>{
        console.log(seasonToFetch);
        await axios.post("http://localhost:8000/getScoresBySeason", {
            season: seasonToFetch
        }).then(
            (response) => {
                setSeasonData(response.data);
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
      }, [seasonData, prevSeasonData,seasonToFetch]);

    return (
        <div>
            <NavigationBar setSeasonToFetch={setSeasonToFetch}/>
            <LeagueStandingsTable data={seasonData}/>
        </div>
    )
}

export default App
