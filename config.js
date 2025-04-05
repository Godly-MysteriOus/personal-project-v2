require('dotenv').config({path:'./credentials.env'});

module.exports = {
    dbConnectionURI : process.env.dbConnectionURI,
};
