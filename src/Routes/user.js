const express = require("express");
const userAuth = require("../middleware/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");

//get all the pending conenction requests for the loggedin user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequest.find({
      ToUserId: loggedInUser._id,
      Status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);
    res
      .status(200)
      .json({ message: "Data fetched successfully", data: connectionRequest });
  } catch (err) {
    res.status(400).json({ message: "Error:" + err.message });
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionrequest = await ConnectionRequest.find({
      $or: [
        { ToUserId: loggedInUser._id, Status: "accepted" },
        { fromUserId: loggedInUser._id, Status: "accepted" },
      ],
    }).populate("fromUserId",["firstName","lastName"]);
    const data = connectionrequest.map((row)=>row.fromUserId)
    res.status(200).json({message:"Data fetched successfully",data:data})
  } catch (err) {
    res.status(400).json({ message: "Error:" + err.message });
  }
});
module.exports = userRouter;
