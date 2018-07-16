/** */
const FeedBack = require('./../models/FeedBack');

module.exports = {

    getAll:function(req,res){
        FeedBack.find({})
            .then((result) =>{
                console.log("DB")
                console.log(result)
                res.json(result)
            }).catch((err )=>{
            res.status(422).json(err);
        });
    },

    save: function(req, res) {
        console.log(req.body)
        FeedBack
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => { console.log(err) ;
                return res.status(422).json(err)});
    },


    getById:function (req,res) {
        FeedBack.findById(req.params.id)
            .then((data) =>{
                console.log(data);
                res.json(data)
            }).catch((err )=>{
            res.status(422).json(err);
        });
    },

    update: function(req, res) {
        FeedBack
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    },

    remove: function(req, res) {
        FeedBack
            .findById({ _id: req.params.id })
            .then(data => data.remove())
            .then(data => res.json(data))
            .catch(err => res.status(422).json(err));
    }

 };