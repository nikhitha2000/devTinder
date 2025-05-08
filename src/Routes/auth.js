const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const validatedata = require("../utils/validation");
const userModel = require("../models/user");
const userAuth = require("../middleware/auth");
authRouter.post("/signup", async (req, res) => {
  try {
    //whenever we register the data we have to validate the data
    validatedata(req);
    //encrypt the password
    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      photoUrl,
      skills,
    } = req.body;
    const existinguser = await userModel.findOne({ emailId });
    if (existinguser) {
      return res.status(500).json("User already exists");
    }
    const passwordHash = await bcrypt.hash(password, 10);
    req.body.password = passwordHash;
    const newUser = new userModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      photoUrl,
      skills,
    });
    console.log(newUser);
    await newUser.save();
    res.status(200).json("user added successfully!!!");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

//login user
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await userModel.findOne({ emailId });
    if (!user) {
      return res.status(400).send("Invalid credentials");
    }
    const ispasswordValid = await bcrypt.compare(password, user.password);
    if (!ispasswordValid) {
      return res.status(500).send("Invalid credentials");
    } else {
      //create a jwt token
      const token = await user.getJWT();
      res.cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
      res.status(200).send(user);
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});
//forgot password
authRouter.post("/forgotpassword", async (req, res) => {
  try {
    const { _id, newPassword } = req.body;

    if (!_id || !newPassword) {
      return res.status(400).send("User ID and new password are required.");
    }

    const user = await userModel.findById(_id);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send(`${user.firstName} ${user.lastName}, your password was updated successfully.`);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});
//logout the user
authRouter.post("/logout", userAuth, async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).send("logout successfully");
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});
//get user by email
authRouter.get("/GetByEmail", async (req, res) => {
  try {
    const user = await userModel.findOne({ emailId: req.body.emailId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      console.log(user);
      res.status(200).json({ message: "success", data: user });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "error", data: err });
  }
});

authRouter.get("/GetById", async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body._id });
    if (!user) {
      res.status(404).json("User not found");
    } else {
      console.log(user);
      res.status(200).json({ data: user });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});
//get all the users from the db
// authRouter.get("/feed", async (req, res) => {
//   try {
//     const user = await userModel.find();
//     res.status(200).json({ message: "success", data: user });
//   } catch (err) {
//     res.status(400).json({ message: "error", data: err });
//   }
// });

//get the user and delete
authRouter.delete("/delete", async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete({ _id: req.body._id });
    if (!user) {
      res.status(404).json("User not found or ID not found");
    } else {
      res.status(200).json("User deleted successfully!!");
    }
  } catch (err) {
    console.log(user);
    res.status(500).json(err);
  }
});
//update data of the user
authRouter.patch("/update", async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!user) {
      res.status(400).json("User not found");
    } else {
      console.log(user);
      res
        .status(200)
        .json({ message: "User updated successfully", data: user });
    }
  } catch (err) {
    res.status(500).json({ err });
    console.log(err);
  }
});
//finding the user via email and updating
authRouter.put("/Update", async (req, res) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { emailId: req.body.emailId },
      req.body,
      { new: true }
    );
    if (!user) {
      res.status(400).json("User not found");
    } else {
      console.log(user);
      res
        .status(200)
        .json({ message: "User updated successfully", data: user });
    }
  } catch (err) {
    console.log(user);
    res.status(500).json(err);
  }
});
module.exports = authRouter;
