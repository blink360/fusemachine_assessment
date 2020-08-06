import React from 'react'
import { Nav, Navbar, Button, Form, FormControl } from 'react-bootstrap';

function NavigationBar(props) {
    let fetchDataForTheSeason = (season) =>{
        props.setSeasonToFetch(season);
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand href="#home">English Premier League Standings</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => {fetchDataForTheSeason("2018-19")}}>2018-19</Nav.Link>
                    <Nav.Link onClick={() => {fetchDataForTheSeason("2017-18")}} >2017-18</Nav.Link>
                    <Nav.Link onClick={() => {fetchDataForTheSeason("2016-17")}} >2016-17</Nav.Link>
                    <Nav.Link onClick={() => {fetchDataForTheSeason("2015-16")}} >2015-16</Nav.Link>
                    <Nav.Link onClick={() => {fetchDataForTheSeason("2014-15")}} >2014-15</Nav.Link>
                    <Nav.Link onClick={() => {fetchDataForTheSeason("2013-14")}} >2013-14</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    )

}

export default NavigationBar;
