require('dotenv').config({path:'./credentials.env'});

module.exports = {
    devDBConnectionURI : process.env.devDBConnectionURI,
    prodDBConnectionURI : process.env.prodDBConnectionURI,
    sessionSecretKey:process.env.sessionSecretKey,
    hostURI : process.env.hostURI,
};
