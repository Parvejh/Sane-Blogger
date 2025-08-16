const express = require('express');
const dotenv = require("dotenv")
dotenv.config();
const path = require('path');

const app = express();
const port = process.env.PORT || 8000;

const baseRoute = require('./routes');
const expressLayouts = require('express-ejs-layouts');
const db = require('./configs/mongoose');
const expressSession = require("express-session");
const passport = require("passport");
const flash = require('connect-flash')
const { urlencoded } = require('body-parser');
const passportLocal = require('./configs/passport-local-strategy');

const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const MongoStore = require('connect-mongo');

// Security & performance middleware
app.use(helmet({
    contentSecurityPolicy:false,
}))
app.use(compression());
app.use(morgan('dev'));

// Body parsing
app.use(urlencoded({extended:true}));

// Static
app.use(express.static(path.join(__dirname,"/assets")));

// Session
app.use(expressSession({
    name:"SaneBlogger",
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        httpOnly:true,
        sameSite:'lax',
        secure:false,
        maxAge:1000*60*60*24*7
    }
}))

// Flash & Layour
app.use(flash());
app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// Expose flash globally
app.use((req,res,next)=>{
    res.locals.flash = {
        success:req.flash('success'),
        error:req.flash('error')
    }
    next();
})

//initialize the passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Gentle rate limits on auth endpoints 
const authLimiter = rateLimit({
    windowMs: 60*1000,
    limit:20,
})
app.use('/user/createSessoin',authLimiter);
app.use('/user/registerUser',authLimiter);


// Routes
app.use('/',baseRoute)

// 404
app.use((req,res)=>{
    res.status(404).render('not_found',{title:'Not Found | Sane Blogger'})
})

app.listen(port,(error)=>{
    if(error){
        console.log(`Error : ${error}`);
        return;
    }
    console.log(`Server is up & running on Port : ${port}`);
})