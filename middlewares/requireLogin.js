// wired to a very specific route
// allow the user to be logged in
// reused in other areas, such as the api/surveys route handler
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must log in first!" });
  }
  // if the user does exist, allow the request to continue to the next middleware
  next();
};
