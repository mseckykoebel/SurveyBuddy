//  Schema file represewnting a recipient
// email and click property, boolean, true or false, if the
// email has clicked yes or no before

const mongoose = require("mongoose");
const { Schema } = mongoose;

// setting up the subdocument
const recipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

// exporting, not using the same as in other areas of mongoose
module.exports = recipientSchema;
