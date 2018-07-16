const mongoose = require('mongoose');

let FeedBackSchema= new mongoose.Schema(
    {

        interviewedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'employee'},
        interviewedOn: Date,
        comment: String,
        passed: Boolean,
        interviewType: String

    }
);
module.exports = mongoose.model('feedback', FeedBackSchema);