const express = require('express');
const dotenv = require("dotenv")
dotenv.config();

// const port = 8000;
const port = process.env.PORT || 8000;
const app = express();
const path = require('path');
const baseRoute = require('./routes');
const { urlencoded } = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const db = require('./configs/mongoose');
const expressSession = require("express-session");
const passport = require("passport");
const passportLocal = require('./configs/passport-local-strategy');
const flash = require('connect-flash')


app.use(flash());

app.set('view engine','ejs');
app.set('views', path.join(__dirname, '/views'))

app.use(expressLayouts);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"/assets")));

//set up the express session
app.use(expressSession({
    name:"SaneBlogger",
    secret:"Something",
    resave:false,
    saveUninitialized:false
}))
//initialize the passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/',baseRoute)

app.listen(port,(error)=>{
    if(error){
        console.log(`Error : ${error}`);
        return;
    }
    console.log(`Server is up & running on Port : ${port}`);
})