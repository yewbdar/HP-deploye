const mongoose = require('mongoose');

let SampleSchema = new mongoose.Schema(
    {
        id:   String,
        jobTitle: String,
        hubId: String
    }
);
module.exports = mongoose.model('sample', SampleSchema);