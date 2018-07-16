import React, { Component } from 'react';
import { connect } from 'react-redux';
import  getCandid  from '../../redux/actions/candidateActions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Grid from '../../components/common/Grid';
import FeedBack from '../../components/recruiter/FeedBack';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import  APIPosition  from '../../redux/actions/positionActions';
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Document, Page } from 'react-pdf';

class ViewCandidats extends Component {
    constructor(props){
        super(props);
    this.state = {
        selectedCandidateId:"",
        selectedCandidateFullName:"",
        selectedCandidateAppliedPositions:[],
        openFeedback: false,
        openResume:false,
        position:"",
        numPages: null,
        pageNumber: 1,
        file : null
    }
};

    handleGiveFeedback = (candidateId) => {

        this.setState({ openFeedback: true });
        console.log(candidateId);
         let candidate = this.props.candidates.find(function(element){return element._id === candidateId})
        // let position = this.props.getPositions.find(function(element){return element._id === candidate.appliedPositions})

        this.setState({
            selectedCandidateId:candidate._id,
            selectedCandidateFullName:candidate.lastName + ", "  + candidate.firstName,
            selectedCandidateAppliedPositions:candidate.appliedPositions

        });
    };

    handleClose = () => {
        this.setState({ openFeedback: false ,openResume:false});
    };

    componentDidMount() {
        //after component loads bring data
          this.props.getAllCandidate();
         this.props.getActivePosition();
        // this.loadResume();

    }
    handleOpen=(articleId)=>{
        console.log(articleId);
    };
    // handleGiveFeedback=(data)=>{
    //     console.log(data);
    //    // return( <FeedBack/>)
    // };
    handleViewResume=(candidateId)=>{

        this.props.getResumeById(candidateId);
        this.setState({ openResume: true });

        console.log(candidateId);

};
    handleAction=(event) =>{
        let clicked = event.target.getAttribute("name");
        let candidateId = event.target.getAttribute("data-article-id");
        switch (clicked) {
            case "Give Feedback" :
                this.handleGiveFeedback(candidateId);
                break;
            case "View resume" :
                this.handleViewResume(candidateId);
                break;
            default :
                break;
        };

    };
    handlePositionChange = (event) => {
        this.setState({
            position:event.target.value
        })
        // setTimeout(function(){
            this.props.getCandidates(event.target.value);
        // }, 100)
        // console.log(this.state.position);


    };
    loadResume=()=>{
       // this.props.getResumeById('5b475a00738cf202f0eecac8');

    }


    render() {
        return (
            <div>
                {/* this is for displaying data in Pretty format of json , WE CANT show Object in one JSX Node*/}
                {/*<pre>{JSON.stringify(this.props.positions, null, 2) }</pre>*/}

                <div className="row mb-5">
                    <div className="col-lg-12 col-md-6 col-sm-12" >
                        {/*<pre>Positions : {JSON.stringify(this.props.candidates, null, 2) }</pre>*/}

                        <FormControl fullWidth >
                            <InputLabel htmlFor="position">Select Position</InputLabel>

                            <Select
                                value={this.state.position}
                                onChange={this.handlePositionChange}
                                input={<Input name="position" id="position" />}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {this.props.positions.map(position => (
                                    <MenuItem key={position._id} value={position._id}>
                                        {position.title}
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl>
                    </div>
                </div>

                 <Grid
                    dataset={this.props.candidates}
                    header={["first Name","Last Name","Gender","DOB","Action"]}
                    headerMapping={["firstName","lastName","gender","dob",]}
                    actionNames={["View resume","Give Feedback"]}
                    handleAction = {this.handleAction}
                />


                <Dialog
                    open={this.state.openFeedback}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">feedback</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Giving a feedback is a good thing ! Giving a feedback is a good thing !
                        </DialogContentText>
                        <FeedBack
                        candidateId = {this.state.selectedCandidateId}
                        fullName = {this.state.selectedCandidateFullName}
                        positions = {this.state.selectedCandidateAppliedPositions}
                        closeDialog = {this.handleClose}

                        />

                    </DialogContent>

                </Dialog>

                <Dialog
                    open={this.state.openResume}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Resume</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                          Candidate Resume
                        </DialogContentText>
                        <Document

                            file={ this.props.candidateResume}
                            onLoadSuccess={this.onDocumentLoadSuccess}
                        >
                            <Page pageNumber={this.state.pageNumber} />
                        </Document>

                    </DialogContent>

                </Dialog>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        positions : state.positionReduicer.position,
        candidates : state.candidateReduicer.candidates ,
        isGettingCandidates: state.candidateReduicer.isGettingCandidates,
        candidateResume: state.candidateReduicer.candidateResume,
        error : state.candidateReduicer.error
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getCandidates:getCandid.getCandidatesByPosition,
                                getAllCandidate:getCandid.getCandidates,
                                getActivePosition:APIPosition.getActivePosition,
                                getResumeById:getCandid.getResumeById
       }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCandidats)
