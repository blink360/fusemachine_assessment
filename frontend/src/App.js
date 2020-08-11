import React from 'react';
import LeagueStandingsTable from './components/LeagueStandingsTable';
import axios from 'axios';
import { usePrevious } from './functions/usePrevious';
import regeneratorRuntime from "regenerator-runtime";
import AppHeader from './components/AppHeader';
import { Container } from 'react-bootstrap';
import Popup from './components/Popup';
import Spinner from 'react-bootstrap/Spinner';

function App() {
    //State for storing data from backend API.
    let [seasonData, setSeasonData] = React.useState([]);
    //State for copying and modifying season data as required. e.g. Search, Sort
    let [displayData, setDisplayData] = React.useState([]);
    //State for storing the season date
    let [seasonToFetch, setSeasonToFetch] = React.useState("2019-20");
    //State for sorting the tables
    let [isSorted, setIsSorted] = React.useState(true);
    //State for handling Modal/Popup data
    let [showPopup, setShowPopup] = React.useState(false);
    let [modalData, setModalData] = React.useState([]);

    let retry = 0;
    
    const prevSeasonToFetch = usePrevious(seasonToFetch);

    let fetchSeasonData = async () => {
        await axios.post("http://localhost:8000/getScoresBySeason", {
            season: seasonToFetch
        }).then(
            (response) => {
                setSeasonData(response.data);
                setDisplayData(response.data);
            }
        ).catch((err) => {
            console.log(err);
            retry <=3 ? setTimeout(() => {fetchSeasonData()},2000) : "";
        })
    }

    React.useEffect(() => {
        fetchSeasonData();
    }, [seasonToFetch]);

    return (
        <Container fluid>
            <AppHeader />
            <LeagueStandingsTable data={displayData} seasonData={seasonData} setDisplayData={setDisplayData} seasonToFetch={seasonToFetch} prevSeasonToFetch={prevSeasonToFetch} setSeasonToFetch={setSeasonToFetch} isSorted={isSorted} setIsSorted={setIsSorted} setModalData={setModalData} setShowPopup={setShowPopup} />
            {showPopup ? <Popup setShowPopup={setShowPopup} showPopup={showPopup} modalData={modalData} /> : ""}
        </Container>
    )
}

export default App
