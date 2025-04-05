require('dotenv').config({path:'./credentials.env'});

module.exports = {
    DevDBConnection : process.env.devDBURI,
    TestDBConnection: '',
    ProdDBConnection: '',
};
