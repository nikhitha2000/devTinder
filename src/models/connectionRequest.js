const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true,
    },
    ToUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required:true,
    },
    Status: {
      type: String,
      required:true,
      enum: {
        values: ["ignore", "accepted", "rejected", "interested"],
        message: `{VALUE}is not supported`,
      },
    },
  },
  {
    timestamps: true,
  }
);
connectionRequestSchema.index({fromUserId:1,ToUserId:1});
connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;
    //check if the from user is same as touserid
    if(connectionRequest.fromUserId.equals(connectionRequest.ToUserId)){
        throw new Error("Caan't send a connection request to Yourself");

    }
    next();
})
const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;