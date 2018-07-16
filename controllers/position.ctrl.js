const Position = require('./../models/Position');

module.exports = {
    getAll:function(req,res){
        Position.find({})
            .populate('qualifications')
            .then((result) =>{  res.json(result)})
            .catch((err )=>{ res.status(422).json(err);
        });
    },
    getActiveInActivePositions:function(req,res){
        Position.find({ isActive:req.query.isActive })
            .populate('qualifications')
            .then((result) =>{  res.json(result)})
            .catch((err )=>{ res.status(422).json(err);
            });
    },
    create: function(req, res) {
        console.log(req.body);
        Position
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => { console.log(err) ;
                return res.status(422).json(err)});
    },
    getById:function (req,res) {
        Position.findById(req.params.id)
               .then((data) =>{ res.json(data)})
               .catch((err )=>{
            res.status(422).json(err);
        });
    },

    update: function(req, res) {
        console.log(req.body)
        Position
            .findOneAndUpdate({ _id: req.body.id }, req.body)
            .then(data => {res.json(data)})
            .catch(err => res.status(422).json(err));
    },

    remove: function(req, res) {
        Position
            .findById({ _id: req.body.id })
            .then(data => data.remove())
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    },

};