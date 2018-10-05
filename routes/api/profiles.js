const express = require("express");
const router = express.Router();

const isEmpty = require("../../validation/is-empty");
const ppAuth = require("../passportAuth");
const Profile = require("../../models/Profile");
// const User = require("../../models/User");
const validateProfileInput = require("../../validation/profile");

// @route   GET api/profiles/test
// @desc    tests post route
// @access  public
// router.get("/test", (req, res) => {
//   res.json({ msg: "profiles route works" });
// });

// @route   GET api/profiles/all
// @desc    get all profiles
// @access  public
router.get("/all", (req, res) => {
  const errors = {};
  
  Profile.find().populate("user", ["name", "avatar"]).then(profiles => {
    if (isEmpty(profiles)) {
      errors.noProfiles = "There are no profiles yet";
      return res.status(404).json(errors);
    }

    return res.json(profiles);
  }).catch(err => {
    errors.noProfiles = "There are no profiles";
    return res.status(404).json(errors);
  });
});

// @route   GET api/profiles/current
// @desc    current user profile
// @access  private
router.get("/current", ppAuth(), (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.user.id })
    .populate("user", ["name", "avatar"]).then(profile => {
      if (profile === null) {
        errors.noProfile = "There is no profile for this user";
        return res.status(404).json(errors);
      }

      return res.json(profile);
    }).catch(err => {
      errors.other = "Please try again"
      return res.status(404).json(errors);
    });
});

// @route   POST api/profiles/current
// @desc    create/edit a current user profile
// @access  private
router.post("/current", ppAuth(), (req, res) => {
  // use is obtained through passport jwt strategy middleware
  // used on private routes
  const { body, user } = req;

  // Iterate over all keys on request body
  // and add to profileFields
  const profileData = body.profile;
  const { errors, isValid } = validateProfileInput(profileData);

  if (!isValid) return res.status(400).json(errors);

  // handle users
  profileData.user = user.id;
  // handle skills
  profileData.skills = profileData.skills !== undefined
    ? profileData.skills.split(",")
    : [];

  Profile.findOne({ user: user.id }).then(profile => {
    // update
    if (profile !== null) {
      return Profile.findOneAndUpdate(
        { user: user.id }, { $set: profileData }, { new: true }
      ).then(profile => res.json(profile));
    }

    // create
    else {
      // check if handle exists
      return Profile.findOne({ handle: profileData.handle })
        .then(profile => {
          if (profile !== null) {
            errors.handle = "That handle already exists";
            // validation error
            return res.status(400).json(errors);
          }

          // save profile
          return (new Profile(profileData)).save().then(
            profile => res.json(profile)
          );
        });
    }
  });
});

// @route   GET api/profiles/handle/:handle
// @desc    get profile by handle
// @access  public
router.get("/handle/:handle", (req, res) => {
  const errors = {};
  const { handle } = req.params;
  Profile.findOne({ handle, }).populate("user", ["name", "avatar"])
    .then(profile => {
      if (profile === null) {
        errors.noProfile = "There is no profile for this handle";
        return res.status(404).json(errors);
      }

      return res.json(profile);
    }).catch(err => {
      errors.noProfile = "There is no profile for this user ID";
      return res.status(404).json(errors);
    });
});

// @route   GET api/profiles/user/:user_id
// @desc    get profile by user id
// @access  public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"]).then(profile => {
      if (profile === null) {
        errors.noProfile = "There is no profile for this user ID";
        return res.status(404).json(errors);
      }

      return res.json(profile);
    }).catch(err => {
      errors.noProfile = "There is no profile for this user ID";
      return res.status(404).json(errors);
    });
});


module.exports = router;
