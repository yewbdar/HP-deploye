const mongoose = require('mongoose');

let QualificationSchema = new mongoose.Schema(
    {
        name: String
    });
module.exports = mongoose.model('qualification', QualificationSchema);