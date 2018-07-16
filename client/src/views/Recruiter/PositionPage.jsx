import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import Card from "../../components/Card/Card.jsx";
import Position from "../../components/recruiter/Position";
import ViewPosition from "../../components/recruiter/ViewPosition";
import  APIQualification  from '../../redux/actions/qualificationAction';

class PositionPage extends Component {
    constructor(props){
        super(props);
        this.state = {
                id :"",
                title: "",
                selectedQualifications :[],
                skill: "",
                summary: "",
                isActive: false,
                action:"Create"


        };

    }
    handleChange =(event)=>{
        const {name, value} = event.target;
        this.setState({ [name] :  value} );

    };
    toggleIsActive = () => {
        this.setState({ isActive : !this.state.isActive });
    };
    handleEdit =  (data)=>{
        /**
         * This populates Create Form
         */

        const {_id, title,  qualifications, skill, summary,isActive } = data;
        this.setState({
            id:_id,
            title,
            qualifications,
            skill,
            summary,
            isActive: isActive === "Yes"
        });
        /**
         * Change the action to update
         */
        this.setAction("Update");

    };
    setAction=(action)=>{
        this.setState({
            action:action
        });

    }
    resetForm(){
        this.setState({
            id:"",
            title: "",
            selectedQualifications :[],
            skill:"",
            summary:"",
            isActive:false
        });

        this.setAction("Create");
    }

    handleQualificationChange = event => {
        this.setState({ selectedQualifications: event.target.value });
    };

    render() {
        var space = {
            marginTop : "2rem"
        }
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Create New Position"
                                category="Position Registration"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <div >
                                        <Position
                                                  id={this.state.id}
                                                  title={this.state.title}
                                                  selectedQualifications={this.state.selectedQualifications}
                                                  skill={this.state.skill}
                                                  summary={this.state.summary}
                                                  isActive={this.state.isActive}
                                                  handleChange = {this.handleChange}
                                                  toggleIsActive = {this.toggleIsActive}
                                                  action={this.state.action}
                                                  setAction={this.setAction}
                                                  handleQualificationChange = {this.handleQualificationChange}
                                        />
                                        <div style={space}>
                                            <ViewPosition  handleEdit={this.handleEdit}/>
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


function mapStateToProps(state) {
    return {
        qualifications:state.qualificationReduicer.qualification,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ getQualification:APIQualification.getQualification}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PositionPage)

