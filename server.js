const express = require('express');
const app = express();
const passport = require('passport');
const GoogleStratery = require('passport-google-oauth20');
const keys = require('./config/keys')

passport.use(
new GoogleStratery(
    {
clientID: keys.googleCilentID,
clientSecret: keys.googleClientSecret,
callbackURL:'/auth/google/callback'

    }, 
    (accessToken, profile)=>{
        console.log(accessToken);
        console.log(profile);
    }
)
)

app.get('/auth/google', passport.authenticate('google',{
    scope:['email', 'profile']
}));

app.get('/auth/google/callback', passport.authenticate('google'));




const PORT = process.env.PORT || 5000;
app.listen(PORT);