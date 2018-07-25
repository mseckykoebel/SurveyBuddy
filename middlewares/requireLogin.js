// wired to a very specific route
module.exports = (req, res, next) => {
  if (!req.user) {
    return res
      .status(401)
      .send({ error: "You must first log in to access this feature" });
  }
  // if the user does exist, allow the request to continue to the next middleware
  next();
};
