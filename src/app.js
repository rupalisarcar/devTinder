const express = require("express");
const connectDB = require("./config/database")
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken");


const { userAuth } = require("./middleware/auth");
const User = require('./models/user');
const { validationSignUP } = require("./utils/validation");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.post('/signUp',async (req,res)=>{
    try{
    validationSignUP(req)
    // creating a new instance of the model

    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 12)
    const user = new User({
        firstName, lastName, email, password : passwordHash
    });
    console.log(req.body)
    
        await user.save();
        res.status(201).send("User Saved successfully")
    }catch(err){
        res.status(401).send("Error saving the  :  "+ err.message)
    }
})


app.post("/login", async (req,res)=>{
    try{
        const { email, password } = req.body;

        const user = await User.findOne({email : email})
        if(!user){
            throw new Error("Invalid credentials")
        }
        const passwordValid = await bcrypt.compare(password,user.password)
        if(!passwordValid){
            throw new Error("Invalid credentials")
        }else{
            const jwtToken = await jwt.sign({_id:user._id},"LearningNode854@")
            res.cookie('token', jwtToken)
            res.send("Login successfully.")
        }
    }catch(err){
        res.status(401).send("Error saving the  :  "+ err.message)
    }
})

app.get('/profile', userAuth, async (req,res)=>{
    try{
        const getUser = req.user
        res.send(getUser)
    }catch(err){
        res.status(401).send("Error : "+err.message)
    }
})

app.get("/alluser",async (req,res)=>{
    const users = await User.find({})
    console.log(users)
    try{
        if(users){
            res.send(users)
    }}catch(err){
        res.status(401).send("Something went wrong",err.message)
    }
})

app.get("/user",async (req,res)=>{
    // const users = await User.findOne({})
    // const user = await User.find({email:req.body.email})
    const user = await User.findById({_id:req.body._id})
    console.log(user)
    try{
        if(user){
            res.send(user)
    }}catch(err){
        res.status(401).send("Something went wrong",err.message)
    }
})

app.delete("/user",async (req,res)=>{
    const userId = req.body.userId
    try{
        const user = await User.findByIdAndDelete(userId)
        res.status(200).send("User is deleted successfully")
    }catch(err){
        res.status(401).send("Something went wrong",err.message)
    }
})

app.patch("/user/:userId",async (req,res)=>{
    const userId = req.params.userId;
    const data = req.body
    try{
        const allowdUpdatesArr = ["lastName", "age", "gender", "photoUrl", "skills"]

        const allowedUpdate = Object.keys(data).every((k)=>
            allowdUpdatesArr.includes(k)
        )

        if(!allowedUpdate){
            throw new Error("Update not allowd")
        }

        if(data?.skills.length>10){
            throw new Error("Skiils not more than 10")
        }
        const user = await User.findByIdAndUpdate(userId,data,{
            "returnDocument" : "after",
            "runValidators" : true
        });
        console.log("updated = ", user)
        res.status(200).send("User is updated successfully")
    }catch(err){
        res.status(401).send("Something went wrong : "+err.message)
    }
})

app.patch("/userByEmail",async (req,res)=>{
    const email ={email: req.body.userEmail};
    const data = req.body
    try{
        const user = await User.findOneAndUpdate(email,data,{
            "returnDocument" : "after"
        });
        console.log("updated = ", user)
        res.status(200).send("User is updated successfully")
    }catch(err){
        res.status(401).send("Something went wrong",err.message)
    }
})

app.use("/user",userAuth)





app.use("/test",(req,res, next)=>{
    console.log("Router handing 1")
    next();
},(req,res, next)=>{
    console.log("Router handle 2")
    next();
}, (req,res, next)=>{
    console.log("Router handle 3")
    res.send("Hello from test3")
},(req,res)=>{
    console.log("Router handle 4")
    next()
})

// app.use("/",(req,res)=>{
//     res.send("Hi node.js")
// })
connectDB().then(()=>{
    console.log("Database is connected successfully")
    app.listen(4000,()=>{
        console.log("Server has Statrted")
    })
}).catch((err)=>{
    console.log(err)
})
