/** */
const Article = require('./../models/Article');

module.exports = {
    getAll: (req, res) => {
        Article.find({},'',function(err,docs){
           if(err)
               console.log("Error:", err);
            else
               res.send(docs);
        });
    }

};