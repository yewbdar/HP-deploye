/** */
const mongoose = require('mongoose');
const Employee = require('./../models/Employee');

module.exports = {
    getAll:function(req,res){
        Employee.find({})
                .then((result) =>{res.json(result)})
                .catch((err )=>{ res.status(422).json(err);});
    },
    create: function(req, res) {
        const {firstName ,lastName , position , account : { userName  , password  } }  = req.body;
        console.log("recieved Employee",req.body);
        Employee
                .create({ firstName ,lastName , position , account : { userName  , password  } } )
                .then(dbModel => res.json(dbModel))
                .catch(err => { console.log(err) ;

        return res.status(422).json(err)});

    }
    // ,

    //
    // getById:function (req,res) {
    //     Candidate.findById(req.params.id)
    //         .then((data) =>{
    //             console.log(data);
    //             res.json(data)
    //         }).catch((err )=>{
    //         res.status(422).json(err);
    //     });
    // },
    //
    // update: function(req, res) {
    //     Candidate
    //         .findOneAndUpdate({ _id: req.params.id }, req.body)
    //         .then(data => res.json(data))
    //         .catch(err => res.status(422).json(err));
    // },
    //
    // remove: function(req, res) {
    //     Candidate
    //         .findById({ _id: req.params.id })
    //         .then(data => data.remove())
    //         .then(data => res.json(data))
    //         .catch(err => res.status(422).json(err));
    // },
    // getAppliedPositions: async (req,res,next) => {
    //     const {candidateId} = req.params;
    //     const candidate = Candidate.findById(candidateId);
    //     console.log('candidate',  candidate);
    // },
    // newCandidateApplication: async (req,res, next) => {
    //     const {candidateId} = req.params;
    //     //creating new Position
    //     const newPosition = new Position(req.body);
    //     //Get the Candidate Object
    //     const candidate = await Candidate.findById(candidateId);
    //
    //     //save Position
    //     await newPosition.save();
    //
    //     //assign position to the candidate (Since multiple is an option TODO:// use push)
    //     candidate.positions.push(newPosition);
    //     //save Candidate
    //     await candidate.save();
    //     //201 Data Created
    //     res.status(201).json(candidate)
    //     console.log('new Postions', newPosition);
    //
    // }

};