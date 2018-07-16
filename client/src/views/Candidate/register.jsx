import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "../../components/Card/Card.jsx";
import Position from "../../components/recruiter/Position";
import Register from "../../components/candidate/Register";

import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class RegisterPage extends Component {
    render() {
        var space = {
            marginTop : "2rem"
        }
        if (this.props.userInfo.type && this.props.userInfo.type != "NA" ) {
            return <Redirect to='/dashboard' />
        }
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Create Profile"
                                category="Profile Registration"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div>
                                    <div  class="row justify-content-end">

                                            Already Have an account ?, <Link to={`/login/`} >Login</Link>
                                            </div>

                                        <Register />
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



function mapStateToProps(state) {
    return {
        userInfo : state.loginReduicer.userInfo ,
    }
}


export default connect(mapStateToProps)(RegisterPage)
