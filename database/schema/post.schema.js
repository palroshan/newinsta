const mongoose = require("mongoose");
// const { Schema } = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const User = require("../model/user.model");

const postSchema = new mongoose.Schema({
  body: {
    unique: true,
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  like: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      comment:{type:String},
      postedBy:{
        type: ObjectId,
        ref: "User"
      }
    }
  ],
  postedBy: {
    type: ObjectId,
    ref: "User",
  },
}, {timestamps: true});

module.exports = postSchema;
