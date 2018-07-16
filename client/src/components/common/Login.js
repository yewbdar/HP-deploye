import React ,{Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import loginAction from '../../redux/actions/loginActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Redirect } from 'react-router'

class  Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            userName:"",
            password:""
        };
    }
    handleChange =(event)=>{
        const {name, value} = event.target;
        this.setState({[name] : value});
    }
    handleLogin=(event)=> {
        event.preventDefault();
        this.props.login({
                            userName : this.state.userName,
                            password :this.state.password
                        });

    };
    componentWillReceiveProps(nextProps){
        console.log("Reloading",nextProps)
        if (nextProps.userInfo.type && nextProps.userInfo.type !== "NA" ) {
            window.location.reload();
        }
    }
    render() {
        if (this.props.userInfo.type && this.props.userInfo.type !== "NA" ) {
            return <Redirect to='/dashboard' />
        }
        return (
            <div>

                <div className="row justify-content-center">
                    <div className="col-lg-12 col-md-12 col-sm-12" >
                        <TextField
                            id="userName"
                            label="User Name"
                            value={this.state.userName}
                            onChange={this.handleChange}
                            margin="normal"
                            name="userName"
                            fullWidth
                        /> </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-12 col-md-6 col-sm-12 align-self-end" >
                        <TextField
                            id="password"
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            margin="normal"
                            name="password"
                            type="password"
                            fullWidth
                        />
                    </div>
                </div>
                <div className="row justify-content-center" >
                   <div class="col-lg-12 col-md-6 col-sm-12" >
                        <Button className="col-lg-12" fullWidth variant="outlined" color="primary" onClick={this.handleLogin}>
                            login
                        </Button>
                    </div>
                </div>

            </div >

        )
    }
}

function mapStateToProps(state) {
    return {
        userInfo : state.loginReduicer.userInfo ,
        isGettingUserInfo: state.loginReduicer.isGettingUserInfo,
        error : state.loginReduicer.error
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ login:loginAction.login}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
