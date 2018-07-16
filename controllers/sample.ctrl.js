/** */
const Sample = require('./../models/Sample');

module.exports = {
    getAll: (req, res) => {
        Sample.find({},'',function(err,docs){
            if(err)
                console.log("Error:", err);
            else
                res.send(docs);
        });
    }

};