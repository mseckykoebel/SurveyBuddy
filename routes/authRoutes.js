//// NOTE: route handlers associated with authentication ONLY
const passport = require("passport"); // need the passport npm module (orig)

// route handlers are being placed here
module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  // 2nd route handler
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"), // passpoer middleware
    // when a call comes to this function, redirect the person making the req
    // to another route inside the application
    (req, res) => {
      res.redirect("/surveys"); // redirect to the main page
    }
  );
  // 4th route handler, deals with logging out, requests made to this route
  // will log the user out and forward to the main page
  app.get("/api/logout", (req, res) => {
    req.logout(); // attahced to the request object by passport (kills the ID)
    res.redirect("/"); // redirect the user to the root of the app
    /*this presents an emptu page, or undefined, as there is no longer a logged
    in user. Essentially, it is destroyed by passport*/
  });
  // 3rd route handler (get request)
  // way in which we will decide if the user is signed into the application
  // this will respond with the user model, or it will not...thats how we decide
  app.get("/api/current_user", (req, res) => {
    res.send(req.user); // tests to make user if user has already done the flow
  });
};
