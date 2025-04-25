const ValidateData = (req) =>{
    const{firstName,lastName,emailId,age,password,gender,photoUrl,skills} = req.body;
    if(!firstName||!lastName||!emailId||!age||!password||!gender||!photoUrl||!skills){
        throw new Error("All fields are mandatory to fill!!")
    }
    // if(firstName!== lastName){
    //     throw new Error("Your name is not matching with the firstName");
    // }
}

module.exports = ValidateData