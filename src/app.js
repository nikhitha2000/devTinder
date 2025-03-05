const express = require('express');

const app = express();
const {adminauth,userauth} = require("./middlewares/auth")

app.use("/admin",adminauth)
app.get("/admin/getAllData",(req, res)=>{
    res.send("User data send");
})
app.get("/user/data",userauth,(req,res)=>{
    res.send("User data send");
})

app.get("/admin/deleteUser",(req, res)=>{
    res.send("User deleted");
    })

app.get("/user",(req,res)=>{
    res.json({firstName:"Nikhitha",lastName:"Beeraka"});
})
app.post("/user",(req,res)=>{
    console.log("saved data successfully");
    res.status(200).json({message:"saved data into DB"})
})

app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
});