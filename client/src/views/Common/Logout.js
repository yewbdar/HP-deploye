import React ,{Component } from 'react';
import loginAction from '../../redux/actions/loginActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route, Redirect } from 'react-router'

class  Logout extends Component {
    constructor(props){
        super(props);

    }
    componentDidMount(){
        this.props.logout();
        window.location.reload();
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.userInfo.type && nextProps.userInfo.type === "NA" ) {
            window.location.reload();
        }
    }
    render() {

        if (this.props.userInfo.type && this.props.userInfo.type === "NA" ) {
            return <Redirect to='/login' />
        }
            return (<div>
                    Logging Out  . . .
            </div>)

    }
}


function mapStateToProps(state) {
    return {
        userInfo: state.loginReduicer.userInfo,
    }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logout:loginAction.logout}, dispatch)
}

export default connect( mapStateToProps,mapDispatchToProps)(Logout)
