const express = require("express");
const userAuth = require("../middleware/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
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
    }).populate("fromUserId", ["firstName", "lastName"]);
    const data = connectionrequest.map((row) => row.fromUserId);
    res.status(200).json({ message: "Data fetched successfully", data: data });
  } catch (err) {
    res.status(400).json({ message: "Error:" + err.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page  = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) ||10;
    const skip = (page-1)*limit;
    //find all the connection request which are either sent or received
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ ToUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    }) .select("fromUserId ToUserId")
    //ignoring the requests which sent from fromuserID
    // const connectionRequests = await ConnectionRequest.find({
    //   ToUserId: loggedInUser._id,
    // })
    //   .select("fromUserId ToUserId")
    //   .populate("fromUserId", "firstName");
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((value) => {
      hideUsersFromFeed.add(value.fromUserId._id.toString());
      hideUsersFromFeed.add(value.ToUserId.toString());
    });
    const users = await User.find({
      $and:[{_id:{$nin:Array.from(hideUsersFromFeed)}},
        {_id:{$ne:loggedInUser._id}}
      ],
    }).select("firstName lastName gender about skills").skip(skip).limit(limit);
    res.send(users);
  } catch (err) {
    res.status(400).json({ message: "Error:", data: err.message });
  }
});
module.exports = userRouter;
