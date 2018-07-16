import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import Header from "./../../components/Header/Header";
import Footer from "./../../components/Footer/Footer";
import Sidebar from "./../../components/Sidebar/Sidebar";
import { style } from "../../variables/Variables.jsx";
import dashboardRoutes from "./../../routes/dashboard.jsx";

import loginAction from '../../redux/actions/loginActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
    this.state = {
      _notificationSystem: null
    };
  }
  handleNotificationClick(position) {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Page Loaded Successfully
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  }
  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;
     _notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Page Loaded Successfully
        </div>
      ),
      level: "success",
      position: "tr",
      autoDismiss: 15
    });


    this.props.getCurrentUser();


  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }

  }
  render() {

    return (

      <div className="wrapper">
        <NotificationSystem ref="notificationSystem" style={style} />

        {this.props.userInfo.type !== 'NA' ?  <Sidebar {...this.props}
                 userInfo={this.props.userInfo}
                 isGettingCurrentUser = {this.props.isGettingCurrentUser}/> : ""}

        <div id="main-panel" style={{width: this.props.userInfo !== 'NA'&& "100%"}}  className="main-panel" ref="mainPanel">

          <Header {...this.props} />
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              if (prop.name === "Notifications")
                return (
                  <Route
                    path={prop.path}
                    key={key}
                    render={routeProps => (
                      <prop.component
                        {...routeProps}
                        handleClick={this.handleNotificationClick}
                      />
                    )}
                  />
                );
              if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key} />;
              return (
                <Route path={prop.path} component={prop.component} key={key} />
              );
            })}
          </Switch>
          {/*<Footer />*/}
        </div>
      </div>
    );
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
  return bindActionCreators({ getCurrentUser:loginAction.getCurrentUser}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)

