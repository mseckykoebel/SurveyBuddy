const passport = require("passport"); // need the passport npm module (orig)

// route handlers are being placed here
module.exports = function(app) {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  // 2nd route handler
  app.get("/auth/google/callback", passport.authenticate("google"));
  // 4th route handler, deals with logging out
  app.get("/api/logout", function(req, res) {
    req.logout(); // attahced to the request object by passport (kills the ID)
    res.send(req.user); // prove that they are no longer signed in (undefined)
    /*this presents an emptu page, or undefined, as there is no longer a logged
    in user. Essentially, it is destroyed by passport*/
  })
  // 3rd route handler (get request)
  app.get("/api/current_user", function(req, res) {
    res.send(req.user); // tests to make user if user has already done the flow
  });
};
