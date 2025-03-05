 const adminauth = (req,res,next)=>{
    console.log("Admin auth is checking for admin")
    const token = "xyz"
    const isadminauthorized = token==="xyz";
    if(!isadminauthorized){
        res.status(401).send("unauthorized user")
    }else{
        next();
    }

}

const userauth = (req,res,next)=>{
    console.log("user auth is checking for admin")
    const token = "xyz"
    const isuserauthorized = token==="xyz";
    if(!isuserauthorized){
        res.status(401).send("unauthorized user")
    }else{
        next();
    }
}

module.exports = {
    adminauth,
    userauth,
}