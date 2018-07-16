import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import  candidateActions  from '../../redux/actions/candidateActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class PersonalInfo extends Component {
    constructor () {
        super ();
        this.state = {
            firstName : "",
            lastName:"",
            DOB: ""
        }
    }
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name] : value});
        console.log(value)

    }
    handleResetButton=()=> {

        this.setState({firstName : "",
            lastName:"",
            DOB: ""
        })
    };

    render() {

        return (
            <ValidatorForm

                onSubmit={this.handleSubmitButton}

            >
            <div className="content">
                <div className="row">
                    <div style={{color:"#F00"}} className="col-lg-12 col-md-6 col-sm-12 float-left" >
                        {this.props.validationMsg}
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12 float-left" >

                        <TextValidator
                            id="firstName"
                            label="First Name"
                            value={this.props.firstName}
                            onChange={this.props.handleChange}
                            margin="normal"
                            name="firstName"
                            fullWidth
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12 float-right" >
                        <TextValidator
                            id="lastName"
                            label="Last Name"
                            value={this.props.lastName}
                            onChange={this.props.handleChange}
                            margin="normal"
                            name="lastName"
                            fullWidth
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12" >
                        <TextValidator
                            id="DOB"
                            label="DOB"
                            value={this.props.DOB}
                            onChange={this.props.handleChange}
                            margin="normal"
                            name="DOB"
                            fullWidth
                            validators={['required']}
                            errorMessages={['this field is required']}
                        /> </div>
                </div>

            </div>
                </ValidatorForm>
        );
    }
}



function mapStateToProps(state) {
    return {

    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ saveDocument:candidateActions.saveDocument
    }, dispatch)
}

export default  connect(mapStateToProps, mapDispatchToProps)(PersonalInfo)
