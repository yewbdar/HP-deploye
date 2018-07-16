import React ,{Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import  candidateActions  from '../../redux/actions/candidateActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class  CreateAccount extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName:"",
            password:"",
            conformPassword:"",

        };

    }

    handleChange =(event)=>{
        const {name, value} = event.target;
        this.setState({[name] : value});
        console.log(value)

    }
    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password) {
                return false;
            }
            return true;
        });
    }
    handleResetButton=()=> {

        this.setState({userName:"",
                password:"",
                conformPassword:""
            })
    };

    render() {
        return (
            <ValidatorForm

                onSubmit={this.handleSubmitButton}

            >
            <div>

                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12 float-left" >
                        <TextField
                            id="userName"
                            label="User Name"
                            value={this.props.userName}
                            onChange={this.props.handleChange}
                            margin="normal"
                            name="userName"
                            fullWidth
                            validators={['required']}
                            errorMessages={['this field is required']}
                        /> </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12 float-left" >
                        <TextField
                            id="password"
                            label="Password"
                            value={this.props.password}
                            onChange={this.props.handleChange}
                            margin="normal"
                            name="password"
                            type="password"
                            fullWidth
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12 col-md-6 col-sm-12 float-left" >
                        <TextField
                            id="conformPassword"
                            label="conform Password"
                            value={this.props.conformPassword}
                            onChange={this.props.handleChange}
                            margin="normal"
                            name="conformPassword"
                            type="password"
                            fullWidth
                            validators={['required','isPasswordMatch']}
                            errorMessages={['this field is required','password mismatch']}
                        />
                    </div>
                </div>
                <div className="row">
                    <div style={{color:"#F00"}} className="col-lg-12 col-md-6 col-sm-12 float-left" >
                        {this.props.validationMsg}
                    </div>
                </div>

                </div>
                </ValidatorForm>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccount)





