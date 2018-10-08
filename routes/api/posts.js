const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const ppAuth = require("../passportAuth");
const validateCommentInput = require("../../validation/comment");
const validatePostInput = require("../../validation/post");


// @route   GET api/posts/test
// @desc    tests post route
// @access  public
// router.get("/test", (req, res) => {
//   res.json({ msg: "posts route works" });
// });

// @route   GET api/posts/
// @desc    fetch all posts
// @access  public
router.get("/", (req, res) => {
  const errors = {};
  return Post.find().sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => {
      errors.noPostsFound = "There are no posts =(";
      return res.status(404).json(errors);
    });
});

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

// @route   POST api/posts/comments/:post_id
// @desc    comment on a post
// @access  private
router.post("/comments/:post_id", ppAuth(), (req, res) => {
  const { avatar, name, text, } = req.body;
  const newComment = {
    avatar,
    name,
    text,
    user: req.user.id,
  };

  const { errors, isValid } = validateCommentInput(newComment);
  if (!isValid) return res.status(400).json(errors);

  return Post.findById(req.params.post_id).then(post => {
    // add to comments array
    post.comments.push(newComment);

    // save
    return post.save().then(post => res.json(post));
  })
  .catch(err => {
    errors.noPostFound = "No post found with that id";
    return res.status(404).json(errors);
  });
});

// @route   DELETE api/posts/comments/:post_id
// @desc    delete comment from post
// @access  private
router.delete(
  "/comments/:post_id/:comment_id", ppAuth(), (req, res) => {
  const errors = {};
  // comment/post IDs
  const { comment_id, post_id } = req.params;

  return Post.findById(post_id).then(post => {
    // check if comment exists
    const { comments } = post;
    const cIndex = comments.findIndex(
      c => String(c._id) === comment_id
    );

    // remove comment if found
    if (cIndex === -1) {
      errors.noComment = "This post does not contain a comment with" +
        " the specified ID";
      return res.status(404).json(errors);
    }

    const commenter = String(comments[cIndex].user._id);
    const poster = String(post.user);
    const currUser = req.user.id;
    // console.log("Commenter: " + commenter);
    // console.log("Poster: " + poster);
    // console.log("Current user: " + currUser);

    // check if current user is poster or commenter
    if (currUser !== poster && currUser !== commenter) {
      errors.unauthorizedDelete = "Only the post/comment owner can" + 
        " delete this comment";
      return res.status(404).json(errors);
    }

    comments.splice(cIndex, 1);
    return post.save().then(post => res.json({ success: true }));

    // save
    // return post.save().then(post => res.json(post));
  })
  .catch(err => {
    errors.noPostFound = "No post found with that id";
    return res.status(404).json(errors);
  });
});

// @route   DELETE api/posts/:id
// @desc    delete a post by ID
// @access  private
router.delete("/:id", ppAuth(), (req, res) => {
  const errors = {};

  return Profile.findById(req.user.id).then(profile => {
    return Post.findById(req.params.id).then(post => {
      // ensure owner of post is attempting to delete
      if (String(post.user) !== req.user.id) {
        // unauthorized status
        errors.notAuthorized = (
          "You are not authorized to delete this post"
        );
        return res.status(401).json(errors);
      }

      return post.remove().then(() => res.json({ success: true }));
    })
    .catch(err => {
      errors.noPostFound = "No post found with that id";
      return res.status(404).json(errors);
    });
  });
});

// @route   GET api/posts/:id
// @desc    fetch a single post by id
// @access  public
router.get("/:id", (req, res) => {
  const errors = {};

  return Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => {
      errors.noPostFound = "No post found with that id";
      return res.status(404).json(errors);
    });
});

// @route   POST api/posts/likes/:id
// @desc    like a post
// @access  private
router.post("/likes/:post_id", ppAuth(), (req, res) => {
  const errors = {};

  return Profile.findById(req.user.id).then(profile => {
    return Post.findById(req.params.post_id).then(post => {
      const { likes } = post;

      const likeIndex = likes.findIndex(
        like => String(like.user) === req.user.id
      );
      const alreadyLiked = likeIndex !== -1;

      // already liked
      if (alreadyLiked) {
        // unlike
        likes.splice(likeIndex, 1);
      }

      // hasn't liked
      else {
        // add like
        likes.push({ user: req.user.id });
      }
      return post.save().then(post => res.json(post));
    })
    .catch(err => {
      errors.noPostFound = "No post found with that id";
      return res.status(404).json(errors);
    });
  });
});

module.exports = router;
