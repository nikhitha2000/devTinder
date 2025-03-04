const express = require('express');

const app = express();

app.get("/user",(req,res)=>{
    res.json({firstName:"Nikhitha",lastName:"Beeraka"});
})
app.post("/user",(req,res)=>{
    console.log("saved data successfully");
    res.json("saved data to the DB");
})
app.get("/userr/:userid/:name/:password",(req,res)=>{
    console.log(req.params)
    res.send("goTTTTT itttttt")
    })
app.use("/user",(req,res)=>{
    res.json("HAAAAAAAAAAAAAAAAA")
    })
app.delete("/user",(req,res)=>{
res.json("deleted data successfully");
})
app.use("/test",(req,res)=>{
    res.send("Hello world!");
});

app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
});