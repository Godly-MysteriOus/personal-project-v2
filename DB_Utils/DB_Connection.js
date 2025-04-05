const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../utils/Logger/logger');

exports.dbURI = {
    connectionURI : config.dbConnectionURI,
}
exports.devDBConnection = (app,PORT) =>{
    mongoose.connect(exports.dbURI.connectionURI)
    .then(()=>app.listen(PORT))
    .then(()=>{
        logger.info('Connection Successfull');
    })
    .catch(err=>{
        console.log(err.stack);
    });
};
