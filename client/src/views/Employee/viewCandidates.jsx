import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "../../components/Card/Card.jsx";

import ViewCandidate from "../../components/employee/ViewCandidate";

class Candidate extends Component {
    render() {
        var space = {
            marginTop : "2rem"
        }
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="View Candidate"
                                category="Candidate detail"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div >
                                        <ViewCandidate />
                                    </div>
                                }
                            />
                        </Col>

                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Candidate;
