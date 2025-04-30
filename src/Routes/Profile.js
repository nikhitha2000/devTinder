const express = require("express");
const ProfileRouter = express.Router();
const userAuth = require("../middleware/auth");
ProfileRouter.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});
module.exports = ProfileRouter;
