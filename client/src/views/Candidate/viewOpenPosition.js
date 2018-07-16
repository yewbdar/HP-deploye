import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "../../components/Card/Card.jsx";
import Position from "../../components/recruiter/Position";
import ViewOpenPosition from "../../components/candidate/ViewOpenPosition";

class viewOpenPosition extends Component {
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
                                title="Open position"
                                category="position"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div >
                                        <ViewOpenPosition />
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

export default viewOpenPosition;
