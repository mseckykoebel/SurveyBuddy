const passport = require("passport"); // imports the passport library
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys.js"); // keys object, pass to google strat.
const mongoose = require("mongoose");

const User = mongoose.model("users"); // model class
// creates new instance of the passport strategy via an object, give to G.strat

////////
passport.serializeUser((user, done) => {
  done(null, user.id); // done is a callback after we have done work
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
/////////

//////// Google Strategy ////////
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL:"/auth/google/callback",
      proxy: true
    },
    //called when the user is sent back to the server
    (accessToken, refreshToken, profile, done) => {
      // finnd foirst record inside collection with title profileID
      // returns a promise (w/ async. code)
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          // already have a record with the given profileID
          // no err object 1st, and user record 2nd
          done(null, existingUser);
        } else {
          // we dont have a user with this ID, and we have to make a new one
          // dont want to call done unless we know for sure that user has been
          // saved to the database
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user));
          // saves the record (model instance) and saves to the database
        }
      });
    } // the line that takes in the toke, the refresh, the profile, and
    // the done function with the two arguments
  )
);
