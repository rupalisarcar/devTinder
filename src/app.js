const express = require("express");
const app = express();
const { adminAuth } = require("./middleware/auth")


app.use("/user",adminAuth)

app.get("/user",(req,res)=>{
    res.send({'fistName' : "Rupali",'lastName' : "Sarkar"})
})

app.post("/user",(req,res)=>{
    res.send("Data is successfully saved")
})
app.delete("/user",(req,res)=>{
    res.send("Data successfully deleted")
})
app.patch("/user",(req,res)=>{
    res.send("Data is successfully updated")
})

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

app.listen(4000,()=>{
    console.log("Server has Statrted")
})