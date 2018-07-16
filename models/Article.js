const mongoose = require('mongoose');

let ArticleSchema = new mongoose.Schema(
    {
        id:   String,
        text: String,
        title: String
    }
);
module.exports = mongoose.model('article', ArticleSchema);