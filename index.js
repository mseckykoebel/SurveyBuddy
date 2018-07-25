// Associated with booting/starting the application
const express = require("express"); // importing in the express ibrary
const mongoose = require("mongoose"); // importing the mongoDB library
const cookieSession = require("cookie-session"); // imp. cookieSession library
const bodyParser = require("body-parser"); // require that body parser thing
const passport = require("passport"); // tell pp to make use of cookies
const keys = require("./config/keys"); // require the imp. keys
require("./models/User"); // get data from User.js, the model class
require("./services/passport"); // get data from passport.js (executed when called)

// connecting to mongoDB
mongoose.Promise = global.Promise;
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

// return a funciton, calling with the express app object
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// this is to fix the app lmao
