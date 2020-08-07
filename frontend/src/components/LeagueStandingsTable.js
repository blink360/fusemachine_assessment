import React from 'react'
import Table from 'react-bootstrap/Table';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { BsSearch, BsChevronDown, BsChevronUp } from "react-icons/bs";

function LeagueStandingsTable(props) {
    let seasons = ["2019-20", "2018-19", "2017-18", "2016-17", "2015-16", "2014-15", "2013-14"];
    let [searchValue, setSearchValue] = React.useState("");

    let fetchDataForTheSeason = (season) => {
        props.setSeasonToFetch(season);
    }

    let searchFunction = (filter) => {
        if (filter) {
            const filteredClubNames = props.seasonData
                .filter(key => key.name.toLowerCase().includes(filter.toLowerCase()))
            props.setDisplayData(filteredClubNames);
        }
        else{
            props.setDisplayData(props.seasonData);
        }
    }

    let sortFunction = () =>{
        props.setIsSorted(!props.isSorted);
        props.setDisplayData(props.isSorted ? props.seasonData.sort((a,b) => {return a.points-b.points}) : props.seasonData.sort((a,b) => {return b.points-a.points}));
    }

    let handleKeyPress = (e) => {
        if (e.keyCode == 13) {
            e.preventDefault();
            searchFunction(searchValue);
        }
    }

    let handleModal = (clubDetails) => {
        props.setModalData(clubDetails
            );
        props.setShowPopup(true);
    }

    return (
        <Table responsive={true} bordered hover>
            <thead>
                <tr>
                    <td colSpan="4">
                        <Form.Control as="select" onChange={(e) => { fetchDataForTheSeason(e.target.value) }}>
                            {seasons.map(
                                (season) => {
                                    return <option value={season}>{season}</option>
                                }
                            )}
                        </Form.Control>
                    </td>
                    <td colSpan="7">
                        <Form>
                            <InputGroup className="mb-3">
                                <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => setSearchValue(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} />
                                <InputGroup.Append>
                                    <Button variant="outline-info" onClick={() => { searchFunction(searchValue) }} style={{ backgroundColor: "#3d083e", color: "white", outline: "none" }}><BsSearch /></Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                    </td>
                </tr>
            </thead>
            <thead>
                <tr>
                    <th>Rankings</th><th>Club</th><th>MP</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th>
                    <th onClick={() => sortFunction()}>Pts {props.isSorted ? <BsChevronDown /> : <BsChevronUp />}</th>
                    <th>Last 5 Matches</th>
                </tr>
            </thead>
            <tbody >
                {props.data ? props.data.map(
                    (club) => {
                        return (
                            <tr>
                                <td>{club.rankings}</td>
                                <td onClick={() => { handleModal(club) }}>{club.name}</td>
                                <td>{club.matches_played}</td>
                                <td>{club.wins}</td>
                                <td>{club.draws}</td>
                                <td>{club.losses}</td>
                                <td>{club.goals_for}</td>
                                <td>{club.goals_against}</td>
                                <td>{club.goal_difference}</td>
                                <td>{club.points}</td>
                                <td>{club.last_five_matches.map((m) => { return <span style={{ color: m === 'W' ? 'green' : m === 'L' ? 'red' : 'grey' }}> {m} </span> })}</td>
                            </tr>
                        )
                    }
                ) : ""}
            </tbody>
        </Table >
    )
}

export default LeagueStandingsTable
