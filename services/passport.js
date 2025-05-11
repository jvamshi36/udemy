const passport = require('passport');
const GoogleStratery = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');
const keys = require('../config/keys');

passport.use(
 new GoogleStratery(
    {
        clientID : keys.googleCilentID,
        clientSecret : keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile)=> {
     new User({googleId : profile.id}).save();
    }
 )
);