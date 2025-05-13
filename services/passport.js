const passport = require('passport');
const GoogleStratery = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

passport.serializeUser((user, done) =>{
done(null, user.id);
// _id -> 68209991d4911865319b0118 -> we are using this as the cookie
// googleId ->113383659823905830842
// user.id is extracted from the database, where we have id for the googleId to store
// so we are picking it up and using it as the cokkie;
});
passport.deserializeUser((id, done) => {
 User.findById(id)
 .then(user=>{
    done(null, user);
 })

// so, now we are finding the user with mongodb id, to get the user details, or whatever stuff
})

passport.use(
 new GoogleStratery(
    {
        clientID : keys.googleCilentID,
        clientSecret : keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done)=> {

        User.findOne({googleId:profile.id}).then((existingUser)=>{
            if(existingUser){
            // already user data is in our records, no need to create the new record
            done(null, existingUser);

            }
            else{
                // no record found with the google id, so need to create a new record 
                  new User({googleId : profile.id})
                  .save()
                   // save the user as new record
                  .then(user => done(null, user)); 
                  // after new record and the authentication then prompt no errors(null) for the newly added user
            }
        });
     
    }
 )
);