const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

passport.use(new LocalStrategy(
    {usernameField:"email"},
        async function(email, password, done){
            //find a user and establish the identity
            const user = await User.findOne({email:email});
            if(!user || user.password != password){
                console.log("invalid username/password")
                return done(null,false)
            }
            //if validation is OK
            return done(null,user);     //done take two arguments, first is the error ( null if ther is no error) & second is true or false based on validation
            //This returns the found user to the serialize function
        }
))

// Serialize user into the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {

    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('back');
}

passport.setAuthenticatedUser = function(req,res,next){
    
    //even if the user is authenticated/ logged in , the data of the user is not available in the locasl but in the cookie ( req.user)
    // So, we transger the data from passport to the locals
    // req.user contais the current signed in user from the session cookie and we are just sending this to the locals for views
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport