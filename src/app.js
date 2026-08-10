const express = require("express");
const app = express();
const connectDB = require("./config/database")
const { adminAuth } = require("./middleware/auth")

const User = require('./models/user');

app.use(express.json())

app.post('/signUp',async (req,res)=>{
    // creating a new instance of the model
   const user = new User(req.body);
   console.log(req.body)
    try{
        await user.save();
        res.status(201).send("User Saved successfully")
    }catch(err){
        res.status(401).send("Error saving the user "+ err.message)
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

app.patch("/user",async (req,res)=>{
    const userId = req.body.userId;
    const data = req.body
    try{
        const user = await User.findByIdAndUpdate(userId,data,{
            "returnDocument" : "after"
        });
        console.log("updated = ", user)
        res.status(200).send("User is updated successfully")
    }catch(err){
        res.status(401).send("Something went wrong",err.message)
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

app.use("/user",adminAuth)





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
