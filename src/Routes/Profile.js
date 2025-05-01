const express = require("express");
const ProfileRouter = express.Router();
const userAuth = require("../middleware/auth");
const ValidateEditProfileData = require("../utils/validation");
ProfileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

//edit the user
ProfileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
    try{
        if(!ValidateEditProfileData){
            return res.status(400).send("Trying field is no editable");
        }
        if (!req.body) {
            return res.status(400).send("No data provided in the request body.");
        }
        const user = req.user;
        const updates = Object.keys(req.body);
        console.log(updates);
        updates.forEach((field)=>{
          user[field] = req.body[field];
        })
        await user.save();
        res.status(200).send({
            message: user.firstName + " Profile updated successfully",
            user,
          });
    }catch(err){
        res.status(400).send("error:"+ err.message);
    }

})
module.exports = ProfileRouter;
