const bcrypt = require("bcryptjs");
const express = require("express");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

const jwtSecret = require("../../config/keys").jwtSecret;
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    tests post route
// @access  public
router.get("/test", (req, res) => {
  res.json({ msg: "users route works" });
});

// @route   GET api/users/current
// @desc    current user profile
// @access  private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { avatar, email, id, name, } = req.user;
    res.json({ avatar, email, id, name });
  }
);

// @route   POST api/users/login
// @desc    login user returning JWT
// @access  public
router.post("/login", (req, res) => {
  const { email, pass } = req.body;

  // find user by email
  User.findOne({ email }).then(user => {
    if (user === null) {
      // not found
      return res.status(404).json({ email: "User not found" });
    }

    // check pass against hashed
    bcrypt.compare(pass, user.pass).then(isMatch => {
      if (!isMatch)
        return res.status(400).json({ pass: "Pass incorrect" });
      
        // generate token
      // return res.json({ msg: "success" });
      const { avatar, id, name } = user;
      const payload = { avatar, id, name };

      jwt.sign(
        payload, jwtSecret, { expiresIn: 3600 }, (err, token) => {
          res.json({
            success: true,
            token: `Bearer ${token}`,
          })
        }
      );
    });
  });
});

// @route   POST api/users/register
// @desc    register user
// @access  public
router.post("/register", (req, res) => {
  const { email, name, pass } = req.body;

  // check if email exists already
  User.findOne({ email }).then(user => {
    if (user !== null) {
      return res.status(400).json({ email: "Email already exists" });
    }
    
    const avatar = gravatar.url(email, {
      // default image
      d: "mm",
      // rating (movie ratings)
      r: "pg",
      // size
      s: "200",
    });

    const newUser = new User({
      avatar,
      email,
      name,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(pass, salt, (err, hash) => {
        if (err) throw err;
        
        newUser.pass = hash;
        newUser.save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

module.exports = router;
