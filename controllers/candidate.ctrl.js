/** */
const mongoose = require('mongoose');
const Candidate = require('./../models/Candidate');
const bcrypt = require('bcrypt');
var fs = require('fs');
var emailService = require('./emailService');

module.exports = {
    getAll:function(req,res){
        Candidate.find({})
                 .populate('appliedPositions.position')
                 .populate('profile.qualifications')
                 .populate('appliedPositions.interview.interviewedBy')
                 .then((result) =>{ res.json(result) })
                 .catch((err )=>{
                                    res.status(422).json(err);
                                 });
    },
    getAllByPosition:function(req,res) {
        console.log(req.query.id);
        Candidate.find({})
            .then((result) => {
                let newRes = result.filter((candidate) => {
                    if (candidate.appliedPositions) {
                        return candidate.appliedPositions.find(appliedPosition => {
                            console.log(appliedPosition.position, req.query.id, appliedPosition.position == req.query.id, "<<---")
                            return appliedPosition.position == req.query.id;
                        })
                    } else {
                        return false;
                    }

                });

                return res.json(newRes);
                })
                .catch((err )=>{
                    res.status(422).json(err);
                });
    },
    getAllPassedByPosition:function(req,res) {
        console.log(req.query.id);
        Candidate.find({})
            .then((result) => {
                let newRes = result.filter((candidate) => {
                    if (candidate.appliedPositions) {
                            return candidate.appliedPositions.find(appliedPosition => {
                                if(appliedPosition.interview){
                                    console.log(appliedPosition.interview)
                                }
                                console.log(appliedPosition.position, appliedPosition.interview.passed,
                                           appliedPosition.interview.comment,req.query.id,
                                           appliedPosition.position == req.query.id, "<<---")
                                return appliedPosition.position == req.query.id;
                            })

                    } else {
                        return false;
                    }

                });

                return res.json(newRes);
            })
            .catch((err )=>{
                res.status(422).json(err);
            });
    },
    create: function(req, res) {

        const {firstName,lastName,DOB,
            telephone,email,street,city,country,zip,
            userName,password,gender,
            yearsOfExperience, selectedQualifications} = req.body;
        const  {mimetype , originalname , buffer}= req.file;
        let candidateObj = {};
        candidateObj.account = {userName : userName ? userName : "" , password : password  ? password : ""};
        candidateObj.firstName = firstName;
        candidateObj.lastName  = lastName ;
        candidateObj.gender    = gender ? gender : "M";
        candidateObj.dob = DOB;
        candidateObj.contact ={telephone:telephone,
                               email:email,
                                address:{
                                         street:street,
                                          city:city,
                                          country:country,
                                            zip:zip
                                  }};


        candidateObj.profile = {
                                   yearsOfExperience:yearsOfExperience,
                                   qualifications:selectedQualifications,
                                    resume : {
                                                data : buffer ,
                                                contentType : mimetype
                                              }
                                };

        Candidate
            .create(candidateObj)
            .then((result) => {
                                res.json(result);
                                emailService.mailOptions.to = email;
                                emailService.sendEmail();
            })
            .catch(err => { console.log(err) ;
                return res.status(422).json(err)});

    },
    getById:function (req,res) {
        console.log("getById cotroller");
        Candidate.findById(req.query.id)
            .populate('appliedPositions.position')
            .populate('profile.qualifications')
            .populate('appliedPositions.interview.interviewedBy')
            .then((result) =>{
                // res.contentType(result.profile.resume.contentType);
                // res.send(result.profile.resume.data);
                console.log(result);
                 res.json(result)
            }).catch((err )=>{
            res.status(422).json(err);
        });
    },
    getResumeById:function (req,res) {
        console.log("getById cotroller");
        Candidate.findById(req.query.id)
            .populate('appliedPositions.position')
            .populate('profile.qualifications')
            .populate('appliedPositions.interview.interviewedBy')
            .then((result) =>{
                 res.contentType(result.profile.resume.contentType);
                 res.send(result.profile.resume.data);
                //console.log(result);
                //res.json(result)
            }).catch((err )=>{
            res.status(422).json(err);
        });
    },
    getResumeById:function (req,res) {
        console.log("getById cotroller");
        Candidate.findById(req.query.id)
            .populate('appliedPositions.position')
            .populate('profile.qualifications')
            .populate('appliedPositions.interview.interviewedBy')
            .then((result) =>{
                res.contentType(result.profile.resume.contentType);
                res.send(result.profile.resume.data);
                // console.log(result);
                //  res.json(result)
            }).catch((err )=>{
            res.status(422).json(err);
        });
    },
    getByIdFeedback:function (req,res) {
        console.log("getById cotroller");
        Candidate.findById(req.query.id)
            .populate('appliedPositions.position')
            .populate('profile.qualifications')
            .populate('appliedPositions.interview.interviewedBy')
            .then((result) =>{
                // res.contentType(result.profile.resume.contentType);
                // res.send(result.profile.resume.data);
                // console.log(result);
                res.json(result)
            }).catch((err )=>{
            res.status(422).json(err);
        });
    },

    update: function(req, res) {
        Candidate
            .findOneAndUpdate({ _id: req.body.id }, req.body)
            .then((result) => res.json(result))
            .catch(err => res.status(422).json(err));
    },
    applyForPosition: function(req, res) {
         const {id, positionId } = req.body;
        Candidate.findOne({_id: id}, function (err, candidate) {

            if(candidate && candidate.appliedPositions) {
                let isAppliedfor = candidate.appliedPositions.find(
                    (appliedPosition) => {
                        return appliedPosition.position == positionId;
                    });

                if (!isAppliedfor) {
                    //push and save
                    candidate.appliedPositions.push({position: positionId});
                    console.log(candidate);
                    candidate.save(function (err) {
                        if (err) {
                            //TODO: error while saving
                        } else {
                            //TODO: saved
                        }
                    })


                } else {
                    //TODO: position is already applied for
                }
            } else  if (candidate){

                candidate.appliedPositions = {position: positionId};
                candidate.save(function (err) {
                    if (err) {
                        //TODO: error while saving
                    } else {
                        //TODO: saved
                    }
                })
            } else {
                //TODO: candidate not found
            }

            //
            // user.save(function (err) {
            //     if(err) {
            //         console.error('ERROR!');
            //     }
            // });
        });

        // Candidate
        //     .findOneAndUpdate({ _id: req.params.id }, req.body)
        //     .then(data => res.json(data))
        //     .catch(err => res.status(422).json(err));
    },
    addFeedbackForPosition: function(req, res) {
        console.log("am here ");
        const { candidateId , positionId, interviewedBy, interviewedOn, comment, passed, interviewType } = req.body;
        console.log(req.body);
        Candidate.findOne({_id: candidateId }, function (err, candidate) {

            if(candidate && candidate.appliedPositions) {
                let appliedPositionIndex = -1;
                let isAppliedfor = candidate.appliedPositions.find(
                    (appliedPosition, index) => {
                        if( appliedPosition.position == positionId ){
                            appliedPositionIndex = index;
                            return true;
                        }
                    });

                console.log(candidate.appliedPositions[appliedPositionIndex], "<<");
                if (isAppliedfor && candidate.appliedPositions[appliedPositionIndex].interview ) {
                    //push and save
                    let interviewIndex = -1;
                    candidate.appliedPositions[appliedPositionIndex].interview.find( (interview, index) => {
                        console.log(interview.interviewType == interviewType, interview.interviewType, interviewType);

                        if (interview.interviewType == interviewType) {
                            interviewIndex = index;
                            return true;
                        }
                    });
                    console.log(candidate.appliedPositions[appliedPositionIndex].interview.interviewType);
                    if( interviewIndex === -1 ) {
                        // this fed back doesnt exist so we add it, i.e. push
                        candidate.appliedPositions[appliedPositionIndex].interview.push({
                                                                                            interviewedBy,
                                                                                            interviewedOn,
                                                                                            comment,
                                                                                            passed,
                                                                                            interviewType
                                                                                        });


                    }else {
                        candidate.appliedPositions[appliedPositionIndex].interview[interviewIndex] = {
                                                                                                        interviewedBy,
                                                                                                        interviewedOn,
                                                                                                        comment,
                                                                                                        passed,
                                                                                                        interviewType
                                                                                                    };



                        console.log("Aleady commented for, try replacing that feedback");
                    //TODO:interview is already commented for , but we can still can update with the same results
                }
                    //save in both cases
                    candidate.save(function (err) {
                        if (err) {
                            //TODO: error while saving
                        } else {
                            //TODO: saved
                        }
                    })

                }else {
                    //TODO: applied Position interview  DOES NOT EXIST , create new one

                    if(appliedPositionIndex !== -1) {
                        candidate.appliedPositions[appliedPositionIndex].interview = [{
                            interviewedBy,
                            interviewedOn,
                            comment,
                            passed,
                            interviewType
                        }];

                        candidate.save(function (err) {
                            if (err) {
                                //TODO: error while saving
                            } else {
                                //TODO: saved
                            }
                        })
                    } else {
                        // not applied for this position and hence cannot give feedback
                    }
                }
            }
            // else  if (candidate.appliedPositions){

                // candidate.appliedPositions.interview = req.body;
                // candidate.save(function (err) {
                //     if (err) {
                        //TODO: error while saving
                    // } else {
                        //TODO: saved
                    // }
                // })
            // } else {
                //TODO: candidate.appliedPositions not found
            // }

            //
            // user.save(function (err) {
            //     if(err) {
            //         console.error('ERROR!');
            //     }
            // });
        });

        // Candidate
        //     .findOneAndUpdate({ _id: req.params.id }, req.body)
        //     .then(data => res.json(data))
        //     .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        Candidate
            .findById({ _id: req.params.id })
            .then((result) => result.remove())
            .then((result) => res.json(result))
            .catch(err => res.status(422).json(err));
    },
    getAppliedPositions: async(req,res,next) => {
        const {candidateId} = req.params;
        const candidate = Candidate.findById(candidateId);
        console.log('candidate',  candidate);
    },
    newCandidateApplication: async (req,res, next) => {
        const {candidateId} = req.params;
        //creating new Position
        const newPosition = new Position(req.body);
        //Get the Candidate Object
        const candidate = await Candidate.findById(candidateId);

        //save Position
        await newPosition.save();

        //assign position to the candidate (Since multiple is an option TODO:// use push)
        candidate.positions.push(newPosition);
        //save Candidate
        await candidate.save();
        //201 Data Created
        res.status(201).json(candidate)
    },
    registerAccount : async (req, res) => {
        const {
            account : {userName, password},
            firstName, lastName, gender, dob,
            contact: {telephone, email, address, street, city, country, zip}
        } =  req.body;

        // const saltPassword = bcrypt.hashSync("asdsa",128);
        bcrypt.hash(password, 10, function (err, saltPassword) {
            // Store hash in database
            const candidateObj = {
                account: {userName, password : saltPassword},
                firstName, lastName, gender, dob,
                contact: {telephone, email, address, street, city, country, zip}
            };
            Candidate
                .create(candidateObj)
                .then((result) => res.json(result))
                .catch(err => {
                    res.status(422).json(err)
                });
        });


    }
    // getPassedCandidate:function(req,res){
    //     Position.find({ isActive:req.query.isActive })
    //         .then((result) =>{  res.json(result)})
    //         .catch((err )=>{ res.status(422).json(err);
    //         });
    // },
};


