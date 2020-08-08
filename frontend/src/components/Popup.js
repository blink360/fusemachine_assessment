import React from 'react'
import { Modal, Row, Col, Image } from 'react-bootstrap';
import logoMapper from '../assets/javascript/logoMapper.json';

function Popup(props) {
    let handleModalClose = () => {
        props.setShowPopup(false);
    }
    return (
        <>
            <Modal show={props.showPopup} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalData.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col xs={6}>
                            <Image src={logoMapper[props.modalData.name]} alt="logo" style={{ width: "10em" }} />
                        </Col>
                        <Col xs={6}>
                            <p>Rank: {props.modalData.rankings} </p>
                            <p>Matches Played: {props.modalData.matches_played}</p>
                            <p>Wins: {props.modalData.wins}</p>
                            <p>Losses: {props.modalData.losses}</p>
                            <p>Draws: {props.modalData.draws}</p>
                            <p>Total Goals Scored: {props.modalData.goals_for}</p>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Popup
