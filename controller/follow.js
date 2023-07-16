const express = require("express");
const { User } = require("../database/model");
const mongoose = require("mongoose");
const authenticate = require("../middleware/authenticate");
const { POST } = require("../database/model");

const followController = express.Router();

// to follow user
followController.put("/follow", authenticate, async (req, res) => {
    try {
      const followedUser = await User.findByIdAndUpdate(
        req.body.followId,
        {
          $push: { followers: req.user._id },
        },
        { new: true }
      );
  
      if (!followedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const currentUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        { new: true }
      );
  
      res.json(currentUser);
    } catch (err) {
      return res.status(422).json({ error: err });
    }
  });
  

// to unfollow user
followController.put("/unfollow", authenticate, async (req, res) => {
    try {
      const unfollowedUser = await User.findByIdAndUpdate(
        req.body.followId,
        {
          $pull: { followers: req.user._id },
        },
        { new: true }
      );
  
      if (!unfollowedUser) {
        return res.status(404).json({ error: "User not found" });
      }
  
      const currentUser = await User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.followId },
        },
        { new: true }
      );
  
      res.json(currentUser);
    } catch (err) {
      return res.status(422).json({ error: err });
    }
  });
  
module.exports = followController;
