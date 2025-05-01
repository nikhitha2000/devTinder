const express = require("express");
const requestsRouter = express.Router();
const userAuth = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const user = require("../models/user");

requestsRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res,next) => {
    try {
      const fromUserId = req.user._id;
      const ToUserId = req.params.toUserId;
      const Status = req.params.status;

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(Status)) {
        return res
          .status(400)
          .json({ message: "Invalid status type:" + Status });
      }
      const toUser = await user.findById(ToUserId);
      if(!toUser){
        return res.status(404).json({message:"User doesn't exists"})
      }
      //if existing connection exists
      const ExistingRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId: fromUserId, ToUserId: ToUserId },//if akshay and elon request is already present in the db
          { fromUserId: ToUserId, ToUserId: fromUserId },//elon also sent the request to the akshay
        ],
      });
      if(ExistingRequest){
        return res.status(400).json({message:"Request already sent"})
      }
      const connectionRequest = new ConnectionRequest({
        fromUserId,
        ToUserId,
        Status,
      });
      const data = await connectionRequest.save();
      res.status(200).json({
        message: req.user.firstName+" is "+ Status+" in "+toUser.firstName,
        data: data,
      });
    } catch (err) {
      res.status(400).send("Error:" + err.message);
    }
  }
);

module.exports = requestsRouter;
