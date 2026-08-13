const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next)=>{
    try{
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token is not valid")
        }
        const decodedData = await jwt.verify(token,"LearningNode854@")
        const { _id } = decodedData
        const getUser = await User.findOne({_id})
        if(!getUser){
            throw new Error("User not found")
        }
        req.user=getUser
        next()
    }catch(err){
        res.status(400).send("ERROR : "+err.message)
    }
}

module.exports={
    userAuth
}