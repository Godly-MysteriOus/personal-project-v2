const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const csrfProtection = csrf();

const connection = require('./DB_Utils/DB_Connection');
const limiter = require('./utils/RateLimiter/rateLimiter');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(limiter);
app.use(express.static(path.join(__dirname,'public')));
const store = new MongoDBStore({
    uri: connection.dbURI.connectionURI,
    collection: 'sessions'
});
app.use(    
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie:{maxAge:3*60*60*1000},
    }),
);
app.use(csrfProtection);
app.use(cors({
    origin: '*', // Replace with your front-end URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow cookies if necessary
}));
app.use((req,res,next)=>{
    res.locals.csrfToken = req.csrfToken();
    next();
});

// const signupAuthRoute = require('./routes/signupRoute');
// const loginLogoutRoute = require('./routes/login_logout');
// const sellerRoute = require('./routes/sellerRoute');
// const customerRoute = require('./routes/customerRoute');

// app.use('/signup',signupAuthRoute);
// app.use('/customer',customerRoute);
// app.use('/seller',sellerRoute);
app.use((req,res,next)=>{
    res.render('homePage');
});
connection.devDBConnection(app,2100);
