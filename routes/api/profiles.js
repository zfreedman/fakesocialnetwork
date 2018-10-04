const express = require("express");
const router = express.Router();

// @route   GET api/profiles/test
// @desc    tests post route
// @access  public
router.get("/test", (req, res) => {
  res.json({ msg: "profiles route works" });
});

module.exports = router;
