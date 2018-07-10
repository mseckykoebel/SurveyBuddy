// Associated with booting/starting the application
const express = require("express"); // importing in the express ibrary
const mongoose = require("mongoose"); // importing the mongoDB library
const cookieSession = require("cookie-session"); // imp. cppkieSession library
const passport = require("passport"); // tell pp to make use of cookies
const keys = require("./config/keys"); // require the imp. keys
require("./models/User"); // get data from User.js, the model class
require("./services/passport"); // get data from passport.js (executed when called)

// connecting to mongoDB
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // in miliseconds, 30 days
    keys: [keys.cookieKey]
  })
);

// make p.p. use cookies for authentication
app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
//http://localhost:5000/
app.listen(PORT);
