const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    ref: "users",
    type: Schema.Types.ObjectId,
  },
  avatar: {
    type: String,
  },
  comments: [
    {
      avatar: {
        type: String,
      },
      date: {
        default: Date.now,
        type: Date,
      },
      name: {
        type: String,
      },
      text: {
        required: true,
        type: String,
      },
      user: {
        ref: "users",
        type: Schema.Types.ObjectId,
      },
    }
  ],
  date: {
    default: Date.now,
    type: Date,
  },
  likes: [
    {
      user: {
        ref: "users",
        type: Schema.Types.ObjectId,
      },
    },
  ],
  name: {
    type: String,
  },
  text: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.model("post", PostSchema);
