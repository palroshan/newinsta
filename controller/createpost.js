const express = require('express')
const {User} = require('../database/model')
const mongoose = require('mongoose');
const authenticate = require('../middleware/authenticate');
const {POST} = require("../database/model")

const postController = express.Router();
postController.get("/allposts", authenticate, (req, res)=>{
    POST.find()
    .populate("postedBy", "_id name Photo")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then(posts=>res.json(posts))
    .catch(err => console.log(err))
})

postController.post('/createpost',authenticate, (req, res)=>{
    const {body, pic} = req.body;
    
    if(!pic || !body){
        return res.status(422).json({
            error: "Please enter all the fields"
        })
    }
    req.user
    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user
    })
    post.save().then((result)=>{
        return res.json({post:result})
    })
    .catch(err=>console.log(err))
})

postController.get("/myposts", authenticate, (req, res) => {
  const profile = {};

  const findPostsPromise = POST.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .exec();

  const findUserPromise = User.findById(req.user._id).exec();

  Promise.all([findPostsPromise, findUserPromise])
    .then(([myposts, user]) => {
      profile.myposts = myposts;
      profile.user = user;
      console.log(profile);
      res.json(profile);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Error retrieving data" });
    });
});


postController.put("/like", authenticate, (req, res)=>{
    POST.findByIdAndUpdate(req.body.postId, {
        $push:{like:req.user._id},
    }, {
        new: true
    })
    .populate("postedBy", "_id name Photo")
    .exec() // Remove the callback function
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
})

postController.put("/unlike", authenticate, (req, res)=>{
    POST.findByIdAndUpdate(req.body.postId, {
        $pull:{like:req.user._id},
    }, {
        new: true
    })
    .populate("postedBy", "_id name Photo")
    .exec() // Remove the callback function
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });
})

postController.put("/comment", authenticate, (req, res)=>{
    const comment = {
        comment: req.body.text,
        postedBy: req.user._id
    };
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },
        {new:true}
    )
    .populate("comments.postedBy", "_id name")
    .populate("postedBy", "_id name photo")
    .exec() // Remove the callback function
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(422).json({ error: err });
    });

})

postController.delete("/deletePost/:postId", authenticate, async (req, res) => {

  try {
    const post = await POST.findOne({ _id: req.params.postId })
      .populate("postedBy", "_id")
      
      .exec();

    if (!post) {
      return res.status(422).json({ error: "Post not found" });
    }

    if (post.postedBy._id.toString() === req.user._id.toString()) {
      console.log(req.user._id.toString())
      await post.deleteOne({_id: req.params.postId});
      return res.json({ message: "Successfully deleted" });
    }

    return res.status(403).json({ error: "Unauthorized" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

postController.get("/myfollowingpost", authenticate, (req, res)=>{
  POST.find({postedBy:{$in: req.user.following}})
  .populate("postedBy", "_id name Photo")
  .populate("comments.postedBy", "_id name")
  .then(posts=>res.json(posts))
  .catch(err=>console.log(err))
})

postController.put("/uploadProfilePic", authenticate, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $set: { Photo: req.body.pic } },
      { new: true }
    ).exec();

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(422).json({ error: err.message });
  }
});

  

module.exports = postController;