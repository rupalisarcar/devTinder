const validator = require("validator");


function validationSignUP(req){
    const { firstName, lastName, email, password } = req.body;

    if(!firstName || !lastName){
        throw new Error("Name is required")
    }else if(!validator.isEmail(email)){
        throw new Error("Please enter valid email-id")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("This is not strong password")
    }
}

module.exports = {
    validationSignUP
}