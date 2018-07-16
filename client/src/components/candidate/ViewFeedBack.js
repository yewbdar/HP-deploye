import React, { Component } from 'react';
import { connect } from 'react-redux';
import  candidateActions  from '../../redux/actions/candidateActions';
import { bindActionCreators } from 'redux';
import Grid from '../../components/common/Grid';
import { Route, Redirect } from 'react-router'
import loginAction from '../../redux/actions/loginActions';

class ViewFeedBack extends Component {
    constructor(props){
        super(props);
        this.state = {
            // candidateId:"5b4a6c4d3b1cd3178fa35ff2",
            candidate:[],
            candidatesParsed: []
        }
    };

    componentDidMount() {
        this.props.getCurrentUser();
        //after component loads bring data
        this.props.getAppliedPositionsStatusForCandidate(this.props.userInfo.id);
        this.setState({candidate:JSON.stringify(this.props.candidate)})
        console.log(this.state.candidate)
    };

    handleAction=(event) =>{


    };

    render() {
        if (this.props.userInfo.type && this.props.userInfo.type !== "Candidate" ) {
            return <Redirect to='/dashboard' />
        }
        return (
            <div>
                {/* this is for displaying data in Pretty format of json , WE CANT show Object in one JSX Node*/}
                {/*<pre>{JSON.stringify(this.props.candidateAppliedPositionsStatus, null, 2) }</pre>*/}

                <Grid
                    dataset={this.props.candidateAppliedPositionsStatus}
                    header={["Full Name","Applied Position ","Interview Type", "Result" , "Comment"]}
                    headerMapping={["lastFirstName","positionTitle", "interviewType", "result","comment" ]}
                    actionNames={[]}
                    handleAction = {this.handleAction}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        // positions : state.positionReduicer.position,
        candidateAppliedPositionsStatus : state.candidateReduicer.candidateAppliedPositionsStatus ,
        isGettingCandidateStatus: state.candidateReduicer.isGettingCandidateStatus,
        errorCandidate : state.candidateReduicer.error,
        userInfo : state.loginReduicer.userInfo,
        isGettingUserInfo: state.loginReduicer.isGettingUserInfo,
        errorLogin : state.loginReduicer.error
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getAppliedPositionsStatusForCandidate:candidateActions.getAppliedPositionsStatusForCandidate,
        getCurrentUser:loginAction.getCurrentUser
        // getPositions:APIPosition.getActivePosition
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFeedBack)

