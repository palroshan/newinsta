const express = require('express')
const {User} = require('../database/model')
const {POST} = require("../database/model")

const router = express.Router();
router.get("/user/:id", async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id }).select("-password");
      
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      const posts = await POST.find({ postedBy: req.params.id })
        .populate("postedBy", "_id");
      
      res.status(200).json({ user, posts });
    } catch (err) {
      return res.status(422).json({ error: err });
    }
  });
  
module.exports = router;
