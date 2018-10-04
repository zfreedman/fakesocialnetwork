const bcrypt = require("bcryptjs");
const express = require("express");
const gravatar = require("gravatar");
const router = express.Router();

const User = require("../../models/User");

// @route   GET api/users/test
// @desc    tests post route
// @access  public
router.get("/test", (req, res) => {
  res.json({ msg: "users route works" });
});

// @route   POST api/users/register
// @desc    register user
// @access  public
router.post("/register", (req, res) => {
  // check if email exists already
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user !== null) {
        res.status(400).json({ email: "Email already exists" });
      } else {
        const body = req.body;
        const avatar = gravatar.url(body.email, {
          // default image
          d: "mm",
          // rating (movie ratings)
          r: "pg",
          // size
          s: "200",
        });

        const newUser = new User({
          avatar,
          email: body.email,
          name: body.name,
          pass: body.pass,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.pass, salt, (err, hash) => {
            if (err) throw err;
            
            newUser.pass = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch();
});

module.exports = router;
