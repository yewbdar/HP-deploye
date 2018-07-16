import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getArticles } from '../../redux/actions/actions';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Grid from '../../components/common/Grid';
import  APIPostion  from '../../redux/actions/positionActions';
import  APICandidate  from '../../redux/actions/candidateActions';
import loginAction from '../../redux/actions/loginActions';

class ViewOpenPosition extends Component {
    constructor () {
        super();
        this.state ={
            newPosition:[]
        }
    }

    componentDidMount() {
        //after component loads bring data

        this.props.getActivePosition();
        this.props.getCurrentUser();
    }
    handleApply=(positionId)=>{

        this.props.applyForPosition({
                                            id:this.props.userInfo.id,
                                            positionId : positionId
                                    });
    };

    handleViewdetail=(positionId)=>{
        console.log(positionId);
    }
    handleAction=(event) =>{
        let clicked = event.target.getAttribute("name");
        let positionId = event.target.getAttribute("data-article-id");
        switch (clicked) {
            case "Apply" :
                this.handleApply(positionId);
                break;
            case "View detail" :
                this.handleViewdetail(positionId);
                break;
            default :
                break;
        };

    }
    filterActivePositions=()=>{
        this.setState({newPosition: this.props.positions.filter((ele)=>{ ele.isActive === true; }) });
    };

    render() {
        return (
            <div>
                {/* this is for displaying data in Pretty format of json , WE CANT show Object in one JSX Node*/}
                {/*<pre>{JSON.stringify(this.props.positions , null, 2) }</pre>*/}
                <Grid
                    dataset={this.props.positions}


                    header={["Title","Skill","Summary","Action"]}
                    headerMapping={["title","skill","summary"]}
                    actionNames={["Apply","View detail"]}
                    handleAction = {this.handleAction}

                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {

        positions:state.positionReduicer.position,
        isGettingPosition: state.positionReduicer.isGettingPosition,
        error : state.positionReduicer.error,
        userInfo : state.loginReduicer.userInfo ,
        isGettingUserInfo: state.loginReduicer.isGettingUserInfo,
        error : state.loginReduicer.error
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getActivePosition:APIPostion.getActivePosition,
        applyForPosition:APICandidate.applyForPosition,
        getCurrentUser:loginAction.getCurrentUser
       }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewOpenPosition)
