const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const db = require("./config/keys").mongoURI;
const attachRoutes = require("./serverHelpers/attachRoutes");

// init app
const app = express();
// bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// passport middleware
app.use(passport.initialize());

// passport config (for jwt strategy)
require("./config/passport")(passport);

// database connect
mongoose.connect(db)
  .then(() => console.log("===\nMongoDB connected\n==="))
  .catch(err => console.log(err));

attachRoutes(app);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on ${port}`));
