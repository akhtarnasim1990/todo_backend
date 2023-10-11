var express = require("express");
var userRouter = express.Router();
const { validateToken } = require("../middlewares/auth");

const { userLogin, userSignUp, logout, logoutAll, userAuthentication } = require("../controller/userController");

/* GET users listing. */
userRouter.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

userRouter.post("/signup", userSignUp);
userRouter.post("/login", userLogin);
userRouter.get("/logout", validateToken, logout);
userRouter.get("/logoutAll", validateToken, logoutAll);
userRouter.get("/authentication", validateToken, userAuthentication);

module.exports = userRouter;
