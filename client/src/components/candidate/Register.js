import React ,{Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import  APICandidate  from '../../redux/actions/candidateProfileAction';
import  candidateActions  from '../../redux/actions/candidateActions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import PersonalInfo from "../../views/Candidate/PersonalInfo";
import ContactInfo from "../../views/Candidate/contactInfo";
import UploadFile from "../../views/Candidate/uploadFile";
import CreateAccount from "../../views/Candidate/createAccount";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import  APIQualification  from '../../redux/actions/qualificationAction';

class  CandidateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            DOB: "",
            image: "",
            resume:"",
            coverPage: "",
            telephone:"",
            email:"",
            street:"",
            city:"",
            country:"",
            zip:"",
            skills:"",
            userName:"",
            password:"",
            conformPassword:"",
            file : null,
            yearsOfExperience:"",
            selectedQualifications :[],
            activeStep:0,
            skipped: new Set(),
            personalInfoError: "",
            accountInfoError:"",
            contactInfoError:"",
            candidate:{}
        }
    }
    handleChange =(event)=>{
            const {name, value} = event.target;
            this.setState({[name]: value});

    };
    componentDidMount() {
        this.props.getQualification();
    }
    handleOpen=(articleId)=>{
        console.log(articleId);
    };
    handleAction=(event) =>{
        let clicked = event.target.getAttribute("name");
        let articleId = event.target.getAttribute("data-article-id");
        switch (clicked) {
            case "Open" :
                this.handleOpen(articleId);
                break;
            default :
                break;
        };

    };

    handleSubmitButton=(event)=>{
        event.preventDefault();
        // this.setState((state) =>({
        //     ...state,
        //     dataForSave: {
        //         // firstName: this.state.txtFirstName,
        //         // lastName: this.state.txtLastName,
        //         // dob: this.state.txtDOB,
        //         // image: this.state.txtImage,
        //         // resume: this.state.txtResume,
        //         // coverPage: this.state.txtCoverPage
        //     }
        // }),() => {
        console.log(this.state.candidate);


            // this.props.getVacancy();
            // console.log(this.state.dataForSave)
            // this.props.getVacancy();


        // });
    };
   getSteps = ()=> {
        return ['Personal information', 'create account','contact information ', 'Upload resume '];
     };
    handleSelectedQualifications=(selected)=>{
        let selectedQualificationForDisplay = [];
        this.props.qualifications.map(qualification => {
            if(selected.indexOf(qualification["_id"]) !== -1 ){
                selectedQualificationForDisplay.push(qualification.name);
            }
        });
        return selectedQualificationForDisplay.join(" , ");
    };
    handleQualificationChange = event => {
        this.setState({ selectedQualifications: event.target.value });
    };


    getStepContent  = (step)=> {
       switch (step) {
           case 0:
               return <PersonalInfo firstName={this.state.firstName} lastName={this.state.lastName} DOB={this.state.DOB}
                                    validationMsg={this.state.personalInfoError} handleChange={this.handleChange} />;
           case 1:
               return <CreateAccount  userName={this.state.userName} password={this.state.password} conformPassword={this.state.conformPassword}
                                      validationMsg={this.state.accountInfoError} handleChange={this.handleChange} />;
           case 2:
               return <ContactInfo telephone={this.state.telephone} email={this.state.email} street={this.state.street}
                                   city={this.state.city} country={this.state.country} zip={this.state.zip}
                                   validationMsg={this.state.contactInfoError} handleChange={this.handleChange} />;
           case 3:
               return <UploadFile validationMsg={this.state.personalInfoError} handleChange={this.handleChange}
                                  selectedQualifications={this.state.selectedQualifications}
                                  handleSelectedQualifications={this.handleSelectedQualifications}
                                  qualifications={this.props.qualifications}
                                  handleQualificationChange = {this.handleQualificationChange}
                                  onChange = {this.onChange}
                                  file = {this.state.file}
                        />;
           default:
               return 'Unknown step';
       }
   };

    isStepOptional = step => {
        return step === -1;
    };
    onChange = (e) => {
        console.log(e, e.target.files[0])
        this.setState({file:e.target.files[0]})
    }
    validateFormPersonalInfo =()=> {
        /**
         * Do Validation
         */
        const {activeStep} = this.state;
        let status = true;
        let personalInfoError = "";
        if (this.state.firstName == "") {
            status = false;
            personalInfoError += "\n First Name Cannot be Empty";
        }
        if (this.state.lastName == "") {
            status = false;
            personalInfoError += "\n Last Name Cannot be Empty";
        }
        if (this.state.DOB == "") {
            status = false;
            personalInfoError += "\n DOB  Cannot be Empty";
        }
        this.setState({personalInfoError});
        return status;
    };
    validateFormAccountInfo =()=> {
            let status = true;
                let accountInfoError = "";
                if (this.state.userName == "") {
                    status = false;
                    accountInfoError += "\n User Name Cannot be Empty";
                }
                if (this.state.password == "") {
                    status = false;
                    accountInfoError += "\n Password Cannot be Empty";
                }
                if (this.state.conformPassword == "") {
                    status = false;
                    accountInfoError += "\n conformPassword  Cannot be Empty";
                }
                if (this.state.conformPassword !== this.state.password) {
                    status = false;
                    accountInfoError += "\n Passwords did not match ";
                }
                this.setState({accountInfoError});
                return status;


        };
    validateFormContactInfo  =()=> {
        let status = true;

            let contactInfoError = "";
            if (this.state.telephone == "") {
                        status = false;
                contactInfoError += "\n telephone Cannot be Empty";
                    }
                    if (this.state.email == "") {
                        status = false;
                        contactInfoError += "\n email Cannot be Empty";
                    }
                    if (this.state.street == "") {
                        status = false;
                        contactInfoError += "\n street  Cannot be Empty";
                    }
                    if (this.state.city == "") {
                        status = false;
                        contactInfoError += "\n city  Cannot be Empty";
                    }
                    if (this.state.country == "") {
                        status = false;
                        contactInfoError += "\n country  Cannot be Empty";
                    }
                    if (this.state.zip == "") {
                        status = false;
                        contactInfoError += "\n zip  Cannot be Empty";
                    }


            this.setState({contactInfoError});
        return status
        }

    handleNext = () => {
        const { activeStep } = this.state;
        let { skipped } = this.state;
        console.log(activeStep == 0 , !this.validateFormPersonalInfo());
        if(activeStep == 0 && !this.validateFormPersonalInfo()){
             return;
        }
        if(activeStep == 1 && !this.validateFormAccountInfo()){
            return;
        }
        if(activeStep == 2 && !this.validateFormContactInfo()){
            return;
        }
        if(activeStep == 3){
            this.props.saveCandidate(this.state);
        }
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });
    };

    handleBack = () => {
        const { activeStep } = this.state;
        this.setState({
            activeStep: activeStep - 1,
        });
    };

    handleSkip = () => {
        const { activeStep } = this.state;
        if (!this.isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        this.setState(state => {
            const skipped = new Set(state.skipped.values());
            skipped.add(activeStep);
            return {
                activeStep: state.activeStep + 1,
                skipped,
            };
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    isStepSkipped = (step) => {
        return this.state.skipped.has(step);
    }

    render() {

        const steps = this.getSteps();
        const { activeStep } = this.state;

        var margin  = {
            margin : "2rem"
        };
        return (
            <div style={margin}>

                <div >
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index) => {
                            const props = {};
                            const labelProps = {};
                            if (this.isStepOptional(index)) {
                                labelProps.optional = <Typography variant="caption"></Typography>;
                            }
                            if (this.isStepSkipped(index)) {
                                props.completed = false;
                            }
                            return (
                                <Step key={label} {...props}>
                                    <StepLabel {...labelProps}>{label}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <div>
                        {activeStep === steps.length ? (
                            <div>
                                <Typography >
                                    <div>
                                        {/*<h1 className="align-center">*/}
                                            {/*All steps completed ...*/}
                                        {/*</h1>*/}
                                        <h1 className="align-center">
                                            Thank you for Registering ! , Check Your Email For Details.
                                        </h1>
                                    </div>

                                </Typography>
                                <Button onClick={this.handleReset} >
                                    Reset
                                </Button>
                            </div>
                        ) : (
                            <div>
                                <Typography >{this.getStepContent(activeStep)}</Typography>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={this.handleBack}

                                    >
                                        Back
                                    </Button>
                                    {this.isStepOptional(activeStep) && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleSkip}

                                        >
                                            Skip
                                        </Button>
                                    )}
                                    <Button

                                        variant="contained"
                                        color="primary"
                                        onClick={this.handleNext}

                                    >
                                        {activeStep === steps.length - 1 ? 'Register' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>


            </div >


        )
    }
}

function mapStateToProps(state) {
    return {
       candidate : state.candidateReduicer.candidate ,
       error : state.positionReduicer.error,
       qualifications:state.qualificationReduicer.qualification


    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        saveCandidate:candidateActions.saveCandidate,
        getQualification:APIQualification.getQualification,

    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CandidateProfile)





