const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  avatar: {
    required: true,
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  email: {
    required: true,
    type: String,
  },
  pass: {
    required: true,
    type: String,
  },
});

const User = mongoose.model("users", UserSchema);
module.exports = User;
