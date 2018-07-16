/** */
const mongoose = require('mongoose');
const Candidate = require('./../models/Candidate');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
// const GridFsStorage = require('multer-gridfs-storage');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
var upload = multer({storage: storage});

module.exports = {

    uploadFile:function(req,res){

        Candidate.insertOne({'imagePath' : 'public/images/uploads/' + req.file.filename  }, (err, result) => {
            assert.equal(err, null);
        });
    }

};
