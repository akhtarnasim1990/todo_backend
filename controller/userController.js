const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

module.exports.userSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Invalid user email.");
    }
    if (!password) {
      throw new Error("Invalid passsword.");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({ email: email, password: hashPassword });
    const userToken = jwt.sign({ email, id: newUser._id }, process.env.TOKEN_KEY, {
      expiresIn: "1d",
    });
    newUser.tokens = [...newUser.tokens, userToken];
    newUser.save().then((result) => {
      res.status(200).send({ message: "User created successfully.", success: true });
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

module.exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      throw new Error("Invalid user email.");
    }
    if (!password) {
      throw new Error("Invalid passsword.");
    }
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("User not found.");
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error("Either user email or password is invalid.");
      } else {
        const userToken = jwt.sign({ email, id: user._id }, process.env.TOKEN_KEY, {
          expiresIn: "1d",
        });
        user.tokens = [...user.tokens, userToken];
        user.save().then((result) => {
          if (result) {
            res.status(200).json({ message: "User successfully logged in.", data: userToken, success: true });
          } else {
            throw new Error("Server error.");
          }
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

module.exports.logout = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    let user = await User.findById(req.user.id);
    user.tokens = user.tokens.filter((tok) => tok !== token);
    user.save().then((response) => {
      if (response) {
        res.status(200).json({ message: "logout successfully", success: true });
      } else {
        throw new Error("Server error.");
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

module.exports.logoutAll = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    let user = await User.findById(req.user.id);
    user.tokens = [];
    user.save().then((response) => {
      if (response) {
        res.status(200).json({ message: "logout all successfully", success: true });
      } else {
        throw new Error("Server error.");
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};
