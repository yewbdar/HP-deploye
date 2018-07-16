/** */
const mongoose = require('mongoose');
const Candidate = require('./../models/Candidate');
const Employee = require('./../models/Employee');
const bcrypt = require('bcrypt');
const LOGIN_URL = "http://localhost:3000/login";
const HOME_URL = "http://localhost:3000/home";

module.exports = {

    login:function(req,res){

        const {userName, password} = req.body;
        let user = {};
        Candidate.findOne({ 'account.userName': userName},
                (err, result) => {
                    if(result) {
                        if (bcrypt.compareSync(password, result.account.password)) {
                            user.firstName = result.firstName;
                            user.lastName = result.lastName;
                            user.type = "Candidate";
                            user.id = result._id;

                            req.session.userInfo = user;
                            req.session.save(function(err) {
                            });
                            res.send(user);
                            // res.end("Found user- Candidate : setting user details at the session");

                        }//found account , register user info  in session and redirect to dashboard
                    } else {
                            Employee.findOne({'account.userName': userName},
                                (err, result) => {
                                    if (result) {
                                        if (bcrypt.compareSync(password, result.account.password)) {
                                            user.firstName = result.firstName;
                                            user.lastName = result.lastName;

                                            if(result.position && result.position == "Recruiter"){
                                                user.type = "Recruiter";
                                            } else {
                                                user.type = "Employee";
                                            }
                                            user.id = result._id;
                                            req.session.userInfo = user;
                                            req.session.save(function(err) {
                                            });
                                            res.send(user);
                                            // res.end("Found user - Employee : setting user details at the session");

                                        }//found account , register user info  in session and redirect to dashboard
                                    } else {
                                        res.end("User Not found");
                                    }
                                });
                    }
                });
    },
    validateLogin: function(req, res) {
        /**
         * Check if the Session have a user object if not redirect to login
         */
        sess = req.session;
        // if(req.session) {
        //     if(req.session.user){
        //         return res.status(200).send(user);
        //     }
        //
        // } else {
        //     /**
        //      * Redirect to frontend app
        //       */
        //     res.redirect(LOGIN_URL)
        //
        // }

    },
    currentUser :function(req, res) {
        /**
         * Check if the Session have a user object if not redirect to login
         */
        let user = {};
            user.type  = "NA";
            user.firstName = "NA";
            user.lastName = "NA";
            user.id= "NA";
        if(req.session.userInfo) {
            res.send(req.session.userInfo);
        } else {
            res.send(user);

        }

        // if(!req.session.user) {
        //     return res.status(401).send();
        // }
        // return res.status(200).send();
    },
    logout : function(req, res){
        req.session.destroy(function(err) {
            if(err) {
                console.log(err);
            } else {
                res.redirect(LOGIN_URL);
                res.end("logged out");

            }
        });
    }

};

