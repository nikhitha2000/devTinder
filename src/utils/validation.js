const ValidateData = (req) =>{
    const{firstName,lastName,emailId,age,password,gender,photoUrl} = req.body;
    if(!firstName||!lastName||!emailId||!age||!password||!gender||!photoUrl){
        throw new Error("All fields are mandatory to fill!!")
    }
}
const ValidateEditProfile = (req) =>{
    const FieldsAllowed = ["firstName","lastName","age","gender","photoUrl","about","skills"];
    const IsEditAllowed = Object.keys(req.body).every(field=>FieldsAllowed.includes(field));
    return IsEditAllowed;
}
module.exports = ValidateData,ValidateEditProfile