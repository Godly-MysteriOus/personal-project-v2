const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DB_Names= require('../DB_Utils/DBNames');

const UserQueriesDB = new Schema({
    emailId : {type:String,required:true},
    mobileNo : {type:Number,required:true},
    message: {type:String, required:true},
    raisedTime : {type:Date,required:true},
    status: {type:String,enum:['NEW','IN PROGRESS','RESOLVED','NOT RESOLVED']},
});

module.exports = mongoose.model(DB_Names.userQueriesDB,UserQueriesDB,DB_Names.userQueriesDB);