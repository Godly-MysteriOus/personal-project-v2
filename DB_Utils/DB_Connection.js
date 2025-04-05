const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../utils/Logger/logger');
exports.devDBConnection = (app,PORT) =>{
    mongoose.connect(config.DevDBConnection)
    .then(()=>app.listen(PORT))
    .then(()=>{
        logger.info('Connection Successfull');
    })
    .catch(err=>{
        console.log(err.stack);
    });
};

exports.prodDBConnection = (app,PORT) =>{
    mongoose.connect(config.ProdDBConnection)
    .then(()=>app.listen(PORT))
    .then(()=>console.log('Connection  Successfull'))
    .catch(err=>{
        console.log(err.stack);
    });
}