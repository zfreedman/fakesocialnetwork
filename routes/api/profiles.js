const express = require("express");
const router = express.Router();

const isEmpty = require("../../validation/is-empty");
const ppAuth = require("../passportAuth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const validateEducationInput = require("../../validation/education");
const validateExperienceInput = require("../../validation/experience");
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

// @route   POST api/profiles/education/
// @desc    add an education to the current profile
// @access  private
router.post("/education", ppAuth(), (req, res) => {
  const {
    current, degree, description, fieldOfStudy, from, school, to,
  } = req.body;

  const newEducation = {
    current,
    degree,
    description,
    fieldOfStudy,
    from,
    school,
    to,
  };

  const { errors, isValid } = validateEducationInput(newEducation);
  if (!isValid) return res.status(400).json(errors);

  Profile.findOne({ user: req.user.id }).then(profile => {

    // Add to education array
    profile.education.push(newEducation);

    return profile.save().then(profile => res.json(profile));
  }).catch(err => {
    errors.noCurrentProfile = "The current user profile doesn't exist";
    return res.status(404).json(errors);
  })
});

// @route   DELETE api/profiles/education/:edu_id
// @desc    delete an education
// @access  private
router.delete("/education/:edu_id", ppAuth(), (req, res) => {
  const errors = {};
  
  Profile.findOne({ user: req.user.id }).then(profile => {
    const removeIndex = profile.education
      .map(e => e.id)
      .indexOf(req.params.edu_id);

    // remove
    profile.education.splice(removeIndex, 1);

    // save
    return profile.save().then(profile => res.json(profile));
  }).catch(err => {
    errors.deleteUnavailable = "Education cannot be deleted right now";
    return res.status(404).json(errors);
  })
});

// @route   POST api/profiles/experience/
// @desc    add an experience to the current profile
// @access  private
router.post("/experiences", ppAuth(), (req, res) => {
  const {
    current, company, description, from, location, title, to
  } = req.body;

  const newExperience = {
    current,
    company,
    description,
    from,
    location,
    title,
    to,
  };

  const { errors, isValid } = validateExperienceInput(newExperience);
  if (!isValid) return res.status(400).json(errors);

  Profile.findOne({ user: req.user.id }).then(profile => {

    // Add to experience array
    profile.experience.push(newExperience);

    return profile.save().then(profile => res.json(profile));
  }).catch(err => {
    errors.noCurrentProfile = "The current user profile doesn't exist";
    return res.status(404).json(errors);
  })
});

// @route   DELETE api/profiles/experiences/:exp_id
// @desc    delete an experience
// @access  private
router.delete("/experiences/:exp_id", ppAuth(), (req, res) => {
  const errors = {};
  
  Profile.findOne({ user: req.user.id }).then(profile => {
    const removeIndex = profile.experience
      .map(e => e.id)
      .indexOf(req.params.exp_id);

    // remove
    profile.experience.splice(removeIndex, 1);

    // save
    return profile.save().then(profile => res.json(profile));
  }).catch(err => {
    errors.deleteUnavailable = "Experience cannot be deleted right now";
    return res.status(404).json(errors);
  })
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

// @route   DELETE api/profiles/
// @desc    delete current user profile
// @access  private
router.delete("/", ppAuth(), (req, res) => {
  const errors = {};

  const userID = req.user.id;
  Profile.findOneAndRemove({ user: userID }).then(() => {
    User.findOneAndRemove({ _id: userID }).then(
      () => res.json({ success: true })
    ).catch(err => {
      errors.deleteUnavailable = "User deletion for current user is" +
        + " unavailable right now";
        res.status(400).json(errors);
    })
  }).catch(err => {
    errors.deleteUnavailable = "Profile deletion for current user is"
      + " unavailable right now";
    res.status(400).json(errors);
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
