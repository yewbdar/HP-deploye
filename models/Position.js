const mongoose = require('mongoose');


let PositionSchema = new mongoose.Schema(
    {
        title : String,
        qualifications : [  { type: mongoose.Schema.Types.ObjectId, ref: 'qualification' } ] ,
        skill : String,
        isActive : Boolean,
        createdOn : String,
        summary  : String
    }
);
module.exports = mongoose.model('position', PositionSchema);