// Contains mongo model class for the survey
const mongoose = require("mongoose");
const { Schema } = mongoose;
const RecipientSchema = require("./Recipient");

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  // array of recipientSchema records
  recipients: [RecipientSchema], // when mongoose loads the surveys model
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  // reference to another insance of a user
  // tells mongoose that the user belongs to the right collection
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  dateSent: Date, // record the date sent and the latest time someone has voted
  lastResponded: Date // record the last time someone recorded a response
});

// Load into the mongoose library, pass in the name of the model class and the
// mame of the schema
mongoose.model("surveys", surveySchema);
