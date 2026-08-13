const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
    firstName : {
        type:String,
        required:true,
        minLength:2,
        maxLength:50
    },
    lastName : {
        type : String,
        minLength:3,
        maxLength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password : {
        type:String,
        required:true
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate:(value)=>{
            if(!["male", "female","Others"].includes(value)){
                throw new Error("Value is not right")
            }
        }
    },
    photoUrl : {
        type : String,
        default : "https://unsplash.com/photos/man-in-black-button-up-shirt-ZHvM3XIOHoE"
    },
    skills:{
        type : [String]
    }
},{
    timestamps :true
})

const User = mongoose.model('User', UserSchema)

module.exports = User;