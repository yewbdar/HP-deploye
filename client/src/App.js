import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import ArticleView from './components/ArticleView'
import Position from './components/recruiter/Position'
import FeedBack from './components/recruiter/FeedBack'
import ViewCandidats from './components/recruiter/ViewCandidats'
import ViewPosition from './components/recruiter/ViewPosition'
import CandidateProfile from './components/candidate/Register'
import ViewOpenPosition from './components/candidate/ViewOpenPosition'
import EmpViewCandidate from './components/employee/ViewCandidate'
import ViewFeedBack from './components/candidate/ViewFeedBack'
import Login from './components/common/Login'
// import Dashboard from "layouts/Dashboard/Dashboard";


class App extends Component {

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/articleview/" component={ArticleView} />
                    <Route path="/Position" component={Position} />
                    <Route path="/FeedBack" component={FeedBack} />
                    {/*<Route path="/ViewCandidats" component={ViewCandidats} />*/}
                    <Route path="/ViewPosition" component={ViewPosition} />
                    <Route path="/CandidateProfile" component={CandidateProfile} />
                    <Route path="/ViewOpenPosition" component={ViewOpenPosition} />
                    <Route path="/ViewFeedBack" component={ViewFeedBack} />
                    <Route path="/empViewCandidate" component={EmpViewCandidate} />
                    <Route path="/Login" component={Login} />
                    {/*<Route path="/dashboard" component={Dashboard} />*/}
                    {/*<Route path="**" component={ArticleView} />*/}
                </Switch>
            </div>
        );
    }
}

export default App;