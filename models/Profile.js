const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const required = true;
const ProfileSchema = new Schema({
  user: {
    ref: "users",
    type: Schema.Types.ObjectId,
  },
  bio: {
    type: String,
  },
  company: {
    type: String,
  },
  date: {
    default: Date.now,
    type: Date,
  },
  education: [{
    current: {
      default: false,
      type: Boolean,
    },
    degree: {
      required,
      type: String,
    },
    description: {
      type: String,
    },
    fieldOfStudy: {
      required,
      type: String,
    },
    from: {
      required,
      type: Date,
    },
    location: {
      type: String,
    },
    school: {
      required,
      type: String,
    },
    to: {
      type: String,
    },
  }],
  experience: [{
    company: {
      required,
      type: String,
    },
    current: {
      default: false,
      type: Boolean,
    },
    description: {
      type: String,
    },
    from: {
      required,
      type: Date,
    },
    location: {
      type: String,
    },
    title: {
      required,
      type: String,
    },
    to: {
      type: String,
    },
  }],
  github: {
    type: String,
  },
  handle: {
    max: 40,
    required,
    type: String,
  },
  location: {
    type: String,
  },
  skills: {
    required,
    type: [String],
  },
  socials: {
    facebook: { type: String, },
    instagram: { type: String, },
    linkedIn: { type: String, },
    twitter: { type: String, },
    youtube: { type: String, },
  },
  status: {
    required,
    type: String,
  },
  website: {
    type: String,
  },
});

module.exports = mongoose.model("profile", ProfileSchema);
