const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connection = require('./DB_Utils/DB_Connection');
const csrf = require('csurf');
const csrfProtection = csrf();
const cors = require('cors');
const session = require('express-session');
const csurf = require('csurf');
const MongoDBStore = require('connect-mongodb-session')(session);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended:false}));
app.use(csrfProtection);
const store = new MongoDBStore({
    uri: dbURI.DB_Connections.DEV_URI,
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
app.use(cors({
    origin: '*', // Replace with your front-end URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow cookies if necessary
}));
app.use((req,res,next)=>{
    res.locals.csrfToken = req.csrfToken();
});

const signupAuthRoute = require('./routes/signupRoute');
const loginLogoutRoute = require('./routes/login_logout');
const sellerRoute = require('./routes/sellerRoute');
const customerRoute = require('./routes/customerRoute');

app.use('/signup',signupAuthRoute);
app.use('/customer',customerRoute);
app.use('/seller',sellerRoute);

connection.devDBConnection(app,2100);
