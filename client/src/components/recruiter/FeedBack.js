import React ,{Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import  APICandidate from '../../redux/actions/candidateActions';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import Grid  from '../common/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import loginAction from '../../redux/actions/loginActions';

class  FeedBack extends Component {
    constructor(props){
        super(props);
        this.state = {
            interviewType:"",
            interviewedBy:"",
            candidateId:"",
            positions:"",
            comment:"",
            passed:"",
            result:"",
            interviewedOn:Date.now()
        };

    }

    handleChange =(event)=>{
        const {name, value} = event.target;
        this.setState({[name] : value});
        console.log(value)

    }
    componentDidMount() {
        this.props.getCurrentUser();
        //after component loads bring data
        // this.setState({article:getArticles()})


    }
    handleFeedbackChange = (event)=>{

        this.setState({ result: event.target.value});
        if(this.state.result === "Pass"){
            this.setState({ passed:true});
        }else {
            this.setState({ passed:false});
        }

        console.log(this.state.passed)
    }
    handleOpen=(articleId)=>{
        console.log(articleId);
    };

    handleSubmitButton=(event)=> {

        if(this.props.userInfo.type === "Recruiter"){
            this.setState({interviewType:"Behavioral"})
        }
        else {
            this.setState({interviewType:"Technical"})
        }
        event.preventDefault();
        this.setState((state) =>({
            ...state,
                candidateId:this.props.id,
                interviewedBy: this.props.userInfo.id,
                positions:this.props.positions,
                comment: this.state.comment,
                passed: this.state.passed,
                interviewedOn:Date.now()
        }),() => {
            this.props.saveFeedbackForAppliedPosition({
                                                    interviewType:this.state.interviewType,
                                                    candidateId: this.props.id,
                                                    interviewedBy: this.props.userInfo.id,
                                                     positions: this.props.positions,
                                                    comment: this.state.comment,
                                                    passed: this.state.passed,
                                                    interviewedOn: Date.now()
                                                  });

        });
    };
    handlePositionChange = (event) => {
        this.setState({
            position:event.target.value
        })
        console.log(this.state.position)
    };

    render() {

        return (

            <ValidatorForm

                onSubmit={this.handleSubmitButton}
            >

            <div>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12" >
                        <TextField
                            id="interview"
                            label="Interview#"
                            value={this.props.txtInterview}
                            onChange={this.handleChange}
                            margin="normal"
                            name="txtInterview"
                            fullWidth
                        /> </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12 align-self-end" >
                        <TextValidator
                            id="candidateName"
                            label="Candidate Name"
                            value={this.props.fullName}
                            onChange={this.handleChange}
                            margin="normal"
                            name="fullName"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            fullWidth
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12" >
                        {/*<pre>Positions : {JSON.stringify(this.props.positions, null, 2) }</pre>*/}
                        <FormControl fullWidth >
                                <InputLabel htmlFor="position">Position</InputLabel>

                                <Select
                                    value={this.state.position}
                                    onChange={this.handlePositionChange}
                                    input={<Input name="position" id="position" />}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {this.props.positions.map(position => (
                                        <MenuItem key={position._id} value={position.position._id}>
                                           {position.position.title}
                                        </MenuItem>
                                    ))}

                                </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12" >
                        <TextValidator
                            multiline
                            rows="4"
                            id="comment"
                            label="Feed Back"
                            value={this.state.comment}
                            onChange={this.handleChange}
                            margin="normal"
                            name="comment"
                            validators={['required']}
                            errorMessages={['this field is required']}
                            fullWidth
                        /> </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12" >
                        <FormControl component="fieldset" required >

                            <FormLabel component="legend">Result</FormLabel>

                            <RadioGroup
                                aria-label="Feedback Result"
                                name="feedback-result"
                                value={this.state.result}
                                onChange={this.handleFeedbackChange}
                                style={{display:"inline"}}
                            >
                                <FormControlLabel value="Pass" control={<Radio  color="primary" />} label="Pass" />
                                <FormControlLabel value="Fail" control={<Radio />} label="Fail" />

                            </RadioGroup>
                        </FormControl>

                    </div>
                 </div>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12 " >
                        <Button  style={{float:"right"}}  clasName="float-right" color="secondary" onClick={this.props.closeDialog}>
                            Close
                        </Button>

                        <Button type="Submit" style={{float:"right"}} clasName="float-right" color="primary" onClick={this.handleSubmitButton}>
                            Submit feed back
                        </Button>


                    </div>
                </div>
            </div >
            </ValidatorForm>

            // {this is for displaying data in Pretty format of json , WE CANT show Object in one JSX Node}
            //

        )
    }
}

function mapStateToProps(state) {
    return {
        feedback : state.feedBackReduicer.feedBack ,
        isGettingPosition: state.feedBackReduicer.isGettingPosition,
        errorFeedBack : state.feedBackReduicer.error,
        userInfo : state.loginReduicer.userInfo,
        isGettingUserInfo: state.loginReduicer.isGettingUserInfo,
        errorLogin : state.loginReduicer.error
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        saveFeedbackForAppliedPosition:APICandidate.feedbackForApplyedPosition,
        getCurrentUser:loginAction.getCurrentUser
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack)








