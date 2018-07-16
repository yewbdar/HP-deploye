import React ,{Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import  APIPosition  from '../../redux/actions/positionActions';
import  APIQualification  from '../../redux/actions/qualificationAction';
import red from '@material-ui/core/colors/red';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


import Grid  from '../common/Grid';
const red300 = red['500'];
const style = {
    right: 0,
    fontSize: '12px',
    color: red300,
    position: 'absolute',
    marginTop: '-25px',

};

class  Position extends Component {

    constructor(props){
        super(props);
        };


    componentDidMount() {
        //after component loads bring data

        // ValidatorForm.addValidationRule('isTruthy', value => value);
        this.props.getPosition();
        this.props.getQualification();
    }

    handleOpen=(articleId)=>{
        console.log(articleId);
    };
    handleGiveReview=(event)=>{

    };
    handleAction=(event) =>{
        let clicked = event.target.getAttribute("name");
        let postionId = event.target.getAttribute("data-postion-id");
        switch (clicked) {
            case "Open" :
                this.handleOpen(postionId);
                break;
            default :
                break;
        };

    }
    handleSubmitButton=(event)=> {
        if(this.props.action === "Create") {
            this.props.postPosition({
                title: this.props.title,
                qualifications: this.props.selectedQualifications,
                skill: this.props.skill,
                summary: this.props.summary,
                isActive: this.props.isActive
            });

        } else if (this.props.action === "Update") {

            this.props.putPosition({
                id:this.props.id,
                title: this.props.title,
                qualifications: this.props.selectedQualifications,
                skill: this.props.skill,
                summary: this.props.summary,
                isActive: this.props.isActive
            });
            this.props.setAction("Create");
            this.props.getPosition();
        }
    };
    handleSelectedQualifications(selected){
        let selectedQualificationForDisplay = [];
        this.props.qualifications.map(qualification => {
            if(selected.indexOf(qualification["_id"]) !== -1 ){
                selectedQualificationForDisplay.push(qualification.name);
            }
        });
        return selectedQualificationForDisplay.join(" , ");
    };

    errorText() {
        const { isValid } = this.state;

        if (isValid) {
            return null;
        }

        return (
            <div style={style}>
                {this.getErrorMessage()}
            </div>
        );
    }

    render() {

        var margin  = {
            margin : "2rem"
        };
        return (

        <ValidatorForm

                onSubmit={this.handleSubmitButton}

            >

            <div style={margin}>
                <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12" >
                            <TextValidator
                                        label="Job Title"
                                        value={this.props.title}
                                        onChange={this.props.handleChange}
                                        margin="normal"
                                        name="title"
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        fullWidth
                            />

                        </div>
                </div>


                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 " >
                    <InputLabel >qualification</InputLabel>


                        <FormControl fullWidth >
                            <Select

                                multiple
                                value={this.props.selectedQualifications}
                                onChange={this.props.handleQualificationChange}
                                input={<Input id="select-multiple-checkbox" />}
                                renderValue={selected => this.handleSelectedQualifications(selected)}
                            >
                                {this.props.qualifications.map(qualification => (

                                    <MenuItem key={qualification["_id"]} value={qualification["_id"]}>
                                        <Checkbox checked={this.props.selectedQualifications.indexOf(qualification["_id"]) > -1} />

                                        <ListItemText primary={qualification.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                </div>
                    </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 align-self-end" >
                        <TextValidator
                            id="skill"
                            label="Skill"
                            value={this.props.skill}
                            onChange={this.props.handleChange}
                            margin="normal"
                            name="skill"
                            type="Multi-line"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            fullWidth
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 align-self-end" >
                        <TextValidator
                            id="summary"
                            label="Summary"
                            value={this.props.summary}
                            onChange={this.props.handleChange}
                            margin="normal"
                            name="summary"
                            type="Multi-line"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            fullWidth
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 align-self-end" >
                    <FormControlLabel
                        control={
                            <Checkbox

                                checked={this.props.isActive}
                                onChange={this.props.toggleIsActive}
                                value="isActive"
                                color="primary"
                                label="Custom color"

                            />


                        }
                        label="Active"


                    />

                        </div>
                </div>


                <div className="row">
                    <div class="col-lg-12 col-md-6 col-sm-12" >
                        <Button   type="Submit"    className="pull-right" variant="outlined" data-action={this.props.action} color="primary" onClick={this.handleSubmitButton}>
                            {this.props.action}
                        </Button>
                    </div>
                </div>

                {/*<pre>{JSON.stringify(this.props.qualification, null, 2) }</pre>*/}


            </div >
            </ValidatorForm>


        )
    }
}

// export default Postion;
function mapStateToProps(state) {
    return {
        positions : state.positionReduicer.position ,
        qualifications:state.qualificationReduicer.qualification,
        isGettingPosition: state.positionReduicer.isGettingPosition,
        error : state.positionReduicer.error
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getPosition:APIPosition.getPosition ,
                                getQualification:APIQualification.getQualification,
                                postPosition:APIPosition.postPosition,
                                putPosition:APIPosition.updatePosition,
                                }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Position)








