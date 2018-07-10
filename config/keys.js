// keys.js -> figure out which set of credentials to return via. logic

// on the local machine, should always fall into the else case
if (process.env.NODE_ENV === "production") {
  // we are in production, return the production keys
  module.exports = require("./prod");
} else {
  // we are in development, return the development keys
  module.exports = require("./dev");
}

// in both cases, re assign it to module.exports
