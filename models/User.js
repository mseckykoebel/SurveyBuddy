//Contains mongoose model class
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const { Schema } = mongoose; in ES5, as mongoose object has a property

// schema describing what a user will look like
const userSchema = new Schema({
  googleId: String // tells schema anytime value on this prop., it is string
});

// our first model class!!!
mongoose.model("users", userSchema);
