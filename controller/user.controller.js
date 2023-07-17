const express = require("express");
const { User } = require("../database/model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../key");
const authenticate = require("../middleware/authenticate");

const userController = express.Router();

userController.post("/signup", (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    res.status(422).json({
      error: "Please enter all the fields",
    });
  } else
    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({
        name,
        username,
        email,
        password: hashedPassword,
      });
      user
        .save()
        .then((user) => {
          res.json({
            message: "Successfully Registered",
          });
        })
        .catch((err) =>
          res.status(422).json({
            error: "User already exists with that email or username",
          })
        );
    });
});

userController.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({
      error: "Please enter all the fields",
    });
  } else {
    User.findOne({ email: email }).then((savedUser) => {
      if (!savedUser) {
        res.status(422).json({
          error: "User not found please register",
        });
      } else {
        bcrypt.compare(password, savedUser.password).then((match) => {
          if (match) {
            const token = jwt.sign({ _id: savedUser.id }, jwt_secret);
            const { _id, name, email, username } = savedUser;
            res.json({ token, user: { _id, name, email, username } });
            console.log({ token, user: { _id, name, email, username } });
          } else {
            return res.status(422).json({
              error: "Invalid password",
            });
          }
        });
      }
    });
  }
});

userController.post("/googleLogin", (req, res) => {
  const { email_verified, email, name, clientId, username, Photo } = req.body;
  if (email_verified) {
    User.findOne({ email: email }).then((savedUser) => {
      if (savedUser) {
        const token = jwt.sign({ _id: savedUser.id }, jwt_secret);
        const { _id, name, email, username } = savedUser;
        res.json({ token, user: { _id, name, email, username } });
        console.log({ token, user: { _id, name, email, username } });
      } else {
        const password = email + clientId;
        const user = new User({
          name,
          email,
          username,
          password: password,
          Photo,
        });

        user
          .save()
          .then((user) => {
            let userId = user._id.toString();
            const token = jwt.sign({ _id: userId }, jwt_secret);
            const { _id, name, email, username } = user;

            res.json({ token, user: { _id, name, email, username } });

            console.log({ token, user: { _id, name, email, username } });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  }
});

module.exports = userController;
