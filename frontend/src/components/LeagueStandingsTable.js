import React from 'react'
import Table from 'react-bootstrap/Table';
import { Form, Button, InputGroup, Image, Row, Col, Container } from 'react-bootstrap';
import { BsSearch, BsChevronDown, BsChevronUp } from "react-icons/bs";
import styles from '../assets/css/TableStyles.module.css';
import logoMapper from '../assets/javascript/logoMapper.json';

function LeagueStandingsTable(props) {
    let seasons = ["2019-20", "2018-19", "2017-18", "2016-17", "2015-16", "2014-15", "2013-14"];
    //controlled form input for setting search filter
    let [searchValue, setSearchValue] = React.useState("");
    let [isSearching, setIsSearching] = React.useState(false);

    let fetchDataForTheSeason = (season) => {
        props.setSeasonToFetch(season);
    }

    let searchFunction = (filter) => {
        if (filter) {
            const filteredClubNames = props.seasonData
                .filter(key => key.name.toLowerCase().includes(filter.toLowerCase()))
            props.setDisplayData(filteredClubNames);
            setIsSearching(true);
        }
        else {
            props.setDisplayData(props.seasonData);
            setIsSearching(false);
        }
    }

    let sortFunction = () => {
        props.setIsSorted(!props.isSorted);
        props.setDisplayData(props.isSorted ? props.seasonData.sort((a, b) => { return a.points - b.points }) : props.seasonData.sort((a, b) => { return b.points - a.points }));
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
        <div>
            <Container id={styles.actionForm}>
                <Row>
                    <Col xs={12} md={6}>
                        <p id={styles.actionFormLabel}>Filter By Season</p>
                        <Form.Control as="select" onChange={(e) => { fetchDataForTheSeason(e.target.value) }}>
                            {seasons.map(
                                (season) => {
                                    return <option key={season} value={season}>{season}</option>
                                }
                            )}
                        </Form.Control>
                    </Col>
                    <Col xs={12} md={6}>
                        <p id={styles.actionFormLabel}>Search for a Club</p>
                        <InputGroup className="mb-3">
                            <Form.Control type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => setSearchValue(e.target.value)} onKeyDown={(e) => handleKeyPress(e)} />
                            <InputGroup.Append>
                                <Button variant="outline-info" onClick={() => { searchFunction(searchValue) }} style={{ backgroundColor: "#3d083e", color: "white", outline: "none" }}><BsSearch /></Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Col>
                </Row>
            </Container>

            <Table responsive={true} hover id={styles.table}>
                <thead id={styles.tableHeader}>
                    <tr>
                        <th>Position</th><th>Club</th><th>MP</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>GD</th>
                        <th onClick={() => sortFunction()}>Pts {props.isSorted ? <BsChevronDown /> : <BsChevronUp />}</th>
                        <th>Last 5 Matches</th>
                    </tr>
                </thead>
                <tbody>
                    {props.data ? props.data.map(
                        (club) => {
                            return (
                                <tr key={club.name} className={props.isSorted && !isSearching ? styles.descSorted : (!props.isSorted && !isSearching) ? styles.ascSorted : ""}>
                                    <td key={`${club.name}_rank`}>{club.rankings}</td>
                                    <td key={`${club.name}_name`} onClick={() => { handleModal(club) }} style={{ cursor: "pointer" }}> <Image className={styles.clubLogo} fluid src={logoMapper[club.name]} alt="logo" /> {club.name}</td>
                                    <td key={`${club.name}_played`}>{club.matches_played}</td>
                                    <td key={`${club.name}_wins`}>{club.wins}</td>
                                    <td key={`${club.name}_draws`}>{club.draws}</td>
                                    <td key={`${club.name}_losses`}>{club.losses}</td>
                                    <td key={`${club.name}_gf`}>{club.goals_for}</td>
                                    <td key={`${club.name}_ga`}>{club.goals_against}</td>
                                    <td key={`${club.name}_gd`}>{club.goal_difference}</td>
                                    <td key={`${club.name}_pts`}>{club.points}</td>
                                    <td key={`${club.name}_last5`}>{club.last_five_matches.map((m,i) => { return <span key={`${m}_${i}`}style={{ color: m === 'W' ? 'green' : m === 'L' ? 'red' : 'grey' }}> {m} </span> })}</td>
                                </tr>
                            )
                        }
                    ) : ""}
                </tbody>
            </Table >
        </div>
    )
}

export default LeagueStandingsTable
