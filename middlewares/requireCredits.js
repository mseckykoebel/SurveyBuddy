// middleware to check to see if the credits are suffucient

module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status(403).send({
      error:
        "You do not have enough credits to make another survey. Please purchase more to continue."});
  }
  // if the user does exist, allow the request to continue to the next middleware
  next();
};

// status code changed to 403 -> forbidden, not authorized to do what you're doing
