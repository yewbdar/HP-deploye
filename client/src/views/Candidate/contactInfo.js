import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import Card from "../../components/Card/Card.jsx";
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import  candidateActions  from '../../redux/actions/candidateActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class ContactInfo extends Component {
    constructor () {
        super ();
        this.state = {
            telephone:"",
            email:"",
            street:"",
            city:"",
            country:"",
            zip:"",
        }
    }
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name] : value});
        console.log(value)

    }
    handleSubmitButton=(event)=> {

            // this.props.postPosition({
            //     title: this.props.title,
            //     qualifications: this.props.selectedQualifications,
            //     skill: this.props.skill,
            //     summary: this.props.summary,
            //     isActive: this.props.isActive
            // });
    };
    handleResetButton=(event)=> {

        this.setState({telephone:" ",
                      email:"",
                      street:"",
                      city:"",
                      country:"",
                      zip:""
            ,})
    };

    render() {

        return (
            <ValidatorForm

                onSubmit={this.handleSubmitButton}

            >
            <div className="content">

                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12 float-left" >
                        <TextValidator
                            id="telephone"
                            label="Telephone"
                            value={this.props.telephone}
                            onChange={this.props.handleChange}
                            margin="normal"
                            name="telephone"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            fullWidth
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12 float-right" >
                        <TextValidator
                            id="email"
                            label="Email"
                            value={this.props.email}
                            onChange={this.props.handleChange}
                            margin="normal"
                            name="email"
                            validators={['required','isEmail']}
                            errorMessages={['this field is required','Email is not valid']}
                            fullWidth
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12" >
                        <TextValidator
                            id="street"
                            label="Street"
                            value={this.props.street}
                            onChange={this.props.handleChange}
                            margin="normal"
                            name="street"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            fullWidth
                        /> </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12" >
                        <TextValidator
                            id="city"
                            label="City"
                            value={this.props.city}
                            onChange={this.props.handleChange}
                            margin="normal"
                            name="city"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            fullWidth
                        /> </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12" >
                        <TextValidator
                            id="country"
                            label="Country"
                            value={this.props.country}
                            onChange={this.props.handleChange}
                            margin="normal"
                            name="country"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            fullWidth
                        /> </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12" >
                        <TextValidator
                            id="zip"
                            label="Zip"
                            value={this.props.zip}
                            onChange={this.props.handleChange}
                            margin="normal"
                            name="zip"
                            type="number"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            fullWidth
                        /> </div>
                </div>

                <div className="row">
                    <div style={{color:"#F00"}} className="col-lg-12 col-md-6 col-sm-12 float-left" >
                        {this.props.validationMsg}
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo)
