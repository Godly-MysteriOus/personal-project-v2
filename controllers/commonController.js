
const {validationResult} = require('express-validator');
const logger = require('../utils/Logger/logger');
const newsLetterDB = require('../models/newsLetter');
const userQueriesDB = require('../models/userQueries');
const mongoose = require('mongoose');
exports.postSubscriptionToNewsLetter = async(req,res,next)=>{
    logger.info('Inside postSubscriptionToNewsLetter method!!!');
    const error = validationResult(req);
    const {emailId} = req.body;
    if(!error.isEmpty()){
        logger.debug('Errors found while validating inputs.');
        return res.status(400).json({
            success:false,
            message: error.array()[0].msg,
        });
    }
    const transactionSession = await mongoose.startSession();
    try{
        transactionSession.startTransaction();
        const isAlreadySubscribed = await newsLetterDB.findOne({emailId:emailId});
        if(isAlreadySubscribed){
            logger.debug('Email Id already in subscription list');
            throw new Error('Already Subscribed');
        }
        const saveForSubscription = await newsLetterDB.create([{emailId:emailId}],{session:transactionSession});
        if(!saveForSubscription){
            logger.debug('Error creating entry to the database for news Letter subscription');
            throw new Error('Error subscribing to news letter');
        }
        await transactionSession.commitTransaction();
        await transactionSession.endSession();
        return res.status(200).json({
            success:true,
            message:'Successfully Subscribed.',
        });
    }catch(e){
        transactionSession.abortTransaction();
        transactionSession.endSession();
        let message = '';
        if(e.message=='Already Subscribed' || e.message=='Error subscribing to news letter'){
            message = e.message;
        }else{
            message = 'Error occoured, please try again!';
        };
        logger.debug('Error occoured while subscribing to news letter: '+message);
        logger.error(e.stack);
        return res.status(400).json({
            success:false,
            message:message,
        });
    }
}
function IndianStandardTime(){
    const nowUTC = new Date();
    let nowIST;
    if(nowUTC.toString().includes('Indian Standard Time')){
        nowIST = nowUTC;
    }else{
        nowIST = new Date(nowUTC.getTime()+(5.5*60*60*1000));
    }
    return nowIST;
}
exports.postUserQueries = async(req,res,next)=>{
    logger.info('Inside commonController file,postUserQueries method !!!');
    const {emailId,mobileNo,message} = req.body;
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error.array());
        return res.status(400).json({
            success:false,
            message : error.array()[0].msg,
        });
    }
    const transactionSession = await mongoose.startSession();
    try{
        transactionSession.startTransaction();
        const isSaved = userQueriesDB.create([{emailId:emailId,mobileNo:mobileNo,message:message,raisedTime:IndianStandardTime(),status:'NEW'}],{session:transactionSession});
        if(!isSaved){
            logger.debug('Raising Request Failed, error saving data into the database');
            throw new Error('Raising Request Failed');
        }
        await transactionSession.commitTransaction();
        await transactionSession.endSession();
        logger.info('Raised Request Successfully');
        return res.status(201).json({
            success:true,
            message : 'Query Raised Successfully',
        });
    }catch(err){
        await transactionSession.abortTransaction();
        await transactionSession.endSession();
        let message = '';
        if(err.message=='Raising Request Failed'){
            message = err.message;
        }else{
            message = 'Error Occoured while raising request';
        };
        logger.debug('Error in postUserQueries method !!! message : '+err.message);
        logger.debug(err.stack);
        res.status(400).json({
            success:false,
            message:message,
        });
    }
}