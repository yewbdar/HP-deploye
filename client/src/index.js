import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import registerServiceWorker from './registerServiceWorker';

import { store, history } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';


import { HashRouter } from "react-router-dom";

import indexRoutes from "./routes/index.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
import "./assets/css/demo.css";
import "./assets/css/pe-icon-7-stroke.css";

if(localStorage.Auth) {

}


ReactDOM.render((
    <Provider store={store}>
        <ConnectedRouter history={history}>

            <Switch>
                    {indexRoutes.map((prop, key) => {
                        return <Route to={prop.path} component={prop.component} key={key} />;
                    })}
            </Switch>
        </ConnectedRouter>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();
// import React from "react";
// import ReactDOM from "react-dom";
//
// import { HashRouter, Route, Switch } from "react-router-dom";
//
// import indexRoutes from "./routes/index.jsx";
//
// import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/css/animate.min.css";
// import "./assets/sass/light-bootstrap-dashboard.css?v=1.2.0";
// import "./assets/css/demo.css";
// import "./assets/css/pe-icon-7-stroke.css";
//
// ReactDOM.render(
//     <HashRouter>
//         <Switch>
//             {indexRoutes.map((prop, key) => {
//                 return <Route to={prop.path} component={prop.component} key={key} />;
//             })}
//         </Switch>
//     </HashRouter>,
//     document.getElementById("root")
// );
