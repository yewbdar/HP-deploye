/** */
const mongoose = require('mongoose');
const Qualification = require('./../models/Qualification');

module.exports = {
    getAll:function(req,res){
        Qualification.find({})
            .then((result) =>{
                console.log(result);
                res.json(result) })
            .catch((err )=>{ res.status(422).json(err); });
    },
    create: function(req, res) {
        const { name } = req.body;
        Qualification
            .create({ name } )
            .then(dbModel => res.json(dbModel))
            .catch(err => { console.log(err) ;
                return res.status(422).json(err)});
    },
    getById:function (req,res) {
        Qualification.findById(req.params.id)
            .then((data) =>{res.json(data)})
            .catch((err )=>{
            res.status(422).json(err);
        });
    }
};