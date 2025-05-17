const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DB_Name = require('../DB_Utils/DBNames');
const newsLetter = new Schema({
    emailId:{
        type:'String',
        required:true,
    }
});

module.exports = mongoose.model(DB_Name.newsLetterDB,newsLetter,DB_Name.newsLetterDB);

