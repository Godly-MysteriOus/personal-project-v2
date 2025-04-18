const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrfProtection = require(path.join(__dirname,'middleware','CSRF','csrfProtection.js'));
const connection = require(path.join(__dirname,'DB_Utils','DB_Connection.js'));
const cookieParser = require('cookie-parser');
const logger = require('./utils/Logger/logger');
const app = express();

//setting up UI Engine and pickup files
app.set('view engine', 'ejs');
app.set('views', 'views');

// Setting up CORS policies
app.use(cors({
    origin: '*', // Replace with your front-end URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow cookies if necessary
}));

app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

//setting up session db
const store = new MongoDBStore({
    uri: connection.dbURI.connectionURI,
    collection: 'sessions'
});

//creating session
app.use(    
    session({
        secret: config.sessionSecretKey,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie:{maxAge:3*60*60*1000},
    }),
);

//fetching user obj when user is authenticated to carry out all the CRUD operations
app.use((req,res,next)=>{
    if(req.session){
        if(req.session.roleId==1){

        }else if(req.session.roleId==2){

        }else if(req.session.roleId==3){

        }
    }
    next();
});

//setting up local variables
app.use((req,res,next)=>{
    res.locals.csrfToken = req.csrfToken();
    next();
});
app.get('/csrf-token',csrfProtection,(req,res,next)=>{
    const token = req.csrfToken();
    res.cookie('XSRF-TOKEN', token);
    return res.status(200).json({
        csrfToken: token,
    });
});
// const signupAuthRoute = require('./routes/signupRoute');
// const loginLogoutRoute = require('./routes/login_logout');
// const sellerRoute = require('./routes/sellerRoute');
// const customerRoute = require('./routes/customerRoute');

// app.use('/signup',signupAuthRoute);
// app.use('/customer',customerRoute);
// app.use('/seller',sellerRoute);
app.use('/',(req,res,next)=>{
    res.render('homePage');
});

connection.DBConnection(app,process.env.PORT|| 2100);
app.use((err,req,res,next)=>{
    logger.error(err.message);
    return res.status(404).render('404Page');
});
