import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "../../components/Card/Card.jsx";
import LoginComponent from "../../components/common/Login"
import { Link } from 'react-router-dom';

class Login extends Component {
    render() {
        var space = {
            marginTop : "2rem"
        }

        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={6} className="mx-auto" >
                            <Card
                                category="Login"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div className="col-lg-12 justify-content-center">
                                        <LoginComponent />
                                        <div className="col-lg-12 mx-auto">
                                       <div> Don't Have an account ?, <Link to={`/register/`} >Register</Link></div>
                                        </div>
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

export default Login;
