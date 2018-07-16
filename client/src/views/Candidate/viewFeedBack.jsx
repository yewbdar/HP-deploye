import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "../../components/Card/Card.jsx";
import Position from "../../components/recruiter/Position";
import ViewFeedBack from "../../components/candidate/ViewFeedBack";


class FeedBack extends Component {
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
                                title="FeedBack"
                                category="View FeedBack"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div >
                                        <ViewFeedBack />
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

export default FeedBack;
