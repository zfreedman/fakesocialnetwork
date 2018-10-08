const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Post = require("../../models/Post");
const ppAuth = require("../passportAuth");
const validatePostInput = require("../../validation/post");


// @route   GET api/posts/test
// @desc    tests post route
// @access  public
// router.get("/test", (req, res) => {
//   res.json({ msg: "posts route works" });
// });

// @route   POST api/posts/
// @desc    create a post
// @access  private
router.post("/", ppAuth(), (req, res) => {
  const { errors, isValid } = validatePostInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { avatar, name, text, } = req.body;
  const newPost = new Post({
    avatar,
    name,
    text,
    user: req.user.id,
  });

  return newPost.save().then(post => res.json(post));
});

module.exports = router;
