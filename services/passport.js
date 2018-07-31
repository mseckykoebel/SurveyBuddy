const mongoose = require("mongoose");
const User = mongoose.model("users"); // model class
// creates new instance of the passport strategy via an object, give to G.strat

const passport = require("passport"); // imports the passport library
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys"); // keys object, pass to google strat.

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
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });

      if (existingUser) {
        return done(null, existingUser);
      }

      // creates mong. model instance if the user does not exist
      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);

// July 20 -> refactored with async/await syntax
