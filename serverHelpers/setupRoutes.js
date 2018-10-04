const posts = require("../routes/api/posts");
const profiles = require("../routes/api/profiles");
const users = require("../routes/api/users");

module.exports = app => {
  app.get("/", (req, res) => res.send("PG13 message"));
  app.use("/api/posts", posts);
  app.use("/api/profiles", profiles);
  app.use("/api/users", users);
};
