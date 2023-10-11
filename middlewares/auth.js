const jwt = require("jsonwebtoken");
require("dotenv").config();
module.exports.validateToken = (req, res, next) => {
  const token = req.headers["x-access-token"];
  try {
    if (!token) {
      throw new Error("No token provided.");
    }
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send({ message: error.message, success: false });
  }
};
