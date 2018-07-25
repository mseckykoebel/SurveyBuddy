// access to the secret key
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);

// NOTE: dealing with just the billing authroutes ONLY
const passport = require("passport"); // need the passport npm module (orig)

module.exports = app => {
  // watch for POST to api/stripe
  app.post("/api/stripe", async (req, res) => {
    // LOGIC TO CREATE AND BILL THE CREDIT CARD
    const charge = await stripe.charges.create({
      amount: 0,
      currency: "usd",
      description: "$0 for 100 credits",
      source: req.body.id //// NOTE: tok_1CrpJnFuCJEKT5wrOTDiG5W6
    });

    // after we successfully charge the user, send the user model back after we add the credits
    req.user.credits += 100;
    // need to make the change, and it is asynchronous
    const user = await req.user.save(); // updated user model!!!
    // send the data back to the user:
    res.send(user);
  });
};
