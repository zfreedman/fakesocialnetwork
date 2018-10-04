const express = require("express");
const mongoose = require("mongoose");

const db = require("./config/keys").mongoURI;
const setupRoutes = require("./serverHelpers/setupRoutes");

const app = express();
mongoose.connect(db)
  .then(() => console.log("===\nMongoDB connected\n==="))
  .catch(err => console.log(err));

setupRoutes(app);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on ${port}`));
