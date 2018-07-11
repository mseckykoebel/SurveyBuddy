const passport = require("passport"); // imports the passport library
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys"); // keys object, pass to google strat.
const mongoose = require("mongoose");

const User = mongoose.model("users"); // model class
// creates new instance of the passport strategy via an object, give to G.strat

////////
passport.serializeUser((user, done) => {
  done(null, user.id); // done is a callback after work has been done
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
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    //called when the user is sent back to the server
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleId: profile.id }).then(existingUser => {
        if (existingUser) {
          done(null, existingUser);
        } else {
          new User({ googleId: profile.id }) // creates mong. model instance
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
