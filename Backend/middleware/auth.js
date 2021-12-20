// variable module npm token

const jwt = require("jsonwebtoken");

// logique de la creation du token

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    req.token = decodedToken;
    next();
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
